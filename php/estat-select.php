<?php
$USER= 'root';
$PW= 'P@ssw0rd';
$dnsinfo= "mysql:dbname=mapdb;host=localhost;charset=utf8";
$pdo = new PDO($dnsinfo,$USER,$PW);
//SQL文------------------------------------------------------------------------------------------
//$mysql = $_POST["sql"];
 $mysql = "SELECT * FROM tblestat WHERE statsdataId LIKE :statsdataId AND cdcat01 LIKE :cdcat01";
//---------------------------------------------------------------------------------------------------------------
$stmt = $pdo->prepare($mysql);
$stmt->execute(
	array(
		"statsdataId"=>$_GET["statsdataId"],
		"cdcat01"=>$_GET["cdcat01"]
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
