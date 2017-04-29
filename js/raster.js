//国土地理院淡色地図のレイヤー
var pale = new ol.layer.Tile({
    title:"国土地理院_単色地図",
    origin:"国土地理院",
    detail:"国土地理院の単色地図",
    type:"base",
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
    type:"base",
    source:new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"http://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",
        minZoom:2,
        maxZoom:18
    })
})
//使用するレイヤーを設定
var useLayersArr = [pale,seamlessphoto];
//------------------------------------------------------------------------------
//背景ダイアログ用のテーブルを作成する。haikei.jsで使っている。
function haikeiTableCreate(){
    var htmlChar = "<table class='table table-bordered table-condensed'>";
    for(var i = 0; i <useLayersArr.length; i++){
        var prop = useLayersArr[i].getProperties();
        htmlChar += "<tr>";
        htmlChar += "<td><label><input type='checkbox' name='haikei-check' value='" + i + "'>" + prop["title"]+ "</label></td>";
        htmlChar += "<td>作成中</td>";
        htmlChar += "</tr>";
    };
    htmlChar += "</table>";
    //console.log(htmlChar);
    $(".dialog-content").html(htmlChar)
};
//------------------------------------------------------------------------------
//背景ダイアログ用のテーブルを作成する。haikei.jsで使っている。
$(function(){
    $("body").on("change","input:checkbox[name='haikei-check']",function(){
        console.log($(this).val());
    });
});
