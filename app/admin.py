from django.contrib import admin

from app.models import User

# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'email', 'phone_number']


admin.site.register(User)