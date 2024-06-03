from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Category, User, Product, Cart, Transaction, Purchase
from .serializers import CategorySerializer, UserSerializer, ProductSerializer, CartSerializer, TransactionSerializer, PurchaseCreateSerializer, PurchaseSerializer
import bcrypt
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.views import View
from .models import Category, Product

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserLogin(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = User.objects.filter(username=username, password=password).first()
        
        if user:
            return Response({
                'success': True,
                'user': {
                    'id': user.id,
                    'username': user.username
                }
            })
        else:
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)

class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

import os
from django.core.files.storage import default_storage

class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def perform_create(self, serializer):
        product_name = self.request.data.get('name', '')
        product_image = self.request.FILES.get('image')
        
        serializer.save()  # Save the serializer instance first
        
        # Generate file name based on product name and ID
        file_extension = os.path.splitext(product_image.name)[1]  # Get the file extension
        file_name = f"product_images/{product_name.replace(' ', '_')}{serializer.instance.id}{file_extension}"
        
        # Save the image with the generated file name
        file_path = default_storage.save(file_name, product_image)
        
        # Update the serializer instance with the image file path
        serializer.instance.image = file_path
        serializer.instance.save()
  
class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        # Update image file name
        product_name = serializer.validated_data.get('name', '')
        product_id = instance.id
        
        if 'image' in request.data:
            product_image = request.FILES.get('image')
            file_extension = os.path.splitext(product_image.name)[1]  # Get the file extension
            file_name = f"product_images/{product_name.replace(' ', '_')}{product_id}{file_extension}"
            
            # Delete previous image file
            if instance.image:
                default_storage.delete(instance.image.path)
            
            # Save new image with updated file name
            file_path = default_storage.save(file_name, product_image)
            instance.image = file_path
            instance.save()

        return Response(serializer.data)


class ProductListByCategory(APIView):
    def get(self, request, category_id):
        try:
            products = Product.objects.filter(category_id=category_id)
            serializer = ProductSerializer(products, many=True, context={'request': request})
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response({'error': 'Products not found for this category'}, status=status.HTTP_404_NOT_FOUND)
        
class CartList(generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

class CartDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

class TransactionList(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class TransactionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class ValidateToken(APIView):
    def get(self, request, *args, **kwargs):
        token = request.headers.get('Authorization').split(' ')[1]  # Extract token from Authorization header
        try:
            payload = jwt.decode(token, 'django-insecure-v1386r$@zx*rbsn&k!+-(@kk^om2o^32hn&jz$&slxuxgk#yh(', algorithms=['HS256'])  # Decode JWT token
            user_id = payload['user_id']
            user = User.objects.get(id=user_id)
            return Response({'user_type': user.user_type, 'user_id': user_id})
        except jwt.ExpiredSignatureError:
            return Response({'error': 'Token expired'}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.InvalidTokenError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

class PurchaseListCreateView(generics.ListCreateAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseCreateSerializer
class CartListByUser(generics.ListAPIView):
    serializer_class = CartSerializer

    def get_queryset(self):
        user_id = self.kwargs['userId']
        return Cart.objects.filter(user_id=user_id)
    
class PurchaseListByUser(generics.ListAPIView):
    serializer_class = PurchaseSerializer

    def get_queryset(self):
        user_id = self.kwargs['userId']
        return Purchase.objects.filter(user_id=user_id)
class SearchView(View):
    def get(self, request):
        query = request.GET.get('q', '')
        if query:
            categories = Category.objects.filter(name__icontains=query)
            products = Product.objects.filter(name__icontains=query)
            categories_data = [{'id': category.id, 'name': category.name, 'type': 'Category'} for category in categories]
            products_data = [{'id': product.id, 'name': product.name, 'type': 'Product'} for product in products]
            results = categories_data + products_data
        else:
            results = []
        return JsonResponse(results, safe=False)
