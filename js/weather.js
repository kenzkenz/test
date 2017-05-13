var weatherLayermap1 = null;
var weatherLayermap2 = null;
$(function(){
    //--------------------------------------------------------------------------
    //気象データトグルを押したとき
    $("body").on("change",".weather-toggle",function(){
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        eval(mapName).removeLayer(eval("weatherLayer" + mapName));
        if($(this).prop("checked")) {
            $("#" + mapName + " .hidden-div-weather").show(500);
        }else{
            $("#" + mapName + " .hidden-div-weather").hide(500);
            //eval(mapName).removeLayer(eval("weatherLayer" + mapName));
            return;
        }
        var vectorSource1 = new ol.source.Vector({
            url:"geojson/ame_master.geojson",
            format: new ol.format.GeoJSON()
        });
        var vectorSource2 = new ol.source.Vector({
            url:"geojson/ame_master.geojson",
            format: new ol.format.GeoJSON()
        });
        var styleFunc = function(feature,resolution){
            var fillColor = feature.getProperties()["_fillColor"];
            style = [
                new ol.style.Style({
                    image:new ol.style.Circle({
                        radius: 10,
                        fill: new ol.style.Fill({
                            color:fillColor ? fillColor:"white"
                        }),
                        stroke: new ol.style.Stroke({color:"black",width:1})
                    })
                })
            ];
            return style;
        };
        weatherLayermap1 = new ol.layer.Vector({
            name:"weatherLayer",
            source:vectorSource1,
            style:styleFunc
        });
        weatherLayermap2 = new ol.layer.Vector({
            name:"weatherLayer",
            source:vectorSource2,
            style:styleFunc
        });
        //eval(mapName).removeLayer(eval("weatherLayer" + mapName));
        eval("weatherLayer" + mapName).set("altitudeMode","clampToGround");
        eval(mapName).addLayer(eval("weatherLayer" + mapName));
        eval("weatherLayer" + mapName).setZIndex(9999);
    });
    //--------------------------------------------------------------------------
    $("body").on("change",".weather-select",function() {
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        var pass = $(this).val();
        pass = pass + "_rct.csv";
        $.ajax({
            type: "GET",
            url: "php/weather.php",
            dataType: "json",
            data: {
                pass: pass
            }
        }).done(function (json) {
            var features = eval("weatherLayer" + mapName).getSource().getFeatures();
            for (i = 0; i < features.length; i++) {
                features[i]["H"]["_fillColor"] = "rgba(0,0,0,0.0)";
                var text = $("#" + mapName + " .weather-select option:selected").text();
                for (j = 0; j < json["kisyoujson"].length; j++) {
                    if (Number(json["kisyoujson"][j]["観測所番号"]) == features[i]["H"]["観測所番号"]) {
                        var aa = json["kisyoujson"][j]
                        if (pass.split("/")[0] == "pre_rct") {
                            var d3Color = d3.interpolateLab("white", "blue");
                            var mm = aa["現在値(mm)"];
                            features[i]["H"]["value"] = {"降水量": mm + "mm"};
                            var fillColor = d3Color(mm / 10);
                            features[i]["H"]["_fillColor"] = fillColor;
                        }else if (text == "今日の最高気温") {
                            var d3Color = d3.interpolateLab("white", "red");
                            var temp = aa["今日の最高気温(℃)"];
                            features[i]["H"]["value"] = {"今日の最高気温(℃)":temp + "℃"};
                            var fillColor = d3Color(temp / 30);
                            features[i]["H"]["_fillColor"] = fillColor;
                        } else if (text == "今日の最低気温") {
                            var d3Color = d3.interpolateLab("white", "red");
                            var temp = aa["今日の最低気温(℃)"];
                            features[i]["H"]["value"] = {"今日の最低気温(℃)":temp + "℃"};
                            var fillColor = d3Color(temp / 30);
                            features[i]["H"]["_fillColor"] = fillColor;
                        } else if (text == "今日の最大風速") {
                            var d3Color = d3.interpolateLab("white", "green");
                            var wind = aa["今日の最大値(m/s)"]
                            features[i]["H"]["value"] = {"今日の最大風速":wind + "(m/s)"};
                            var fillColor = d3Color(wind / 30);
                            features[i]["H"]["_fillColor"] = fillColor;
                        } else if (text == "今日の最大瞬間風速") {
                            var d3Color = d3.interpolateLab("white", "green");
                            var wind = aa["今日の最大値(m/s)"]
                            features[i]["H"]["value"] = {"今日の最大瞬間風速":wind + "(m/s)"};
                            var fillColor = d3Color(wind / 30);
                            features[i]["H"]["_fillColor"] = fillColor;
                        }
                        json["kisyoujson"].splice(j, 1);
                        break;
                    }
                }
            }
            eval("weatherLayer" + mapName).getSource().changed();
           // eval(mapName).removeLayer(eval("weatherLayer" + mapName));
           // eval(mapName).addLayer(eval("weatherLayer" + mapName));
        });
    });
});