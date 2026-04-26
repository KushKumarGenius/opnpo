from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.auth.views import LoginView, LogoutView
from django.db.models import Q
from django.shortcuts import get_object_or_404, redirect
from django.views.generic import DetailView, TemplateView
from rest_framework import generics, permissions, throttling

from .forms import AdminLoginForm, RequestUpdateForm
from .models import Request
from .serializers import RequestAdminSerializer, RequestCreateSerializer


class StaffRequiredMixin(LoginRequiredMixin, UserPassesTestMixin):
    def test_func(self):
        return bool(self.request.user and self.request.user.is_staff)


class RequestListCreateAPIView(generics.ListCreateAPIView):
    def get_queryset(self):
        queryset = Request.objects.all()
        status = self.request.query_params.get("status")
        search = self.request.query_params.get("search")
        ordering = self.request.query_params.get("ordering", "-created_at")

        if status in {choice[0] for choice in Request.RequestStatus.choices}:
            queryset = queryset.filter(status=status)

        if search:
            queryset = queryset.filter(
                Q(full_name__icontains=search)
                | Q(email__icontains=search)
                | Q(description__icontains=search)
            )

        if ordering in {"created_at", "-created_at"}:
            queryset = queryset.order_by(ordering)
        return queryset

    def get_permissions(self):
        if self.request.method == "POST":
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return RequestCreateSerializer
        return RequestAdminSerializer

    def get_throttles(self):
        if self.request.method == "POST":
            scoped = throttling.ScopedRateThrottle()
            scoped.scope = "submit_request"
            return [scoped]
        return super().get_throttles()


class RequestAdminDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = Request.objects.all()
    serializer_class = RequestAdminSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_serializer(self, *args, **kwargs):
        serializer = super().get_serializer(*args, **kwargs)
        if self.request.method == "PATCH":
            serializer.fields.pop("full_name", None)
            serializer.fields.pop("email", None)
            serializer.fields.pop("phone", None)
            serializer.fields.pop("request_type", None)
            serializer.fields.pop("description", None)
            serializer.fields.pop("created_at", None)
        return serializer


class DashboardLoginView(LoginView):
    form_class = AdminLoginForm
    template_name = "dashboard/login.html"
    redirect_authenticated_user = True


class DashboardLogoutView(LogoutView):
    next_page = "/dashboard/login/"


class DashboardHomeView(StaffRequiredMixin, TemplateView):
    template_name = "dashboard/list.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        search = self.request.GET.get("search", "").strip()
        status = self.request.GET.get("status", "all")
        ordering = self.request.GET.get("ordering", "-created_at")

        requests_qs = Request.objects.all()
        if status in {choice[0] for choice in Request.RequestStatus.choices}:
            requests_qs = requests_qs.filter(status=status)
        if search:
            requests_qs = requests_qs.filter(
                Q(full_name__icontains=search)
                | Q(email__icontains=search)
                | Q(description__icontains=search)
            )
        if ordering in {"created_at", "-created_at"}:
            requests_qs = requests_qs.order_by(ordering)
        else:
            ordering = "-created_at"

        context["requests"] = requests_qs[:150]
        context["status"] = status
        context["search"] = search
        context["ordering"] = ordering
        context["status_options"] = Request.RequestStatus.choices
        return context


class DashboardRequestDetailView(StaffRequiredMixin, DetailView):
    model = Request
    template_name = "dashboard/detail.html"
    context_object_name = "item"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["form"] = RequestUpdateForm(instance=self.object)
        return context

    def post(self, request, *args, **kwargs):
        obj = get_object_or_404(Request, pk=kwargs["pk"])
        form = RequestUpdateForm(request.POST, instance=obj)
        if form.is_valid():
            form.save()
            messages.success(request, "Submission updated.")
            return redirect("dashboard-detail", pk=obj.pk)

        context = self.get_context_data(object=obj)
        context["form"] = form
        return self.render_to_response(context)
