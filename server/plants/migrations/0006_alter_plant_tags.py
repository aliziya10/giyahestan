# Generated by Django 4.1rc1 on 2022-08-07 08:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plants', '0005_rename_tags_tag'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plant',
            name='tags',
            field=models.ManyToManyField(related_name='plantname', to='plants.tag'),
        ),
    ]
