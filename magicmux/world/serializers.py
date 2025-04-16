from rest_framework import serializers
from .models import TileType, Map, MapTile, MapZone, Monster

class TileTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TileType
        fields = '__all__'
        read_only_fields = ['id']


class MapTileSerializer(serializers.ModelSerializer):
    tile_type = TileTypeSerializer(read_only=True)
    tile_type_id = serializers.PrimaryKeyRelatedField(
        queryset=TileType.objects.all(), source='tile_type', write_only=True
    )

    map_id = serializers.PrimaryKeyRelatedField(
        queryset=Map.objects.all(), source='map', write_only=True
    )

    class Meta:
        model = MapTile
        fields = ['id', 'x', 'y', 'tile_type', 'tile_type_id', 'map_id']
        read_only_fields = ['id']



class MapSerializer(serializers.ModelSerializer):
    tiles = MapTileSerializer(many=True, read_only=True)

    class Meta:
        model = Map
        fields = ['id', 'name', 'width', 'height', 'created_at', 'tiles']
        read_only_fields = ['created_at']


class MapZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = MapZone
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class MonsterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Monster
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']
