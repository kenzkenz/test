<?php
require_once "pwd.php";
$layerid = $_GET["layerid"];
$citycode = $_GET["citycode"];
//データ先頭のSQL文作成------------------------------------------------------------------------------------------
$mysql = "SELECT * FROM tblgeo WHERE layerid LIKE ? ORDER BY id LIMIT 1";
//---------------------------------------------------------------------------------------------------------------
$stmt = $pdo->prepare($mysql);
$stmt->execute(array($layerid));
$row_head=$stmt->fetch(PDO::FETCH_ASSOC);
$name_head =$row_head["name"];

$properties = ["name","location","genre1","genre2","genre3","detail1","detail2","detail3","detail4","detail5","tablehtml"];//プロパティを作る列

//データ中身のSQL文作成------------------------------------------------------------------------------------------
//$mysql = "SELECT *,ST_AsGeoJSON(geom) as geomjson FROM tblgeo WHERE geotype <> 'head' AND layerid LIKE ? AND genre1 LIKE ?";
//$mysql = "SELECT *,ST_AsGeoJSON(geom) as geomjson FROM tblgeo WHERE geotype <> 'head' AND layerid LIKE ? AND name LIKE ?";
$mysql = "SELECT *,ST_AsGeoJSON(geom) as geomjson FROM tblgeo WHERE geotype <> 'head' AND layerid LIKE ? AND name IN(".$citycode.")";

//---------------------------------------------------------------------------------------------------------------
$stmt = $pdo->prepare($mysql);
$stmt->execute(array($layerid));
//$stmt->execute();
while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
    $propertiesArr = array('id'=>$row["id"]);
    $propertiesArr = $propertiesArr + array('_fillColor'=>$row["fillcolor"]);
    $propertiesArr = $propertiesArr + array('_strokeColor'=>$row["strokecolor"]);
    $propertiesArr = $propertiesArr + array('_icon'=>$row["icon"]);
    $propertiesArr = $propertiesArr + array('_fillOpacity'=>"0.5");
    $propertiesArr = $propertiesArr + array('_polygonHeight'=>"");
    $propertiesArr = $propertiesArr + array('_picurl'=>$row["picurl"]);
    $propertiesArr = $propertiesArr + array('_popup'=>$row["popup"]);
    //$propertiesArr = $propertiesArr + array($name_head=>$row["name"]);

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
$geojson = array('type' => 'FeatureCollection',"features"=>$json);
//echo json_encode($geojson);
$json = array(
    "geojson"=> $geojson,
    "mysql"=>$mysql,
);
//JSON形式で出力する
header('Content-Type: application/json');
echo json_encode($json);
?>