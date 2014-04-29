<?php

	$site = $_GET['url'];
    $id_to = ( isset ( $_GET['id_to'] ) ? $_GET['id_to'] : '' );
	
	if( ! empty( $site ) ) {
	
		$html = file_get_contents( $site );

        if ( $html != false ) {
            
            $html = str_replace('<div id="mainbody">', '<div id="mainbody"><div id="name_to_id">' . $id_to . '</div>', $html);

            echo $html;

        }
	
	}

?>