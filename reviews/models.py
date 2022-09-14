from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
# Create your models here.
class Review(models.Model):
  title = models.CharField(max_length=100)
  text = models.TextField(max_length=300)
  created_at = models.DateTimeField(auto_now_add=True)
  rating = models.PositiveIntegerField(validators=[MinValueValidator(1) ,MaxValueValidator(5)], default=1)

  recipe = models.ForeignKey(
    "recipes.Recipe",
    related_name="reviews",
    on_delete= models.CASCADE
  )
  owner = models.ForeignKey(
    'jwt_auth.User',
    related_name= "reviews",
    on_delete= models.CASCADE
  )

  def __str__(self):
    return f"{self.title}"