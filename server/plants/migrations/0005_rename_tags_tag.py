# Generated by Django 4.1rc1 on 2022-08-07 07:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('plants', '0004_tags_plant_wplink_plant_shortname_alter_plant_title_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Tags',
            new_name='Tag',
        ),
    ]