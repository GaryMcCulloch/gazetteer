<?php

// Display errors is set to on and should be removed for production
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

// Timing script execution
	$executionStartTime = microtime(true);


	$url='http://api.geonames.org/countryCode?lat=' . $_REQUEST['lat'] . '&lng=' . $_REQUEST['lng'] . '&type=json&username=garymcculloch';
	// $url='http://api.geonames.org/countryCode?lat=55&lng=-4&type=json&username=garymcculloch';

// Curl object is initiated
	$ch = curl_init();
	
//Curl_setopt() takes three parameters(Curl instance to use, setting you want to change, value you want to use for that setting)	
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL, $url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result, true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data']['countryCode'] = $decode['countryCode'];
	$output['data']['countryName'] = $decode['countryName'];
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>
