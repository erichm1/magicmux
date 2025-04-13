from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=50)
    type = models.CharField(max_length=20)  # Ex: weapon, armor, consumable
    description = models.TextField()
    value = models.PositiveIntegerField(default=0)
    stats = models.JSONField(default=dict)
    image = models.ImageField(upload_to='items/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
