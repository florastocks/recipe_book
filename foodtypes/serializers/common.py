from rest_framework import serializers
from ..models import FoodType

class FoodTypeSerializer(serializers.ModelSerializer):
  class Meta:
    model = FoodType
    fields = '__all__'