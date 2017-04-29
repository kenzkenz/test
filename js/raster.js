//国土地理院淡色地図のレイヤー
var pale = new ol.layer.Tile({
    title:"国土地理院_単色地図",
    origin:"国土地理院",
    detail:"国土地理院の単色地図",
    source:new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"http://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
        minZoom:2,
        maxZoom:18
    })
})
//空中写真のレイヤー
var seamlessphoto = new ol.layer.Tile({
    title:"国土地理院_空中写真",
    origin:"国土地理院",
    detail:"国土地理院の空中写真",
    source:new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"http://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",
        minZoom:2,
        maxZoom:18
    })
})
//オープンストリートマップ
var osm = new ol.layer.Tile({
    title:"OpenStreetMap",
    origin:"OpenStreetMap Japan",
    detail:"OpenStreetMapは、道路地図などの地理情報データを誰でも利用できるよう、フリーの地理情報データを作成することを目的としたプロジェクトです。",
	source: new ol.source.OSM
});
var ort = new ol.layer.Tile({
    title:"宮崎県航空写真",
    origin:"宮崎県県土整備部砂防課",
    detail:"砂防課が平成２５年度に撮影した航空写真をオルソ補正したもの",
	source: new ol.source.OSM
});
//使用するレイヤーを設定
var useLayersArr = [pale,seamlessphoto,osm];
//------------------------------------------------------------------------------
//背景ダイアログ用のテーブルを作成する。haikei.jsで使っている。
function haikeiTableCreate(){
    var htmlChar = "<table class='table table-bordered table-condensed'>";
    for(var i = 0; i <useLayersArr.length; i++){
        if(i==0){
            var chkChar = "checked";
        }else{
            var chkChar = "";
        };
        var prop = useLayersArr[i].getProperties();
        htmlChar += "<tr>";
        htmlChar += "<td><label><input type='checkbox' name='haikei-check' value='" + i + "'" + chkChar + ">" + prop["title"]+ "</label></td>";
        htmlChar += "<td>作成中</td>";
        htmlChar += "</tr>";
    };
    htmlChar += "</table>";
    $(".dialog-content").html(htmlChar);
};
//------------------------------------------------------------------------------
//背景ダイアログ用のテーブルを作成する。haikei.jsで使っている。
$(function(){
    $("body").on("change","input:checkbox[name='haikei-check']",function(){
        var layer = useLayersArr[Number($(this).val())];
        if($(this).prop('checked')){
            map1.addLayer(layer);
        }else{
            map1.removeLayer(layer);
        };
    });
});
