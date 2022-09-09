from pyexpat import model
from django.db import models

# Create your models here.
class Recipe(models.Model):
  title = models.CharField(max_length=100, default=None)
  instructions = models.TextField(max_length=1000, default=None)

  def __str__(self):
    return f"{self.title}"