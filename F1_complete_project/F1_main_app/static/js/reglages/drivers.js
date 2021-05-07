$(document).on('submit', '#form_group',function(e)
{
    var url = '{% url "reglages_drivers" %}';
    e.preventDefault();
    
    var form_data = new FormData($('#form_group').get(0));
    form_data.append('action', 'add_driver');
    $.ajax({
        headers : {"X-CSRFToken" : '{{csrf_token}}' }, 
        url : url, 
        method :'POST',
        contentType : false,
        processData : false,
        data : form_data, 
        
        success : function(json) {
            console.log(json.success);
            $("#form_group")[0].reset();
            $("#my_drivers").load(" #my_drivers");
            toast_page("driver added");
        },
        
        error : function(xhr,errmsg,err) {
            
        }
    });
});

$(document).ready(function()
{
    $('#modify_form_driver').click(function()
    {
        var url = '{% url "reglages_drivers" %}';
        var driver_name = $("#driver_name_form").val(),
            driver_last_name = $("#driver_last_name_form").val(),
            driver_nationality = $("#driver_nationality_form").val(),
            driver_age = $("#driver_age_form").val(),
            driver_date_of_birth = $("#driver_date_of_birth_form").val(),
            driver_number = $("#driver_number_form").val(),
            driver_id = $("#driver_id_form").val(),
            driver_team = $("#driver_team_form").val();

        $.ajax({
            headers : {"X-CSRFToken" : '{{csrf_token}}' }, 
            url : url, 
            method :'POST',
            data: {
                'action':'update_driver',
                'driver_name':driver_name, 
                'driver_last_name':driver_last_name, 
                'driver_nationality':driver_nationality,
                'driver_age':driver_age,
                'driver_date_of_birth':driver_date_of_birth,
                'driver_number':driver_number,
                'driver_team':driver_team,
                'driver_id':driver_id,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            success: function(json){
                $("#form_group")[0].reset();
                $("#my_drivers").load(" #my_drivers");

                $("#modify_form_driver").css('display', 'none');
                $("#submit_form_driver").css('display', 'block');
                toast_page("driver modified");

            }
        });
    });
});

function toast_page(message)
{
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    Toast.fire({
        type: 'success',
        title: message
    })
}


function delete_driver(id_driver, url){
    console.log(id_driver);
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete Driver!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then(function(result) {
        if (result.value) {

            $.ajax({
                url: url,
                method:'POST',
                data:{
                    'id_driver' : id_driver,
                    'action' : 'delete_driver',
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success : function(json) {
                    $("#my_drivers").load(" #my_drivers");
                    Swal.fire(
                        "Deleted!",
                        "Your file has been deleted.",
                        "success"
                    );
                },
            });
        } 
        else if (result.dismiss === "cancel") {
            Swal.fire(
                "Cancelled",
                "Your imaginary file is safe :)",
                "error"
            )
        }
    });
}

function show_data_driver(id_driver, url)
{
    $.ajax(
    {
        url: url,
        method:'POST',
        data:{
            'id_driver' : id_driver,
            'action' : 'show_data_driver',
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success : function(json) 
        {
            $("#driver_name_form").val(json.driver_name);
            $("#driver_last_name_form").val(json.driver_last_name);
            $("#driver_nationality_form").val(json.driver_nationality);
            $("#driver_age_form").val(json.driver_age);
            $("#driver_date_of_birth_form").val(json.driver_date_of_birth);
            $("#driver_number_form").val(json.driver_number);
            $("#driver_id_form").val(json.driver_id);
            $("#driver_team_form").val(json.driver_team);

            $("#modify_form_driver").css('display', 'block');
            $("#submit_form_driver").css('display', 'none');
            console.log(json.driver_id);
        }
    });
}

$('#submit_form_driver').mouseenter(function(event)
{
    $(this).css('background-color', '#F22E52')
    $(this).css('opacity', '0.8')
});
$('#submit_form_driver').mouseleave(function(event)
{
    $(this).css('background-color', '#F11E25')
    $(this).css('opacity', '0.80')
});

$('#modify_form_driver').mouseenter(function(event){
    $(this).css('opacity', '0.70')
});
$('#modify_form_driver').mouseleave(function(event){
    $(this).css('opacity', '0.85')
});

$('#cancel_form_driver').click(function(){
    $("#form_group")[0].reset();
    $("#my_drivers").load(" #my_drivers");

    $("#modify_form_driver").css('display', 'none');
    $("#submit_form_driver").css('display', 'block');
});

