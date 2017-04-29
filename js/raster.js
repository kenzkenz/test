var useLayersArr = null;
$(function(){
    //使用するレイヤーを設定
    useLayersArr = [pale,seamlessphoto,osm];
});
//------------------------------------------------------------------------------
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

//------------------------------------------------------------------------------
//背景ダイアログ用のテーブルを作成する。haikei.jsで使っている。
function haikeiTableCreate(){
    var htmlChar = "<table class='haikei-tbl table table-bordered table-condensed'>";
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
    $(".haikei-tbl tbody").sortable({
        //handle:".chkTd",
        update:function(event,ui){
            $(".haikei-tbl tbody tr").each(function(e){
                var layer = useLayersArr[Number($(this).find("input:checkbox").val())];
                var layers = [];
                layers.push(layer);
                for (i=0; i<layers.length; i++){
                    console.log(layers[i]);
                    layers[i].setZIndex(-e);
                };
            });
        }
    }).disableSelection();
};
//------------------------------------------------------------------------------
$(function(){
    //背景レイヤーの追加、削除
    $("body").on("change","input:checkbox[name='haikei-check']",function(){
        var layer = useLayersArr[Number($(this).val())];
        var trErement = $(this).parents("tr");
        if($(this).prop('checked')){
            map1.addLayer(layer);
            trErement.children().animate({
                "background-color":"#FFC0CB"
            },1000).animate({
                "background-color":"white"
            },1000);
            trErement.prependTo($(this).parents(".haikei-tbl"));
        }else{
            map1.removeLayer(layer);
        };
    });
});