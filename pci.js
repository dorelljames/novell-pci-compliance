// Gets all the links for the pages we will fetch the HTML content
function getLinks( url ) {

    // prepare needed things
    var request = $.ajax({
        url: "fetch.php",
        data: { url : url },
        dataType: "html",
    });

    // show something's happening
    $("#instructions").slideUp("", function(){
        $("#status").html("Please wait a moment... <img src='img/ajax-loader.gif' />").slideDown();
    });

    // if the request is successful, get the links we need
    request.done(function( obj ) {

        // $("#status").html(""); // done

        // for html table and export
        $("#tableexport tbody").html("");

        // output accordion to user
        $("#content").append('<div class="panel-group" id="accordion">');

        $(obj).find("li").each(function(index, element) {

            l_text = $(this).find("a").text();
            l_href = $(this).find("a").attr("href");
            l_text_clean = l_text.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-');

            // -- accordion prepare start --
            accordion = '<div class="panel panel-default">'; // container start

            // heading
            accordion += '<div class="panel-heading"><h5 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#' + l_text_clean + '_id">' + l_text + '</a></h5></div>';

            // body
            accordion += '<div id="' +  l_text_clean + '_id" class="panel-collapse collapse">';
                accordion += '<div class="panel-body">';

                    // content elements
                    accordion += '<div class="row"><div class="col-sm-2 t_label">URL:</div><div class="col-sm-10"><a href="http://download.novell.com' + l_href + '" target="_blank">http://download.novell.com' + l_href + '</a></div></div>';
                    accordion += '<div class="row"><div class="col-sm-2 t_label">DATE:</div><div class="col-sm-10" id="' + l_text_clean + '_date"></div></div>';
                    accordion += '<div class="row"><div class="col-sm-2 t_label">TITLE:</div><div class="col-sm-10" id="' + l_text_clean + '_title"></div></div>';
                    accordion += '<div class="row"><div class="col-sm-2 t_label">INDICATIONS:</div><div class="col-sm-10" id="' + l_text_clean + '_indications"></div></div>';
                    accordion += '<div class="row"><div class="col-sm-2 t_label">CONTRAINDICATIONS:</div><div class="col-sm-10" id="' + l_text_clean + '_contraindications"></div></div>';
                    accordion += '<div class="row"><div class="col-sm-2 t_label">FIX DESCRIPTION:</div><div class="col-sm-10" id="' + l_text_clean + '_description"></div></div>';

                accordion += '</div>';
            accordion += '</div>';

            accordion += '</div>'; // container close
            // -- accordion prepare end --

            // table row
            table_row = '<tr id="' + l_text_clean + '_id">'; // table row start
                table_row += '<td id="tr_' + l_text_clean + '_date"></td>';
                table_row += '<td id="tr_' + l_text_clean + '_title"></td>';
                table_row += '<td id="tr_' + l_text_clean + '_indications"></td>';
                table_row += '<td id="tr_' + l_text_clean + '_contraindications"></td>';
                table_row += '<td id="tr_' + l_text_clean + '_description"></td>';
            table_row += '</tr>'; // table row close

            $("#content").append(accordion); // append accordion

            $("#tableexport tbody").append(table_row); // append table row


            // new request for every item
            // prepare needed things
            $.ajax({
                url: "fetch.php",
                data: { url: "http://download.novell.com" + l_href, id_to: l_text_clean  },
                dataType: "html"
            }).done(function( this_obj, textStatus, this_XMLHttpRequest ) {

                id_append_to = $(this_obj).find('#name_to_id').text(); // id of elements

                // date
                date_text_tmp = $(this_obj).find("span:contains('Creation Date')").parent().text();
                date_text_sp1 = date_text_tmp.split(":");
                date_text = date_text_sp1[1].trim().split(" ")[0];

                title_text = $(this_obj).find("#contenthead h1").text();
                indications_text = $(this_obj).find("h4:contains('Indications')").next().text();
                contraindications_text = $(this_obj).find("h4:contains('Contraindications')").next().text();
                description_text = $(this_obj).find("h4:contains('Description')").nextUntil("h4:contains('Solution')");

                description_text2 = $(this_obj).find("h4:contains('Description')").nextUntil("h4:contains('Solution')"); // temporary fix for not showing description


                // console.log(id_append_to);
                // console.log(title_text);
                // console.log(indications_text);
                // console.log(contraindications_text);
                // console.log(description_text);

                $( "#" + id_append_to + "_date" ).append(date_text);
                $( "#" + id_append_to + "_title" ).append(title_text);
                $( "#" + id_append_to + "_indications" ).append(indications_text);
                $( "#" + id_append_to + "_contraindications" ).append(contraindications_text);
                $( "#" + id_append_to + "_description" ).append(description_text);

                $( "#tr_" + id_append_to + "_date" ).append(date_text);
                $( "#tr_" + id_append_to + "_title" ).append(title_text);
                $( "#tr_" + id_append_to + "_indications" ).append(indications_text);
                $( "#tr_" + id_append_to + "_contraindications" ).append(contraindications_text);
                $( "#tr_" + id_append_to + "_description" ).append(description_text2);


            });


        });

        $("#content").append('</div>');


    }); // request.done end


    // if it fails, inform
    request.fail(function( jqXHR, textStatus ) {
        $("#status").html( "Failed: " + textStatus + "<br />Please try again...");
    }); // request.fail end

}


$("document").ready(function() {

    $("#pci_search").submit(function( event ) {

        var url = $("#pci_search .input-url").val();
        links = getLinks( url );

        event.preventDefault(); // prevents form from being submitted

    });

    $("#exporttoexcel").click(function () {
        $("#tableexport").btechco_excelexport({
            containerid: "tableexport", datatype: $datatype.Table
        });
    });



});


$(document).ajaxStop(function() {

    console.log("all requests are done!");

    $("#status").html("<div class='alert alert-success'>Yay! All requests are done. You can now generate an Excel document.</div>"); // done

    // display export button
    $("#exporttoexcel").show();

});
