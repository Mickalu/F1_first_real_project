# Generated by Django 3.2 on 2021-05-05 13:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Grand_Prix',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('nationality', models.CharField(max_length=200)),
                ('circuit_lenght', models.PositiveIntegerField()),
                ('number_of_lap', models.PositiveIntegerField()),
                ('distance', models.PositiveIntegerField()),
                ('lap_record', models.TimeField()),
            ],
            options={
                'verbose_name': 'Grand_Prix',
            },
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('nationality', models.CharField(max_length=200)),
                ('color', models.CharField(default='#000000', max_length=200)),
                ('logo', models.ImageField(default='default.jpg', upload_to='teams')),
            ],
            options={
                'verbose_name': 'team',
            },
        ),
        migrations.CreateModel(
            name='Driver',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('last_name', models.CharField(max_length=200)),
                ('nationality', models.CharField(max_length=200)),
                ('age', models.PositiveIntegerField()),
                ('date_of_birth', models.DateField(blank=True, null=True)),
                ('number', models.PositiveIntegerField()),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='F1_main_app.team')),
            ],
            options={
                'verbose_name': 'driver',
            },
        ),
    ]
