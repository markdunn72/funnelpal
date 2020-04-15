from rest_framework import serializers
from funnels.models import Funnel


class FunnelSerializer(serializers.ModelSerializer):
  class Meta:
    model = Funnel
    fields = '__all__'

