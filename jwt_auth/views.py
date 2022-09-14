from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .serializers.common import UserSerializer
from rest_framework.exceptions import PermissionDenied
User = get_user_model()

from django.conf import settings
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
    print(request.data)
    email = request.data.get('email')
    password = request.data.get('password')
    try: 
      user_to_login = User.objects.get(email=email)
    except User.DoesNotExist:
      raise PermissionDenied("Invalid Credentials")

    if not user_to_login.check_password(password):
      print("Failed Password")
      raise PermissionDenied("Invalid Credentials")

    dt = datetime.now() + timedelta(days=7)

    token= jwt.encode(
      {
        "sub":user_to_login.id,
        "exp": int(dt.strftime('%s'))
      },
      settings.SECRET_KEY,
      'HS256'
    )
    print("TOKEN ->", token)
    return Response({"token": token, "message": f"Welcome back {user_to_login.username}"})