from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .serializers.common import UserSerializer

User = get_user_model()

import jwt

# Create your views here.
class RegisterView(APIView):
  def post(self, request):
    print("request data ->", request.data)
    user_to_create = UserSerializer(data=request.data)
    try:
      user_to_create.is_valid(True)
      user_to_create.save()
      return Response(user_to_create.data, status=status.HTTP_202_ACCEPTED)
    except Exception as e:
      print(e)
      return Response("ERROR", status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):
  def post(self, request):
    return Response(request.data)