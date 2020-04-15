from django.db import models


class Funnel(models.Model):
  name = models.CharField(max_length=100)
  created_at = models.DateTimeField(auto_now_add=True)

  # optin page
  optin_h1 = models.CharField(max_length=500, null=True, blank=True)
  optin_h2 = models.CharField(max_length=500, null=True, blank=True)
  optin_p = models.CharField(max_length=2000, null=True, blank=True)
  optin_btn = models.CharField(max_length=100, null=True, blank=True)

  # landing page
  landing_h1 = models.CharField(max_length=500, null=True, blank=True)
  landing_h2 = models.CharField(max_length=500, null=True, blank=True)
  landing_p = models.CharField(max_length=2000, null=True, blank=True)
