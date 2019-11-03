from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    bio = models.TextField(max_length=2000)
    twitch = models.URLField()
    mixer = models.URLField()
    youtube = models.URLField()
    twitter = models.URLField()
    instagram = models.URLField()
    facebook = models.URLField()
    discord_username = models.CharField(max_length=100)
