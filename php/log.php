<?php
require_once "pwd.php";
//SQL文------------------------------------------------------------------------------------------
$idandclass = $_GET["idandclass"];
$ua = $_GET["ua"];
$myurl = $_GET["myurl"];
$mysql = "INSERT INTO tbllog(id,idandclass,useragent,myurl) values (null,?,?,?)";
//---------------------------------------------------------------------------------------------------------------
$stmt = $pdo->prepare($mysql);
$stmt->execute(array($idandclass,$ua,$myurl));

?>
