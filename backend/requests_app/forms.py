from django import forms
from django.contrib.auth.forms import AuthenticationForm

from .models import Request


class AdminLoginForm(AuthenticationForm):
    username = forms.CharField(
        label="Email or Username",
        widget=forms.TextInput(attrs={"autofocus": True, "placeholder": "admin"}),
    )
    password = forms.CharField(
        label="Password",
        strip=False,
        widget=forms.PasswordInput(attrs={"placeholder": "Password"}),
    )


class RequestUpdateForm(forms.ModelForm):
    class Meta:
        model = Request
        fields = ["status", "internal_notes"]
        widgets = {
            "status": forms.Select(),
            "internal_notes": forms.Textarea(attrs={"rows": 5, "placeholder": "Internal notes"}),
        }
