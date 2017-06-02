<?php
	require_once "pwd.php";
	$meshtype = $_POST["meshType"];
	//SQL文------------------------------------------------------------------------------------------
	//$mysql = $_POST["sql"];
	$instr = $_POST["instr"];
	if($meshtype=="zinkouMesh"){
		$tbl = "tbl500mesh";
	}else{
		$tbl = "tbl500mesh2";
	};
	$mysql = "SELECT * FROM ".$tbl." WHERE 500meshcode in(".$instr.")";
	//---------------------------------------------------------------------------------------------------------------
	$stmt = $pdo->prepare($mysql);
	$stmt->execute();
	$meshcodeAr = [];
	$result =null;
	$count=0;
	while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
		if($meshtype=="zinkouMesh"){
			$result[] = array(
				"meshCode" => $row["500meshcode"],
				"zinkou" => $row["zinkou"],
                "otoko" => $row["otoko"],
                "onna" => $row["onna"],
                "setai" => $row["setai"]
			);
		}else{
			$result[] = array(
				"meshCode" => $row["500meshcode"],
				"zyuugyouin" => $row["zyuugyouin"],
                "zigyousyo" => $row["zigyousyo"]
			);
		};
		array_push($meshcodeAr,$row["500meshcode"]);
		$count++;
	};
	$json = array(
		"result"=> $result,
		"meshcodeAr"=> $meshcodeAr,
		"count"=>$count
	);
	//JSON形式で出力する
	header('Content-Type: application/json');
	echo json_encode($json);
	exit;
?>
