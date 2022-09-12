from .common import RecipeSerializer
from reviews.serializers.common import ReviewSerializer
from foodtypes.serializers.common import FoodTypeSerializer

class PopulatedRecipeSerializer(RecipeSerializer):
  reviews = ReviewSerializer(many=True)
  foodtype = FoodTypeSerializer(many=True)

class PopulatedRecipeSerializerFoodType(RecipeSerializer):
  foodtype = FoodTypeSerializer(many=True)