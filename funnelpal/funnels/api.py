from funnels.models import Funnel
from rest_framework import viewsets, permissions
from .serializers import FunnelSerializer

class FunnelViewSet(viewsets.ModelViewSet):
  permission_classes = [
    permissions.IsAuthenticated
  ]

  serializer_class = FunnelSerializer

  def get_queryset(self):
    return self.request.user.funnels.all()

  def perform_create(self, serializer):
    serializer.save(owner=self.request.user)
