from rest_framework import serializers
from django.utils.html import strip_tags

from .models import Request


class RequestCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = [
            "id",
            "full_name",
            "email",
            "phone",
            "request_type",
            "description",
            "status",
            "created_at",
        ]
        read_only_fields = ["id", "status", "created_at"]

    def validate_full_name(self, value: str) -> str:
        clean_value = " ".join(strip_tags(value).split()).strip()
        if len(clean_value) < 2:
            raise serializers.ValidationError("Please provide your full name.")
        return clean_value

    def validate_phone(self, value: str) -> str:
        clean_value = strip_tags(value).strip()
        if clean_value and len(clean_value) < 7:
            raise serializers.ValidationError("Please provide a valid phone number.")
        return clean_value

    def validate_description(self, value: str) -> str:
        clean_value = strip_tags(value).strip()
        if len(clean_value) < 20:
            raise serializers.ValidationError("Please provide more detail about your request.")
        return clean_value


class RequestAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = [
            "id",
            "full_name",
            "email",
            "phone",
            "request_type",
            "description",
            "status",
            "internal_notes",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]
