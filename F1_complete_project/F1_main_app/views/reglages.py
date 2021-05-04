from django.shortcuts import render
from F1_main_app.models import Grand_Prix, Driver, Team
from F1_main_app.forms.forms import Grand_Prix_form
from django.http import JsonResponse

def reglages(request):
        return render(request, 'reglages/reglage.html')

def reglages_drivers(request):
        
        if request.POST.get('action') == 'add_driver':
                return add_driver(request)

        drivers = Driver.objects.all()
        
        context = locals() #get var on the top, here drivers
        return render(request, 'reglages/load_ajax/reglage_drivers.html', context)

def add_driver(request):
        response_data = {}


        
        return JsonResponse(response_data)

def reglages_teams(request):
        context = {'teams': Team.objects.all()}
        return render(request, 'reglages/load_ajax/reglage_teams.html', context)

def reglages_grandprixs(request):
        context = {'gps': Grand_Prix.objects.all()}
        return render(request, 'reglages/load_ajax/reglage_grandprixs.html', context)


