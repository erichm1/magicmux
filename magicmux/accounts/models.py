from django.db import models
from django.contrib.auth.models import AbstractUser

class Player(AbstractUser):
    nickname = models.CharField(max_length=20, unique=True)
    level = models.PositiveIntegerField(default=1)
    xp = models.PositiveIntegerField(default=0)
    gold = models.PositiveIntegerField(default=0)
    