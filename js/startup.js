var map1 = null;
$(function(){
    //--------------------------------------------------------------------------
    //起動時に画面リサイズ
    $("#map1").height($(window).height());
    $(window).on('resize',function(){
        $("#map1").height($(window).height());
    });
    //--------------------------------------------------------------------------
    //$('[data-toggle="tooltip"]').tooltip({html:true,container:"body"});
    //--------------------------------------------------------------------------
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
            new ol.interaction.DragRotateAndZoom()
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
    //メニューボタン
    $(".menu-btn").click(function(){
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        var content = "";
        content += "<input type='checkbox' data-toggle='toggle' class='wiki-toggle'>：<a class='hidden-div-open'>Wikimedia Commons</a>";
        content += "<hr class='my-hr'>";
        content += "<input type='checkbox' data-toggle='toggle' class='flood-toggle'>：<a class='hidden-div-open'>海面上昇シミュレーション</a>";
        content += "<div class='hidden-div'>";
        content += "スライダーの最大値を設定します。";
        content += "<select class='selectpicker flood-select'>";
        content += "<option value='100'>最大値100メートル</option>";
        content += "<option value='200'>最大値200メートル</option>";
        content += "<option value='1000'>最大値1000メートル</option>";
        content += "<option value='2000'>最大値2000メートル</option>";
        content += "<option value='4000'>最大値4000メートル</optionvalue>";
        content += "</select></div>";
        content += "<hr class='my-hr'>";
        content += "<input type='checkbox' data-toggle='toggle' class='rotate-toggle' checked>：<a class='hidden-div-open'>スマホ2D時回転ロック</a>";
        content += "<div class='hidden-div'>";
        content += "onにするとスマホ、タブレットのタッチ操作での回転を止めます。</div>";
        content += "<hr class='my-hr'>動作がおかしいときにリセットします。";
        content += "<button type='button' class='reset-btn btn btn-primary btn-block'>座標リセット</button>";
        mydialog({
            id:"menu-dialog-" + mapName,
            class:"menu-dialog",
            map:mapName,
            title:" ",
            content:content,
            top:"55px",
            left:"20px",
            width:"230px",
            rmDialog:false
        });
        $(".flood-toggle,.rotate-toggle,.wiki-toggle").bootstrapToggle();
        $(".flood-select").selectpicker({
            "selectedText":"cat"
        });
        return false;
    });
    //--------------------------------------------------------------------------
    //隠しているメニューを表示
    $("body").on("click",".hidden-div-open",function(){
        $(this).next().slideToggle(500);
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
            alert("can't use your browser")
        }
    });
    //--------------------------------------------------------------------------
    $("body").on("click",".reset-btn",function() {
        location.reload(true);
        localStorage.clear();
        location.reload(true);
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
