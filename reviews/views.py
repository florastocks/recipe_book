from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied

from .serializers.common import ReviewSerializer
from .models import Review
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Create your views here.

class ReviewListView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )

  def post(self, request):
    request.data['owner'] = request.user.id
    review_to_create = ReviewSerializer(data=request.data)
    print('owner ->', request.user.id)
    try:
      
      review_to_create.is_valid(True) 
      review_to_create.save()
      return Response(review_to_create.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      print(e)
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class ReviewDetailView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )

  def get_review(self, pk):
    try: 
      return Review.objects.get(pk=pk)
    except Review.DoesNotExist:
      raise NotFound("Review was not found!")

  def delete(self, request, pk):
    review_to_delete = self.get_review(pk=pk)
    print("Review Owner -> ", review_to_delete.owner.id)
    print("Request user id -> ", request.user)

    if review_to_delete.owner != request.user:
      raise PermissionDenied("Unauthorised")

    review_to_delete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
  
  def put(self, request, pk):
    request.data['owner'] = request.user.id
    review_to_update = self.get_review(pk=pk)
    updated_review = ReviewSerializer(review_to_update, data=request.data)
    try:
      updated_review.is_valid(True)
      updated_review.save()
      return Response(updated_review.data, status=status.HTTP_202_ACCEPTED)
    except Exception as e:
      print(e)
      return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)
