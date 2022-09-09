from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Recipe
from .serializers.common import RecipeSerializer

# Create your views here.
class RecipeListView(APIView):
  def get(self, _request):
    recipes = Recipe.objects.all()
    print("recipies -> ", recipes)
    serialized_recipes = RecipeSerializer(recipes, many=True)
    print(serialized_recipes)
    return Response(serialized_recipes.data, status=status.HTTP_200_OK)

  def post(self, request):
    print('recipe request ->', request.data)
    recipe_to_add = RecipeSerializer(data=request.data)
    try:
      recipe_to_add.is_valid(True)
      print(recipe_to_add.validated_data)
      recipe_to_add.save()
      return Response(recipe_to_add.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      print('ERROR')
    return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)