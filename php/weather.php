<?php
$proxy = array(
    "http" => array(
        "proxy" => "tcp://10.151.91.188:8080",
        'request_fulluri' => true,
    ),
);
$proxy_context = stream_context_create($proxy);
$pass = $_GET['pass'];
$url = "http://www.data.jma.go.jp/obd/stats/data/mdrr/".$pass;
//文字化け対応１
//setlocale(LC_ALL,'ja_JP.UTF-8');
//文字化け対応２
$buf = mb_convert_encoding(file_get_contents($url,false,$proxy_context), "UTF-8","ASCII,JIS,UTF-8,EUC-JP,SJIS-win");
//$buf = file_get_contents($url,false,$proxy_context);
//ファイルポインタ修正
$fp = tmpfile();
fwrite($fp, $buf);
rewind($fp); // ファイルポインタを先頭に戻す
//CSVデータを元にテーブル作成
//print "<table border='1'>";
//「fgetcsv」を使いデータが終わるまでまで繰り返す
$row = 0;
while ($load = fgetcsv($fp)) {
    //print "<tr>";
    //csvファイルの列数だけ実行
    $propertiesArr = array();
    for ($i = 0; $i < count($load); $i++) {
        if($row==0){
            $headArr[] = $load[$i];
        }else{
            //print "<td>".$load[$i]."</td>";
            //$propertiesArr = array('key1'=>'value1');
            $propertiesArr += array($headArr[$i]=>$load[$i]);
        };
    }
    //print "</tr>";
    if($row!=0) $json0[] = $propertiesArr;
    $row++;
}
//print "</table>";
//print implode(",",$headArr);
//print json_encode($json0);
$json = array(
    "kisyoujson"=>$json0,
    //"line" => count($lineCoordinates)
    //"mysql"=>$mysql,
);
//JSON形式で出力する
header('Content-Type: application/json');
echo json_encode($json);
?>
