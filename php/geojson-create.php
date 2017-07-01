<?php
require_once "pwd.php";
$dataLayerId = $_POST["dataLayerId"];

$select = $_POST["select"];

//データ先頭のSQL文作成------------------------------------------------------------------------------------------
$mysql = "SELECT * FROM tblgeo WHERE layerid LIKE ? AND geotype LIKE 'head' ORDER BY id LIMIT 1";
//---------------------------------------------------------------------------------------------------------------
$stmt = $pdo->prepare($mysql);
$stmt->execute(array($dataLayerId));
$row_head=$stmt->fetch(PDO::FETCH_ASSOC);
$name_head =$row_head["name"];
//$properties = ["name","location","genre1","genre2","genre3","detail1","detail2","detail3","detail4","detail5","detail6","detail7","detail8","detail9","detail10","tablehtml"];//プロパティを作る列
$properties = ["name","location","genre1","genre2","genre3","detail1","detail2","detail3","detail4","detail5","detail6","detail7","detail8","detail9","detail10"];//プロパティを作る列
$target = [];
$targetchar = "";
foreach ($properties as $i => $p) {
    if($row_head[$p]!=""){
        array_push($target,$p);
        $targetchar = $targetchar.",".$p;
    }
};
//データ中身のSQL文作成------------------------------------------------------------------------------------------
//$mysql = "SELECT *,ST_AsGeoJSON(geom) as geomjson, X(geom) as lon, Y(geom) as lat FROM tblgeo WHERE geotype <> 'head' AND layerid LIKE ?";
//$mysql = "SELECT *,ST_AsGeoJSON(geom) as geomjson FROM tblgeo WHERE geotype <> 'head' AND layerid LIKE ?";
if(!$select) {
    $mysql = "SELECT id,geotype,fillcolor,linedash,popup,hover,ST_AsGeoJSON(geom) as geomjson" . $targetchar . " FROM tblgeo WHERE geotype <> 'head' AND layerid LIKE ?";
}else{
    $mysql = "SELECT id,geotype,fillcolor,linedash,popup,hover,ST_AsGeoJSON(geom) as geomjson" . $targetchar . " FROM tblgeo WHERE geotype <> 'head' AND layerid LIKE ? AND name in(".$select.")";
}
//---------------------------------------------------------------------------------------------------------------
$stmt = $pdo->prepare($mysql);
$stmt->execute(array($dataLayerId));
//$stmt->execute();
$prevAccount = "";
$i=0;
$lineCoordinates = [];
while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
    $geotype= $row["geotype"];
	$propertiesArr = array('id'=>$row["id"]);
	$propertiesArr = $propertiesArr + array('_fillColor'=>$row["fillcolor"]);
    $propertiesArr = $propertiesArr + array('_fillOpacity'=>"0.5");
    //if($geotype=="LineString"){
        $propertiesArr = $propertiesArr + array('_lineDash'=>$row["linedash"]);
    //}

	//$propertiesArr = $propertiesArr + array('_strokeColor'=>$row["strokecolor"]);
    $propertiesArr = $propertiesArr + array('_color'=>"gray");
	//$propertiesArr = $propertiesArr + array('_icon'=>$row["icon"]);
	//$propertiesArr = $propertiesArr + array('_polygonHeight'=>"");
	//$propertiesArr = $propertiesArr + array('_picurl'=>$row["picurl"]);
	$propertiesArr = $propertiesArr + array('_popup'=>$row["popup"]);
	//$propertiesArr = $propertiesArr + array($name_head=>$row["name"]);
    $propertiesArr = $propertiesArr + array('_hover'=>$row["hover"]);
    /*
	foreach ($properties as $i => $p) {
		if($row_head[$p]!="") $propertiesArr = $propertiesArr + array($row_head[$p]=>$row[$p]);
	};
	*/
    foreach ($target as $i => $p) {
        $propertiesArr = $propertiesArr + array($row_head[$p]=>$row[$p]);
    };

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
    "target" => $target,
    "targetchar" => $targetchar
	//"line" => count($lineCoordinates),
	//"mysql"=>$mysql,
);
//JSON形式で出力する
header('Content-Type: application/json');
echo json_encode($json);
exit;
?>
