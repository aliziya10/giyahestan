import json
import random
from django.contrib.auth.models import User
import ast

from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from . import models
from .serializers import PlantsSerializer
from .models import Plant, Tag
from django.shortcuts import render, redirect, HttpResponse
from rest_framework import serializers
import re
import unidecode
import requests


class CreatePlant(GenericAPIView):
    # permission_classes = [IsAuthenticated, ]
    permission_classes = [AllowAny, ]

    def post(self, request):
        res = json.loads(request.data["maintenance"])

        # print(request.data["image"])
        # return Response(request.POST)
        # a=request.data["images"]
        # # i:str
        # # print(a)
        # print(str(a).split("data:image"))
        # for i in a:
        #     print(i.split("\'"))

        # tokenToUserId = Token.objects.values().get(key=str(request.headers["Authorization"]).split(" ")[1])["user_id"]
        # findUser= User.objects.get(id=tokenToUserId)
        # if not findUser.is_staff:
        #     return Response({"username":findUser.username,"error":"user is not staff","message":"شما جزو کارکنان سایت نیستید"})

        try:
            Plant.objects.get(title=request.data['title'])
            return Response({"error": "this title exist."},status=status.HTTP_400_BAD_REQUEST)
        except Plant.DoesNotExist:
            s = PlantsSerializer(data=request.data)
            # s.is_valid()
            slug = unidecode.unidecode(request.data['title']).lower()
            slug = re.sub(r'[\W_]+', '-',slug)



            img=[]
            try:
                image = request.data["image1"]
                if "https://" in image or "data:image" in image or "blob:http://" in image:
                    img_data = requests.get(image).content
                    name = 'mediafiles/downloaded' + str(request.user.id) + str(random.randint(0, 9999)) + '.jpg'
                    with open(name, 'wb') as handler:
                        handler.write(img_data)
                        img.append(name[11:])
                elif image==None:
                    img.append("default.png")
                else:
                    img.append(image)
            except:
                img.append("default.png")


            try:
                image = request.data["image2"]
                if "https://" in image or "data:image" in image or "blob:http://" in image:
                    img_data = requests.get(image).content
                    name = 'mediafiles/downloaded' + str(request.user.id) + str(random.randint(0, 9999)) + '.jpg'
                    with open(name, 'wb') as handler:
                        handler.write(img_data)
                        img.append(name[11:])
                elif image==None:
                    img.append("default.png")
                else:
                    img.append(image)
            except:
                img.append("default.png")


            try:
                image = request.data["image3"]
                if "https://" in image or "data:image" in image or "blob:http://" in image:
                    img_data = requests.get(image).content
                    name = 'mediafiles/downloaded' + str(request.user.id) + str(random.randint(0, 9999)) + '.jpg'
                    with open(name, 'wb') as handler:
                        handler.write(img_data)
                        img.append(name[11:])
                elif image=="null":
                    img.append("default.png")
                else:
                    img.append(image)
            except:
                img.append("default.png")



            poster:str
            try:
                image=request.data["poster"]
                if "https://" in image or "data:image" in image or "blob:http://" in image:
                    img_data = requests.get(image).content
                    name='mediafiles/downloaded'+str(request.user.id)+str(random.randint(0,9999))+'.jpg'
                    with open(name, 'wb') as handler:
                        handler.write(img_data)
                        poster=name[11:]
                elif image==None:
                    img.append("default.png")
                else:
                    poster=image
            except:
                poster="default.png"

            while len(img)<3:
                img.append("default.png")

            try:
                for tag in json.loads(request.data["tags"]):
                    tags=Tag.objects.get(pk=tag)

            except:
                return Response({"message": "تگ ها خراب است"}, status=status.HTTP_400_BAD_REQUEST)

            newplant=Plant.objects.create(
            short_name=request.data["short_name"],
            title=request.data["title"],
            des=request.data["des"],
            posetr=poster,
            image1=img[0],
            image2=img[1],
            image3=img[2],
            slug=slug,
            reproduce=request.data["reproduce"],
            maintenance=res,
            # author_id=Token.objects.get(key=request.auth.key).user_id,
            author_id=1,
            )

            for tag in json.loads(request.data["tags"]):
                newplant.tags.add(Tag.objects.get(pk=tag))

            return Response({"message": "گیاه با موفقیت ایجاد شد"})






class plants_list(GenericAPIView):
    queryset = Plant.objects.all()
    def get(self, request):
        date = Plant.objects.values("title","slug").order_by("id")
        return Response(date)




@api_view(["POST","GET"])
@permission_classes([AllowAny])
def seetextofurl(request):
    if request.method=="POST":
        return Response({"message":"درخواست نامعتبر است"},status=status.HTTP_400_BAD_REQUEST)
    try:
        a = models.Plant.objects.get(id=request.data["id"])
        return Response({
            "name": a.title,
            "poster":a.posetr.path,
            "image1":a.image1.path,
            "image2":a.image2.path,
            "image3": a.image3.path,
            "des": a.des,
            "author": a.author.username,
            "last_update": a.last_update.astimezone().timetuple()
        })

    except Plant.DoesNotExist:
        return Response({"message":"این گیاه حذف شده است","status":101},status=status.HTTP_400_BAD_REQUEST)



@api_view(["GET","POST"])
def p(request):
    a=Plant.objects.get(id=15)
    a.tags.set = "miveyi"
    a.save()
    return HttpResponse(a.tags.all())

@api_view(["GET"])
def tagslist(request):
    a=Response(Tag.objects.values())
    a.set_cookie("sfdfdf","fgfg")
    return a


# def maintencanceToList(m):
#     stringlist = (str(m).replace('\"', "")).strip('][').split(', ')
#     tolist = stringlist[0].split(",")
#     return tolist