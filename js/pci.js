// Gets all the links for the pages we will fetch the HTML content
function getLinks( url ) {

    // prepare needed things
	var request = $.ajax({
		url: "fetch.php",
		data: { url : url },
		dataType: "html"
	});

    // show something's happening
	$("#status").html("Processing"); 
	
    // if the request is successful, get the links we need
	request.done(function( obj ) {

        $("#status").html(""); // done

        var pci_links = new Array(); // 

        $(obj).find("li").each(function(index) { 
            
            l_text = $(this).find("a").text();
            l_href = $(this).find("a").attr("href");
            
            // output to user
            pci_h_links = '<a href="http://download.novell.com/' + l_href + '" target="_blank">' + l_text + '</a>';
            $("#content").append( pci_h_links );

            // for data to be returned
            pci_links[index] = l_href;

        });

	});


	// if it fails, inform
	request.fail(function( jqXHR, textStatus ) {
	  	$("#status").html( "Failed: " + textStatus + "<br />Please try again...");
	});

    return pci_links;

}

// Fetchees HMTL content of given URL using fetch.php via AJAX
function fetchContent( link_obj ) {

    console.log( link_obj );


}

// check if URL passed is valid; returns true is valid
function validateUrl( url ) {

	var result = false;

	if(/^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url)) {
		result = true;
	} 

	return result;

}


$("document").ready(function() {

	$("#pci_search").submit(function( event ) {

		var url = $("#pci_search .input-url").val();
		links = getLinks( url );
	
        fetchContent( links ); // do the magic

		event.preventDefault(); // prevents form from being submitted

	});

});