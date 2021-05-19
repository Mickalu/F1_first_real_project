from django.db import models
from django.contrib.auth.models import User
from PIL import Image

# Create your models here.
class Team(models.Model):
    name = models.CharField(max_length=200)
    nationality = models.CharField(max_length=200)
    color = models.CharField( default="#000000", max_length=200, blank=True, null=True)
    logo = models.ImageField(default='teams/default.jpg', upload_to = 'teams', blank=True, null=True)

    class Meta:
        verbose_name = "team"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        super(Team, self).save(*args, **kwargs)
        img = Image.open(self.logo.path)
        print(self.logo.path)

        if img.height > 200 or img.width >200: #on veut redimensionner l'image pour pas avoir des images trop grandes
            output_size = (200,200)
            img.thumbnail(output_size)
            img.save(self.logo.path)

class Driver(models.Model):
    # User._meta.get_field('username')._unique = False

    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    nationality = models.CharField(max_length=200)
    age = models.PositiveIntegerField()
    date_of_birth = models.DateField(auto_now=False, auto_now_add=False, blank=True, null=True)
    number = models.PositiveIntegerField()
    team = models.ForeignKey('team',default=None, on_delete = models.SET_NULL,blank=True, null=True) # when team is deleted, driver not

    
    class Meta:
        verbose_name = "driver"

    def __str__(self):
        return f'{self.user.last_name}'

class Grand_Prix(models.Model):
    name = models.CharField(max_length=200)
    nationality = models.CharField(max_length=200)
    circuit_lenght = models.FloatField()
    number_of_lap = models.PositiveIntegerField()
    distance = models.PositiveIntegerField()
    lap_record = models.TimeField()

    class Meta:
        verbose_name = "Grand_Prix"

    def __str__(self):
        return self.name

class Achivement(models.Model):
    gp = models.ForeignKey('Grand_Prix', default=None, on_delete=models.SET_NULL, blank=True, null = True)
    standing = models.PositiveIntegerField()
    driver = models.ForeignKey('driver', default=None, on_delete = models.SET_NULL, blank=True, null=True)

    class Meta:
        verbose_name = "achivement"

    def __str__(self):
        if self.driver.user:
            print(self.driver.user.last_name)
            return f'{self.gp.name} {self.gp.id} {self.driver.user.last_name}'
        else:
            return f'{self.gp.name}'