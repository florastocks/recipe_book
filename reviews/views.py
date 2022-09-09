from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .serializers.common import ReviewSerializer
from .models import Review

# Create your views here.

class ReviewListView(APIView):
  def post(self, request):
    review_to_create = ReviewSerializer(data=request.self)
    try:
      review_to_create.is_valid(True)
      review_to_create.save()
      return Response(review_to_create.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      print(e.__dict__)
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class ReviewDetailView(APIView):
  def get_review(self, pk):
    try: 
      return Review.objects.get(pk=pk)
    except Review.DoesNotExist:
      raise NotFound("Review was not found!")

  def delete(self, _request, pk):
    review_to_delete = self.get_review(pk)
    review_to_delete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
  
  def put(self, request, pk):
    review_to_update = self.get_review(pk=pk)
    updated_review = ReviewSerializer(review_to_update, data=request.data)
    try:
      updated_review.is_valid(True)
      updated_review.save()
      return Response(updated_review.data, status=status.HTTP_202_ACCEPTED)
    except Exception as e:
      print(e)
      return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)
