from django.db import models

# Create your models here.
class FoodType(models.Model):
  name = models.CharField(max_length=50)

  def __str__(self):
    return f"{self.name}"