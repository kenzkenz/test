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
            var max = feature.getProperties()["_max"];
            //console.log(max);
            style = [
                new ol.style.Style({
                    image:new ol.style.Circle({
                        radius: max ? 20:10,
                        fill: new ol.style.Fill({
                            color:fillColor ? fillColor:"white"
                        }),
                        stroke: new ol.style.Stroke({color:"black",width:1})
                    }),
                    text: new ol.style.Text({
                        font: "20px helvetica,sans-serif",
                        text: max ? "max":"",
                        fill: new ol.style.Fill({
                            color:"white"
                        })
                    }),
                    zIndex:max ? 2:1
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
            var maxbb = 0;
            var maxKansokuzyoNo;
            for (i = 0; i < features.length; i++) {
                features[i]["I"]["_fillColor"] = "rgba(0,0,0,0.0)";
                features[i]["I"]["_max"] = "";
                var text = $("#" + mapName + " .weather-select option:selected").text();
                for (j = 0; j < json["kisyoujson"].length; j++) {
                    if (Number(json["kisyoujson"][j]["観測所番号"]) == features[i]["I"]["観測所番号"]) {
                        var aa = json["kisyoujson"][j];
                        if (pass.split("/")[0] == "pre_rct") {
                            var d3Color = d3.interpolateLab("white", "blue");
                            var bb = aa["現在値(mm)"];
                            features[i]["I"]["value"] = {"降水量": bb + "mm"};
                            var fillColor = d3Color(bb / 10);
                            features[i]["I"]["_fillColor"] = fillColor;
                        }else if (text == "今日の最高気温") {
                            var d3Color = d3.interpolateLab("white", "red");
                            var bb = aa["今日の最高気温(℃)"];
                            features[i]["I"]["value"] = {"今日の最高気温(℃)":bb + "℃"};
                            var fillColor = d3Color((bb/35)*(bb/35));
                            features[i]["I"]["_fillColor"] = fillColor;
                        } else if (text == "今日の最低気温") {
                            var d3Color = d3.interpolateLab("white", "red");
                            var bb = aa["今日の最低気温(℃)"];
                            features[i]["I"]["value"] = {"今日の最低気温(℃)":bb + "℃"};
                            var fillColor = d3Color((bb/25)*(bb/25));
                            features[i]["I"]["_fillColor"] = fillColor;
                        } else if (text == "今日の最大風速") {
                            var d3Color = d3.interpolateLab("white", "green");
                            var bb = aa["今日の最大値(m/s)"];
                            features[i]["I"]["value"] = {"今日の最大風速":bb + "(m/s)"};
                            var fillColor = d3Color(bb / 30);
                            features[i]["I"]["_fillColor"] = fillColor;
                        } else if (text == "今日の最大瞬間風速") {
                            var d3Color = d3.interpolateLab("white", "green");
                            var bb = aa["今日の最大値(m/s)"];
                            features[i]["I"]["value"] = {"今日の最大瞬間風速":bb + "(m/s)"};
                            var fillColor = d3Color(bb / 30);
                            features[i]["I"]["_fillColor"] = fillColor;
                        }
                        json["kisyoujson"].splice(j, 1);
                        if(maxbb<Number(bb)){
                            maxbb = Number(bb);
                            maxKansokuzyoNo = features[i]["I"]["観測所番号"];
                        }
                        break;
                    }
                }
            }
            //console.log(maxbb);
            //console.log(maxKansokuzyoNo);
            for (i = 0; i < features.length; i++) {
                if (maxKansokuzyoNo == features[i]["I"]["観測所番号"]) {
                    features[i]["I"]["_max"] = 1;
                    break
                }
            }
            eval("weatherLayer" + mapName).getSource().changed();
        });
    });
});