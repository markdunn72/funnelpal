from django.db import models
from django.contrib.auth.models import User

def default_pagesettings():
  settings = PageSettings()
  settings.save()
  return settings.pk

class PageSettings(models.Model):
  bgcolor = models.CharField(max_length=7, default="#ffffff") # hex
  cardbgcolor = models.CharField(max_length=7, default="#ffffff") # hex
  cardwidth = models.IntegerField(default=80) # %

class OptInPage(models.Model):
  h1 = models.CharField(max_length=500, null=True, blank=True)
  h2 = models.CharField(max_length=500, null=True, blank=True)
  p = models.CharField(max_length=2000, null=True, blank=True)
  btn = models.CharField(max_length=100, null=True, blank=True)
  settings = models.OneToOneField(PageSettings, on_delete=models.CASCADE, default=default_pagesettings)

class LandingPage(models.Model):
  h1 = models.CharField(max_length=500, null=True, blank=True)
  h2 = models.CharField(max_length=500, null=True, blank=True)
  p = models.CharField(max_length=2000, null=True, blank=True)
  settings = models.OneToOneField(PageSettings, on_delete=models.CASCADE, default=default_pagesettings)  

class Funnel(models.Model):
  name = models.CharField(max_length=100)
  owner = models.ForeignKey(User, related_name="funnels", on_delete=models.CASCADE)
  created_at = models.DateTimeField(auto_now_add=True)
  
  optinpage = models.OneToOneField(OptInPage, on_delete=models.CASCADE, null=True)
  landingpage = models.OneToOneField(LandingPage, on_delete=models.CASCADE, null=True)

  class Meta:
    unique_together = ('name', 'owner')

