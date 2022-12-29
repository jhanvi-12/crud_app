from http import HTTPStatus
from django.contrib import messages
from django.db.models import Q
from django.http.response import JsonResponse
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.views.generic import CreateView, ListView, UpdateView, DeleteView

from app.constants import USER_CREATED, DELETED_USER, UPDATED_USER
from app.models import User


class CreateUserView(CreateView):
    """ class for creating user """
    model = User
    template_name = 'app/create_user.html'
    fields = '__all__'

    def post(self, request, *args, **kwargs):
        first_name = self.request.POST.get('first_name')
        last_name = self.request.POST.get('last_name')
        email = self.request.POST.get('email')
        password = self.request.POST.get('password')
        phone = self.request.POST.get('phone_number')
        User.objects.create(first_name=first_name, last_name=last_name,
                            email=email, password=password, phone_number=phone)
        messages.success(self.request, USER_CREATED)
        return redirect(reverse_lazy('app:users_list'))


class ListUserView(ListView):
    """ User's list view """
    user_list = User.objects.all()
    paginate_by = 10
    template_name = 'app/user_list.html'
    context_object_name = 'users'

    def get_queryset(self):
        # if any search is there
        search_filter = self.request.GET.get('search_name')
        if search_filter:
            return User.objects.filter(Q(first_name__icontains=search_filter)
                                       | Q(last_name__icontains=search_filter)
                                       | Q(email__icontains=search_filter)
                                       | Q(phone_number__contains=search_filter))
        return User.objects.all()


class UpdateUserView(UpdateView):
    """ User's update view """
    model = User
    fields = '__all__'
    success_url = 'app/user_list.html'

    def post(self, request, *args, **kwargs):
        user_id = request.POST.get('id')
        firstname = request.POST.get('first_name')
        lastname = request.POST.get('last_name')
        email = request.POST.get('email')
        phone = request.POST.get('phone_number')

        user_obj = User.objects.get(id=user_id)
        user_obj.first_name = firstname
        user_obj.last_name = lastname
        user_obj.email = email
        user_obj.phone_number = phone
        user_obj.save()

        data = {
            'id': user_id,
            'first_name': firstname,
            'last_name': lastname,
            'email': email,
            'phone_number': phone
        }
        messages.success(self.request, UPDATED_USER)
        return JsonResponse(data)


class DeleteUserView(DeleteView):
    """ User's Delete view"""
    model = User

    def post(self, request, *args, **kwargs):
        user_id = self.request.POST.get('id')
        user = User.objects.get(id=user_id)
        user.delete()
        messages.error(self.request, DELETED_USER)
        data = {
            'deleted': True,
        }
        return JsonResponse(data, status=HTTPStatus.NO_CONTENT)