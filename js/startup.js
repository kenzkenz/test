var map1 = null;
var map2 = null;
var swipeCtr1 = null;
var swipeCtr2 = null;
$(function(){
    //--------------------------------------------------------------------------
    //起動時に画面リサイズ
    $("#map1").height($(window).height());
    $(window).on('resize',function(){
        $("#map1").height($(window).height());
    });
    //--------------------------------------------------------------------------
    //bootstrapのtooltip スマホタッチでタッチが二回必要になるので見送り
    //$('[data-toggle="tooltip"]').tooltip({html:true,container:"body"});
    //--------------------------------------------------------------------------
    $.notify({//options
        message:"<div style='text-align:center;'><i class='fa fa-exclamation fa-fw'></i>機能は随時追加されていきます。<br>現在RESAS連携機能を作成中です。<br>宮崎県情報政策課<br>最終更新:2017/05/12</div>"
    },{//settings
        type:"danger",
        z_index:999999,
        placement: {
            from:"bottom",
            align:"center"
        },
        animate: {
            enter:"animated fadeInDown",
            exit:"animated fadeOutUp"
        }
    });
    //webストレージから中陣地座標、ズーム率を取得
    var center = JSON.parse(localStorage.getItem("lonlat"));
    var zoom = localStorage.getItem("zoom");
    if(center==undefined){
        center = ol.proj.fromLonLat([131.423860,31.911069]);//中心地を宮崎市に
    }
    if(zoom==undefined){
        zoom = 14;
    }
    var view1 = new ol.View({
        center:center,
        zoom:zoom
    });
    //id map1に起動時に表示されるレイヤーをセット
    map1 = new ol.Map({
        target:"map1",
        layers:[pale1],
        view:view1,
        interactions:ol.interaction.defaults({doubleClickZoom:false}).extend([
            new ol.interaction.DragRotateAndZoom()//shift+ドラッグで回転可能に
        ])
    });
    map2 = new ol.Map({
        target:"map2",
        layers:[pale2],
        view:view1,//最初はview1
        interactions:ol.interaction.defaults({doubleClickZoom:false}).extend([
            new ol.interaction.DragRotateAndZoom()
        ])
    });
    //--------------------------------------------------------------------------
    //デフォルトで設定されているインタラクション（PinchRotate）を使用不可に
    var interactions1 = map1.getInteractions().getArray();
    var pinchRotateInteraction1 = interactions1.filter(function(interaction) {
        return interaction instanceof ol.interaction.PinchRotate;
    })[0];
    pinchRotateInteraction1.setActive(false);
    //map2---
    var interactions2 = map2.getInteractions().getArray();
    var pinchRotateInteraction2 = interactions2.filter(function(interaction) {
        return interaction instanceof ol.interaction.PinchRotate;
    })[0];
    pinchRotateInteraction2.setActive(false);
    //--------------------------------------------------------------------------
    //スワイプコントロール　後の処理はlayer-00.jsのfuncHaikeiLayerSort()に
    swipeCtr1 = new ol.control.Swipe();
    swipeCtr2 = new ol.control.Swipe();
    //--------------------------------------------------------------------------
    //中心の十字を作る.
    var style =	[{
        stroke: new ol.style.Stroke({
            color:"black",
            width:2
        }),
        radius: 15
    }];
    var centerTarget1 =  new ol.control.Target ({style:style});
    var centerTarget2 =  new ol.control.Target ({style:style});
    map1.addControl(centerTarget1);
    map2.addControl(centerTarget2);
    //--------------------------------------------------------------------------
    //マップイベント関係
    //ムーブエンド時にwevストレージに中心座標とズーム率を記憶origin:"<a href='http://tiles.dammaps.jp/ryuiki/' target='_blank'>川と流域地図</a>",
    map1.on("moveend",function(evt){
        localStorage.setItem("lonlat",JSON.stringify(map1.getView().getCenter()));
        localStorage.setItem("zoom",map1.getView().getZoom());
        $("#map1 .zoom-div").text("zoom=" + Math.floor(map1.getView().getZoom()));
    });
    //--------------------------------------------------------------------------
    //ピンチ時の回転を制御
    $("body").on("change",".rotate-toggle",function(){
        var interactions1 = map1.getInteractions().getArray();
        var pinchRotateInteraction1 = interactions1.filter(function(interaction) {
            return interaction instanceof ol.interaction.PinchRotate;
        })[0];
        //map2---
        var interactions2 = map2.getInteractions().getArray();
        var pinchRotateInteraction2 = interactions2.filter(function(interaction) {
            return interaction instanceof ol.interaction.PinchRotate;
        })[0];

        if($(this).prop("checked")){
            pinchRotateInteraction1.setActive(false);
            pinchRotateInteraction2.setActive(false);
        }else{
            pinchRotateInteraction1.setActive(true);
            pinchRotateInteraction2.setActive(true);
        }
    });
    //--------------------------------------------------------------------------
    //現在地取得
    $(".here-btn").click(function(){
        var mapObj = funcMaps($(this));
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                function(position){
                    eval(mapObj["name"]).getView().setCenter(ol.proj.transform([position.coords.longitude,position.coords.latitude],"EPSG:4326","EPSG:3857"));
                },
                function(){
                    alert("座標を取得できませんでした。.")
                },
                {
                    enableHighAccuracy: true,
                    timeout : 5000
                }
            );
        }else{
            alert("お使いのブラウザには座標取得機能がありません。")
        }
    });
    //--------------------------------------------------------------------------
    //クラスbtnにクリック感を付与。汎用性のため非cssで。今は使っていない。タッチがうまくいかないときがあるので
    /*
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
    */
    //--------------------------------------------------------------------------
});
