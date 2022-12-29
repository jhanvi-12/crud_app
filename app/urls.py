from django.urls import path
from . import views

app_name = 'app'

urlpatterns = [
    path('create/', views.CreateUserView.as_view(), name='create_user'),
    path('list/', views.ListUserView.as_view(), name='users_list'),
    path('update/<int:pk>', views.UpdateUserView.as_view(), name='update_user'),
    path('delete/<int:pk>', views.DeleteUserView.as_view(), name='delete_user'),
]