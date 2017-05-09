<?php
$tgtUrl = $_GET["tgtUrl"];
$area = $_GET["area"];
//パラメータ作成
$params = array(
    "area"=>$area
);
// URLエンコード
$query = http_build_query($params,'','&',PHP_QUERY_RFC3986);
$url = $tgtUrl.$query;
$json0 = json_decode(file_get_contents($url));
$json = array(
    "json"=>$json0,
    "tgtUrl"=>$tgtUrl
);
//JSON形式で出力する
header('Content-Type: application/json');
echo json_encode($json);
?>
