from django.db import models
from django.contrib.auth.models import User
from games.models import Game


# Create your models here.
class CriticReview(models.Model):
    name = models.CharField(max_length=100)
    link = models.URLField(null=True)
    rating = models.DecimalField(null=True, decimal_places=2, max_digits=5)
    game = models.ForeignKey(Game, on_delete=models.CASCADE, default=None)
    added_by = models.ForeignKey(User,
                                 models.SET_NULL,
                                 blank=True,
                                 null=True,
                                 limit_choices_to={'is_staff': True})
