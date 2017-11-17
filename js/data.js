var dataLayer = [];
var d3CategoryColor = d3.scale.category20();
var d3CategoryColorI = 0;
var overpassLayer1 = null;
var overpassLayer2 = null;
//----------------------------------------------------------------------------------------------------------------------
$(function(){
    $(".data-btn").click(function(){
        var mapObj = funcMaps($(this));
        if ($("#mydialog-data-dialog-" + mapObj["name"]).length==0) {
            var mapObj = funcMaps($(this));
            var mapName = mapObj["name"];
            var id = "data-dialog-" + mapObj["name"];
            var content = "";
            mydialog({
                id: id,
                class: "data-dialog",
                map: mapName,
                title: "データレイヤー",
                content: content,
                top: "55px",
                left: "10px"
                //hide:true,
                //plus:true
            });
            funcDataTableCreate(mapObj, mapName);
        }else{
            $("#mydialog-data-dialog-" + mapObj["name"]).toggle("drop");
        }
    });
    //------------------------------------------------------------------------------------------------------------------
    function funcDataTableCreate(mapObj,mapName) {
        var htmlChar = "";
            htmlChar += "<div class='data-tbl-div'><table class='data-tbl table table-bordered table-condensed'>";
        for(var i = 0; i < dataLayerArr.length; i++){
            var obj = dataLayerArr[i];
            var layerId = mapName + "-" + obj["id"];
            htmlChar += "<tr data-opacity='" + obj["opacity"] + "' data-zoom='" + obj["zoom"] + "'>";
            htmlChar += "<td><label><input type='checkbox' name='data-check' value='" + layerId + "'><span class='wf-icon'>" + obj["icon"] + "</span>" + obj["title"] +  "</label></td>";
            //htmlChar += "<td class='data-td-slider'><div class='data-slider'></div></td>";
            htmlChar += "<td class='data-td-slider'></td>";
            htmlChar += "<td class='data-td-sort' title='ドラッグします。'><i class='fa fa-bars fa-lg'></i></td>";
            htmlChar += "<td class='data-td-info'><i class='fa fa-info-circle fa-lg primary'></i></td>";
            htmlChar += "</tr>";
        }
        //htmlChar += "</table>実験：<span class='zikken'>バス</span>：<span class='zikken'>AED</span>：<span class='zikken'>消火栓</span>：<span class='zikken'>xxx</span></div>";
        $("#" + mapName + " .data-dialog .dialog-content").html(htmlChar);

        $("#" + mapName + " .data-tbl tbody").sortable({
            handle:".data-td-sort",
            update:function(event,ui){
                funcDataLayerSort(mapName);
            }
        }).disableSelection();
        //チェックボックスをカスタム。iCheckに。
        $("#" + mapName + " input:checkbox[name='data-check']").iCheck({
            checkboxClass:"icheckbox_flat-blue",
            radioClass:"iradio_flat-blue"
        });

        funcHaikeiTblDivHeight();//common.jsにある関数

        //チェックボックスを押した時★★★★★-------------------------------------------------------------------------------
        $("#" + mapName + " input:checkbox[name='data-check']").on("ifChanged",function(event){
            var mapObj = funcMaps($(this));
            var mapName = mapObj["name"];
            var dataLayerId = $(this).val();
            var tgtTr = $(this).parents("tr");
            var opacity = tgtTr.data("opacity");
            var zoom = tgtTr.data("zoom");
            if($(this).prop("checked")) {
                if(dataLayerId.split("-")[1]=="kyuusyuuCity"){
                    kyuusyuuCity(tgtTr,opacity)
                }else{
                     dataLayerCreate(dataLayerId, mapName, tgtTr,opacity,zoom);
                }
            }else {
                if(dataLayerId.split("-")[1]=="kyuusyuuCity"){
                    console.log(dataLayerId)
                    eval(mapName).removeLayer(dataLayer["map1-kyuusyuuCity"]);
                    tgtTr.find(".data-slider").remove();
                }else{
                    eval(mapName).removeLayer(dataLayer[dataLayerId]);
                    tgtTr.find(".data-slider").remove();
                }
            }
            tgtTr.prependTo($(this).parents(".data-tbl"));
            $(this).parents(".data-tbl-div").animate({scrollTop:0});
        })
    }
    //------------------------------------------------------------------------------------------------------------------
    //実験
    $("body").on("click",".osmread",function(){
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        console.log(mapName)
        if(mapName==="map1") {
            //var layer = overpassLayer1;
            map1.removeLayer(overpassLayer1);
        }else{
            //var layer = overpassLayer2;
            map2.removeLayer(overpassLayer2)
        }
        //eval(mapName).removeLayer(layer);

        var extent = map1.getView().calculateExtent(map1.getSize());
        console.log(extent);
        extent = ol.proj.transformExtent(extent,'EPSG:3857','EPSG:4326');
        console.log(extent);
        extent = extent[1] + "," + extent[0] + "," + extent[3] + "," + extent[2];
        console.log(extent);

        var text = $(this).text();
        console.log(text)

        switch (text) {
            case "バス":
                var url = 'https://overpass-api.de/api/interpreter?data=[out:json];relation["route"="bus"](' + extent + ');>;out;';
                break;
            case "AED":
                var url = 'https://overpass-api.de/api/interpreter?data=[out:json];node["emergency"="defibrillator"](' + extent + ');out;';
                break;
            case "消火栓":
                var url = 'https://overpass-api.de/api/interpreter?data=[out:json];node["emergency"="fire_hydrant"](' + extent + ');out;';
                break;
            case "ハザード":
                var url = 'https://overpass-api.de/api/interpreter?data=[out:json];';
                url += '(';
                url += 'way["hazard_type"~"."](' + extent + ');';
                url += 'way["hazard_type"~"."](' + extent + ');>;';
                url += ');out body;';
                /*
                var url = 'https://overpass-api.de/api/interpreter?data=[out:json];';
                    url += '(';
                    url += 'way["hazard_type"="landslide"](' + extent + ');';
                    url += 'way["hazard_type"="landslide"](' + extent + ');>;';
                    url += ');out body;';
                */
                break;
        }
       // var url = 'https://overpass-api.de/api/interpreter?data=[out:json];node["religion"="shinto"](20,122,45,153);out;';
        //var url = 'https://overpass-api.de/api/interpreter?data=[out:json];node["highway"="bus_stop"](' + extent + ');out;';
        //var url = 'https://overpass-api.de/api/interpreter?data=[out:json];relation["route"="bicycle"](' + extent + ');>;out;';
        //var url = 'https://overpass-api.de/api/interpreter?data=[out:json];route["route"="bus"](' + extent + ');out;';
        //var url = 'https://overpass-api.de/api/interpreter?data=[out:json];way(' + extent + ');out;';
        //var url = 'https://overpass-api.de/api/interpreter?data=[out:json];relation["religion"="shinto"](' + extent + ');out;';
        //var url = 'https://overpass-api.de/api/interpreter?data=[out:json][timeout:2500];relation["religion"="shinto"];>;out;';

        $.ajax({
            type:"GET",
            url:url,
            dataType:"json",
            data:{
                //tgtUrl:tgtUrl,
            }
        }).done(function(json){
            //console.log(json);
            //console.log(JSON.stringify(json));
            var geojsonObject = osmtogeojson(json);
            //console.log(geojsonObject);
            var vectorSource = new ol.source.Vector({
                features: (new ol.format.GeoJSON()).readFeatures(geojsonObject,{featureProjection:'EPSG:3857'})
            });
            if(mapName==="map1") {
                overpassLayer1 = new ol.layer.Vector({
                    name: "overpassLayer",
                    source: vectorSource,
                    style: osmStyleFunction
                });
                overpassLayer1.set("altitudeMode", "clampToGround");
                eval(mapName).addLayer(overpassLayer1);
                overpassLayer1.setZIndex(9999);
            }else {
                overpassLayer2 = new ol.layer.Vector({
                    name: "overpassLayer",
                    source: vectorSource,
                    style: osmStyleFunction
                });
                overpassLayer2.set("altitudeMode", "clampToGround");
                eval(mapName).addLayer(overpassLayer2);
                overpassLayer2.setZIndex(9999);
            }
            //eval(mapName).removeLayer(layer);
            /*
            console.log(json);
            var elem = json["elements"];
            console.log(elem);

            overpassLayer1 = new ol.layer.Vector({
                source:new ol.source.Vector({}),
                style:commonstyleFunction
            });

            for(var i = 0; i < elem.length; i++) {
                //console.log(elem[i])
                var lonlat = [elem[i]["lon"],elem[i]["lat"]];
                //console.log(lonlat);
                lonlat = ol.proj.transform(lonlat,"EPSG:4326","EPSG:3857");
                //var coord = ol.proj.fromLonLat(lonlat);
                var geometry = new ol.geom.Point(lonlat);
                var newFeature = new ol.Feature({
                    geometry: geometry,
                    _fillColor:"red",

                });
                overpassLayer1.getSource().addFeature(newFeature);
            }
            map1.addLayer(overpassLayer1)
            */

        }).fail(function(json){
            alert("失敗!");
        });
    });
    function osmStyleFunction(feature, resolution) {
        var prop = feature.getProperties();
        //console.log(prop);
        var geoType = feature.getGeometry().getType();
        var fillColor = prop["_fillColor"];
        var hazardType = prop["tags"]["hazard_type"];
        var natural = prop["tags"]["natural"];
        if (hazardType){
            switch (hazardType){
                case "flood":
                    if(natural) {
                        fillColor = "rgba(0,0,255,0.6)";//青色
                    }else{
                        fillColor = "rgba(0,0,255,0.3)";//青色
                    }
                    break;
                case "landslide"://地滑り
                    if(natural) {
                        fillColor = "rgba(165,42,42,0.6)";//チョコレート色
                    }else{
                        fillColor = "rgba(165,42,42,0.3)";//チョコレート色
                    }
                    break;
            }
        }

        var zindex = prop["_zindex"];
        if(resolution>2445) {//ズーム６
            var pointRadius = 2;
        }else if(resolution>1222) {//ズーム７
            var pointRadius = 2;
        }else if(resolution>611){
            var pointRadius = 2;
        }else if(resolution>305) {
            var pointRadius = 4;
        }else if(resolution>152) {
            var pointRadius = 6;
        }else if(resolution>76) {
            var pointRadius = 8;
        }else if(resolution>38) {
            var pointRadius = 8;
        }else{
            var pointRadius = 8;
        }
        switch (geoType){
            case "LineString":
                var lineDash = eval(prop["_lineDash"]);
                var style = new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color:fillColor ? fillColor : "red",
                        lineDash:lineDash,
                        width:6
                    })
                });
                break;
            case "Point":
                var style = new ol.style.Style({
                    image: new ol.style.Circle({
                        radius:pointRadius,
                        fill: new ol.style.Fill({
                            color:fillColor ? fillColor : "orange"
                        }),
                        stroke: new ol.style.Stroke({color: "white", width: 1})
                    })
                });
                break;
            case "Polygon":
            case "MultiPolygon":
                if(fillColor==""){
                    fillColor = d3CategoryColor(d3CategoryColorI);
                    d3CategoryColorI++;
                    //console.log(d3CategoryColorI)
                    feature["D"]["_fillColor"] = fillColor;
                }
                if(!zindex) {
                    zindex = 0;
                }
                var style = new ol.style.Style({
                    fill: new ol.style.Fill({
                        color:fillColor ? fillColor : "rgba(200,100,100,0.4)"
                    }),
                    stroke: new ol.style.Stroke({
                        color: "gray",
                        width: 1
                    }),
                    zIndex:zindex
                });
                break;
            default:
        }
        return style;
    }
    //------------------------------------------------------------------------------------------------------------------
    //インフォメーションダイアログ生成
    $("body").on("click",".data-td-info",function(){
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        var targetLayer = $(this).parents("tr").find("input:checkbox[name='data-check']").val();
        var targetId = targetLayer.split("-")[1];
        //console.log(targetLayer);
        var dataLayerFilter = dataLayerArr.filter(function (item,index) {
           if(item.id===targetId) return true;
        });
        var obj = dataLayerFilter[0];
        //console.log(obj);
        var content = "<table class='data-info-tbl table table-bordered table-condensed'>";
            content += "<tr><td>データ名</td><td>" + obj["title"] + "</td></tr>";
            content += "<tr><td>出典</td><td>" + obj["origin"] + "</td></tr>";
            content += "<tr><td>説明</td><td>" + obj["detail"] + "</td></tr>";
            content += "</table>";
            content += "<a type='button' class='geojson-btn btn btn-xs btn-primary btn-block' data-targetlayer='" + targetLayer  + "'>geojson取得</a>";
        mydialog({
            id:"data-info-dialog",
            class:"data-info-dialog",
            map:mapName,
            title:"インフォメーション",
            content:content,
            top:"100px",
            left:"220px",
            rmDialog:true
        });
        return false;
    });
    //------------------------------------------------------------------------------------------------------------------
    //geojson取得
    $("body").on("click",".geojson-btn",function(){
        var targetLayer = $(this).data("targetlayer");
        var layer = dataLayer[targetLayer];
        if(layer) {
            var geojsonChar = new ol.format.GeoJSON().writeFeatures(layer.getSource().getFeatures(), {
                featureProjection: "EPSG:3857"
            });
            var type = "text/plain";
            var blob = new Blob([geojsonChar], {type: type});
            $(this).attr({
                "href": window.URL.createObjectURL(blob),
                "download": targetLayer.split("-")[1] + ".geojson"
            });
        }else{
            alert("まず最初に該当レイヤーを表示してください。")
        }
    });
    //------------------------------------------------------------------------------------------------------------------
    //データレイヤー　クリエイト　ファンクション
    function dataLayerCreate(dataLayerId,mapName,tgtTr,opacity,zoom){
        $.ajax({
            type:"POST",
            url:"php/geojson-create.php",
            dataType:"json",
            data:{
                dataLayerId:dataLayerId.split("-")[1],
                select:""
            }
        }).done(function(json){
            console.log(json);
            //console.log(json.geojson);
            //console.log(JSON.stringify(json.geojson));
            var geojsonObject = json.geojson;
            var vectorSource = new ol.source.Vector({
                features: (new ol.format.GeoJSON()).readFeatures(geojsonObject,{featureProjection:'EPSG:3857'})
            });
            //--------------------------------------
            console.log(dataLayerId);
            //if(dataLayerId.split("-")[1]!=="yakuba") {
            //    var layerName = "dataLayer";
            //}else{
            //    var layerName = "yakubaLayer";
            //}

            var layerName = dataLayerId.split("-")[1];

            switch (layerName) {
                case "noukenkikou1":
                    layerName = "noukenkikou1";
                    break;
                case "yakuba":
                    layerName = "yakubaLayer";
                    break;
                default:
                    layerName = "dataLayer";
            }

            dataLayer[dataLayerId] = new ol.layer.Vector({
                name:layerName,
                source:vectorSource,
                style:commonstyleFunction
            });
            dataLayer[dataLayerId].set("altitudeMode","clampToGround");
            eval(mapName).addLayer(dataLayer[dataLayerId]);
            dataLayer[dataLayerId].setOpacity(opacity);
            dataLayer[dataLayerId].setZIndex(9999);
            if(zoom) eval(mapName).getView().setZoom(zoom);
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
            //---------------------------------------------------------------------------
            //特有の処理
            if(dataLayerId.split("-")[1]==="senkyoku"){
                var features = dataLayer[dataLayerId].getSource().getFeatures();
                var valueAr = [];
                for (i = 0; i < features.length; i++) {
                    valueAr.push(features[i]["D"]["75歳以上比率"]);
                }
                var color100Ar = funcColor100(valueAr);
                var color100 = color100Ar[0];
                var min = color100Ar[2];
                var d3Color = d3.interpolateLab("white", "purple");
                for (i = 0; i < features.length; i++) {
                    var value = features[i]["D"]["75歳以上比率"];
                    var c100 = (value-min)/color100/100;
                    var color0 = new RGBColor(d3Color(c100));
                    var rgb = new RGBColor(d3Color(c100)).toRGB();
                    var rgba = "rgba(" + color0.r + "," + color0.g + "," + color0.b +"," + "0.9)";
                    var targetFillColor = d3Color(c100);
                    //var fillColor = d3Color(features[i]["D"]["75歳以上比率"]);
                    features[i]["D"]["_fillColor"] = rgba;
                    features[i]["D"]["_polygonHeight"] = c100*c100*100000;
                }
            }
        }).fail(function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest.responseText);
            alert("失敗!");
        });
    }
});
//------------------------------------------------------------------------------
//データレイヤーの重なり順をtr順に変更する。
function funcDataLayerSort(mapName){
    $("#" + mapName + " .data-tbl tbody tr").each(function(e){
        var layerId = $(this).find("input:checkbox[name='data-check']").val();
        console.log(layerId)
        dataLayer[layerId].setZIndex(-e + 9999);
    });
}
//----------------------------------------------------------------------------------------------------------------------

var dataLayerArr =
    [
        {
            "id":"miyazakizinzya",
            "title":"神社(宮崎県)",
            "origin":"<a href='http://m-shinsei.jp/'>宮巡 ～神主さんが作る宮崎県の神社紹介サイト～（運営：宮崎県神道青年会）</a>",
            "detail":"",
            "icon":"<i class='fa fa-tree fa-fw' style='color:gray;'></i>",
            "opacity":"0.5",
            "zoom":""

        },
        {
            "id":"youtotiiki",
            "title":"用途地域(宮崎県)",
            "origin":"<a href='http://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A29.html' target='_blank'>国土数値情報　用途地域データ</a>",
            "detail":"A29-11_45_GML　平成23年度",
            "icon":"<i class='fa fa-map fa-fw' style='color:orangered;'></i>",
            "opacity":"0.5",
            "zoom":""
        },
        /*
        {
            "id":"senkyoku",
            "title":"小選挙区75歳以上比率",
            "origin":"<a href='http://www.csis.u-tokyo.ac.jp/~nishizawa/senkyoku/' target='_blank'>衆議院議員選挙の小選挙区に関するデータを提供するページ</a>",
            "detail":"",
            "icon":"<i class='fa fa-area-chart fa-fw' style='color:purple;'></i>",
            "opacity":"1",
            "zoom":"6"
        },
        */
        {
            "id":"kousokudouro",
            "title":"高速道路(全国)",
            "origin":"<a href='http://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N06-v1_2.html' target='_blank'>国土数値情報　高速道路時系列データ</a>",
            "detail":"データ基準年:平成27年度",
            "icon":"<i class='fa fa-car fa-fw' style='color:red;'></i>",
            "opacity":"0.8",
            "zoom":""
        },
        {
            "id":"higasi9syuu",
            "title":"高速道路(東九州)",
            "origin":"",
            "detail":"",
            "icon":"<i class='fa fa-car fa-fw' style='color:red;'></i>",
            "opacity":"0.9",
            "zoom":""
        },
        {
            "id":"mitinoeki",
            "title":"道の駅(全国)",
            "origin":"",
            "detail":"試行中",
            "icon":"<i class='fa fa-car fa-fw' style='color:midnightblue;'></i>",
            "opacity":"1",
            "zoom":""
        },
        {
            "id":"koureisyasisetu",
            "title":"高齢者福祉施設(宮崎県)",
            "origin":"",
            "detail":"試行中",
            "icon":"<i class='fa fa-user fa-fw' style='color:black;'></i>",
            "opacity":"1",
            "zoom":""
        },
        {
            "id":"osusumesi",
            "title":"宮崎オススめし",
            "origin":"<a href='https://www.kanko-miyazaki.jp/gourmet/osusumeshi/' target='_blank'>宮崎オススめし</a>",
            "detail":"",
            "icon":"<i class='fa fa-cutlery fa-fw' style='color:orange;'></i>",
            "opacity":"1",
            "zoom":""
        },
        {
            "id":"tetudou",
            "title":"鉄道(全国)",
            "origin":"<a href='http://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N02-v2_3.html' target='_blank'>国土数値情報　鉄道データ</a>",
            "detail":"平成27（2015）年12月31日時点",
            "icon":"<i class='fa fa-train fa-fw' style='color:black;'></i>",
            "opacity":"1",
            "zoom":""
        },
        {
            "id":"suidou",
            "title":"給水区域(宮崎県)",
            "origin":"",
            "detail":"",
            "icon":"<i class='fa fa-user fa-fw' style='color:blue;'></i>",
            "opacity":"0.4",
            "zoom":""
        },
        {
            "id":"keisatu",
            "title":"警察署、交番等(宮崎県)",
            "origin":"<a href='http://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-P18.html' target='_blank'>国土数値情報　警察署データ</a>",
            "detail":"P18-12_45_GML　平成24年度",
            "icon":"<i class='fa fa-user fa-fw' style='color:black;'></i>",
            "opacity":"0.9",
            "zoom":""
        },
        {
            "id":"syougakuh28",
            "title":"小学校通学区域(宮崎県)",
            "origin":"<a href='http://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A27-v2_1.html' target='_blank'>国土数値情報　小学校区データ</a>",
            "detail":"A27-16_45_GML　平成28年度",
            "icon":"<i class='fa fa-user fa-fw' style='color:orange;'></i>",
            "opacity":"0.9",
            "zoom":""
        },
        {
            "id":"syougakuh28point",
            "title":"小学校(宮崎県)",
            "origin":"<a href='http://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A27-v2_1.html' target='_blank'>国土数値情報　小学校区データ</a>",
            "detail":"A27-16_45_GML　平成28年度",
            "icon":"<i class='fa fa-user fa-fw' style='color:orange;'></i>",
            "opacity":"0.9",
            "zoom":""
        },
        {
            "id":"tyuugakuh28",
            "title":"中学校通学区域(宮崎県)",
            "origin":"<a href='http://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A27-v2_1.html' target='_blank'>国土数値情報　中学校区データ</a>",
            "detail":"A32-16_45_GML　平成28年度",
            "icon":"<i class='fa fa-user fa-fw' style='color:orange;'></i>",
            "opacity":"0.9",
            "zoom":""
        },
        {
            "id":"tyuugakuh28point",
            "title":"中学校(宮崎県)",
            "origin":"<a href='http://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A32-v2_0.html' target='_blank'>国土数値情報　中学校区データ</a>",
            "detail":"A32-16_45_GML　平成28年度",
            "icon":"<i class='fa fa-user fa-fw' style='color:orange;'></i>",
            "opacity":"0.9",
            "zoom":""
        },
        {
            "id":"kinkyuuyusoudouro",
            "title":"緊急輸送道路(宮崎県)",
            "origin":"<a href='http://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N10-v1_1.html' target='_blank'>国土数値情報　緊急輸送道路データ</a>",
            "detail":"N10-15_45_GML　平成27年度",
            "icon":"<i class='fa fa-car fa-fw' style='color:gray;'></i>",
            "opacity":"0.9",
            "zoom":""
        },
        {
            "id":"siteihinanzyo",
            "title":"指定緊急避難場所(宮崎県)",
            "origin":"<a href='https://www.geospatial.jp/ckan/dataset/hinanbasho/resource/cb08a373-8aac-4455-ba20-7efd3cdd1971?view_id=c54c4e06-f9e2-41a4-8421-6dddf5d6977b' target='_blank'>G空間情報センター　指定緊急避難場所データ</a><br>出典：<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
            "detail":"",
            "icon":"<i class='fa fa-user fa-fw' style='color:navy;'></i>",
            "opacity":"0.9",
            "zoom":""
        },
        {
            "id":"yakuba",
            "title":"役場（全国）",
            "origin":"",
            "detail":"",
            "icon":"<i class='fa fa-user fa-fw' style='color:navy;'></i>",
            "opacity":"0.9",
            "zoom":""
        }
        /*
        ,
        {
            "id":"tunamisinsui",
           // "title":"津波浸水想定(宮崎県)",
            "title":"実験中!押しちゃダメ！",
            "origin":"",
            "detail":"",
            "icon":"<i class='fa fa-user fa-fw' style='color:navy;'></i>",
            "opacity":"0.9",
            "zoom":""
        }
        */
        ,
        {
            "id":"kyuusyuuCity",
            "title":"九州10万人以上都市",
            "origin":"",
            "detail":"",
            "icon":"<i class='fa fa-user fa-fw' style='color:red;'></i>",
            "opacity":"0.5",
            "zoom":""
        }
        ,
        {
            "id":"kokuteikouen",
            "title":"東九州の国定・国立公園",
            "origin":"",
            "detail":"",
            "icon":"<i class='fa fa-map fa-fw' style='color:green;'></i>",
            "opacity":"0.5",
            "zoom":""
        }
        ,
        {
            "id":"leisure",
            "title":"東九州を中心としたレジャー",
            "origin":"",
            "detail":"",
            "icon":"<i class='fa fa-map fa-fw' style='color:green;'></i>",
            "opacity":"0.7",
            "zoom":""
        }
        /*
        ,
        {
            "id":"noukenkikou1",
            "title":"農研機構test",
            "origin":"",
            "detail":"",
            "icon":"<i class='fa fa-map fa-fw' style='color:red;'></i>",
            "opacity":"0.7",
            "zoom":""
        }
        */

        

        /*
        ,
        {
            "id":"maizou1",
            "title":"    ",
            "origin":"",
            "detail":"",
            "icon":"<i class='fa fa-map fa-fw' style='color:green;'></i>",
            "opacity":"0.7",
            "zoom":""
        }
        */
    ];

