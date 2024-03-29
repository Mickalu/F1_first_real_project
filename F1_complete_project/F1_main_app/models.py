from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Team(models.Model):
    name = models.CharField(max_length=200)
    nationality = models.CharField(max_length=200)
    color = models.CharField( default="#000000", max_length=200, blank=True, null=True)
    logo = models.ImageField(default='default.jpg', upload_to = 'teams', blank=True, null=True)

    class Meta:
        verbose_name = "team"

    def __str__(self):
        return self.name

class Driver(models.Model):
    name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    nationality = models.CharField(max_length=200)
    age = models.PositiveIntegerField()
    date_of_birth = models.DateField(auto_now=False, auto_now_add=False, blank=True, null=True)
    number = models.PositiveIntegerField()
    team = models.ForeignKey('team', on_delete = models.PROTECT) # when team is deleted, driver not

    class Meta:
        verbose_name = "driver"

    def __str__(self):
        return self.last_name

class Grand_Prix(models.Model):
    name = models.CharField(max_length=200)
    nationality = models.CharField(max_length=200)
    circuit_lenght = models.PositiveIntegerField()
    number_of_lap = models.PositiveIntegerField()
    distance = models.PositiveIntegerField()
    lap_record = models.TimeField()

    class Meta:
        verbose_name = "Grand_Prix"

    def __str__(self):
        return self.name