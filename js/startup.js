var map1 = null;
$(function(){
    //--------------------------------------------------------------------------
    //起動時に画面リサイズ
    $("#map1").height($(window).height());
    $(window).on('resize',function(){
        $("#map1").height($(window).height());
    });
    //--------------------------------------------------------------------------
    //webストレージから中陣地座標、ズーム率を取得
    var center = JSON.parse(localStorage.getItem("lonlat"));
    var zoom = localStorage.getItem("zoom");
    if(center==undefined){
        center = ol.proj.fromLonLat([131.423860,31.911069]);//中心地を宮崎市に
    };
    if(zoom==undefined){
        zoom = 14;
    };
    //id map1に起動時に表示されるレイヤーをセット
    map1 = new ol.Map({
        target:"map1",
        layers:[pale],//raster.jsを参照。paleは地理院単色地図
        view:new ol.View({
            center:center,
            zoom:zoom
        })
    });
    //--------------------------------------------------------------------------
    //マップイベント関係
    //ムーブエンド時にwevストレージに中心座標とズーム率を記憶
    map1.on("moveend",function(evt){
        localStorage.setItem("lonlat",JSON.stringify(map1.getView().getCenter()));
        localStorage.setItem("zoom",map1.getView().getZoom());
    });
    //--------------------------------------------------------------------------
    //クラスbtnにクリック感を付与。汎用性のため非cssで。
    $("body").on("mousedown",".btn",function(){
        var marginTop = Number($(this).css("margin-top").replace("px",""));
        var marginBottom = Number($(this).css("margin-bottom").replace("px",""));
        $(this).css({
            "margin-top":(marginTop+5)+"px",
            "margin-bottom":(marginBottom-5)+"px"
        });
    }).mouseup(function(){
        $(".btn").css({
            "margin-top":"",
            "margin-bottom":""
        });
    });
    //--------------------------------------------------------------------------
});
