from funnels.models import Funnel
from rest_framework import viewsets, permissions
from .serializers import FunnelSerializer

class FunnelViewSet(viewsets.ModelViewSet):
  queryset = Funnel.objects.all()
  permission_classes = [
    permissions.AllowAny
  ]
  serializer_class = FunnelSerializer
