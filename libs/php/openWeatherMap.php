<?php

// Display errors is set to on and should be removed for production
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

// Timing script execution
	$executionStartTime = microtime(true);


	// $url='https://api.openweathermap.org/data/2.5/onecall?lat=' . $_REQUEST[lat] . '&lon=' . $_REQUEST[lng] . '&appid=01a69c43fa692a1e67ae4c9bdabb8fdc';
	$url='https://api.openweathermap.org/data/2.5/onecall?lat=63.515138&lon=26.892956&units=metric&appid=01a69c43fa692a1e67ae4c9bdabb8fdc';

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
	$output['current'] = $decode['current'];
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>
