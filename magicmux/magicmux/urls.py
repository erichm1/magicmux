from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from world.views import bulk_save_tiles
from rest_framework.routers import DefaultRouter
from world.views import TileTypeViewSet, MapViewSet, MapTileViewSet, MapZoneViewSet, MonsterViewSet

router = DefaultRouter()
router.register(r'tile-types', TileTypeViewSet)
router.register(r'maps', MapViewSet)
router.register(r'map-tiles', MapTileViewSet)
router.register(r'zones', MapZoneViewSet)
router.register(r'monsters', MonsterViewSet)

urlpatterns = [
    path('map-tiles/bulk-save/', bulk_save_tiles, name='bulk-save-tiles'),

    path('admin/', admin.site.urls),
    path('api/', include('world.urls')),


    
]

# Serve arquivos estáticos (como imagens de tiles/monstros) em dev
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
