var ol3d1 = null;
var ol3d2 = null;
$(function(){
    //--------------------------------------------------------------------------
    //３Dトグルを操作したとき　現在使っていない。トグルからボタンに変更したため
    /*
    $(".d3d2-toggle").change(function(){
        var mapObj = funcMaps($(this))
        if($(this).prop("checked")){
            eval(mapObj["ol3d"]).setEnabled(true);
            mapObj["element"].find(".cesium-btn-div").show(500);
        }else{
            eval(mapObj["ol3d"]).setEnabled(false);
            mapObj["element"].find(".cesium-btn-div").hide(500);
        };
    });*/
    //-------------------------------------------------------------------------
    //3Dボタン
    $(".d3d2-btn").click(function(){
        var mapObj = funcMaps($(this));
        if($(this).text()=="3D"){

            $.notify({//options
                message:"<div style='text-align:center;'><i class='fa fa-exclamation fa-fw'></i>十字コントーラーはドラッグで移動可能です。</div>"
            },{//settings
                type:"info",
                z_index:999999,
                placement: {
                    from:"top",
                    align:"center"
                },
                animate: {
                    enter:"animated fadeInDown",
                    exit:"animated fadeOutUp"
                }
            });
            
            if(ol3d1==null){
                ol3d1 = new olcs.OLCesium({
                    map:map1
                });
                var scene = ol3d1.getCesiumScene();
                var terrain = new Cesium.PngElevationTileTerrainProvider({
                    url:"https://gsj-seamless.jp/labs/elev2/elev/gsi10m_latlng_257/{z}/{y}/{x}.png",
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
                ol3d2 = new olcs.OLCesium({
                    map:map2
                });
                var scene2 = ol3d2.getCesiumScene();
                var terrain = new Cesium.PngElevationTileTerrainProvider({
                    url:"https://gsj-seamless.jp/labs/elev2/elev/gsi10m_latlng_257/{z}/{y}/{x}.png",
                    tilingScheme: new Cesium.GeographicTilingScheme(),
                });
                scene2.terrainProvider = terrain;
                scene2.screenSpaceCameraController._minimumZoomRate = 1;
                scene.screenSpaceCameraController._minimumZoomRate = 1;//10000
                scene2.screenSpaceCameraController.minimumZoomDistance = 10;
                scene2.terrainProvider.heightmapTerrainQuality = 0.1;
                scene2.terrainProvider.hasVertexNormals = false;
                scene2.terrainProvider.hasWaterMask = false;
                scene2.globe.depthTestAgainstTerrain = true;//trueにすると地形より下のフューチャーは見えないようになる。
            }
            //----------------------------------------------------------------
            eval(mapObj["ol3d"]).setEnabled(true);
            mapObj["element"].find(".cesium-btn-div").show(500);
            $(this).text("2D");
        }else{
            eval(mapObj["ol3d"]).setEnabled(false);
            mapObj["element"].find(".cesium-btn-div").hide(500);
            $(this).text("3D");
        }
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
        var mapObj = funcMaps($(this));
        var ol3d = eval(mapObj["ol3d"]);
        tiltFlg = true;
        var tiltUp = function(upDown){
            if(tiltFlg){
                var tilt = ol3d.getCamera().getTilt();
                if(upDown=="up"){
                    if($("#sync-btn").text()=="非同期"){//起動時はこっち
                        if (tilt < 1.5) ol3d1.getCamera().setTilt(tilt + 0.05);
                        if (tilt < 1.5) ol3d2.getCamera().setTilt(tilt + 0.05);
                    }else{
                        if (tilt < 1.5) ol3d.getCamera().setTilt(tilt + 0.05);
                    }
                }else{
                    if($("#sync-btn").text()=="非同期") {//起動時はこっち
                        if (tilt > 0) ol3d1.getCamera().setTilt(tilt - 0.05);
                        if (tilt > 0) ol3d2.getCamera().setTilt(tilt - 0.05);
                    }else {
                        if (tilt > 0) ol3d.getCamera().setTilt(tilt - 0.05);
                    }

                }
                setTimeout(function(){tiltUp(upDown)},20);
            }else{
                clearTimeout(tiltUp);
            }
        };
        if($(this).attr("class").match("cesium-btn-up")){
            tiltUp("up");
        }else{
            tiltUp("down");
        }
        return false;
    }).mouseup(function(){
        tiltFlg = false;
    }).mouseleave(function(){
        tiltFlg = false;
    });
    //左右回転------------------------------------------------------------------
    $("body").on("mousedown",".cesium-btn-left,.cesium-btn-right",function(){
        var mapObj = funcMaps($(this));
        var ol3d = eval(mapObj["ol3d"]);
        tiltFlg = true;
        var tiltLeft = function(leftRight){
            if(tiltFlg){
                var head = ol3d.getCamera().getHeading();
                if(leftRight=="left"){
                    ol3d.getCamera().setHeading(head - 0.05);
                }else{
                    ol3d.getCamera().setHeading(head + 0.05);
                }
                setTimeout(function(){tiltLeft(leftRight)},20);
            }else{
                clearTimeout(tiltLeft);
            }
        };
        if($(this).attr("class").match("cesium-btn-left")){
            tiltLeft("left");
        }else{
            tiltLeft("right");
        }
        return false;
    }).mouseup(function(){
        tiltFlg = false;
    }).mouseleave(function(){
        tiltFlg = false;
    });
});
