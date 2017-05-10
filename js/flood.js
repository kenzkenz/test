var floodLayer1 = null;
var floodLayer2 = null;
$(function(){
    function flood(pixels, data) {
        var pixel = pixels[0];
        if (pixel[3]) {
            //var height = -10000 + ((pixel[0] * 256 * 256 + pixel[1] * 256 + pixel[2]) * 0.1);
            var height = (pixel[0] * 256 * 256 + pixel[1] * 256 + pixel[2]) / 100;
            if (height <= data.level) {
                pixel[0] = 0;
                pixel[1] = 100;
                pixel[2] = 255;
                pixel[3] = 150;
            } else {
                pixel[3] = 0;
            }
        }
        return pixel;
    }
    var elevation = new ol.source.XYZ({
        url:"https://cyberjapandata.gsi.go.jp/xyz/dem_png/{z}/{x}/{y}.png",
        maxZoom:14,
        crossOrigin:'anonymous'
    });
    floodLayer1 = new ol.layer.Image({
        source:new ol.source.Raster({
            sources:[elevation],
            operation:flood
        })
    });
    floodLayer2 = new ol.layer.Image({
        source:new ol.source.Raster({
            sources:[elevation],
            operation:flood
        })
    });
    floodLayer1.getSource().on('beforeoperations', function(event) {
        event.data.level = Number($("#map1 .level-text").text());
    });
    floodLayer2.getSource().on('beforeoperations', function(event) {
        event.data.level = Number($("#map2 .level-text").text());
    });
    //-------------------------------------------------------------------
    $("body").on("change",".flood-toggle",function(){
        var mapObj = funcMaps($(this));
        if(mapObj["name"]=="map1"){
            var layer = floodLayer1;
        }else{
            var layer = floodLayer2;
        }
        if($(this).prop("checked")){
            eval(mapObj["name"]).removeLayer(layer);
            floodLayer1.set("altitudeMode","clampToGround");
            eval(mapObj["name"]).addLayer(layer);
            layer.setZIndex(9999);
            //var max = Number(mapObj["element"].find(".flood-select").val());
            var max = Number(mapObj["element"].find(".flood-select option:selected").val());
            console.log(max);
            mapObj["element"].find(".flood-slider").slider({
                min:0,max:max,value:0,step:1,
                slide: function(event, ui){
                    mapObj["element"].find(".level-text").text(ui.value);
                    layer.getSource().changed();
                }
            });
            $(".flood-div").find(".ui-widget-content").css({"background":"rgba(51,122,183,1.0)"});
            $(".flood-div").find(".ui-slider-horizontal").height(30);
            $(".flood-div").find(".ui-slider-handle").css({"height":"40px","width":"40px"});
            //mapObj["element"].find(".flood-div").toggle("drop",{direction:"up",distance:200});
            mapObj["element"].find(".flood-div").toggle("drop");
        }else{
            eval(mapObj["name"]).removeLayer(layer);
            mapObj["element"].find(".flood-div").toggle("drop");
        }
    });
    //--------------------------------------------------------------------------
    //
    /*
    $("body").on("click",".flood-select-open",function(){
        var mapObj = funcMaps($(this));
        mapObj["element"].find(".flood-select-div").slideToggle(500);
    });
    */
    $("body").on("change",".flood-select",function(){
        var mapObj = funcMaps($(this));
        var val = Number($(this).val());
        if(val){
            mapObj["element"].find(".flood-slider").slider({
                max:val
            })
        }
    });
});
