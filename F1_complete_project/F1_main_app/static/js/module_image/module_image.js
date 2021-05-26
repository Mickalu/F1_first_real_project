var __PDF_DOC,
        __CURRENT_PAGE,
        __TOTAL_PAGES,
        __PAGE_RENDERING_IN_PROGRESS = 0,
        __CANVAS = $('#pdf-canvas').get(0),
        __CANVAS_CTX = __CANVAS.getContext('2d');
    
function showPDF(pdf_url) {
    $("#pdf-loader").show();

    
    PDFJS.getDocument({ url: pdf_url }).then(function(pdf_doc) {
        __PDF_DOC = pdf_doc;
        __TOTAL_PAGES = __PDF_DOC.numPages;
        
        // Hide the pdf loader and show pdf container in HTML
        $("#pdf-loader").hide();
        $("#pdf-contents").show();
        $("#pdf-total-pages").text(__TOTAL_PAGES);

        // Show the first page
        showPage(1);
    }).catch(function(error) {
        // If error re-show the upload button
        $("#pdf-loader").hide();
        $("#upload-button").show();
        
        alert(error.message);
    });;
}
    
function showPage(page_no) {
    __PAGE_RENDERING_IN_PROGRESS = 1;
    __CURRENT_PAGE = page_no;


    document.addEventListener('webviewerloaded', function() {
        PDFViewerApplicationOptions.set('printResolution', 900);
    });



    // While page is being rendered hide the canvas and show a loading message
    $("#pdf-canvas").hide();
    $("#page-loader").show();
    $("#download-image").hide();

    // Update current page in HTML
    $("#pdf-current-page").text(page_no);

    // Fetch the page
    __PDF_DOC.getPage(page_no).then(function(page) {
        console.log(page.getViewport(1));


        // As the canvas is of a fixed width we need to set the scale of the viewport accordingly
        console.log(page);
        var scale_required = __CANVAS.width / page.getViewport(1).width; 

        // Get viewport of the page at required scale
        var viewport = page.getViewport(scale_required);
        
        // Set canvas height
        __CANVAS.height = viewport.height;

        $("#canvas_container").height = viewport.height;
        $("#canvas_container").width = viewport.width;

        var renderContext = {
            canvasContext: __CANVAS_CTX,
            viewport: viewport
        };

        // Render the page contents in the canvas
        page.render(renderContext).then(function() {
            __PAGE_RENDERING_IN_PROGRESS = 0;

            // Re-enable Prev & Next buttons
            $("#pdf-next, #pdf-prev").removeAttr('disabled');

            $("#page-loader").hide();
            $("#row_cropper").css('display', 'block');
            $("#row_cropper").css('display', 'flex');
            
            show_cropper();
        });
    });
}
    
// Upon click this should should trigger click on the #file-to-upload file input element
// This is better than showing the not-good-looking file input element
$("#upload-button").on('click', function() {
    $("#file-to-upload").trigger('click');
});
    
// When user chooses a PDF file
$("#file-to-upload").on('change', function() {
    // Validate whether PDF
    if(['application/pdf'].indexOf($("#file-to-upload").get(0).files[0].type) == -1) {
        alert('Error : Not a PDF');
        return;
    }

    $("#upload-button").hide();
    // Send the object url of the pdf
    showPDF(URL.createObjectURL($("#file-to-upload").get(0).files[0]));
});
    
// Previous page of the PDF
$("#pdf-prev").on('click', function() {
    if(__CURRENT_PAGE != 1)
        showPage(--__CURRENT_PAGE);
});
    
// Next page of the PDF
$("#pdf-next").on('click', function() {
    if(__CURRENT_PAGE != __TOTAL_PAGES)
        showPage(++__CURRENT_PAGE);
});


// Download button
function show_cropper(pdf_max_width, pdf_max_height)
{
    var image_from_pdf = $(this).attr('href', __CANVAS.toDataURL("", 1));

    console.log(image_from_pdf)
    
    $("#cropper").prepend(`<img id="image_cropper" class="col-9" style="width: 100%; height: 100%;" src="`+ image_from_pdf.attr('href') +`" alt=""/>`);
    cropper_image()
};

function cropper_image(pdf_max_width, pdf_max_height)
{
    const image = document.getElementById('image_cropper');
    // console.log();
    
    const cropper = new Cropper(image, {
        aspectRatio: 16 / 9,
        crop(event) {
            $("#dataX").val((event.detail.x * 595) / __CANVAS.width);
            $("#dataY").val(((event.detail.y + event.detail.height) * 842) / __CANVAS.height);
        },
        viewMode : 1,
        autoCropArea: 1      
    });
};