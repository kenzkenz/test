<?php
require_once "pwd.php";
//SQL文------------------------------------------------------------------------------------------
$mysql = "SELECT * FROM tblresas WHERE prefcode LIKE :prefcode AND citycode LIKE :citycode AND hyou LIKE :hyou";
//---------------------------------------------------------------------------------------------------------------
$stmt = $pdo->prepare($mysql);
$stmt->execute(
    array(
        "prefcode"=>$_GET["prefcode"],
        "citycode"=>$_GET["citycode"],
        "hyou"=>$_GET["hyou"]
    )
);
$row=$stmt->fetch(PDO::FETCH_ASSOC);
$jsontext = $row["json"];
$json = array(
    "jsontext"=> $jsontext
);
//JSON形式で出力する
header('Content-Type: application/json');
echo json_encode($json);
?>