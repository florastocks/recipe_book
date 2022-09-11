from django.urls import path
from .views import FoodTypeListView

urlpatterns = [
  path('', FoodTypeListView.as_view())
]