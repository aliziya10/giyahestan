# Generated by Django 4.1rc1 on 2022-08-10 11:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plants', '0011_alter_plant_posetr_alter_plant_tags'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plant',
            name='tags',
            field=models.ManyToManyField(related_name='plantname', to='plants.tag'),
        ),
    ]
