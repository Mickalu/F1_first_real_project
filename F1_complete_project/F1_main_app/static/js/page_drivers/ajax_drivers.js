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
                        console.log("driver id button : " + driver_id + " type data : " + typeof driver_id);
                        console.log("driver url button : " + url_delete + " type data : " + typeof url_delete);
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

                        return icone_delete;
                    },
                    "orderable": false,
                }
            ],
        }
    );
    return table;
};
