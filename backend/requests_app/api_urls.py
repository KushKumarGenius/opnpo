from django.urls import path

from .views import RequestAdminDetailAPIView, RequestListCreateAPIView

urlpatterns = [
    path("requests/", RequestListCreateAPIView.as_view(), name="request-list-create"),
    path("requests/<int:pk>/", RequestAdminDetailAPIView.as_view(), name="admin-request-detail"),
]
