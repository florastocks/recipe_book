from .common import RecipeSerializer
from reviews.serializers.populated import PopulatedReviewSerializer
from foodtypes.serializers.common import FoodTypeSerializer

class PopulatedRecipeSerializer(RecipeSerializer):
  reviews = PopulatedReviewSerializer(many=True)
  foodtype = FoodTypeSerializer(many=True)

class PopulatedRecipeSerializerFoodType(RecipeSerializer):
  foodtype = FoodTypeSerializer(many=True)