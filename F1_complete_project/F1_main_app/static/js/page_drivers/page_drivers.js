function modal_add_driver(url)
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

            $("#form_group").trigger("reset");
            $("#modal_driver").modal("show");

            $("#modify_form_driver").css('display', 'none');
            $("#submit_form_driver").css('display', 'block');
        }
    });
};

function modal_drivers(url, id_driver)
{
    console.log(url);
    console.log(id_driver);
    $.ajax({
        url : url,
        method : 'POST',
        data : {
            'action' : 'show_driver_data',
            'driver_id' : id_driver,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
        },
        success : function(json)
        {
            $("#driver_name_form").val(json.name);
            $("#driver_last_name_form").val(json.last_name);
            $("#driver_nationality_form").val(json.nationality);
            $("#driver_age_form").val(json.age);
            $("#driver_date_of_birth_form").val(json.date_of_birth);
            $("#driver_number_form").val(json.number);
            $("#driver_id_form").val(json.id_driver);
            $("#driver_team_form").val(json.team);

            $("#modify_form_driver").css('display', 'block');
            $("#submit_form_driver").css('display', 'none');

            $("#modal_driver").modal("show");
        }
    });
}

function add_driver(url){
    $(document).on('submit', '#form_group',function(e)
    {
        var rep = document.getElementById('achivement_repeater_list');
        var number_of_achivement = (rep.childNodes.length) - 2;




        console.log($('#form_group').get(0))


        var url = url;
        e.preventDefault();

        var form_data = new FormData($('#form_group').get(0));
        form_data.append('action', 'add_driver');
        form_data.append('number_of_achivement', number_of_achivement)
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
                $('#modal_driver').modal('hide');
                $('#kt_table').DataTable().ajax.reload(null, false);
                toast_page("driver added");
            },
            error : function(xhr,errmsg,err) {
            }
        });
    });
}

function update_driver(url)
{
    var name = $("#driver_name_form").val();
    var last_name = $("#driver_last_name_form").val();
    var nationality = $("#driver_nationality_form").val();
    var age = $("#driver_age_form").val();
    var dat_of_birth = $("#driver_date_of_birth_form").val();
    var number = $("#driver_number_form").val();
    var driver_id = $("#driver_id_form").val();
    var team = $("#driver_team_form").val();

    console.log($("#driver_number_form").val());


    $.ajax({
        url : url, 
        method :'POST',
        data: {
            'action':'update_driver',
            'name':name, 
            'last_name':last_name, 
            'nationality':nationality,
            'age':age,
            'date_of_birth':dat_of_birth,
            'number':number,
            'team':team,
            'driver_id':driver_id,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success: function(json){
            $('#modal_driver').modal('hide');
            $('#kt_table').DataTable().ajax.reload(null, false);

            $("#modify_form_driver").css('display', 'none');
            $("#submit_form_driver").css('display', 'block');
            toast_page("driver modified");
        }
    });

}

function delete_driver(id_driver, url)
{

    Swal.fire({
        title: "Do you want delete this driver",
        text: "You won't be able to revert this!",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
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
                    $('#kt_table').DataTable().ajax.reload(null, false);
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

function init_table_driver(token, url, url_delete)
{
    var table = load_table_driver(token, url, url_delete);
}

function load_table_driver(token, url, url_delete)
{
    console.log("dans js");
    console.log("url delete : " + url_delete);
    console.log("url : " + url);
    var table = $('#kt_table').DataTable
    (
        {
            "deferRender": true,
            "lengthMenu": [[10, 25, 50, 100, 250, 500, 1000], [10, 25, 50, 100, 250, 500, 1000]],
            "pageLength": 25,
            "ajax":
            {
                "url" : url,
                "type" : "POST",
                "headers": { 'X-CSRFToken': token },
                'data': function (d) 
                {   
                    d.search_objectif = $('#search_objectif').val();
                }
            },
            "order" : false,
            "language":
            {
                "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/French.json"
            },
            "columns":
            [
                {
                    "render": function (data, type, row){
                        var id = row.id;
                        return(
                            `
                            <label class="checkbox  ml-2"  for="` + id + `">
                                <input type="checkbox" value="` + id + `" id="` + id + `" name="driver_selected">
                                <span></span>
                            </label>`
                        );
                    }
                },
                {
                    "render": function(data, type, row)
                    {   
                        var driver_number = row.number;
                        return (`<div style="display:flex;flex-direction:column;"> <span>`+
                            driver_number
                            +`</span></div>`)
                    },
                    "orderable": false,
                },
                {
                    "render": function(data, type, row)
                    {
                        var driver_name = row.name;
                        return (`<div style="display:flex;flex-direction:column;"> <span>`+
                            driver_name
                            +`</span></div>`)
                    },
                    "orderable": false,
                },
                {
                    "render": function(data, type, row)
                    {
                        var driver_last_name = row.last_name;
                        return (`<div style="display:flex;flex-direction:column;"> <span>`+
                            driver_last_name
                            +`</span></div>`)

                    },
                    "orderable": false,
                },
                {
                    "render": function(data, type, row)
                    {
                        var nationality= row.nationality;
                        return (`<div style="display:flex;flex-direction:column;"> <span>`+
                            nationality
                            +`</span></div>`)

                    },
                    "orderable": false,
                },
                {
                    "render": function(data, type, row)
                    {
                        var driver_date_of_birth= row.date_of_birth;
                        return (`<div style="display:flex;flex-direction:column;"> <span>`+
                            driver_date_of_birth
                            +`</span></div>`)

                    },
                    "orderable": false,
                },
                {
                    "render": function(data, type, row)
                    {
                        return (`<div style="display:flex;flex-direction:column;"> <span>`+
                            row.age
                            +`</span></div>`)

                    },
                    "orderable": false,
                },
                {
                    "render": function(data, type, row)
                    {
                        var driver_team= row.team;
                        return (`<div style="display:flex;flex-direction:column;"> <span>`+
                            driver_team
                            +`</span></div>`)

                    },
                    "orderable": false,
                },
                {
                    "render": function(data, type, row)
                    {
                        var driver_id = row.id;
                        icone_delete =(`<button class="btn" onclick="delete_driver('`+ driver_id +`','`+ url_delete +`')" >
                                <span class="svg-icon svg-icon-xl svg-icon-danger">
                                    <!--begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-03-183419/theme/html/demo2/dist/../src/media/svg/icons/Home/Trash.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <rect x="0" y="0" width="24" height="24"/>
                                            <path d="M6,8 L18,8 L17.106535,19.6150447 C17.04642,20.3965405 16.3947578,21 15.6109533,21 L8.38904671,21 C7.60524225,21 6.95358004,20.3965405 6.89346498,19.6150447 L6,8 Z M8,10 L8.45438229,14.0894406 L15.5517885,14.0339036 L16,10 L8,10 Z" fill="#000000" fill-rule="nonzero"/>
                                            <path d="M14,4.5 L14,3.5 C14,3.22385763 13.7761424,3 13.5,3 L10.5,3 C10.2238576,3 10,3.22385763 10,3.5 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"/>
                                        </g>
                                    </svg><!--end::Svg Icon-->
                                </span>
                            </button>`);

                        icone_modify = (`<button class="btn" onclick="modal_drivers('`+ url_delete +`','`+ driver_id +`')" >
                            <span class="svg-icon svg-icon-success svg-icon-2x"><!--begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-06-223557/theme/html/demo2/dist/../src/media/svg/icons/General/Update.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <rect x="0" y="0" width="24" height="24"/>
                                <path d="M8.43296491,7.17429118 L9.40782327,7.85689436 C9.49616631,7.91875282 9.56214077,8.00751728 9.5959027,8.10994332 C9.68235021,8.37220548 9.53982427,8.65489052 9.27756211,8.74133803 L5.89079566,9.85769242 C5.84469033,9.87288977 5.79661753,9.8812917 5.74809064,9.88263369 C5.4720538,9.8902674 5.24209339,9.67268366 5.23445968,9.39664682 L5.13610134,5.83998177 C5.13313425,5.73269078 5.16477113,5.62729274 5.22633424,5.53937151 C5.384723,5.31316892 5.69649589,5.25819495 5.92269848,5.4165837 L6.72910242,5.98123382 C8.16546398,4.72182424 10.0239806,4 12,4 C16.418278,4 20,7.581722 20,12 C20,16.418278 16.418278,20 12,20 C7.581722,20 4,16.418278 4,12 L6,12 C6,15.3137085 8.6862915,18 12,18 C15.3137085,18 18,15.3137085 18,12 C18,8.6862915 15.3137085,6 12,6 C10.6885336,6 9.44767246,6.42282109 8.43296491,7.17429118 Z" fill="#000000" fill-rule="nonzero"/>
                            </g>
                        </svg><!--end::Svg Icon--></span>
                        </button>`);

                        return icone_delete + icone_modify;
                    },
                    "orderable": false,
                }
            ],
        }
    );
    return table;
};

var KTFormRepeater = function() {
    // Private functions
    var demo1 = function() {
        $('#kt_repeater_1').repeater({
            initEmpty: false,

            defaultValues: {
                'text-input': 'foo',
                'name' : 'gp_standing_achivement_',
            },

            show: function () {
                $(this).slideDown();
            },

            hide: function (deleteElement) {
                $(this).slideUp(deleteElement);
            }
        });
    }
    return {
        // public functions
        init: function() {
            demo1();
        }
    };
}();

jQuery(document).ready(function() {
    KTFormRepeater.init();
});


$('#cancel_form_driver').click(function(){
    $("#form_group")[0].reset();
    $("#my_drivers").load(" #my_drivers");

    $('#modal_driver').modal('hide');
    $("#modify_form_driver").css('display', 'none');
    $("#submit_form_driver").css('display', 'block');
});