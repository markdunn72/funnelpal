from rest_framework import routers
from .api import FunnelViewSet

router = routers.DefaultRouter()
router.register('api/funnels', FunnelViewSet, 'funnels')

urlpatterns = router.urls