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
        //console.log(layerName);
        switch (layerName){//ここで処理を分岐
            case "wikiCommonsLayer":
                funcWikiPopup(feature,map);
                break;
            case "estatLayer":
                funcEstatPopup(feature,map,evt);
                break;
            case "weatherLayer":
                funcWeatherPopup(feature,map,evt);
                break;
            case "panoLayer":
                funcPanoPopup(feature,map,evt);
                break;
            case "csvLayer":
                funcCsvPopup(feature,map,evt);
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
    function funcCsvPopup(feature,map,evt) {
        var featureProp = feature.getProperties();
        var geoType = feature.getGeometry().getType();
        if (geoType == "Point") {
            var coord = feature.getGeometry().getCoordinates();
        } else {
            var coord = evt.coordinate;
        }
        console.log(featureProp);
        //console.log($(".estat-year-div").text().split("　")[1]);
        //var content = $(".estat-year-div").text().split("　")[1] + "<br>";//表名
        //content += featureProp["自治体名"] + "　" + featureProp["value"];
        //content += "<br>" + featureProp["lank"];
        var content = "";
            content += featureProp["自治体名"] + "<br>";
            content += featureProp["数値"];
        if (map == "map1") {
            popup1.show(coord, content);
        } else {
            popup2.show(coord, content);
        }
    }
    //-----------------------------------------------
    function funcPanoPopup(feature,map,evt) {
        var coord = feature.getGeometry().getCoordinates();
        var featureProp = feature.getProperties();
        var value = featureProp["value"];
        //if(value) var keys = Object.keys(value);
        var content = "<table class='weather-tbl table table-bordered table-condensed'>";
        content += "<tr><td class='weather-td'>名称</td><td>" + featureProp["名称"] + "</td></tr>";
        content += "<tr><td>説明</td><td>" + featureProp["説明"] + "</td><tr>";
        content += "</table>";
        //if(value) content += "<span class='weather-span'>" + keys[0] + value[keys[0]] + "</span>";

        if(map=="map1") {
            popup1.show(coord,content);

            $("#pano-div").remove();
            var content = "";
            content += "<div id='pano-div' style='height:" + $(window).height() / 2 + "px'>";
            content += "<button type='button' class='fullscreen-btn btn btn-primary'>全画面</button>";
            content += "<div>";
            $("#map1").after(content);
            embedpano({
                id: "krpanoObj",
                swf: "panos/tour.swf",
                xml: "panos/" + featureProp["xml"],
                target: "pano-div",
                html5: "auto",
                mobilescale: 1.0,
                passQueryParameters: true
            });

        }else{
            popup2.show(coord,content);
        }
    }
    $("body").on("click",".fullscreen-btn",function() {
        if ($(this).text() == "全画面"){
            $("#map1").animate({"width": "100%", "height": "0px"}, 500, function () {
                $("#pano-div").animate({"width": "100%", "height": $(window).height() + "px"}, 500, function () {
                })
            });
            $(this).text("解除");
        }else{
            $("#map1").animate({"width": "100%", "height": $(window).height() / 2 + "px"}, 500, function () {
                $("#pano-div").animate({"width": "100%", "height": $(window).height()/2 + "px"}, 500, function () {
                })
            });
            $(this).text("全画面");
        }
    });
    //-----------------------------------------------
    function funcWeatherPopup(feature,map,evt){
        var coord = feature.getGeometry().getCoordinates();
        var featureProp = feature.getProperties();
        var value = featureProp["value"];
        if(value) var keys = Object.keys(value);
        var content = "<table class='weather-tbl table table-bordered table-condensed'>";
            content += "<tr><td class='weather-td'>所在地</td><td>" + featureProp["所在地"] + "</td></tr>";
            content += "<tr><td>観測所名</td><td>" + featureProp["観測所名"] + "</td><tr>";
            content += "</table>";
            if(value) content += "<span class='weather-span'>" + keys[0] + value[keys[0]] + "</span>";

        if(map=="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //-----------------------------------------------
    function funcEstatPopup(feature,map,evt){
        var featureProp = feature.getProperties();
        var geoType = feature.getGeometry().getType();
        if(geoType=="Point"){
            var coord = feature.getGeometry().getCoordinates();
        }else{
            var coord = evt.coordinate;
        }
        console.log(featureProp);
        console.log($(".estat-year-div").text().split("　")[1]);
        var content = $(".estat-year-div").text().split("　")[1] + "<br>";//表名
            content += featureProp["自治体名"] + "　" + featureProp["value"];
            content += "<br>" + featureProp["lank"];
        if(map=="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
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
        };
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