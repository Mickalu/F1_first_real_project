from django.shortcuts import render
from F1_main_app.models import Grand_Prix, Driver, Team
from F1_main_app.forms.forms import Grand_Prix_form
from django.http import JsonResponse
import datetime


def reglages(request):
        return render(request, 'reglages/reglage.html')

def reglages_drivers(request):
        print(request.POST)
        
        if request.POST.get('action') == 'add_driver':
                return add_driver(request)

        if request.POST.get('action') == 'delete_driver':
                return delete_driver(request)

        if request.POST.get('action') == 'show_data_driver':
                return show_data_driver(request)

        if request.POST.get('action') == 'update_driver':
                return update_driver(request)
        

        drivers = Driver.objects.all()
        teams = Team.objects.all()
        context = locals() #get var on the top, here drivers
        return render(request, 'reglages/load_ajax/reglage_drivers.html', context)

def show_data_driver(request):
        response_data = {}
        id_driver = request.POST.get('id_driver')
        mon_driver = Driver.objects.get(id = int(id_driver))

        response_data['driver_name'] = mon_driver.name
        response_data['driver_last_name'] = mon_driver.last_name
        response_data['driver_nationality'] = mon_driver.nationality
        response_data['driver_age'] = mon_driver.age
        response_data['driver_date_of_birth'] = mon_driver.date_of_birth
        response_data['driver_number'] = mon_driver.number
        response_data['driver_id'] = id_driver

        if mon_driver.team == None:
                response_data['driver_team'] = ''
        else:
                response_data['driver_team'] = mon_driver.team.id

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
        

        name = request.POST.get('driver_name')
        nationality= request.POST.get('driver_nationality')
        last_name = request.POST.get('driver_last_name')
        age = request.POST.get('driver_age')
        date_of_birth = request.POST.get('driver_date_of_birth')
        number = request.POST.get('driver_number')
        team_id = request.POST.get('driver_team')
        driver_id = request.POST.get('driver_id')
        
 
        Driver.objects.filter(pk=driver_id).update(
                name = name,
                nationality = nationality,
                last_name = last_name,
                age = int(age),
                date_of_birth = date_of_birth,
                number = int(number),
                team = int(team_id),
        )

        response_data['success'] = "it's updated"
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

        Driver.objects.create(
                name = name[0],
                nationality = nationality[0],
                last_name = last_name[0],
                age = int(age[0]),
                date_of_birth = date_of_birth[0],
                number = int(number[0]),
                team = Team.objects.get(id = team_id[0]),
        )
        response_data['success'] = 'ça passe'
        return JsonResponse(response_data)




def reglages_teams(request):
        print(request.POST.get('action'))
        if request.POST.get('action') == 'add_team':
                return add_team(request)

        if request.POST.get('action') == 'delete_team':
                return delete_team(request)

        if request.POST.get('action') == 'show_data_team':
                return show_data_team(request)

        if request.POST.get('action') == 'update_team':
                return update_team(request)
        
        teams = Team.objects.all()
        context = locals()
        return render(request, 'reglages/load_ajax/reglage_teams.html', context)

def add_team(request):
        response_data = {}
        print(request.FILES.get('team_logo_form'))
        name = request.POST.get('team_name_form')
        nationality= request.POST.get('team_nationality_form')
        color = request.POST.get('team_color_form')
        logo = request.FILES.get('team_logo_form')

        Team.objects.create(
                name = name,
                nationality = nationality,
                color = color,
                logo = logo,
        )
        response_data['success'] = 'ça passe'
        return JsonResponse(response_data)

def delete_team(request):
        response_data = {}
        team_delete = Team.objects.get(id = request.POST.get('id_team'))
        team_delete.delete()

        response_data["success"] = 'Team deleted'
        return JsonResponse(response_data)

def show_data_team(request):
        response_data = {}
        team_id = request.POST.get("id_team")
        team_show_data = Team.objects.get(id = team_id)

        response_data["team_name"] = team_show_data.name
        response_data["team_nationality"] = team_show_data.nationality
        response_data["team_color"] = team_show_data.color
        response_data["team_id"] = team_id

        return JsonResponse(response_data)

def update_team(request):
        response_data = {}
        print("#################test#############")
        print(request.FILES.get(request.POST.get("team_logo"))) 
        
        print(request.FILES.get("team_logo"))
        print(request.POST.get("team_logo"))


        team_id = request.POST.get("team_id")
        team_name = request.POST.get("team_name")
        team_nationality = request.POST.get("team_nationality")
        team_color = request.POST.get("team_color")
        team_logo = request.FILES.get('team_logo')

        if team_logo == None:
                Team.objects.filter(pk=team_id).update(
                        name = team_name,
                        nationality = team_nationality,
                        color = team_color,
                )
        else:
                Team.objects.filter(pk=team_id).update(
                        name = team_name,
                        nationality = team_nationality,
                        color = team_color,
                        logo = team_logo,
                )

        response_data["success"] = "team updated"
        return JsonResponse(response_data)








def reglages_grandprixs(request):
        print(request.POST.get('action'))
        if request.POST.get('action') == 'add_gp':
                return add_gp(request)

        if request.POST.get('action') == 'show_data_gp':
                return show_data_gp(request)

        if request.POST.get('action') == 'update_gp':
                return update_gp(request)  

        if request.POST.get('action') == 'delete_gp':
                return delete_gp(request) 

        gps = Grand_Prix.objects.all()
        context = locals()
        return render(request, 'reglages/load_ajax/reglage_grandprixs.html', context)

def add_gp(request):
        response_data = {}

        name = request.POST.get('gp_name_form')
        nationality= request.POST.get('gp_nationality_form')
        circuit_lenght= request.POST.get('gp_circuit_lenght_form')
        number_of_lap= request.POST.get('gp_number_of_lap_form')
        distance= request.POST.get('gp_distance_form')
        lap_record= request.POST.get('gp_lap_record_form')

        lap_record = datetime.datetime.strptime(lap_record, "%M:%S")
        Grand_Prix.objects.create(
                name = name,
                nationality=nationality,
                circuit_lenght = circuit_lenght,
                number_of_lap = number_of_lap,
                distance=distance,
                lap_record=lap_record,
        )

        response_data['success'] = 'GP added'
        return JsonResponse(response_data)


def show_data_gp(request):
        response_data = {}

        gp_id = request.POST.get('gp_id')
        my_gp = Grand_Prix.objects.get(id=gp_id)
        
        response_data["name"] =  my_gp.name
        response_data["nationality"] =  my_gp.nationality
        response_data["circuit_lenght"] =  my_gp.circuit_lenght
        response_data["number_of_lap"] =  my_gp.number_of_lap
        response_data["distance"] =  my_gp.distance
        response_data["lap_record"] =  my_gp.lap_record.strftime("%M:%S")
        response_data["gp_id"] =  my_gp.id

        return JsonResponse(response_data)


def update_gp(request):
        response_data = {}

        gp_id = request.POST.get('gp_id')

        name = request.POST.get('gp_name')
        nationality = request.POST.get('gp_nationality')
        circuit_lenght = request.POST.get('gp_circuit_lenght')
        number_of_lap = request.POST.get('gp_number_of_lap')
        distance = request.POST.get('gp_distance')
        lap_record = request.POST.get('gp_lap_record')

        Grand_Prix.objects.filter(pk=gp_id).update(
                name = name,
                nationality = nationality,
                circuit_lenght = circuit_lenght,
                number_of_lap = number_of_lap,
                distance = distance,
                lap_record = lap_record,
        )

        response_data["success"] = "grand Prix updated"
        return JsonResponse(response_data)

def delete_gp(request):
        response_data = {}
        gp_id = request.POST.get('gp_id')
        my_gp = Grand_Prix.objects.get(id = gp_id)
        my_gp.delete()

        response_data["success"] = "grand Prix updated"
        return JsonResponse(response_data)