from django.shortcuts import render
from rest_framework import viewsets
from .models import TileType, Map, MapTile, MapZone, Monster
from .serializers import TileTypeSerializer, MapSerializer, MapTileSerializer, MapZoneSerializer,MonsterSerializer

class TileTypeViewSet(viewsets.ModelViewSet):
    queryset = TileType.objects.all()
    serializer_class = TileTypeSerializer

class MapViewSet(viewsets.ModelViewSet):
    queryset = Map.objects.all()
    serializer_class = MapSerializer

class MapTileViewSet(viewsets.ModelViewSet):
    queryset = MapTile.objects.all()
    serializer_class = MapTileSerializer

class MapZoneViewSet(viewsets.ModelViewSet):
    queryset = MapZone.objects.all()
    serializer_class = MapZoneSerializer

class MonsterViewSet(viewsets.ModelViewSet):
    queryset = Monster.objects.all()
    serializer_class = MonsterSerializer
