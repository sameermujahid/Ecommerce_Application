from rest_framework import serializers
from .models import Category, User, Product, Cart, Transaction, Purchase

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'quantity_in_stock', 'category', 'image', 'sizes']
        extra_kwargs = {
            'image': {'required': False}  # Allow image field to be optional during update
        }

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['id', 'product', 'quantity', 'date_added', 'user', 'size']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

class PurchaseSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    product = ProductSerializer()

    class Meta:
        model = Purchase
        fields = ['id', 'user', 'product', 'quantity', 'address', 'payment_method', 'purchased_at']

class PurchaseCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = ['user', 'product', 'quantity', 'address', 'payment_method']
