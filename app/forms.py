from django.forms import ModelForm
from django import forms

from app.models import User


class CreateUserForm(ModelForm):
    class Meta:
        model = User
        fields = '__all__'

        widgets = {
            'first_name': forms.CharField(
                attrs={
                    'class': 'form-control',
                    'placeholder': 'Enter your First Name',
                    'aria-invalid': 'true'
                }
            ),
            'last_name': forms.CharField(
                attrs={
                    'class': 'form-control',
                    'placeholder': 'Enter your Last Name',
                    'aria-invalid': 'true'
                }
            ),
            'email': forms.EmailInput(
                attrs={
                    'class': 'form-control',
                    'placeholder': 'Enter your Email address',
                    'aria-invalid': 'true'
                }
            ),
            'password': forms.CharField(
                attrs={
                    'class': 'form-control',
                    'placeholder': 'Enter your Password',
                    'aria-invalid': 'true'
                }
            ),
            'phone_number': forms.CharField(
                attrs={
                    'class': 'form-control',
                    'placeholder': 'Enter your Phone number',
                    'aria-invalid': 'true'
                }
            ),

        }

    def clean(self):
        errors = dict()
        for field in self.fields:
            obj = self.cleaned_data.get(field)
            if not obj:
                errors[field] = "This Field is Required!!"
            return obj
        if errors:
            raise forms.ValidationError(errors)
