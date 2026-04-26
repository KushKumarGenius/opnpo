from django.db import models


class Request(models.Model):
    class RequestStatus(models.TextChoices):
        PENDING = "pending", "Pending"
        APPROVED = "approved", "Approved"
        COMPLETED = "completed", "Completed"

    class RequestType(models.TextChoices):
        ACCESS = "access", "Access Request"
        DONATION = "donation", "Device Donation"
        PARTNERSHIP = "partnership", "Partnership"
        OTHER = "other", "Other"

    full_name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    request_type = models.CharField(max_length=40, choices=RequestType.choices)
    description = models.TextField(max_length=3000)
    status = models.CharField(
        max_length=20,
        choices=RequestStatus.choices,
        default=RequestStatus.PENDING,
    )
    internal_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["created_at"]),
            models.Index(fields=["status"]),
            models.Index(fields=["email"]),
        ]

    def __str__(self) -> str:
        return f"{self.full_name} ({self.get_request_type_display()})"
