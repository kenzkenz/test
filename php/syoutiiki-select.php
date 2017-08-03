<?php
require_once "pwd.php";
//SQL文------------------------------------------------------------------------------------------
$mysql = "SELECT * FROM tbl27syoutiiki03 WHERE citycode LIKE :citycode AND azacode LIKE :azacode";
//$mysql = "SELECT * FROM tbl27syoutiiki03 WHERE citycode like '45201' and azacode like '121003'";
//---------------------------------------------------------------------------------------------------------------
$stmt = $pdo->prepare($mysql);
$stmt->execute(
	array(
		"citycode"=>$_GET["citycode"],
		"azacode"=>$_GET["azacode"]
	)
);
$row=$stmt->fetch(PDO::FETCH_ASSOC);
//$jsontext = $row["azaname"];
$json = array(
    "cityname"=> $row["cityname"],
    "azaname"=> $row["azaname"],
    "ooazaname"=> $row["ooazaname"],
    "heikin"=> $row["s24"],
    "heikinman"=> $row["m24"],
    "heikinwoman"=> $row["w24"],
    "jinkou"=> $row["s00"],
    "jinkouman"=> $row["m00"],
    "jinkouwoman"=> $row["w00"],
	"m00"=> $row["m00"],
    "m01"=> $row["m01"],
    "m02"=> $row["m02"],
    "m03"=> $row["m03"],
    "m04"=> $row["m04"],
    "m05"=> $row["m05"],
    "m06"=> $row["m06"],
    "m07"=> $row["m07"],
    "m08"=> $row["m08"],
    "m09"=> $row["m09"],
    "m10"=> $row["m10"],
    "m11"=> $row["m11"],
    "m12"=> $row["m12"],
    "m13"=> $row["m13"],
    "m14"=> $row["m14"],
    "m15"=> $row["m15"],
    "m16"=> $row["m16"],
    "m17"=> $row["m17"],
    "m18"=> $row["m18"],
    "m19"=> $row["m19"],
    "m20"=> $row["m20"],
    "m21"=> $row["m21"],
    "m22"=> $row["m22"],
    "m23"=> $row["m23"],
    "m24"=> $row["m24"],
    "m25"=> $row["m25"],
    "m26"=> $row["m26"],
    "m27"=> $row["m27"],
    "m28"=> $row["m28"],
    "m29"=> $row["m29"],
    "m30"=> $row["m30"],

    "w00"=> $row["w00"],
    "w01"=> $row["w01"],
    "w02"=> $row["w02"],
    "w03"=> $row["w03"],
    "w04"=> $row["w04"],
    "w05"=> $row["w05"],
    "w06"=> $row["w06"],
    "w07"=> $row["w07"],
    "w08"=> $row["w08"],
    "w09"=> $row["w09"],
    "w10"=> $row["w10"],
    "w11"=> $row["w11"],
    "w12"=> $row["w12"],
    "w13"=> $row["w13"],
    "w14"=> $row["w14"],
    "w15"=> $row["w15"],
    "w16"=> $row["w16"],
    "w17"=> $row["w17"],
    "w18"=> $row["w18"],
    "w19"=> $row["w19"],
    "w20"=> $row["w20"],
    "w21"=> $row["w21"],
    "w22"=> $row["w22"],
    "w23"=> $row["w23"],
    "w24"=> $row["w24"],
    "w25"=> $row["w25"],
    "w26"=> $row["w26"],
    "w27"=> $row["w27"],
    "w28"=> $row["w28"],
    "w29"=> $row["w29"],
    "w30"=> $row["w30"]
);

//JSON形式で出力する
header('Content-Type: application/json');
echo json_encode($json);
?>
