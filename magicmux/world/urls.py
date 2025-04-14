from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TileTypeViewSet, MapViewSet, MapTileViewSet, MapZoneViewSet, MonsterViewSet

router = DefaultRouter()
router.register(r'tile-types', TileTypeViewSet)
router.register(r'maps', MapViewSet)
router.register(r'map-tiles', MapTileViewSet)
router.register(r'zones', MapZoneViewSet)
router.register(r'monsters', MonsterViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
