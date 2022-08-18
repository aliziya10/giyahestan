from django.db import models
from django.contrib.auth.password_validation import validate_password



class Account(models.Model):
   email=models.EmailField(verbose_name='email',max_length=60,unique=True,blank=False)
   password=models.CharField(max_length=25,validators=[validate_password])
   date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
   last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
   is_staff = models.BooleanField(default=False)


def _str_(self):
    return self.email

