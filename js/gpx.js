$(function(){


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

    var styleFunction = function(feature, resolution) {
        var featureStyleFunction = feature.getStyleFunction();
        if (featureStyleFunction) {
            return featureStyleFunction.call(feature, resolution);
        } else {
            return defaultStyle[feature.getGeometry().getType()];
        }
    };

    var dragAndDropInteraction = new ol.interaction.DragAndDrop({
        formatConstructors: [
            ol.format.GPX,
            ol.format.GeoJSON,
            ol.format.IGC,
            ol.format.KML,
            ol.format.TopoJSON
        ]
    });

    map1.addInteraction(dragAndDropInteraction);

    dragAndDropInteraction.on('addfeatures', function(event) {
        var vectorSource = new ol.source.Vector({
            features: event.features
        });
        var gpxLayer = new ol.layer.Vector({
            source: vectorSource,
            style: styleFunction
        });
        map1.addLayer(gpxLayer);
        map1.getView().fit(vectorSource.getExtent());
        gpxLayer.setZIndex(9999);
    });

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
            //document.getElementById('info').innerHTML = info.join(', ') || '&nbsp';
            console.log(info.join(','));
            console.log(pixel);
            $("#moveinfo-div").css({
               "top":pixel[1] + "px",
               "left":pixel[0] + "px",
            });
            $("#moveinfo-div").html(info.join(','));
        } else {
            //document.getElementById('info').innerHTML = '&nbsp;';
            $("#moveinfo-div").html("");
        }
    };



    map1.on('pointermove', function(evt) {
        if (evt.dragging) {
            return;
        }
        var pixel = map1.getEventPixel(evt.originalEvent);
        //console.log(pixel);
        displayFeatureInfo(pixel);
    });


});