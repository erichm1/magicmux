from django.contrib import admin
from .models import Map, MapTile, MapZone, Monster, TileType

class MapAdmin(admin.ModelAdmin):
    list_display = ('name', 'width', 'height')

class MapTileAdmin(admin.ModelAdmin):
    list_display = ('map', 'x', 'y', 'tile_type')

class MapZoneAdmin(admin.ModelAdmin):
    list_display = ('name', 'level_required', 'is_safe_zone')

class MonsterAdmin(admin.ModelAdmin):
    list_display = ('name', 'zone', 'hp', 'damage')

class TileTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'image')

# Register the models with custom admin interfaces
admin.site.register(Map, MapAdmin)
admin.site.register(MapTile, MapTileAdmin)
admin.site.register(MapZone, MapZoneAdmin)
admin.site.register(Monster, MonsterAdmin)
admin.site.register(TileType, TileTypeAdmin)