# Generated by Django 3.2 on 2021-05-05 13:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('F1_main_app', '0002_auto_20210505_1309'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='color',
            field=models.CharField(default='#000000', max_length=200),
        ),
        migrations.AddField(
            model_name='team',
            name='logo',
            field=models.ImageField(default='default.jpg', upload_to='teams'),
        ),
    ]
