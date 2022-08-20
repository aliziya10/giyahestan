from django.contrib import admin
from django.urls import path,include

from . import views
from rest_framework import routers
# from plants.views import CreatePlant
from plants import views as v

# app_name="giyah"

# router=routers.DefaultRouter()
# router.register(r'',CreatePlant,'plants2')

app_name="giyahestan"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/',views.home,name="home"),
    # path('creator/',views.getcreator, name='home'),
    path('plants/plants_list',v.plants_list.as_view()),
    path('plants/p', v.p),
    path('account/',include('account.urls')),
    path('plants/createplant/', v.CreatePlant.as_view(), name='create'),
    path("plants/plant/", v.seetextofurl, name="ss"),
    path("tag/",v.tagslist,name="tags")
]

