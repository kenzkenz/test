var map1 = null;
var map2 = null;
var centerTarget1 = null;
var centerTarget2 = null;
var swipeCtr1 = null;
var swipeCtr2 = null;
$(function(){
    //--------------------------------------------------------------------------
    //起動時に画面リサイズ、部品リサイズ
    $("#map1").height($(window).height());
    //$("#map1 .cesium-btn-div").show();
    $(window).on('resize',function(){
        $("#map1").height($(window).height());
        funcResize();
    });
    funcResize();
    function funcResize() {
        if ($("body").width() < 475) {
            $(".osm-dropdown-div").hide();
        }else if($("body").width() < 400) {
            $(".data-btn").text("d");
            $(".dropdown-div").hide();
            $(".osm-dropdown-div").hide();
            $(".btn").css({
                "padding":"6px 10px"
            })
        } else {
            $(".data-btn").text("data").show();
            $(".dropdown-div").show();
            $(".osm-dropdown-div").show();
            $(".btn").css({
                "padding":"6px 12px"
            })
        }
    }
    //--------------------------------------------------------------------------
    //bootstrapのtooltip スマホタッチでタッチが二回必要になるので見送り
    //$('[data-toggle="tooltip"]').tooltip({html:true,container:"body"});
    //--------------------------------------------------------------------------
    if ($("body").width() > 400) {
        var msg = "";
        //msg += "<i class='fa fa-exclamation fa-fw'></i>";
        msg += "<div style='text-align:center;margin-bottom:10px;'>ひなたGIS簡易版</div>";
        msg += "★背景のうち(VT)とついているものは3D化できません！<br>";
        msg += "<div style='text-align:center;'>";
        msg += "宮崎県情報政策課<br>最終更新:2017/11/05</div>";
        msg += "<div style='position:absolute;bottom:0px;right:0px;'><a href='https://www.osgeo.jp/' target='_blank'><img src='icon/osgeo.png' style='width:80px;background:'></a></div>";
        $.notify({//options
            message: msg
        }, {//settings
            type: "info",
            z_index: 999999,
            placement: {
                from: "bottom",
                align: "center"
            },
            animate: {
                enter: "animated fadeInDown",
                exit: "animated fadeOutUp"
            },
            timer: 2000
        });
    }
    //webストレージから中陣地座標、ズーム率を取得

    var urlHash = location.hash;
    console.log(urlHash);

    /*
    if(urlHash) {
        console.log(urlHash);
        var zoom = urlHash.split("/")[0];
        var lon = urlHash.split("/")[2];
        var lat = urlHash.split("/")[1];
        console.log(lon)
        var center = ol.proj.fromLonLat([lon,lat]);
    }else{
        var center = JSON.parse(localStorage.getItem("lonlat"));
        var zoom = localStorage.getItem("zoom");
    }
    //var center = JSON.parse(localStorage.getItem("lonlat"));
    //var zoom = localStorage.getItem("zoom");

    */

    //var center = null;
    //var zoom = null;

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

    //inu.setZIndex(9999999);
    /*
    editLayer.set("altitudeMode","clampToGround");
    editLayer.setZIndex(9999999);//edit.js参照
    editLayer.set("selectable",true);
    */

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
        //layers:[mieruneNormal2],
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
    //-------------------------------------------------------------------------
    //現在地取得
    /*
    var hele1 = new ol.control.Button ({
            html: "<i class='fa fa-map-marker'></i>",//<i class="fa fa-smile-o"></i>',
            className: "here-btn",
            title: "現在地取得",
            handleClick: function(e) {
                getHere("map1")
            }
    });
    map1.addControl(hele1);
    //------------------
    var hele2 = new ol.control.Button ({
        html: "<i class='fa fa-map-marker'></i>",//<i class="fa fa-smile-o"></i>',
        className: "here-btn",
        title: "現在地取得",
        handleClick: function(e) {
            getHere("map2")
        }
    });
    map2.addControl(hele2);
    */
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
        funcMouseMessage(evt,"map1");
    });
    map2.on("pointermove",function(evt){
        funcElevation(evt,"map2");
        funcMouseMessage(evt,"map2");
    });
    //---------------------------------------------------------------------------
    function funcMouseMessage(evt,mapName){
        $("#mouseMessage").text("");
        var map2Top = 0;
        var map2Left = 0;
        if(mapName==="map2") {
            map2Top = $("#map2").offset().top;
            map2Left = $("#map2").offset().left;
        }
        $("#mouseMessage").animate({
            top:evt.pixel[1] + 0 + map2Top,
            left:evt.pixel[0] + 15 + map2Left
        },0);
        var pixel = eval(mapName).getPixelFromCoordinate(evt.coordinate);
        var features = [];
        var layers = [];
        eval(mapName).forEachFeatureAtPixel(pixel,function(feature,layer){
            features.push(feature);
            layers.push(layer);
        });
        if(!features.length) return;
        var layer = layers[layers.length-1];
        var feature = features[features.length-1];//最後のfeatureを取得している。レイヤーが重なったとき問題があるかも。
        var layerName = layer.getProperties()["name"];
        if(layerName==="tunamimiyazaki"){
            if(feature.getProperties()["H_M"]) {
                $("#mouseMessage").text(feature.getProperties()["H_M"] + "メートル");
            }else{
                $("#mouseMessage").text(feature.getProperties()["A40_003"]);
            }
        }
        if(layerName==="tunamihokkaidou"){
            if(feature.getProperties()["MAX_SIN"]) {
                $("#mouseMessage").text(feature.getProperties()["MAX_SIN"] + "メートル");
            }else{

            }
        }

    }
    //---------------------------------------------------------------------------
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
    //OSM
    $("body").on("click",".osm-btn",function() {
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        //alert("作成中")
        var zoom = Math.floor(eval(mapName).getView().getZoom());
        var coord = ol.proj.transform(eval(mapName).getView().getCenter(),"EPSG:3857","EPSG:4326");
        console.log(zoom);
        console.log(coord[1],coord[0]);
        var url = "http://www.openstreetmap.org/edit#map=" + zoom + "/" + coord[1] + "/" + coord[0];
        //var url = "http://www.openstreetmap.org/edit#map=" + zoom + "/31.887292341936988/131.47626831928417";
        window.open(url,'_blank')
    });
    //--------------------------------------------------------------------------
    //現在地取得
    function getHere(mapName) {
        //var mapName = mapObj["name"];
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    eval(mapName).getView().setCenter(ol.proj.transform([position.coords.longitude, position.coords.latitude], "EPSG:4326", "EPSG:3857"));
                },
                function () {
                    alert("座標を取得できませんでした。.")
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000
                }
            );
        } else {
            alert("お使いのブラウザには座標取得機能がありません。")
        }
    }
    //------------------------------------------------------------------------
    ol.hash(map1);
    ol.hash(map2);
    //------------------------------------------------------------------------

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
