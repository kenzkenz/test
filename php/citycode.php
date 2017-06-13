<?php
require_once "pwd.php";
//SQL文------------------------------------------------------------------------------------------
$mysql = "SELECT * FROM tblcity WHERE prefcode = :prefcode";
//---------------------------------------------------------------------------------------------------------------
$stmt = $pdo->prepare($mysql);
$stmt->execute(
    array(
        "prefcode"=>$_GET["prefcode"]
    )
);
//$row=$stmt->fetch(PDO::FETCH_ASSOC);
while($row=$stmt->fetch(PDO::FETCH_ASSOC)) {
    $json[] = array(
        "citycode" => $row["citycode"],
        "cityname" => $row["cityname"]
    );
}
//JSON形式で出力する
header('Content-Type: application/json');
echo json_encode($json);
?>