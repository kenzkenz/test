$(function(){
    var popup1 = new ol.Overlay.Popup();
    map1.addOverlay(popup1);
    var popup2 = new ol.Overlay.Popup();
    map2.addOverlay(popup2);
    //-----------------------------------------------
    map1.on("singleclick", function(evt) {
        funcPopupShow(evt,"map1");
    });
    map2.on("singleclick", function(evt) {
        funcPopupShow(evt,"map2");
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
    function funcPopupShow(evt,map){
        var pixel = eval(map).getPixelFromCoordinate(evt.coordinate);
        var layerObj = eval(map).forEachFeatureAtPixel(pixel,function(feature,layer){
            return {"layer":layer,"feature":feature};
        });
        if(!layerObj) return;
        var layer = layerObj["layer"];
        var feature = layerObj["feature"];
        var layerName = layerObj["layer"].getProperties()["name"];
        switch (layerName){//ここで処理を分岐
            case "wikiCommonsLayer":
                funcWikiPopup(feature,map);
                break;
            default:
        }
        /*
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
        */
    }
    //-----------------------------------------------
    function funcWikiPopup(feature,map){
        var featureProp = feature.getProperties();
        var content = "";
        content += featureProp["title"] + "<br>";
        content += "<a href='" + featureProp["url"] + "' TARGET='_blank'><img class='wiki-img'></a>";
        content += "<div style='text-align:center;'><i class='img-loading fa fa-spinner fa-spin fa-3x fa-fw'></i></div>";
        content += "copy:" +  featureProp["copy"];
        content += "<br>user:" +  featureProp["user"];
        content += "<br><a href='" + featureProp["descriptionurl"] + "?uselang=ja' TARGET='_blank'><label>Wikiへ</label></a>";
        var coord = feature.getGeometry().getCoordinates();
        //popup1.show(coord,content);
        if(map=="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
        var url=featureProp["thumbnail"];
        var imgPreloader=new Image();
        imgPreloader.onload=function() {
            //ロード完了で画像を表示
            $("#" + map + " .img-loading").hide();
            $("#" + map + " .wiki-img").attr({'src':url});
        }
        imgPreloader.src=url;
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