from django.shortcuts import render
from F1_main_app.models import Grand_Prix, Driver, Team, Achivement
from django.contrib.auth.models import User
from django.http import JsonResponse
import datetime

def page_drivers(request):
        teams = Team.objects.all()
        drivers = Driver.objects.all()
        gps = Grand_Prix.objects.all()
        achivements = Achivement.objects.all()
        
        if request.POST.get('action') == 'modal_driver':
                        return modal_driver(request)

        if request.POST.get('action') == 'add_driver':
                        return add_driver(request)

        if request.POST.get('action') == 'delete_driver':
                        return delete_driver(request)

        if request.POST.get('action') == 'update_driver':
                        return update_driver(request)
        
        if request.POST.get('action') == 'show_driver_data':
                        return show_driver_data(request)

        context = locals() 
        return render(request, 'pages/drivers.html', context)


def modal_driver(request):
        response_data = {}
        response_data['success'] = 'modal'
        return JsonResponse(response_data)

def add_driver(request):
        response_data = {}

        # print(request.POST.get('number_of_achivement'))
        

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
            username= str(name) +" "+ str(last_name) + " " + str(number) 
        )

        driver = Driver.objects.create(
                user = user_created,
                nationality = nationality[0],
                age = int(age[0]),
                date_of_birth = date_of_birth[0],
                number = int(number[0]),
                team = Team.objects.get(id = team_id[0]),
        )
        


        for i in range(int(request.POST.get('number_of_achivement'))):
                # print(request.POST.get('['+ str(i)+'][gp_name_achievement]'))
                # print(driver.id)
                # print('['+str(i)+'][gp_standing_achivement]')

                Achivement.objects.create(
                        gp = Grand_Prix.objects.get(id = request.POST.get('['+ str(i)+'][gp_name_achievement]')),
                        standing = request.POST.get('['+str(i)+'][gp_standing_achivement]'),
                        driver = driver
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

def update_driver(request):
        response_data = {}

        name = request.POST.get('name')
        nationality= request.POST.get('nationality')
        last_name = request.POST.get('last_name')
        age = request.POST.get('age')
        date_of_birth = request.POST.get('date_of_birth')
        number = request.POST.get('number')
        team_id = request.POST.get('team')
        driver_id = request.POST.get('driver_id')

        print(" Update : ",name, " ", last_name, " ", nationality, " ", age, " ", date_of_birth, " ", number, " ", team_id, " ", driver_id)

        Driver.objects.filter(pk=driver_id).update(
        nationality = nationality,
        age = int(age),
        date_of_birth = date_of_birth,
        number = int(number),
        team = int(team_id),
        )
        User.objects.filter(id = Driver.objects.get(id = driver_id).user.id).update(
                first_name = name,
                last_name = last_name,
        )

        response_data['success'] = "it's updated"
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

def show_driver_data(request):
        response_data = {}
        driver = Driver.objects.get(id = request.POST.get('driver_id'))

        response_data["name"] = driver.user.first_name
        response_data["last_name"] = driver.user.last_name
        response_data["nationality"] = driver.nationality
        response_data["age"] = driver.age
        response_data["date_of_birth"] = driver.date_of_birth
        response_data["number"] = driver.number
        response_data["team"] = driver.team.id
        response_data["id_driver"] = driver.id

        return JsonResponse(response_data)