from django.db import models
from django.utils.translation import gettext_lazy as _
# # Create your models here.


class User(models.Model):
    first_name = models.CharField(max_length=15)
    last_name = models.CharField(max_length=15)
    email = models.EmailField(_("email address"))
    password = models.CharField(max_length=10)
    phone_number = models.CharField(max_length=10)

    def __str__(self):
        return "{} - {}".format(self.first_name, self.email)