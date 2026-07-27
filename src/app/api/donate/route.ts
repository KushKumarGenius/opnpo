import { NextResponse } from "next/server";

type DonateBody = {
  full_name?: string;
  email?: string;
  phone?: string;
  device_type?: string;
  description?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Donation form is not configured yet. Missing GOOGLE_SHEETS_WEBHOOK_URL." },
      { status: 503 },
    );
  }

  let body: DonateBody;
  try {
    body = (await request.json()) as DonateBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const full_name = clean(body.full_name);
  const email = clean(body.email);
  const phone = clean(body.phone);
  const device_type = clean(body.device_type);
  const description = clean(body.description);

  if (full_name.length < 2) {
    return NextResponse.json({ error: "Please provide your full name." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
  }
  if (device_type.length < 2) {
    return NextResponse.json({ error: "Please provide a device type." }, { status: 400 });
  }
  if (description.length < 20) {
    return NextResponse.json(
      { error: "Please provide a bit more detail (at least 20 characters)." },
      { status: 400 },
    );
  }
  if (phone && phone.length < 7) {
    return NextResponse.json({ error: "Please provide a valid phone number." }, { status: 400 });
  }

  const payload = {
    timestamp: new Date().toISOString(),
    full_name,
    email,
    phone,
    device_type,
    description,
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    const raw = await response.text();
    let parsed: { ok?: boolean; error?: string } | null = null;
    try {
      parsed = JSON.parse(raw) as { ok?: boolean; error?: string };
    } catch {
      parsed = null;
    }

    // Apps Script often returns HTTP 200 with an HTML error page when misconfigured.
    if (!response.ok || !parsed?.ok) {
      const htmlHint =
        /script function not found/i.test(raw)
          ? " Apps Script is missing doPost — save the script and create a new deployment."
          : "";
      return NextResponse.json(
        {
          error:
            parsed?.error ||
            `Unable to save your donation right now.${htmlHint}`.trim(),
        },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Unable to reach the donation sheet. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
