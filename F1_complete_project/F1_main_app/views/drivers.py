from django.shortcuts import render
from F1_main_app.models import Grand_Prix, Driver, Team
from F1_main_app.forms.forms import Grand_Prix_form
from django.contrib.auth.models import User
from django.http import JsonResponse
import datetime

def page_drivers(request):
        teams = Team.objects.all()
        drivers = Driver.objects.all()
        
        if request.POST.get('action') == 'modal_driver':
                        return modal_driver(request)

        if request.POST.get('action') == 'add_driver':
                        return add_driver(request)

        if request.POST.get('action') == 'delete_driver':
                        return delete_driver(request)


        context = locals() 
        return render(request, 'pages/drivers.html', context)


def modal_driver(request):
        response_data = {}
        response_data['success'] = 'modal'
        return JsonResponse(response_data)

def add_driver(request):
        response_data = {}

        name = request.POST.get('driver_name_form'),
        nationality= request.POST.get('driver_nationality_form'),
        last_name = request.POST.get('driver_last_name_form'),
        age = request.POST.get('driver_age_form'),
        date_of_birth = request.POST.get('driver_date_of_birth_form'),
        number = request.POST.get('driver_number_form'),
        team_id = request.POST.get('driver_team_form'),

        user_created = User.objects.create(
            first_name= name[0],
            last_name = last_name[0],
            email='',
            password='',
            username= str(name) +" "+ str(last_name)
        )

        Driver.objects.create(
                user = user_created,
                nationality = nationality[0],
                age = int(age[0]),
                date_of_birth = date_of_birth[0],
                number = int(number[0]),
                team = Team.objects.get(id = team_id[0]),
        )
        response_data['success'] = 'ça passe'
        return JsonResponse(response_data)

def delete_driver(request):
        response_data = {}
        id_driver = request.POST.get('id_driver')
        my_driver = Driver.objects.get(id = int(id_driver))
    
        my_driver.delete()

        response_data['success'] = "it's removed"
        return JsonResponse(response_data) 


def ajax_drivers(request):
        liste = []
        print("ok view")

        liste_driver = Driver.objects.all()

        draw = request.POST.get('draw')
        start = request.POST.get('start')
        length = request.POST.get('length')
        

        total = liste_driver.count()

        
        for driver in liste_driver:
            birthday_date = driver.date_of_birth.strftime("%d/%m/%Y")

            liste.append({
                'id':driver.id,
                'name':driver.user.first_name,
                'last_name' : driver.user.last_name,
                'date_of_birth' : birthday_date,
                'number' : driver.number,
                'nationality' : driver.nationality,
                'team' : driver.team.name,
                'age' : driver.age
            })
        res = {
            'draw' : draw,
            'recordsTotal': total,
            'recordsFiltered': total,
            'data' : liste,
        }
        print(res)

        return JsonResponse(res)
