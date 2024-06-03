from django.urls import path
from .views import (
    UserList, UserDetail, UserCreate,SearchView, UserRetrieveUpdateDestroy,UserLogin,PurchaseListByUser, CategoryList,CartListByUser, CategoryDetail, ProductList, ProductDetail,CartList, CartDetail,TransactionList, TransactionDetail,ValidateToken, ProductListByCategory, PurchaseListCreateView
    )
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('users/', UserList.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetail.as_view(), name='user-detail'),
    path('users/create/', UserCreate.as_view(), name='user-create'),
    path('users/<int:pk>/update_delete/', UserRetrieveUpdateDestroy.as_view(), name='user-retrieve-update-destroy'),
    path('user/login/', UserLogin.as_view(), name='user-login'),
    path('categories/', CategoryList.as_view(), name='category-list'),
    path('categories/<int:pk>/', CategoryDetail.as_view(), name='category-detail'),
    path('products/', ProductList.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetail.as_view(), name='product-detail'),
    path('products/category/<int:category_id>/', ProductListByCategory.as_view(), name='product-list-by-category'),
    path('carts/', CartList.as_view(), name='cart-list'),
    path('carts/<int:pk>/', CartDetail.as_view(), name='cart-detail'),
    path('carts/user/<int:userId>/', CartListByUser.as_view(), name='cart-list-by-user'),
    path('transactions/', TransactionList.as_view(), name='transaction-list'),
    path('transactions/<int:pk>/', TransactionDetail.as_view(), name='transaction-detail'),
    path('validate-token/', ValidateToken.as_view(), name='validate-token'),
    path('purchases/', PurchaseListCreateView.as_view(), name='purchase-list-create'),
    path('purchases/user/<int:userId>/', PurchaseListByUser.as_view(), name='purchase-list-by-user'),
    path('search/', SearchView.as_view(), name='search'),

]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
