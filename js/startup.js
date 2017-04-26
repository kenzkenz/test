var map1 = null;
$(function(){
    //------------------------------------------------------------------------------------------
    //起動時に画面リサイズ
    $("#map1").height($(window).height());
    $(window).on('resize',function(){
        $("#map1").height($(window).height());
    });
    //------------------------------------------------------------------------------------------
    //国土地理院淡色地図のレイヤー
    var pale = new ol.layer.Tile({
        title:"国土地理院_単色地図",
        type:"base",
        source:new ol.source.XYZ({
            attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
            url:"http://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
            minZoom:2,
            maxZoom:18
        })
    })
    //id mapにレイヤーをセット
    map1 = new ol.Map({
        target:"map1",
        layers:[pale],
        view:new ol.View({
            center:ol.proj.fromLonLat([131.35190,31.62895]),//中心地を飫肥城にに
            zoom:16//ズーム率
        })
    });
});
