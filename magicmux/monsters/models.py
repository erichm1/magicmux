from django.db import models
from world.models import MapZone

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

    def __str__(self):
        return self.name