var higasi9syuuCityObjAr =
    [
        {
            "citycode": "40100",
            "cityname": "北九州市",
            "zinkou":"961286",
            "color":"rgba(255,0,0,0.9)"
        },
        {
            "citycode": "40130",
            "cityname": "福岡市",
            "zinkou":"1538681",
            "zindex":"-1"
        },
        {
            "citycode": "40202",
            "cityname": "大牟田市",
            "zinkou":"117360"
        },
        {
            "citycode": "40203",
            "cityname": "久留米市",
            "zinkou":"304552"
        },
        {
            "citycode": "40217",
            "cityname": "筑紫野市",
            "zinkou":"101081"
        },
        {
            "citycode": "40218",
            "cityname": "春日市",
            "zinkou":"110743"
        },
        {
            "citycode": "41201",
            "cityname": "佐賀市",
            "zinkou":"236372"
        },
        {
            "citycode": "41202",
            "cityname": "唐津市",
            "zinkou":"122785"
        },
        {
            "citycode": "42201",
            "cityname": "長崎市",
            "zinkou":"429508"
        },
        {
            "citycode": "42202",
            "cityname": "佐世保市",
            "zinkou":"255439"
        },
        {
            "citycode": "42204",
            "cityname": "諫早市",
            "zinkou":"138078"
        },
        {
            "citycode": "43100",
            "cityname": "熊本市",
            "zinkou":"740822"
        },
        {
            "citycode": "43202",
            "cityname": "八代市",
            "zinkou":"127472"
        },
        {
            "citycode": "44201",
            "cityname": "大分市",
            "zinkou":"478146",
            "color":"rgba(255,0,0,0.9)"
        },
        {
            "citycode": "44202",
            "cityname": "別府市",
            "zinkou":"122138",
            "color":"rgba(255,0,0,0.9)"
        },
        {
            "citycode": "45201",
            "cityname": "宮崎市",
            "zinkou":"401138",
            "color":"rgba(255,0,0,0.9)"
        },
        {
            "citycode": "45202",
            "cityname": "都城市",
            "zinkou":"165029",
            "color":"rgba(255,0,0,0.9)"
        },
        {
            "citycode": "45203",
            "cityname": "延岡市",
            "zinkou":"125159",
            "color":"rgba(255,0,0,0.9)"
        },
        {
            "citycode": "46201",
            "cityname": "鹿児島市",
            "zinkou":"599814",
            "color":"rgba(255,0,0,0.9)"
        },
        {
            "citycode": "46203",
            "cityname": "鹿屋市",
            "zinkou":"103608",
            "color":"rgba(255,0,0,0.9)"
        },
        {
            "citycode": "46218",
            "cityname": "霧島市",
            "zinkou":"125857",
            "color":"rgba(255,0,0,0.9)"
        }
    ];
var higasi9Source1 = null;
//$(function(){
    function kyuusyuuCity(tgtTr,opacity) {
        var dataLayerId = "map1-kyuusyuuCity";
        var mapName = "map1";
        higasi9Source1 = new ol.source.Vector({});
        dataLayer[dataLayerId] = new ol.layer.Vector({
            name: "higasi9Layer",
            source: higasi9Source1,
            style: commonstyleFunction
        });
        dataLayer[dataLayerId].set("altitudeMode", "clampToGround");
        eval(mapName).addLayer(dataLayer[dataLayerId]);
        dataLayer[dataLayerId].setOpacity(opacity);
        dataLayer[dataLayerId].setZIndex(9999);
        var inChar = "";
        for (i = 0; i < higasi9syuuCityObjAr.length; i++) {
            inChar += "," + higasi9syuuCityObjAr[i]["citycode"];
        }
        inChar = inChar.substr(1);

        $.ajax({
            type: "POST",
            url: "php/geojson-create.php",
            dataType: "json",
            data: {
                dataLayerId: "yakuba",
                select: inChar
            }
        }).done(function (json) {
            var features = json["geojson"]["features"];
            for (i = 0; i < features.length; i++) {
                var fCityCode = features[i]["properties"]["市区町村コード"];
                var cityObjF = higasi9syuuCityObjAr.filter(function (item, index) {
                    if (item.citycode == fCityCode) return true;
                });
                var cityObj = cityObjF[0];
                console.log(cityObj["color"]);
                var zinkou = cityObj["zinkou"];
                var circleCenter = ol.proj.transform(features[i]["geometry"]["coordinates"], "EPSG:4326", "EPSG:3857");
                var circleCenterX = circleCenter[0];
                var circleCenterY = circleCenter[1];
                var km = (Number(zinkou) + 300000) / 70000;
                var circleRadius = km * 1179;
                var pointsToFind = 18;
                var coord = createCirclePointCoords(circleCenterX, circleCenterY, circleRadius, pointsToFind);
                var geometry = new ol.geom.Polygon([coord]);
                if (cityObj["color"]) {
                    var fillColor = cityObj["color"];
                } else {
                    var fillColor = "rgba(0,100,255,0.9)";
                }
                var zindex = cityObj["zindex"];
                var newFeature = new ol.Feature({
                    geometry: geometry,
                    //name: "newFeature",
                    _polygonHeight: (Number(zinkou)) / 20,
                    _fillColor: fillColor,
                    _zindex:zindex,
                    コード: cityObj["citycode"],
                    自治体名: cityObj["cityname"],
                    人口: Number(cityObj["zinkou"]).toLocaleString() + "人"
                });
                higasi9Source1.addFeature(newFeature);
            }
            //スライダー-----------------------------------------------------------------
            tgtTr.find(".data-td-slider").append("<div class='data-slider'></div>");
            tgtTr.find(".data-slider").slider({
                min:0,max:1,value:1,step:0.01,
                slide: function(event, ui){
                    dataLayer[dataLayerId].setOpacity(ui.value);
                }
            });
            tgtTr.find(".ui-slider-handle").css({
                "left":opacity*100 + "%"
            });
            //ログ-----------------------------------------------------------------------
            var ua = navigator.userAgent;
            var myurl = location.href;
            $.ajax({
                type:"GET",
                url:"php/log.php",
                data:{
                    idandclass:"データ名:" + dataLayerId,
                    ua:ua,
                    myurl:myurl
                }
            }).done(function(){
            }).fail(function(){
                console.log("ログ失敗!");
            });
            /*
             var geojsonObject = json.geojson;
             var vectorSource = new ol.source.Vector({
             features: (new ol.format.GeoJSON()).readFeatures(geojsonObject,{featureProjection:'EPSG:3857'})
             });
             //--------------------------------------
             dataLayer[dataLayerId] = new ol.layer.Vector({
             name:"dataLayer",
             source:vectorSource,
             //style:commonstyleFunction
             });
             dataLayer[dataLayerId].set("altitudeMode","clampToGround");
             eval(mapName).addLayer(dataLayer[dataLayerId]);
             //dataLayer[dataLayerId].setOpacity(opacity);
             dataLayer[dataLayerId].setZIndex(9999);
             */
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.responseText);
            alert("失敗!");
        });
    }
//});
