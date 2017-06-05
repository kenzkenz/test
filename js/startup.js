var map1 = null;
var map2 = null;
var centerTarget1 = null;
var centerTarget2 = null;
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
    var msg = "";
        //msg += "<i class='fa fa-exclamation fa-fw'></i>";
        msg += "<div style='text-align:center;margin-bottom:10px;'><span class='label label-default label-danger'>New</span></div>";
        msg += "1 estatに10万人あたりの列を追加<br>";
        msg += "2 右クリックで人口機能完成 スマホは長押し<br>";
        msg += "3 CSV機能追加。<a href='dl.html' target='_blank'>サンプル</a><br>";
        msg += "4 GPX機能追加。<a href='dl.html' target='_blank'>サンプル</a><br>";
        msg += "5 パノラマ写真表示機能実験中。写真8枚追加。<br>";
        //msg += "3 鹿児島市航空写真を追加しました。<br>";
        msg += "6 綾ユネスコエコパークを追加しました。<br>";
        msg += "7 宮崎県(九州)赤色立体地図を追加しました。<br>";
        msg += "8 画面左下に標高表示機能を追加しました。<br>";
        msg += "9 都城市、延岡市戦後米軍地図を追加しました。<br>";
        msg += "10 resas人口体系連携機能を作成中です。<br>";
        //msg += "10 室蘭市戦後米軍地図を追加しました。<br>";
        //msg += "10 背景追加機能を追加しました。<br>";
        //msg += "10 PNG保存機能を追加しました。<br>";
        //msg += "11 estatにグラフ機能を追加しました。<br>";
        msg += "<div style='text-align:center;'>";
        msg += "宮崎県情報政策課<br>最終更新:2017/06/06</div>";
    $.notify({//options
        message:msg
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
    centerTarget1 =  new ol.control.Target ({style:style});
    centerTarget2 =  new ol.control.Target ({style:style});
    map1.addControl(centerTarget1);
    map2.addControl(centerTarget2);

    //--------------------------------------------------------------------------
    //マップイベント関係
    //ムーブエンド時にwevストレージに中心座標とズーム率を記憶
    map1.on("moveend",function(evt){
        localStorage.setItem("lonlat",JSON.stringify(map1.getView().getCenter()));
        localStorage.setItem("zoom",map1.getView().getZoom());
        $("#map1 .zoom-div .zoom-span").text("zoom=" + Math.floor(map1.getView().getZoom()));
    });
    map2.on("moveend",function(evt){
        $("#map2 .zoom-div .zoom-span").text("zoom=" + Math.floor(map2.getView().getZoom()));
    });
    //ムーブ時に標高取得。
    map1.on("pointermove",function(evt){
        funcElevation(evt,"map1");
    });
    map2.on("pointermove",function(evt){
        funcElevation(evt,"map2");
    });
    function funcElevation(evt,mapName){
        //console.log($(":hover"));
        getElev(evt.coordinate,mapName,function(h){
            if(h=="e"){
                $("#" + mapName + " .zoom-div .elevation-span").text("");
            }else{
                var elevationChar = " 標高:" + h + "m";
                $("#" + mapName + " .zoom-div .elevation-span").text(elevationChar);
            }
        });
    }
    map2.on("pointermove",function(evt){
        //console.log(evt);
    });
    map1.on("click",function(evt){
        console.log(ol.proj.transform(evt.coordinate,"EPSG:3857","EPSG:4326"));
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
