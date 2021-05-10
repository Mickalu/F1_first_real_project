function add_team(url){
    $(document).on('submit', '#form_group_team',function(e)
    {
        var url = url;
        e.preventDefault();
        
        var form_data = new FormData($('#form_group_team').get(0));
        form_data.append('action', 'add_team');
        $.ajax({
            headers : {"X-CSRFToken" : '{{csrf_token}}'}, 
            url : url, 
            method :'POST',
            contentType : false,
            processData : false,
            data : form_data, 
            
            success : function(json) {
                console.log(json.success);
                $("#form_group_team")[0].reset();
                $("#my_teams").load(" #my_teams");
                
                toast_page("team addded");

            },
            
            error : function(xhr,errmsg,err) {
                
            }
        });
    });
}

function delete_team(id_team, url, token)
{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete Driver!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then(function(result){
        if (result.value){
            $.ajax({
                url:url,
                method:'POST',
                headers : {"X-CSRFToken" : token},
                data:{
                    'id_team': id_team,
                    'action': 'delete_team',
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),

                },
                success : function(json) {
                    console.log(json.success);
                    $("#my_teams").load(" #my_teams");
                    $("#form_group_team")[0].reset();
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
};

function show_data_team(id_team, url, token)
{
    $.ajax({
        url:url,
        method:'POST',
        // 
        data:{
            'action':'show_data_team',
            'id_team':id_team,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
        },
        success: function(json){
            $("#team_name_form").val(json.team_name);
            $("#team_nationality_form").val(json.team_nationality);
            $("#team_id_form").val(json.team_id);
            $("#team_color_form").val(json.team_color);
            
            $("#modify_form_team").css('display', 'block');
            $("#submit_form_team").css('display', 'none');
        }
    });
};

function update_team(url, token)
{
    $("#modify_form_team").click(function(){
        var url = url;
        var team_name = $("#team_name_form").val();
        var team_nationality = $("#team_nationality_form").val();
        var team_color = $("#team_color_form").val();
        var team_id = $("#team_id_form").val();
        var team_logo = $("#team_logo_form").val();
        
        console.log(team_logo);
        
        $.ajax({
            headers : {"X-CSRFToken" : token}, 
            url:url,
            method:'POST',
            data:{
                'action' : 'update_team',
                'team_name' : team_name,
                'team_nationality' : team_nationality,
                'team_color': team_color,
                'team_id': team_id,
                'team_logo': team_logo,
            },
            success : function(json){
                $("#form_group_team")[0].reset();
                $("#my_teams").load(" #my_teams");
                
                $("#modify_form_team").css('display', 'none');
                $("#submit_form_team").css('display', 'block');
                
                toast_page("team modified");
            }
        });
    });
};




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


$('#submit_form_team').mouseenter(function(event)
{
    $(this).css('background-color', '#F22E52');
    $(this).css('opacity', '0.8');
});
$('#submit_form_team').mouseleave(function(event)
{
    $(this).css('background-color', '#F11E25');
    $(this).css('opacity', '0.80');
});

$('#modify_form_team').mouseenter(function(event){
    $(this).css('opacity', '0.70');
});
$('#modify_form_team').mouseleave(function(event){
    $(this).css('opacity', '0.85');
});

$('#cancel_form_team').click(function(){
    $("#form_group_team")[0].reset();
    $("#my_teams").load(" #my_teams");
    
    $("#modify_form_team").css('display', 'none');
    $("#submit_form_team").css('display', 'block');
});