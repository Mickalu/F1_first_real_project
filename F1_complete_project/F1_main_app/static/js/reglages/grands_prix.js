function add_gp(url, token){

    $(document).on('submit', '#form_group_gp',function(e)
    {
        var url = url;
        e.preventDefault();
        
        var from_data = new FormData($('#form_group_gp').get(0));
        from_data.append('action', 'add_gp');
        
        $.ajax({
            headers : {"X-CSRFToken" : token}, 
            url : url, 
            method :'POST',
            contentType : false,
            processData : false,
            data : from_data, 
            
            success:function(json){
                console.log(json.success);
                $("#form_group_gp")[0].reset();
                $("#my_gps").load(" #my_gps");
                
                toast_page("Grand prix added");
            },
            error : function(xhr,errmsg,err) {
                
            }
        });
    });
}

function show_data_gp(id_gp, url)
{
    $.ajax({
        url:url,
        method:'POST',
        data:{
            'gp_id' : id_gp,
            'action' : 'show_data_gp',
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success: function(json)
        {
            $("#gp_name_form").val(json.name);
            $("#gp_nationality_form").val(json.nationality);
            $("#gp_circuit_lenght_form").val(json.circuit_lenght);
            $("#gp_number_of_lap_form").val(json.number_of_lap);
            $("#gp_distance_form").val(json.distance);
            $("#gp_lap_record_form").val(json.lap_record);
            
            $("#gp_id_form").val(json.gp_id);
            
            $("#modify_form_gp").css('display', 'block');
            $("#submit_form_gp").css('display', 'none');
        }
    });
};

function update_gp(url, token)
{
    var url = url;
    var name = $("#gp_name_form").val();
    var nationality = $("#gp_nationality_form").val();
    var circuit_lenght = $("#gp_circuit_lenght_form").val();
    var number_of_lap= $("#gp_number_of_lap_form").val();
    var distance = $("#gp_distance_form").val();
    var lap_record = $("#gp_lap_record_form").val();
    var gp_id = $("#gp_id_form").val();
    
    $.ajax({
        headers : {"X-CSRFToken" : token }, 
        url:url,
        method:'POST',
        data:{
            'action' : 'update_gp',
            'gp_name' : name,
            'gp_nationality' : nationality,
            'gp_circuit_lenght' : circuit_lenght,
            'gp_number_of_lap' : number_of_lap,
            'gp_distance' : distance,
            'gp_lap_record' : lap_record,
            'gp_id' : gp_id,
        },
        success: function(json)
        {
            $("#form_group_gp")[0].reset();
            $("#my_gps").load(" #my_gps");
            
            $("#modify_form_gp").css('display', 'none');
            $("#submit_form_gp").css('display', 'block');
            
            toast_page("Grand prix updated");
        }
    });
    
};


function delete_gp(id_gp, url, token)
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
                    'gp_id': id_gp,
                    'action': 'delete_gp',
                },
                success : function(json) {
                    console.log(json.success);
                    $("#my_gps").load(" #my_gps");
                    $("#form_group_gp")[0].reset();
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

$('#submit_form_gp').mouseenter(function(event)
{
    $(this).css('background-color', '#F22E52');
    $(this).css('opacity', '0.8');
});
$('#submit_form_gp').mouseleave(function(event)
{
    $(this).css('background-color', '#F11E25');
    $(this).css('opacity', '0.80');
});

$('#modify_form_gp').mouseenter(function(event){
    $(this).css('opacity', '0.70');
});
$('#modify_form_gp').mouseleave(function(event){
    $(this).css('opacity', '0.85');
});

$('#cancel_form_gp').click(function(){
    $("#form_group_gp")[0].reset();
    $("#my_gps").load(" #my_gps");
    
    $("#modify_form_gp").css('display', 'none');
    $("#submit_form_gp").css('display', 'block');
});