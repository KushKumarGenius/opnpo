import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col items-start justify-between gap-6 text-sm text-ink-subtle sm:flex-row sm:items-center">
        <p className="font-medium text-ink">Tech Access</p>
        <p>Student-run nonprofit · Cupertino and neighbors</p>
      </Container>
    </footer>
  );
}
