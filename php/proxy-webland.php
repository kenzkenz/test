<?php
$proxy = array(
	"http" => array(
		"proxy" => "tcp://10.151.91.188:8080",
		'request_fulluri' => true,
	),
);
$proxy_context = stream_context_create($proxy);
$tgtUrl = $_GET["tgtUrl"];
$area = $_GET["area"];
//パラメータ作成
$params = array(
    "area"=>$area
);
// URLエンコード
$query = http_build_query($params,'','&',PHP_QUERY_RFC3986);
$url = $tgtUrl.$query;
$json0 = json_decode(file_get_contents($url,false,$proxy_context));
$json = array(
    "json"=>$json0,
    "tgtUrl"=>$tgtUrl
);
//JSON形式で出力する
header('Content-Type: application/json');
echo json_encode($json);
?>
