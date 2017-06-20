<?php
require_once "pwd.php";
$dataLayerId = $_GET["dataLayerId"];
//データ先頭のSQL文作成------------------------------------------------------------------------------------------
$mysql = "SELECT * FROM tblgeo WHERE layerid LIKE ? ORDER BY id LIMIT 1";
//---------------------------------------------------------------------------------------------------------------
$stmt = $pdo->prepare($mysql);
$stmt->execute(array($dataLayerId));
$row_head=$stmt->fetch(PDO::FETCH_ASSOC);
$name_head =$row_head["name"];
$properties = ["name","location","genre1","genre2","genre3","detail1","detail2","detail3","detail4","detail5","tablehtml"];//プロパティを作る列
//データ中身のSQL文作成------------------------------------------------------------------------------------------
$mysql = "SELECT *,ST_AsGeoJSON(geom) as geomjson, X(geom) as lon, Y(geom) as lat FROM tblgeo WHERE geotype <> 'head' AND layerid LIKE ? ORDER BY genre1,detail2";
//---------------------------------------------------------------------------------------------------------------
$stmt = $pdo->prepare($mysql);
$stmt->execute(array($dataLayerId));
//$stmt->execute();
$prevAccount = "";
$i=0;
$lineCoordinates = [];
while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
	$propertiesArr = array('id'=>$row["id"]);
	$propertiesArr = $propertiesArr + array('_fillColor'=>$row["fillcolor"]);
    $propertiesArr = $propertiesArr + array('_fillOpacity'=>"0.5");
	//$propertiesArr = $propertiesArr + array('_strokeColor'=>$row["strokecolor"]);
    $propertiesArr = $propertiesArr + array('_color'=>"gray");
	$propertiesArr = $propertiesArr + array('_icon'=>$row["icon"]);
	$propertiesArr = $propertiesArr + array('_polygonHeight'=>"");
	//$propertiesArr = $propertiesArr + array('_picurl'=>$row["picurl"]);
	$propertiesArr = $propertiesArr + array('_popup'=>$row["popup"]);
	//$propertiesArr = $propertiesArr + array($name_head=>$row["name"]);
    $propertiesArr = $propertiesArr + array('_hover'=>$row["hover"]);

	foreach ($properties as $i => $p) {
		if($row_head[$p]!="") $propertiesArr = $propertiesArr + array($row_head[$p]=>$row[$p]);
	};
	$geotype= $row["geotype"];
	$json[] = array(
		"type" => "Feature",
		"geometry" => json_decode($row["geomjson"]),
		"properties" => $propertiesArr
	);
};
$geojson = array("type"=>"FeatureCollection","features"=>$json);
//echo json_encode($geojson);
$json = array(
	"geojson"=> $geojson,
	"line" => count($lineCoordinates)
	//"mysql"=>$mysql,
);
//JSON形式で出力する
header('Content-Type: application/json');
echo json_encode($json);
exit;
?>
