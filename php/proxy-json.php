<?php
$proxy = array(
	"http" => array(
		"proxy" => "tcp://10.151.91.188:8080",
		'request_fulluri' => true,
	),
);
$proxy_context = stream_context_create($proxy);
$url = $_GET['url'];
header('Content-Type: application/json');
if($json = @file_get_contents($url,false,$proxy_context)){
	echo json_encode(json_decode($json));
}else{
	header("HTTP/1.1 404 Not Found");
};
//$json = @file_get_contents($url,false,$proxy_context);
//echo json_encode(json_decode($json));
?>
