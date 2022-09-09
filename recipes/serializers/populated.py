from .common import RecipeSerializer
from reviews.serializers.common import ReviewSerializer
from foodtypes.serializers.common import FoodTypeSerializer

class PopulatedRecipeSerializer(RecipeSerializer):
  reviews = ReviewSerializer(many=True)
  foodtypes = FoodTypeSerializer(many=True)

class PopulatedRecipeSerializerFoodType(RecipeSerializer):
  foodtypes = FoodTypeSerializer(many=True)