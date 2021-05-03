from django.shortcuts import render

def reglages(request):
        return render(request, 'reglages/reglage.html')

def reglages_drivers(request):
        return render(request, 'reglages/load_ajax/reglage_drivers.html')

def reglages_teams(request):
        return render(request, 'reglages/load_ajax/reglage_teams.html')

def reglages_grandprixs(request):
        return render(request, 'reglages/load_ajax/reglage_grandprixs.html')
