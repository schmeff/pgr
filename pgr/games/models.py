from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Game(models.Model):
    name = models.CharField(max_length=100)
    summary = models.TextField(max_length=2000, null=True)
    parental_rating = models.CharField(max_length=20, null=True)
    developer = models.CharField(max_length=50, null=True)
    release_date = models.DateField(null=True)
    critic_rating = models.SmallIntegerField(null=True)
    player_rating = models.SmallIntegerField(null=True)
    game_cover_image = models.FileField(upload_to="game_cover_images", null=True)
    created_by = models.ForeignKey(User,
                                   models.SET_NULL,
                                   blank=True,
                                   null=True,
                                   limit_choices_to={'is_staff': True})

