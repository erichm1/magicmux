
from django.db import models

class TileType(models.Model):
    name = models.CharField(max_length=30, unique=True)
    image = models.ImageField(upload_to='tiles/', blank=True, null=True)

    def __str__(self):
        return self.name

class Map(models.Model):
    name = models.CharField(max_length=50)
    width = models.PositiveIntegerField()
    height = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class MapTile(models.Model):
    map = models.ForeignKey(Map, on_delete=models.CASCADE, related_name='tiles')
    x = models.PositiveIntegerField()
    y = models.PositiveIntegerField()
    tile_type = models.ForeignKey(TileType, on_delete=models.CASCADE)

    def __str__(self):
        return self.map

    class Meta:
        unique_together = ('map', 'x', 'y')


class MapZone(models.Model):
    name = models.CharField(max_length=50)
    level_required = models.IntegerField(default=1)
    is_safe_zone = models.BooleanField(default=False)

class Monster(models.Model):
    name = models.CharField(max_length=30)
    zone = models.ForeignKey(MapZone, on_delete=models.CASCADE)
    hp = models.IntegerField()
    damage = models.IntegerField()
    drop_table = models.JSONField(default=list)
    spawn_rate = models.FloatField(default=1.0)  # Percentage chance to spawn
    respawn_time = models.IntegerField(default=30)  # in seconds
    level = models.IntegerField(default=1)
    exp = models.IntegerField(default=0)
    image = models.ImageField(upload_to='monsters/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)