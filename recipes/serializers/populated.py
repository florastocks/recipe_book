from .common import RecipeSerializer
from reviews.serializers.common import ReviewSerializer

class PopulatedRecipeSerializer(RecipeSerializer):
  reviews = ReviewSerializer(many=True)
  