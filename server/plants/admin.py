from django.contrib import admin
from .models import Plant,Tag

class PlantAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'des',Plant.last_Update,"author","slug")


admin.site.register(Plant,PlantAdmin)


class PlantTypeTagsAdmin(admin.ModelAdmin):
    list_display = ('id', 'type','color')

admin.site.register(Tag, PlantTypeTagsAdmin)
