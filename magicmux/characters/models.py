from django.db import models

class Character(models.Model):
    player = models.ForeignKey('accounts.Player', on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    character_class = models.CharField(max_length=20)  # Ex: Knight, Mage
    hp = models.IntegerField(default=100)
    mana = models.IntegerField(default=50)
    strength = models.IntegerField(default=10)
    intelligence = models.IntegerField(default=10)
    agility = models.IntegerField(default=10)
    level = models.PositiveIntegerField(default=1)
    xp = models.PositiveIntegerField(default=0)
    gold = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # equipamentos, inventário, skills etc.
