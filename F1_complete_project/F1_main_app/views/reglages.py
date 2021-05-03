from django.shortcuts import render

def reglages(request):
        return render(request, 'reglages/reglage.html')
