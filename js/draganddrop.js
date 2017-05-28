var gpxLayer1 = null;
var profil1 = null;
var gpxLayer2 = null;
var profil2 = null;
$(function(){
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

    $("body").append("<div id='moveinfo-div'></div>");

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
    /*
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


    var styleFunction = function(feature, resolution) {
        var featureStyleFunction = feature.getStyleFunction();
        if (featureStyleFunction) {
            return featureStyleFunction.call(feature, resolution);
        } else {
            return defaultStyle[feature.getGeometry().getType()];
        }
    };

    //ドラッグアンドドロップでレイヤーを作る
    dragAndDropInteraction1.on('addfeatures', function(event) {
        map1.removeLayer(gpxLayer1);
        console.log(event);
        console.log(event.file);
        if(event.features==null) {
            var csvarr = [];
            var file_reader = new FileReader();
            file_reader.readAsBinaryString(event.file);//ここ超重要。文字コード変換のために必要
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
                    csvarr.push(split);
                });
                console.log(csvarr);

            };
            return;
        }
        var vectorSource = new ol.source.Vector({
            features: event.features,
            //format: new ol.format.GPX()
        });
        gpxLayer1 = new ol.layer.Vector({
            source: vectorSource,
            style: styleFunction
            //style:style
        });
        map1.addLayer(gpxLayer1);
        map1.getView().fit(vectorSource.getExtent());
        gpxLayer1.setZIndex(9999);

        var faturesAr = vectorSource.getFeatures();
        for (var i=0; i < faturesAr.length; i++) {
            if(faturesAr[i].getGeometry().getType()!="Point") {
                profil1.setGeometry(faturesAr[i]);
                break;
            }
        }
        //profil1.setGeometry(vectorSource.getFeatures()[0]);
        profil1.show();

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
        profil1.on(["over","out"], function(e){
            if (e.type=="over") profil1.popup(e.coord[2]+" m");
            drawPoint(e);
        });
    });


    dragAndDropInteraction2.on('addfeatures', function(event) {
        map2.removeLayer(gpxLayer2);
        console.log(event);
        console.log(event.file);
        if(event.features==null) {
            return;
        }
        var vectorSource = new ol.source.Vector({
            features: event.features,
            //format: new ol.format.GPX()
        });
        gpxLayer2 = new ol.layer.Vector({
            source: vectorSource,
            style: styleFunction
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
        //profil.setGeometry(vectorSource.getFeatures()[0]);
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

});