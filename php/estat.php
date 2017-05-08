<?php
$url = "http://api.e-stat.go.jp/rest/2.1/app/json/getMetaInfo?";
// パラメータ
$params = array(
    "appId"=>"63bd852098e1a13aeea70ed78cba31f9f3918d2f",
    //"statsDataId"=>"C0020050245000",
    "statsDataId"=>"C0020050245201",
    "cntGetFlg"=>"Y"
);
// URLエンコード
$query = http_build_query($params, '', '&', PHP_QUERY_RFC3986);
// 統計表情報を取得（Json形式）
$url = $url.$query;
$json = json_decode(file_get_contents($url));
// Json形式を配列に変換
//$arr = json_decode($json,true);
// 取得したデータの表示
//var_dump($arr);

//$jsontext = $row["json"];
//$json = array(
//    "jsontext"=> $jsontext
//);
//JSON形式で出力する
header('Content-Type: application/json');
echo json_encode($json);
exit;


?>