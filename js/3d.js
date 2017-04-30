$(function(){
    var ol3d1 = new olcs.OLCesium({
        map:map1
    });
    var scene = ol3d1.getCesiumScene();
    var terrain = new Cesium.PngElevationTileTerrainProvider({
        url:"http://gsj-seamless.jp/labs/elev2/elev/gsi10m_latlng_257/{z}/{y}/{x}.png",
        tilingScheme: new Cesium.GeographicTilingScheme(),
    });
    scene.terrainProvider = terrain;
    scene.screenSpaceCameraController._minimumZoomRate = 1;//10000
    // ズームしたときの，ホイールに対する動作制御。
    scene.screenSpaceCameraController.minimumZoomDistance = 10;
    // めり込みにくくするためズーム制限
    //scene.screenSpaceCameraController.minimumCollisionTerrainHeight=10;
    scene.terrainProvider.heightmapTerrainQuality = 0.1;
    scene.terrainProvider.hasVertexNormals = false;
    scene.terrainProvider.hasWaterMask = false;
    scene.globe.depthTestAgainstTerrain = true;//trueにすると地形より下のフューチャーは見えないようになる。
    //--------------------------------------------------------------------------
    //３Dトグルを操作したとき
    $(".d3d2-toggle").change(function(){
        if($(this).prop("checked")){
            ol3d1.setEnabled(true);
            $(".cesium-btn-div").show(500);
        }else{
            ol3d1.setEnabled(false);
            $(".cesium-btn-div").hide(500);
        };
    });
    //--------------------------------------------------------------------------
    //セシウム操作ボタンを移動可能に
    $(".cesium-btn-div").draggable({
        stop:function(){
                $(this).css({"height":"","with":""});
            }
    });
    //-------------------------------------------------------------------------
    //チルト
    var tiltFlg = false;
    //仰角----------------------------------------------------------------------
    $("body").on("mousedown",".cesium-btn-up,.cesium-btn-down",function(){
        var top = (Number($(this).css("top").replace("px","")) + 5) + "px";
        $(this).css({"top":top});
        tiltFlg = true;
        var tiltUp = function(upDown){
            if(tiltFlg){
                var tilt = ol3d1.getCamera().getTilt();
                if(upDown=="up"){
                    if(tilt<1.5) ol3d1.getCamera().setTilt(tilt + 0.05);
                }else{
                    if(tilt>0) ol3d1.getCamera().setTilt(tilt - 0.05);
                };
                setTimeout(function(){tiltUp(upDown)},20);
            }else{
                clearTimeout(tiltUp);
            };
        };
        if($(this).attr("class").match("cesium-btn-up")){
            tiltUp("up");
        }else{
            tiltUp("down");
        };
        return false;
    }).mouseup(function(){
        tiltFlg = false;
        $(".cesium-btn-up,.cesium-btn-down").css({"top":""});
    }).mouseleave(function(){
        tiltFlg = false;
        $(".cesium-btn-up,.cesium-btn-down").css({"top":""});
    });
    //左右回転------------------------------------------------------------------
    $("body").on("mousedown",".cesium-btn-left,.cesium-btn-right",function(){
        //var top = (Number($(this).css("top").replace("px","")) + 5) + "px";
        //$(this).css({"top":top});
        tiltFlg = true;
        var tiltLeft = function(leftRight){
            if(tiltFlg){
                var head = ol3d1.getCamera().getHeading();
                if(leftRight=="left"){
                    ol3d1.getCamera().setHeading(head - 0.05);
                }else{
                    ol3d1.getCamera().setHeading(head + 0.05);
                };
                setTimeout(function(){tiltLeft(leftRight)},20);
            }else{
                clearTimeout(tiltLeft);
            };
        };
        if($(this).attr("class").match("cesium-btn-left")){
            tiltLeft("left");
        }else{
            tiltLeft("right");
        };
        return false;
    }).mouseup(function(){
        tiltFlg = false;
        //$(".cesium-btn-left,.cesium-btn-right").css({"top":""});
    }).mouseleave(function(){
        tiltFlg = false;
        //$(".cesium-btn-left,.cesium-btn-right").css({"top":""});
    });
});
