from django.db import models

# Create your models here.
class Recipe(models.Model):
  title = models.CharField(max_length=100, default=None)
  instructions = models.TextField(max_length=4000, default=None)
  ingredients = models.TextField(max_length=1000, default=None, null=True)
  foodtype = models.ManyToManyField(
    "foodtypes.FoodType",
    related_name="recipes"
  )
  image= models.URLField(max_length=500, default='https://res.cloudinary.com/aaf-proj3/image/upload/v1663161208/360_F_376408140_kiazgwOvkEy0e50oxgF5kllIl7j2q1SQ_znlmvm.jpg')

  def __str__(self):
    return f"{self.title}"