//var editLayer = null;
var profil1 = null;
var gpxLayer2 = null;
var profil2 = null;
var csvLayer1 = null;
var csvLayer2 = null;
var imgCenterPointLayer1 = null;
var imgTargetPointLayer1 = null;
var imgTargetPointLayer2 = null;
$(function(){
    var cityObjAr = [];
    var inChar = "";
    var valueAr =[];
    var mapName = null;
    var csvarr = [];
    var iro = null;
    var suuti = null;
    var geoimg = null;
    //ドラッグアンドドロップのインタラクション-----------------------------
    var dragAndDropInteraction1 = new ol.interaction.DragAndDrop({
        formatConstructors: [
            ol.format.GPX,
            ol.format.GeoJSON,
            ol.format.IGC,
            ol.format.KML,
            ol.format.TopoJSON
        ]
    });
    map1.addInteraction(dragAndDropInteraction1);
    var dragAndDropInteraction2 = new ol.interaction.DragAndDrop({
        formatConstructors: [
            ol.format.GPX,
            ol.format.GeoJSON,
            ol.format.IGC,
            ol.format.KML,
            ol.format.TopoJSON
        ]
    });
    map2.addInteraction(dragAndDropInteraction2);
    //----------------------------------------------------------------
    profil1 = new ol.control.Profil();
    map1.addControl(profil1);
    profil2 = new ol.control.Profil();
    map2.addControl(profil2);
    //----------------------------------------------------------------
    //$("body").append("<div id='moveinfo-div'></div>");

    var defaultStyle = {
        'Point': new ol.style.Style({
            image: new ol.style.Circle({
                fill: new ol.style.Fill({
                    color: 'blue'
                }),
                radius: 7,
                stroke: new ol.style.Stroke({
                    color: 'white',
                    width: 1
                })
            })
        }),
        'LineString': new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#f00',
                width: 3
            })
        }),
        'Polygon': new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(0,255,255,0.5)'
            }),
            stroke: new ol.style.Stroke({
                color: '#0ff',
                width: 1
            })
        }),
        'MultiPoint': new ol.style.Style({
            image: new ol.style.Circle({
                fill: new ol.style.Fill({
                    color: 'rgba(255,0,255,0.5)'
                }),
                radius: 5,
                stroke: new ol.style.Stroke({
                    color: '#f0f',
                    width: 1
                })
            })
        }),
        'MultiLineString': new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 3
            })
        }),
        'MultiPolygon': new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(0,0,255,0.5)'
            }),
            stroke: new ol.style.Stroke({
                color: '#00f',
                width: 1
            })
        })
    };




    /*星
    var style =
        [	new ol.style.Style(
            {	image: new ol.style.RegularShape(
                {	radius: 10,
                    radius2: 5,
                    points: 5,
                    fill: new ol.style.Fill({ color: 'blue' })
                }),
                stroke: new ol.style.Stroke(
                    {	color: [0,0,255],
                        width: 2
                    }),
                fill: new ol.style.Fill(
                    {	color: [0,0,255,0.3]
                    })
            })
        ];
    */

    var gpxStyleFunction = function(feature, resolution) {
        //var featureStyleFunction = feature.getStyleFunction();
        //if (featureStyleFunction) {
        //    return featureStyleFunction.call(feature, resolution);
        //} else {
            return defaultStyle[feature.getGeometry().getType()];
        //}
    };

    //ドラッグアンドドロップでレイヤーを作る
    dragAndDropInteraction1.on('addfeatures', function(event) {
        mapName = "map1";
        map1.removeLayer(editLayer);
        var fileExtension = event["file"]["name"].split(".")[event["file"]["name"].split(".").length - 1]
        console.log(fileExtension);
        if (event.features == null) {
            var fileExtension = event["file"]["name"].split(".")[event["file"]["name"].split(".").length - 1];
            switch (fileExtension) {
                case "csv":
                    csvRead(event.file);
                    break;
                case "jpg":
                    imgSet(event.file);
                    break;
                case "":

                    break;
                case "":

                    break;

                default:
            }
            return;
        }
        var vectorSource = new ol.source.Vector({
            features: event.features,
            //format: new ol.format.GPX()
        });
        if (fileExtension !== "gpx") {
            var style = commonstyleFunction;
        }else{
            var style = gpxStyleFunction;
        }
        editLayer = new ol.layer.Vector({
            name:"editLayer-import",
            source: vectorSource,
            //style: styleFunction
            style:style
            //style:style
        });
        editLayer.set("altitudeMode","clampToGround");
        map1.addLayer(editLayer);
        map1.getView().fit(vectorSource.getExtent());
        editLayer.setZIndex(9999);
        editLayer.set("selectable",true);

        if(fileExtension==="gpx") {
            var faturesAr = vectorSource.getFeatures();
            for (var i = 0; i < faturesAr.length; i++) {
                if (faturesAr[i].getGeometry().getType() != "Point") {
                    profil1.setGeometry(faturesAr[i]);
                    break;
                }
            }
            //profil1.setGeometry(vectorSource.getFeatures()[0]);
            profil1.show();
            var pt = new ol.Feature(new ol.geom.Point([0, 0]));
            pt.setStyle([]);
            vectorSource.addFeature(pt);

            function drawPoint(e) {
                if (!pt) return;
                if (e.type == "over") {
                    // Show point at coord
                    pt.setGeometry(new ol.geom.Point(e.coord));
                    pt.setStyle(null);
                } else {
                    // hide point
                    pt.setStyle([]);
                }
            }

            profil1.on(["over", "out"], function (e) {
                if (e.type == "over") profil1.popup(e.coord[2] + " m");
                drawPoint(e);
            });
        }

    });
    //-----------------------------------------------------------------------------------------------------------
    dragAndDropInteraction2.on('addfeatures', function(event) {
        mapName = "map2";
        map2.removeLayer(gpxLayer2);
        var fileExtension = event["file"]["name"].split(".")[event["file"]["name"].split(".").length - 1]
        console.log(fileExtension);
        if(event.features==null) {
            var fileExtension = event["file"]["name"].split(".")[event["file"]["name"].split(".").length-1];
            switch (fileExtension){
                case "csv":
                    csvRead(event.file);
                    break;
                case "":

                    break;
                case "":

                    break;
                case "":

                    break;

                default:
            }
            return;
        }
        var vectorSource = new ol.source.Vector({
            features: event.features,
            //format: new ol.format.GPX()
        });
        var style = gpxStyleFunction;
        gpxLayer2 = new ol.layer.Vector({
            name:"gpxLayer",
            source: vectorSource,
            style: style
            //style:style
        });
        map2.addLayer(gpxLayer2);
        map2.getView().fit(vectorSource.getExtent());
        gpxLayer2.setZIndex(9999);

        var faturesAr = vectorSource.getFeatures();
        for (var i=0; i < faturesAr.length; i++) {
            if(faturesAr[i].getGeometry().getType()!="Point") {
                profil2.setGeometry(faturesAr[i]);
                break;
            }
        }
        profil2.show();

        var pt = new ol.Feature(new ol.geom.Point([0,0]));
        pt.setStyle([]);
        vectorSource.addFeature(pt);

        function drawPoint(e){
            if (!pt) return;
            if (e.type=="over"){
                // Show point at coord
                pt.setGeometry(new ol.geom.Point(e.coord));
                pt.setStyle(null);
            }else{
                // hide point
                pt.setStyle([]);
            }
        }
        profil2.on(["over","out"], function(e){
            if (e.type=="over") profil2.popup(e.coord[2]+" m");
            drawPoint(e);
        });
    });
    //インフォに書き込む
    var displayFeatureInfo = function(pixel) {
        var features = [];
        map1.forEachFeatureAtPixel(pixel, function(feature) {
            features.push(feature);
        });
        if (features.length > 0) {
            var info = [];
            var i, ii;
            for (i = 0, ii = features.length; i < ii; ++i) {
                info.push(features[i].get('name'));
            }
            if(info) {
                $("#moveinfo-div").css({
                    "top": pixel[1] + "px",
                    "left": pixel[0] + "px",
                });
                $("#moveinfo-div").html(info.join(','));
            }

        } else {
            $("#moveinfo-div").html("");
        }
    };
    /*
    map1.on('pointermove', function(evt) {
        if (evt.dragging) {
            return;
        }
        var pixel = map1.getEventPixel(evt.originalEvent);
        displayFeatureInfo(pixel);
    });
    */
    //-------------------------------------------------------------------------------------
    function imgSet(file) {
        var bloburl = window.URL.createObjectURL(file);
        console.log(bloburl);
        var center = map1.getView().getCenter();
        console.log(center);
        var scaleX = 1;
        var scaleY = 1;
        var xmin = 0;
        var ymin = 0;
        var xmax = 50000;
        var ymax = 50000;

        var geoimageSource = new ol.source.GeoImage({
            url:bloburl,
            imageCenter: center,
            imageScale: [scaleX,scaleY],
            imageCrop: [xmin,ymin,xmax,ymax],
            imageRotate: 0,
            projection: 'EPSG:3857',
            crossOrigin:"anonymous"
        });

        geoimg = new ol.layer.Image({
            name: "Georef",
            opacity: 1,
            source:geoimageSource
        });

        console.log(geoimageSource.getScale());

        geoimg.set("altitudeMode","clampToGround");
        map1.addLayer(geoimg);
        //map1.getView().fit(geoimg.getSource().getExtent());
        geoimg.setZIndex(9999);

        var content = "";
            content += "<div style='display:none'>中心：lon<input class ='centerLon imgset' type='number' value='" + center[0] + "' step='10'>";
            content += "lat<input class ='centerLat imgset' type='number' value='" + center[1] + "' step='10'><br></div>";
            //content += "倍率：横<input class ='scaleX imgset' type='number' value='1' step='0.01'>";
            //content += "縦<input class ='scaleY imgset' type='number' value='1' step='0.01'>";
            content += "倍率：<input class ='scaleXY imgset' type='number' value='1' step='0.01'><br>";
            //content += "透過度<input class ='imgopa imgset' type='number' value='1' step='0.01'>";
            content += "<div class='imgopa-slider'></div>";
            //content += "<button type='button' class='img-btn btn btn-primary btn-block'>反映</button>";
        mydialog({
            id:"img-dialog-" + mapName,
            class:"img-dialog",
            map:mapName,
            title:"img",
            content:content,
            top:"55px",
            left:"20px",
            //width:"400px",
            rmDialog:true,
            //hide:true,
            minMax:false
        });
        imgCenterPointLayerCreate();

        $(".imgopa-slider").slider({
            min:0,max:1,value:1,step:0.01,
            slide: function(event, ui){
                geoimg.setOpacity(ui.value);
            }
        });
    }
    //-----------------------------------------------------------------------------
    function imgCenterPointLayerCreate(coord) {
        map1.removeLayer(imgCenterPointLayer1);
        if(!coord) {
            coord = map1.getView().getCenter();
        }
        var imgPointSsource = new ol.source.Vector({
            features: [
                new ol.Feature({
                    geometry: new ol.geom.Point(coord)
                })
            ]
        });
        imgCenterPointLayer1 = new ol.layer.Vector({
            name: "imgPointLayer",
            source: imgPointSsource,
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 6,
                    fill: new ol.style.Fill({color: "red"}),
                    stroke: new ol.style.Stroke({color: "white", width: 1})
                })
            })
        });
        imgCenterPointLayer1.set("altitudeMode","clampToGround");
        map1.addLayer(imgCenterPointLayer1);
        imgCenterPointLayer1.setZIndex(9999);
    }
    //-----------------------------------------------------------------------------
    var coordDiff = [];
    function imgTargetPointLayerCreate(coord) {


        if(!geoimg) return;


        map1.removeLayer(imgTargetPointLayer1);
       // if(coordDiff.length>0){
         //   coord = [coord[0] + coordDiff[0],coord[1] + coordDiff[1]];
       // }
        var imgPointSsource = new ol.source.Vector({
            features: [
                new ol.Feature({
                    geometry: new ol.geom.Point(coord)
                })
            ]
        });
        imgTargetPointLayer1 = new ol.layer.Vector({
            name: "imgTargetPointLayer",
            source: imgPointSsource,
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 6,
                    fill: new ol.style.Fill({color: "blue"}),
                    stroke: new ol.style.Stroke({color: "white", width: 1})
                })
            })
        });
        imgTargetPointLayer1.set("altitudeMode","clampToGround");
        map1.addLayer(imgTargetPointLayer1);
        imgTargetPointLayer1.setZIndex(10000);

        if(imgCenterPointLayer1) {
            var imgCenterPointLayerCord = imgCenterPointLayer1.getSource().getFeatures()[0].getGeometry().getCoordinates();
            console.log(imgCenterPointLayerCord);
            coordDiff = [coord[0]-imgCenterPointLayerCord[0],coord[1]-imgCenterPointLayerCord[1]]
        }
        console.log(coordDiff);
    }
    //-----------------------------------------------------------------------------
    function geoimgChange(){

        if(coordDiff.length>0) {
            var centerLon = Number($(".centerLon").val()) - coordDiff[0];
            var centerLat = Number($(".centerLat").val()) - coordDiff[1];
            imgTargetPointLayerCreate([centerLon,centerLat]);
        }else{
            var centerLon = $(".centerLon").val();
            var centerLat = $(".centerLat").val();
        }

        var scaleX = $(".scaleXY").val();
        var scaleY = $(".scaleXY").val();
        var opacity = $(".imgopa").val();
        geoimg.getSource().setCenter([centerLon,centerLat]);
        geoimg.getSource().setScale([scaleX,scaleY]);
        geoimg.setOpacity(opacity);
        //imgCenterPointLayerCreate();
    }
    //----------------------------------------------------------------------------
    $("body").on("change",".scaleXY",function() {
        var scaleXY = $(".scaleXY").val();
        geoimg.getSource().setScale([scaleXY,scaleXY])
        /*
        if(coordDiff.length>0) {
            console.log(99999)
            var centerLon = Number($(".centerLon").val()) - coordDiff[0];
            var centerLat = Number($(".centerLat").val()) - coordDiff[1];
            //imgTargetPointLayerCreate([centerLon,centerLat]);
        }else{
            var centerLon = $(".centerLon").val();
            var centerLat = $(".centerLat").val();
        }
        geoimg.getSource().setCenter([centerLon,centerLat]);
        */
    });
    //----------------------------------------------------------------------------
    $("body").on("change",".imgopa",function() {
        var opacity = $(".imgopa").val();
        geoimg.setOpacity(opacity);
    });
    //----------------------------------------------------------------------------
    $("body").on("change",".imgset",function() {
        //geoimgChange();
    });
    //----------------------------------------------------------------------------
    $("body").on("click",".img-btn",function() {
        var centerLon = $(".centerLon").val();
        var centerLat = $(".centerLat").val();

        geoimg.getSource().setCenter([centerLon,centerLat]);

    });
    //---------------------------------------------------------------------------
    map2.on("dblclick",function(evt){
        var coord = evt.coordinate;
        console.log(ol.proj.transform(evt.coordinate,"EPSG:3857","EPSG:4326"));
        $(".centerLon").val(coord[0]);
        $(".centerLat").val(coord[1]);
        geoimgChange();
        imgCenterPointLayerCreate(coord);
        if(coordDiff.length>0){
            imgTargetPointLayerCreate(coord);
        }

        
        map2.removeLayer(imgTargetPointLayer2);
        var imgPointSsource = new ol.source.Vector({
            features: [
                new ol.Feature({
                    geometry: new ol.geom.Point(coord)
                })
            ]
        });
        imgTargetPointLayer2 = new ol.layer.Vector({
            name: "imgPointLayer",
            source: imgPointSsource,
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 6,
                    fill: new ol.style.Fill({color: "red"}),
                    stroke: new ol.style.Stroke({color: "white", width: 1})
                })
            })
        });
        imgTargetPointLayer2.set("altitudeMode","clampToGround");
        map2.addLayer(imgTargetPointLayer2);
        imgTargetPointLayer2.setZIndex(9999);
        
    });
    //---------------------------------------------------------------------------
    map1.on("dblclick",function(evt){
        var coord = evt.coordinate;
        console.log(ol.proj.transform(evt.coordinate,"EPSG:3857","EPSG:4326"));
        $(".centerLon").val(coord[0]);
        $(".centerLat").val(coord[1]);
       //geoimgChange()

        imgTargetPointLayerCreate(coord)

        //imgCenterPointLayerCreate();
    });



    //-------------------------------------------------------------------------------------
    function csvRead(file) {
        csvarr = [];
        var file_reader = new FileReader();
        file_reader.readAsBinaryString(file);//ここ超重要。文字コード変換のために必要
        file_reader.onload = function(e) {
            //console.log(file_reader.result);
            var result = e.target.result;
            var sjisArray = str2Array(result);
            var uniArray = Encoding.convert(sjisArray, 'UNICODE', 'SJIS');
            var result = Encoding.codeToString(uniArray);
            //console.log(result); //csvデータ(string)
            // 選択したCSVファイルから２次元配列を生成
            var rows = result.split("\n");
            var max = 0;
            rangemin = 9999999999;
            $(rows).each(function () {
                var split = this.replace("\r", "").split(/,|\t/);//\rが余計についてしまうので取った上でsplit
                //console.log(split[0]);
                if(split[0]) {//先頭列に何も書いていないときは抜ける。
                    csvarr.push(split);
                }else{
                    return false;
                }
            });
            cityObjAr = [];
            var cityCode = null;
            suuti = null;
            iro = null;
            inChar = "";
            valueAr = [];
            //console.log(csvarr);
            for (var i=0; i < csvarr.length; i++) {
                if(i===0) {
                    for (var j = 0; j < csvarr[0].length; j++) {
                        /*
                        if (csvarr[0][j] == "経度") var lon = j;
                        if (csvarr[0][j] == "緯度") var lat = j;
                        if (csvarr[0][j] == "lon") var lon = j;
                        if (csvarr[0][j] == "lat") var lat = j;
                        if (csvarr[0][j] == "百分率") var hyaku = j;
                        if (csvarr[0][j] == "area") {
                            var area = j;
                            layerTypeFlg = "area";
                        }
                        */
                        if (csvarr[0][j] === "市町村コード") cityCode = j;
                        if (csvarr[0][j] === "数値") suuti = j;
                        if (csvarr[0][j] === "色") iro = j;
                    }
                }else{
                    //-----------------------------------------------
                    var obj = {
                                "citycode":csvarr[i][cityCode],
                                "prop":{
                                    "citycode":csvarr[i][cityCode],
                                    "suuti":csvarr[i][suuti],
                                    "iro":csvarr[i][iro]
                                }
                    };
                    cityObjAr.push(obj);
                    //-----------------------------------------------
                    if(csvarr[i][cityCode]){
                        inChar += "," + csvarr[i][cityCode];
                        valueAr.push(csvarr[i][suuti]);
                    }
                }
            }
            $("#modal-div").modal();
            console.log(inChar);
        };
    }
    //----------------------------------------------------------------------------
    $("body").on("click","#suuti-btn",function() {
        csvLayerCreate("suuti");
        $("#modal-div").modal("hide");
    });
    //----------------------------------------------------------------------------
    $("body").on("click","#iro-btn",function() {
        csvLayerCreate("iro");
        $("#modal-div").modal("hide");
    });
    //-----------------------------------------------------------------------------
    //ダイアログを消した時
    $("body").on("click","#map1 .csv-dialog .dialog-hidden",function(){
        map1.removeLayer(csvLayer1);
    });
    $("body").on("click","#map2 .csv-dialog .dialog-hidden",function(){
        map2.removeLayer(csvLayer2);
    });
    //----------------------------------------------------------------------------
    //CSV
    function csvLayerCreate(coll){
        var color100Ar = funcColor100(valueAr);
        var color100 = color100Ar[0];
        var min = color100Ar[2];
        var d3Color = d3.interpolateLab("white", "red");
        var d3ColorM = d3.interpolateLab("white", "blue");
        inChar = inChar.substr(1);
        var citycode = inChar;
        $.ajax({
            type:"GET",
            url:"php/city.php",
            dataType:"json",
            data:{
                layerid:"gyouseikai",
                citycode:citycode
            }
        }).done(function(json){
            if(mapName==="map1") {
                map1.removeLayer(csvLayer1);
            }else{
                map2.removeLayer(csvLayer2);
            }
            var geojsonObject = json.geojson;
            var vectorSource = new ol.source.Vector({
                features: (new ol.format.GeoJSON()).readFeatures(geojsonObject,{featureProjection:'EPSG:3857'})
            });
            var csvStyleFunction1 = function(feature, resolution) {
                var fillColor = feature["I"]["_fillColor"];
                var val = $("input:radio[name='csv-radio-map1']:checked").val();
                if(val==="on") {
                    var text = String(feature["I"]["数値"]);
                }else{
                    var text = "";
                }
                var textColor = feature["I"]["_textColor"];
                style = [
                    new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color:"gray",
                            width: 1
                        }),
                        fill: new ol.style.Fill({
                            color:fillColor ? fillColor:"rgba(0,120,200,0.2)"
                        }),
                        text: new ol.style.Text({
                            font: "14px helvetica,sans-serif",
                            text: text,
                            fill: new ol.style.Fill({
                                color:textColor
                            })
                        })
                    })
                ];
                return style;
            };
            var csvStyleFunction2 = function(feature, resolution) {
                var fillColor = feature["I"]["_fillColor"];
                var val = $("input:radio[name='csv-radio-map2']:checked").val();
                if(val==="on") {
                    var text = String(feature["I"]["数値"]);
                }else{
                    var text = "";
                }
                var textColor = feature["I"]["_textColor"];
                style = [
                    new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color:"gray",
                            width: 1
                        }),
                        fill: new ol.style.Fill({
                            color:fillColor ? fillColor:"rgba(0,120,200,0.2)"
                        }),
                        text: new ol.style.Text({
                            font: "14px helvetica,sans-serif",
                            text: text,
                            fill: new ol.style.Fill({
                                color:textColor
                            })
                        })
                    })
                ];
                return style;
            };
            if(mapName==="map1") {
                csvLayer1 = new ol.layer.Vector({
                    name:"csvLayer",
                    zinkouset:"on",
                    source: vectorSource,
                    style: csvStyleFunction1
                });
                csvLayer1.set("altitudeMode","clampToGround");
                map1.addLayer(csvLayer1);
                map1.getView().fit(vectorSource.getExtent());
                csvLayer1.setZIndex(9999);
                var features = csvLayer1.getSource().getFeatures();
            }else{
                csvLayer2 = new ol.layer.Vector({
                    name:"csvLayer",
                    zinkouset:"on",
                    source: vectorSource,
                    style: csvStyleFunction2
                });
                csvLayer2.set("altitudeMode","clampToGround");
                map2.addLayer(csvLayer2);
                map2.getView().fit(vectorSource.getExtent());
                csvLayer2.setZIndex(9999);
                var features = csvLayer2.getSource().getFeatures();
            }
            //ヘッダーを作る。
            var thHtml = "<th></th>";
            for (var i = 0; i < csvarr[0].length; i++) {
                console.log(csvarr[0][i]);
                thHtml += "<th>";
                thHtml += csvarr[0][i];
                thHtml += "</th>";
            }
            //ボディを作る。
            console.log(iro);
            console.log(suuti);
            var tdHtml = "";
            for (var i = 1; i < csvarr.length; i++) {
                tdHtml += "<tr class='tr-" + csvarr[i][0] +  "'><td class='csv-lank-td'></td>";
                for (var j = 0; j < csvarr[i].length; j++) {
                    if(j===iro) {
                        tdHtml += "<td style='background:" + csvarr[i][j] + ";'>";
                        tdHtml += csvarr[i][j];
                        tdHtml += "</td>";
                    }else if(j===suuti) {
                        tdHtml += "<td style='text-align:right;'>";
                        tdHtml += csvarr[i][j];
                        tdHtml += "</td>";
                    }else{
                        tdHtml += "<td>";
                        tdHtml += csvarr[i][j];
                        tdHtml += "</td>";
                    }
                }
                tdHtml += "</tr>"
            }
            var tblHtml = "<table class='csv-tbl table table-bordered table-hover tablesorter'>";
                tblHtml += "<thead><tr class='info'>";
                tblHtml += thHtml;
                tblHtml += "</tr></thead><tbody>";
                tblHtml += tdHtml;
                tblHtml += "</tbody></table>";
            var content = "";//"<div style='width:270px;'></div>";//ダイアログ幅が短くならないようにダミーのdiv
                content += "ラベル";
                content += "　<label><input type='radio' name='csv-radio-" + mapName + "' value='on' checked> on</label>";
                content += "　<label><input type='radio' name='csv-radio-" + mapName + "' value='off'> off</label>　　　　　　　";
                content += "<div class='csv-tbl-div minmax-div'>" + tblHtml + "</div>";

            $("#" + mapName + " .csv-dialog").remove();//ダイアログを削除

            mydialog({
                id:"csv-dialog-" + mapName,
                class:"csv-dialog",
                map:mapName,
                title:"CSV取り込み",
                content:content,
                top:"55px",
                left:"20px",
                //width:"400px",
                rmDialog:true,
                //hide:true,
                minMax:true
            });
            funcHaikeiTblDivHeight();
            $("#" + mapName + " .csv-tbl").tablesorter({sortList:[[suuti+1,1]]});
            $("#" + mapName + " .csv-tbl tbody tr").each(function(i) {
                $(this).find(".csv-lank-td").html(i+1);
            });
            $("#" + mapName + " .csv-tbl").trigger("update");

            $("input:radio[name='csv-radio-" + mapName + "']").iCheck({
                checkboxClass: "icheckbox_flat-blue",
                radioClass: "iradio_square-blue"
            });
            $("input:radio[name='csv-radio-" + mapName + "']").on("ifChecked", function (event) {

                var mapObj = funcMaps($(this));
                var mapName = mapObj["name"];
                console.log($("input:radio[name='csv-radio-" + mapName + "']:checked").val());
                if(mapName==="map1") {
                    csvLayer1.getSource().changed();
                }else{
                    csvLayer2.getSource().changed();
                }

                //funcHaikeiLayerSort(mapObj["element"], mapObj["name"]);
            });

            for (i=0; i<features.length; i++){
                for (j=0; j<cityObjAr.length; j++) {
                    var value = Number(cityObjAr[j]["prop"]["suuti"]);
                    if (features[i]["I"]["コード"] === cityObjAr[j]["citycode"]) {
                        if(coll==="suuti") {
                            if (value > 0) {//値がプラスだったとき
                                var c100 = (value - min) / color100 / 100;
                                var color0 = new RGBColor(d3Color(c100));
                                var textColor = funcTextColor(color0.r,color0.g,color0.b);//背景に応じて色を変える。
                                var rgb = new RGBColor(d3Color(c100)).toRGB();
                                var rgba = "rgba(" + color0.r + "," + color0.g + "," + color0.b + "," + "0.8)";
                                var targetFillColor = d3Color(c100);
                            } else {//値がマイナスだったとき
                                var c100 = (0 - value) / color100 / 100;
                                var color0 = new RGBColor(d3ColorM(c100));
                                var rgb = new RGBColor(d3ColorM(c100)).toRGB();
                                var rgba = "rgba(" + color0.r + "," + color0.g + "," + color0.b + "," + "0.8)";
                                var targetFillColor = d3ColorM(c100);
                            }
                            if (value > 0) {
                                features[i]["I"]["_polygonHeight"] = (c100 * 50000) + 1000;
                            } else {
                                features[i]["I"]["_polygonHeight"] = 1000;
                            }
                            $("#" + mapName + " .csv-tbl tbody").find(".tr-" + features[i]["I"]["コード"] + " td").css({"background":rgb});
                        }else{//色のとき
                            var color = new RGBColor(cityObjAr[j]["prop"]["iro"]);
                            var textColor = funcTextColor(color.r,color.g,color.b);//背景に応じて色を変える。
                            var rgba = "rgba(" + color.r + "," + color.g + "," + color.b + "," + "0.7)";
                            if (value > 0) {
                                var c100 = (value - min) / color100 / 100;
                                features[i]["I"]["_polygonHeight"] = (c100 * 50000) + 1000;
                            } else {
                                features[i]["I"]["_polygonHeight"] = 1000;
                            }
                        }
                        features[i]["I"]["_fillColor"] = rgba;
                        features[i]["I"]["数値"] = value;
                        features[i]["I"]["_textColor"] = textColor;
                    }
                }
            }
            if(mapName==="map1") {
                csvLayer1.getSource().changed();
            }else{
                csvLayer2.getSource().changed();
            }
            //----------------------------------------------------------
        }).fail(function(){
            alert("失敗しました。ファイルを確認してください。");
        });
    }
});