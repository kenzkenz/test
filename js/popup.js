$(function(){
    var popup1 = new ol.Overlay.Popup();
    map1.addOverlay(popup1);
    var popup2 = new ol.Overlay.Popup();
    map2.addOverlay(popup2);
    //-----------------------------------------------
    map1.on("singleclick", function(evt) {
        var content = "作成中1";
        funcPopupShow(evt,content,"map1")
    });
    map2.on("singleclick", function(evt) {
        var content = "作成中2";
        funcPopupShow(evt,content,"map2")
    });
    //-----------------------------------------------
    map1.on("pointermove",function(evt){
        funcPointerMove(evt,"map1");
    });
    //-----------------------------------------------
    map2.on("pointermove",function(evt){
        funcPointerMove(evt,"map2");
    });
    //-----------------------------------------------
    //ポップアップ
    function funcPopupShow(evt,content,map){
        var pixel = eval(map).getPixelFromCoordinate(evt.coordinate);
        var feature = eval(map).forEachFeatureAtPixel(pixel,function(feature,layer){
            return feature;
        });
        if(!feature) return;
        var geoType = feature.getGeometry().getType();
        if(geoType=="Point"){
            var coord = feature.getGeometry().getCoordinates();
        }else{
            var coord = evt.coordinate;
        };
        if(map=="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //-----------------------------------------------
    //ホバー
    function funcPointerMove(evt,map){
        var pixel = eval(map).getPixelFromCoordinate(evt.coordinate);
        var feature = eval(map).forEachFeatureAtPixel(pixel,function(feature,layer){
            if(layer){
                //if(layer.getProperties()["name"]=="WikiCommonsLayer"){
                    return feature;
                //};
            };
        });
        if(feature){
            $(".ol-viewport").css({cursor:"pointer"});
        }else{
            $(".ol-viewport").css({cursor:""});
        }
    }
});