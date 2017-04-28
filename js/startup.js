var map1 = null;
$(function(){
    //--------------------------------------------------------------------------
    //起動時に画面リサイズ
    $("#map1").height($(window).height());
    $(window).on('resize',function(){
        $("#map1").height($(window).height());
    });
    //--------------------------------------------------------------------------
    //id map1に起動時に表示されるレイヤーをセット
    map1 = new ol.Map({
        target:"map1",
        layers:[pale],//raster.jsを参照。paleは地理院単色地図
        view:new ol.View({
            center:ol.proj.fromLonLat([131.35190,31.62895]),//中心地を飫肥城に
            zoom:16//ズーム率
        })
    });
});
