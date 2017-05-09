<?php
$proxy = array(
	"http" => array(
		"proxy" => "tcp://10.151.91.188:8080",
		'request_fulluri' => true,
	),
);
$proxy_context = stream_context_create($proxy);
$tgtUrl = $_GET["tgtUrl"];
//パラメータ作成
$params = array(
    "appId"=>"63bd852098e1a13aeea70ed78cba31f9f3918d2f",
    //"statsDataId"=>"C0020050245000",
    "statsDataId"=>"C0020050245201",
    "cntGetFlg"=>"Y"
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
