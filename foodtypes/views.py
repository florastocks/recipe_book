from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.populated import PopulatedFoodTypeSerializer
from .models import FoodType

# Create your views here.
class FoodTypeListView(APIView):
  def get(self, _request):
    foodtypes= FoodType.objects.all()
    serialized_foodtypes = PopulatedFoodTypeSerializer(foodtypes, many=True)
    return Response(serialized_foodtypes.data)
