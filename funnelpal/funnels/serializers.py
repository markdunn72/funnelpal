from rest_framework import serializers
from funnels.models import PageSettings, OptInPage, LandingPage, Funnel

class PageSettingsSerializer(serializers.ModelSerializer):
  class Meta:
    model = PageSettings
    fields = '__all__'


class OptInPageSerializer(serializers.ModelSerializer):
  settings = PageSettingsSerializer(many=False)

  class Meta:
    model = OptInPage
    fields = ['h1', 'h2', 'p', 'btn', 'settings']


class LandingPageSerializer(serializers.ModelSerializer):
  settings = PageSettingsSerializer(many=False)

  class Meta:
    model = LandingPage
    fields = ['h1', 'h2', 'p', 'settings']


class FunnelSerializer(serializers.ModelSerializer):
  optinpage = OptInPageSerializer(many=False)
  landingpage = LandingPageSerializer(many=False)

  class Meta:
    model = Funnel
    fields = ['id', 'created_at', 'name', 'optinpage', 'landingpage']

  def create(self, validated_data):
    optin_data = validated_data.pop('optinpage')
    landing_data = validated_data.pop('landingpage')
    optin_pagesettings = PageSettings.objects.create()
    landing_pagesettings = PageSettings.objects.create()
    optinpage = OptInPage.objects.create(**optin_data, settings=optin_pagesettings)
    landingpage = LandingPage.objects.create(**landing_data, settings=landing_pagesettings)

    funnel = Funnel.objects.create(**validated_data, optinpage=optinpage, landingpage=landingpage)

    return funnel

  def update(self, instance, validated_data):

    optin_settings = validated_data["optinpage"]["settings"]
    landing_settings = validated_data["landingpage"]["settings"]

    # update funnel
    optinpage_data = validated_data.pop("optinpage", instance.optinpage)
    landingpage_data = validated_data.pop("landingpage", instance.landingpage)

    instance.save()

    optinpage = instance.optinpage
    landingpage = instance.landingpage

    optinpage.h1 = optinpage_data.get("h1", optinpage.h1)
    optinpage.h2 = optinpage_data.get("h2", optinpage.h2)
    optinpage.p = optinpage_data.get("p", optinpage.p)
    optinpage.btn = optinpage_data.get("btn", optinpage.btn)
    optinpage.settings.bgcolor = optin_settings["bgcolor"]
    optinpage.settings.cardbgcolor = optin_settings["cardbgcolor"]
    optinpage.settings.cardwidth = optin_settings["cardwidth"]
    optinpage.settings.save()

    
    landingpage.h1 = landingpage_data.get("h1", landingpage.h1)
    landingpage.h2 = landingpage_data.get("h2", landingpage.h2)
    landingpage.p = landingpage_data.get("p", landingpage.p)
    landingpage.settings.bgcolor = landing_settings["bgcolor"]
    landingpage.settings.cardbgcolor = landing_settings["cardbgcolor"]
    landingpage.settings.cardwidth = landing_settings["cardwidth"]
    landingpage.settings.save()

    optinpage.save()
    landingpage.save()

    return instance

