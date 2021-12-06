<?php

// Display errors is set to on and should be removed for production
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

// Timing script execution
	$executionStartTime = microtime(true);


	$url='https://www.triposo.com/api/20211011/location.json?countrycode=' . $_REQUEST['countryCode'] . '&tag_labels=city&count=10&fields=id,name,score,snippet,coordinates&order_by=-score&account=' . $_REQUEST['account'] . '&token=' . $_REQUEST['token'];
	// $url='https://www.triposo.com/api/20211011/location.json?countrycode=uk&tag_labels=city&count=10&fields=id,name,score,snippet,coordinates&order_by=-score&account=C8JYDHAY&token=qms8ofeum9yxr4iebaasuvpw20d0gwe3';
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
	$output['results'] = $decode['results'];
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>
