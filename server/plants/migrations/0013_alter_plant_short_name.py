# Generated by Django 4.1rc1 on 2022-08-10 11:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plants', '0012_alter_plant_tags'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plant',
            name='short_name',
            field=models.CharField(max_length=40),
        ),
    ]
