import datetime
import yagmail
from django.contrib.auth import get_user_model
from django.contrib.sites.shortcuts import get_current_site
from django.core import mail
from django.core.mail import BadHeaderError, send_mail
from django.http import HttpResponse, HttpResponseRedirect
from django.core.mail import EmailMessage

import pytz
from django.template.loader import render_to_string

from .tokens import account_activation_token

from django.core.mail.backends import smtp
from django.shortcuts import render, redirect, HttpResponse
from django.utils.encoding import force_bytes, force_str


from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

from rest_framework import status, permissions, exceptions, views #,authentication
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.generics import CreateAPIView, GenericAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.http import JsonResponse
from .serializers import UserSerializer
from .models import Account
from rest_framework import serializers
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.authtoken.models import Token
from django.core.mail import send_mail
from django.conf import settings
import smtplib, ssl
# from rest_framework_expiring_authtoken import views as v2
from plants.models import Tag


def home_accounts(request):
    return JsonResponse({"name": "ali", "age": "21"})


@api_view(["POST","GET"])
def signup_login(request):



    if request.method == 'POST':
        if "password" not in request.data:

                if request.data["email"] in [i["username"] for i in list(User.objects.values("username"))]:
                    return Response({"Membership":bool(True)})
                else:
                    return Response({"Membership":bool(False)})
        else:
            updated_request = request.data.copy()
            updated_request.update(
                {
                    'password2': request.data["password"],
                    'password1': request.data["password"],
                    'username': request.data["email"]
                }
            )


            try:
                u=User.objects.get(username=request.data["email"])
                if u.check_password(request.data["password"]):
                    #set expiry time for authtoken customize
                    # utc_now=datetime.datetime.utcnow()
                    # utc_now=utc_now.replace(tzinfo=pytz.utc)
                    # result=Token.objects.filter(user=u,created__lt=utc_now-datetime.timedelta(seconds=30)).delete()
                    token =Token.objects.get_or_create(user=u)
                    # user=authentication(request,username=request.data["email"],password=request.data["password"])
                    return JsonResponse({"token":str(token[0]),"email":u.email,"user_id":u.id,"is_staff":u.is_staff,"message":"شما وارد شدید"})
                else:
                    return Response({"message":"رمز عبور اشتباه است"},status=status.HTTP_400_BAD_REQUEST)

            except User.DoesNotExist:



                form=UserSerializer(data=updated_request)
                if form.is_valid():


                    global user
                    user=form.save(commit=False)
                    user=user
                    user.is_active = False
                    current_site = get_current_site(request)
                    mail_subject = 'لینک فعال سازی گیاهستان'

                    message = render_to_string('acc_active_email.html', {
                        'user': user.email,
                        'domain': current_site.domain,
                        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                        'token': account_activation_token.make_token(user),
                    })
                    email = EmailMessage(
                        mail_subject, message, to=["azmepm@gmail.com"]
                    )
                    email.send()
                    return Response({"message":"لینک فعال‌سازی به ایمیل شما ارسال شد"})
                else:
                    return Response({"message":"رمز عبور شما خیلی ساده است"},status=status.HTTP_400_BAD_REQUEST)
            #     s.create(request.data)
            # return Response({"message":"شما ثبت نام شدید"},status=status.HTTP_201_CREATED)





@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_views(request):
    request.user.auth_token.delete()
    return redirect(reverse('home'))




class MyView(GenericAPIView):
    permission_classes = [IsAuthenticated,]

    def get(self, request):
        return HttpResponse("user is login")




@api_view(["POST","GET"])
def tel(request):
    sender_email = "lmsy032@gmail.com"
    password = "mohsenmlg"
    res="azmepm@gmail.com"
    # yag = yagmail.SMTP(sender_email, password)
    # yag.send("azmepm@gmail.com","hi", "text is")
    # return HttpResponse("OKe")


    smtp_server = "smtp.gmail.com"
    port = 587  # For starttls
    subject="hi"
    message="thrtreefc fdfdfv dfdf "
    # Create a secure SSL context

    email = EmailMessage(subject, message, to=[res])
    email.send()


    # connection = mail.get_connection()
    # connection.open()
    # email1 = mail.EmailMessage(
    #     subject,
    #     message,
    #     sender_email,
    #     [res],
    #     connection=connection,
    # )
    # email1.send()
    # # connection.send_messages(email1)
    # connection.close()
    #
    # with mail.get_connection() as connection:
    #     mail.EmailMessage(
    #         subject, message, sender_email, [res],
    #         connection=connection,
    #     ).send()




@api_view(["POST","GET"])
def activate(request, uidb64, token):
    User = get_user_model()
    global user
    user
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        # user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        token = Token.objects.get_or_create(user=user)
        b=redirect("account:home2")
        dic={"token":str(token[0]),"email":user.email,"user_id":user.id,"is_staff":user.is_staff}

        b.set_cookie("user",dic)

        return b
    else:
        return HttpResponse('!لینک فعال سازی منقضی شده است')






