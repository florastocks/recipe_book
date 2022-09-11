from .common import FoodTypeSerializer
from recipes.serializers.common import RecipeSerializer

class PopulatedFoodTypeSerializer(FoodTypeSerializer):
  recipes = RecipeSerializer(many=True)