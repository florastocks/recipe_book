
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model

User = get_user_model()

import jwt
from django.conf import settings


class JWTAuthentication(BaseAuthentication):

  def authenticate(self, request):
    print("is hitting middleware")
    header = request.headers.get("Authorization")

    if not header:
      return None 

    if not header.startswith("Bearer"):
      print("Failure at Token Syntax")
      raise PermissionDenied("Invalid Token")
    
    token = header.replace('Bearer ', "")

    try:
      payload = jwt.decode(token, settings.SECRET_KEY, ["HS256"])
      user = User.objects.get(pk=payload.get('sub'))
      
    except jwt.exceptions.InvalidTokenError:
      print("Failed at Token Decode")
      raise PermissionDenied("Invalid Token")

    except User.DoesNotExist:
      print("Failed at User Lookup")
      raise PermissionDenied("User not found")
      
    return (user, token)