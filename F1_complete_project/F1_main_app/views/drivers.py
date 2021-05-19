from django.shortcuts import render
from F1_main_app.models import Grand_Prix, Driver, Team, Achivement
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.core import serializers
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

        driver_created = Driver.objects.create(
                user = user_created,
                nationality = nationality[0],
                age = int(age[0]),
                date_of_birth = date_of_birth[0],
                number = int(number[0]),
                team = Team.objects.get(id = team_id[0]),
        )
        
        print(driver_created)

        for i in range(int(request.POST.get('number_of_achivement'))):
                if request.POST.get('['+ str(i)+'][gp_name_achievement]') != None:
                        print("id_gp : ",request.POST.get('['+ str(i)+'][gp_name_achievement]'))

                        Achivement.objects.create(
                                gp = Grand_Prix.objects.get(id = request.POST.get('['+ str(i)+'][gp_name_achievement]')),
                                standing = request.POST.get('['+str(i)+'][gp_standing_achivement]'),
                                driver = driver_created
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
        list_archivement_int = []

        name = request.POST.get('name')
        nationality= request.POST.get('nationality')
        last_name = request.POST.get('last_name')
        age = request.POST.get('age')
        date_of_birth = request.POST.get('date_of_birth')
        number = request.POST.get('number')
        team_id = request.POST.get('team')
        driver_id = request.POST.get('driver_id')
        list_archivement = request.POST.getlist('list_archivement[]')

        print("Ce que l'on reçoit des formes : ",list_archivement)
        for i in list_archivement:
                list_archivement_int.append(list(map(int, i.split(','))))
                print("donnée des forms que l'on va modifier : ",list_archivement_int)

        driver_updated = Driver.objects.filter(pk=driver_id).update(
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

        for elem in list_archivement_int:
                print("id_achivement : ",elem[1])
                # Achivement.objects.update_or_create(
                #         gp = Grand_Prix.objects.get(pk = elem[1]),
                #         standing = elem[2],
                #         defaults={'pk' : elem[0]}
                # )

                result_achivement = Achivement.objects.filter(pk=elem[0]).update(
                gp = Grand_Prix.objects.get(pk = elem[1]),
                standing = elem[2],
                )

                if not result_achivement:
                        Achivement.objects.create(
                        driver = driver_updated,
                        gp = Grand_Prix.objects.get(pk = elem[1]),
                        standing = elem[2],
                        )


        response_data['success'] = "it's updated"
        return JsonResponse(response_data)

def ajax_drivers(request):
        liste = []

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

        return JsonResponse(res)

def show_driver_data(request):
        response_data = {}
        achivement_driver_dict = {}
        gps_dict = {}
        compt = 0

        gps = Grand_Prix.objects.all()
        driver = Driver.objects.get(id = request.POST.get('driver_id'))
        achivement_driver = Achivement.objects.filter(driver = driver).values()

        response_data["name"] = driver.user.first_name
        response_data["last_name"] = driver.user.last_name
        response_data["nationality"] = driver.nationality
        response_data["age"] = driver.age
        response_data["date_of_birth"] = driver.date_of_birth
        response_data["number"] = driver.number
        response_data["team"] = driver.team.id
        response_data["id_driver"] = driver.id

        for elem in achivement_driver:
                achivement_driver_dict[str(compt)] = elem
                compt += 1

        gps_dict = []
        for gp in gps:
                gps_dict.append((gp.id, gp.name))

        response_data["achivement_driver"] = achivement_driver_dict
        response_data["gps"] = gps_dict
        print(achivement_driver_dict)

        return JsonResponse(response_data)