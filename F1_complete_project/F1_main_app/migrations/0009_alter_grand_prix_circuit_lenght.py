# Generated by Django 3.2 on 2021-05-07 11:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('F1_main_app', '0008_alter_driver_team'),
    ]

    operations = [
        migrations.AlterField(
            model_name='grand_prix',
            name='circuit_lenght',
            field=models.FloatField(),
        ),
    ]