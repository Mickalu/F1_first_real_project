function modal_driver(url)
{
    console.log(url);
    $.ajax({
        url:url,
        method : 'POST',
        data : {
            'action' : 'modal_driver',
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
        },
        success : function(json)
        {
            $("#modal_driver").modal("show");
        }
    });
};

function add_driver(url){
    $(document).on('submit', '#form_group',function(e)
    {
        var url = url;
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
                $("#table_driver").load(" #table_driver");
                $('#modal_driver').modal('hide');
                $('#tbodyid').load(" #tbodyid");
                $("#kt_table").load(" #kt_table");
                toast_page("driver added");
            },
            error : function(xhr,errmsg,err) {
            }
        });
    });
}

function delete_driver(id_driver, url){
    console.log("id_driver_delete_function : " + id_driver);
    console.log("url_delete_function : " + url);

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
                    $("#kt_table").load(" #kt_table");
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




$('#cancel_form_driver').click(function(){
    $("#form_group")[0].reset();
    $("#my_drivers").load(" #my_drivers");

    $('#modal_driver').modal('hide');
    $("#modify_form_driver").css('display', 'none');
    $("#submit_form_driver").css('display', 'block');
});