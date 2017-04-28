$(function(){
    var ol3d = new olcs.OLCesium({
        map:map1
    });
    var scene = ol3d.getCesiumScene();
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

    $(".d3d2-toggle").change(function(){
        if($(this).prop("checked")){
            ol3d.setEnabled(true);
        }else{
            ol3d.setEnabled(false);
        };
    })
});
