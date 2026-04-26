from django.urls import include, path

urlpatterns = [
    path("api/", include("requests_app.api_urls")),
    path("dashboard/", include("requests_app.dashboard_urls")),
]
