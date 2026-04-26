from django.urls import path

from .views import (
    DashboardHomeView,
    DashboardLoginView,
    DashboardLogoutView,
    DashboardRequestDetailView,
)

urlpatterns = [
    path("login/", DashboardLoginView.as_view(), name="dashboard-login"),
    path("logout/", DashboardLogoutView.as_view(), name="dashboard-logout"),
    path("", DashboardHomeView.as_view(), name="dashboard-home"),
    path("requests/<int:pk>/", DashboardRequestDetailView.as_view(), name="dashboard-detail"),
]
