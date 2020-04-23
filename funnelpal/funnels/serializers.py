from rest_framework import serializers
from funnels.models import OptInPage, LandingPage, Funnel

class OptInPageSerializer(serializers.ModelSerializer):
  class Meta:
    model = OptInPage
    fields = '__all__'

class LandingPageSerializer(serializers.ModelSerializer):
  class Meta:
    model = LandingPage
    fields = '__all__'

class FunnelSerializer(serializers.ModelSerializer):
  optinpage = OptInPageSerializer(many=False)
  landingpage = LandingPageSerializer(many=False)

  class Meta:
    model = Funnel
    fields = ['id', 'created_at', 'name', 'optinpage', 'landingpage']

  def create(self, validated_data):
        optin_data = validated_data.pop('optinpage')
        landing_data = validated_data.pop('landingpage')
        optinpage = OptInPage.objects.create(**optin_data)
        landingpage = LandingPage.objects.create(**landing_data)

        funnel = Funnel.objects.create(**validated_data, optinpage=optinpage, landingpage=landingpage)

        return funnel

