from django.db import models
from django.contrib.auth.models import User


class Tag(models.Model):
    type = models.CharField(blank=False,unique=True,max_length=25)
    color=models.CharField(blank=False,max_length=20,unique=False,default="#ffffff")

    def __str__(self):
        return self.type



class Plant(models.Model):
    short_name= models.CharField(max_length=40, unique=False, editable=True,null=False)
    title = models.CharField(max_length=70, unique=True, editable=True, null=False)
    des = models.TextField(editable=True)
    WPlink=models.CharField(blank=True,max_length=200,editable=True)
    posetr = models.ImageField(default='default.png', blank=True,null=False,editable=True)
    image1 = models.ImageField(default='default.png', blank=True,null=True,editable=True)
    image2 = models.ImageField(default='default.png', blank=True,null=True,editable=True)
    image3 = models.ImageField(default='default.png', blank=True,null=True,editable=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, editable=False)
    last_update = models.DateTimeField(auto_now_add=True, editable=False)
    slug = models.SlugField(unique=True, editable=False, null=False)
    tags=models.ManyToManyField(Tag,related_name="plantname",editable=True)
    maintenance=models.TextField(editable=True,default="[None,None,None,None]")
    reproduce=models.IntegerField(default=0,editable=True)




    def last_Update(self):
        return str(self.last_update.astimezone().date()) + " " + str(
            self.last_update.astimezone().time().replace(microsecond=0))


    def __str__(self):
        return self.title


    def cuter(self):
        s: str = self.des[:50] + " ..."
        return s


