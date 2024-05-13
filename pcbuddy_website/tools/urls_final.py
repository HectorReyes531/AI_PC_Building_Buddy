# urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('build/<int:build_id>/', views.build_detail, name='build_detail'),
    path('add_build/', views.add_build, name='add_build'),
    path('category/<int:category_id>/', views.category_detail, name='category_detail'),
    path('component/<int:component_id>/', views.component_detail, name='component_detail'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('register/', views.user_register, name='register'),
]
