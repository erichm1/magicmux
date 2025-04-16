from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import TileType, Map, MapTile, MapZone, Monster
from .serializers import (
    TileTypeSerializer, MapSerializer, MapTileSerializer,
    MapZoneSerializer, MonsterSerializer
)


class TileTypeViewSet(viewsets.ModelViewSet):
    queryset = TileType.objects.all()
    serializer_class = TileTypeSerializer


class MapViewSet(viewsets.ModelViewSet):
    queryset = Map.objects.all()
    serializer_class = MapSerializer


class MapTileViewSet(viewsets.ModelViewSet):
    queryset = MapTile.objects.all()  # Adiciona o queryset aqui
    serializer_class = MapTileSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['map']

    def get_queryset(self):
        return MapTile.objects.select_related('tile_type').all()


class MapZoneViewSet(viewsets.ModelViewSet):
    queryset = MapZone.objects.all()
    serializer_class = MapZoneSerializer


class MonsterViewSet(viewsets.ModelViewSet):
    queryset = Monster.objects.all()
    serializer_class = MonsterSerializer


# Novo endpoint para salvar tiles em lote
@api_view(['POST'])
def bulk_save_tiles(request):
    for tile in request.data:
        MapTile.objects.update_or_create(
            map_id=tile['map'],
            x=tile['x'],
            y=tile['y'],
            defaults={'tile_type_id': tile['tile_type_id']}
        )
    return Response({'status': 'ok'})
