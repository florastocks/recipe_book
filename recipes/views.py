from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import Recipe
from .serializers.common import RecipeSerializer
from .serializers.populated import PopulatedRecipeSerializer

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


class RecipeDetailView(APIView):
  # single recipe
  def get_recipe(self, pk):
    print("single recipe endpoint")
    try:  
      return Recipe.objects.get(pk=pk)
    except Recipe.DoesNotExist:
      raise NotFound(detail="Recipe Not Found")

  def get(self, request, pk):
    print("trying to get book -> ", request.data)
    recipe = self.get_recipe(pk=pk)
    serialized_recipe = PopulatedRecipeSerializer(recipe)
    return Response(serialized_recipe.data)

  def delete(self, _request, pk):
    recipe_to_delete = self.get_recipe(pk=pk)
    recipe_to_delete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

  def put(self, request, pk):
    recipe_to_update = self.get_recipe(pk=pk)
    updated_recipe = RecipeSerializer(recipe_to_update, data=request.data)
    try:
      updated_recipe.is_valid(True)
      updated_recipe.save()
      return Response(updated_recipe.data, status=status.HTTP_202_ACCEPTED)
    except Exception as e:
      print(e)
      return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)