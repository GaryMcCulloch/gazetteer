<?php

mediastack_key = c1c0749c0847112bb96c5db10e48ea72


// Display errors is set to on and should be removed for production
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

// Timing script execution
	$executionStartTime = microtime(true);


	$url='https://newsapi.org/v2/top-headlines?country=de&apiKey=b4c550e90d60450699d9893fba50d041';

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
	$output['results'] = $decode['results'];
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>