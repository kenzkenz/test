<?php
$proxy = array(
    "http" => array(
        "proxy" => "tcp://10.151.91.188:8080",
        'request_fulluri' => true,
    ),
);
$proxy_context = stream_context_create($proxy);
$url = $_GET['url'];
header('Content-type:image/png');
echo file_get_contents($url,false,$proxy_context);
?>
