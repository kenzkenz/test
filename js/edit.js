var editLayer = new ol.layer.Vector({
    source: new ol.source.Vector()
});
$(function(){
    // Main control bar
    var mainbar1 = new ol.control.Bar();
    map1.addControl(mainbar1);

    // Edit control bar
    var editbar1 = new ol.control.Bar({
        toggleOne: true,	// one control active at the same time
        group:false			// group controls together
    });
    mainbar1.addControl(editbar1);

    // Add selection tool:
    //  1- a toggle control with a select interaction
    //  2- an option bar to delete / get information on the selected feature
    var sbar = new ol.control.Bar();
    sbar.addControl (new ol.control.TextButton({
            html: '<i class="fa fa-times"></i>',
            title: "Delete",
            handleClick: function() {
                var features = selectCtrl.getInteraction().getFeatures();
                if (!features.getLength()) info("Select an object first...");
                else info(features.getLength()+" object(s) deleted.");
                for (var i=0, f; f=features.item(i); i++) {
                    editLayer.getSource().removeFeature(f);
                }
                selectCtrl.getInteraction().getFeatures().clear();
            }
    }));
    /*
    sbar.addControl (new ol.control.TextButton({
            html: '<i class="fa fa-info"></i>',
            title: "Show informations",
            handleClick:function(){
                switch (selectCtrl.getInteraction().getFeatures().getLength()) {
                    case 0: info("Select an object first...");
                    break;
                case 1:
                    var f = selectCtrl.getInteraction().getFeatures().item(0);
                    info("Selection is a "+f.getGeometry().getType());
                    break;
                default:
                    info(selectCtrl.getInteraction().getFeatures().getLength()+ " objects seleted.");
                    break;
                }
            }
    }));
    */

    //------------------------------------------------------------------------------------------------------------------
    var editFeatureSelect = new ol.interaction.Select({
        layers:function(layer){
            return layer.get("selectable") == true;
        }
    });
    var modify = new ol.interaction.Modify({
        features:editFeatureSelect.getFeatures()
    });
    map1.addInteraction(modify);
    //------------------------------------------------------------------------------------------------------------------

    var selectCtrl = new ol.control.Toggle({
        html: '<i class="fa fa-hand-pointer-o"></i>',
        title: "選択",
        interaction: editFeatureSelect,
        bar: sbar,
        active:false
    });
    editbar1.addControl (selectCtrl);

    // Add editing tools
    var pedit = new ol.control.Toggle({//ポイント
            html: '<i class="fa fa-map-marker" ></i>',
            title: 'ポイント',
            interaction: new ol.interaction.Draw({
                type: 'Point',
                source:editLayer.getSource()
            })
    });
    editbar1.addControl (pedit);

    var ledit = new ol.control.Toggle({
            html: '<i class="fa fa-share-alt" ></i>',
            title: '線',
            interaction: new ol.interaction.Draw({
                type: 'LineString',
                source:editLayer.getSource()
            }),
            // Options bar associated with the control
            bar: new ol.control.Bar({
                controls:[
                    new ol.control.TextButton({
                        html: 'undo',
                        title: "Delete last point",
                        handleClick: function() {
                            try { ledit.getInteraction().removeLastPoint(); } catch(e){};
                        }
                    }),
                    new ol.control.TextButton({
                        html: 'Finish',
                        title: "finish",
                        handleClick: function() {// Prevent null objects on finishDrawing
                            var drawi = ledit.getInteraction();
                            var lkey = drawi.on('drawend', function(e) {
                                ol.Observable.unByKey(lkey);
                                //drawi.unByKey(lkey);
                                var c = e.feature.getGeometry().getCoordinates();
                                if (c.length < 2) {
                                    throw "Bad LineString";
                                }
                            });
                            try {
                                drawi.finishDrawing();
                            } catch(e) {
                                ol.Observable.unByKey(lkey);
                                    //drawi.unByKey(lkey);
                            }
                        }
                    })
                ]
            })
    });
    editbar1.addControl (ledit);

    var fedit = new ol.control.Toggle({
        html: '<i class="fa fa-bookmark-o fa-rotate-270" ></i>',
        title: 'ポリゴン',
        interaction: new ol.interaction.Draw({
            type: 'Polygon',
            source: editLayer.getSource()
        }),
        // Options bar ssociated with the control
        bar: new ol.control.Bar({
            controls:[
                new ol.control.TextButton({
                    html: 'undo',//'<i class="fa fa-mail-reply"></i>',
                    title: "undo last point",
                    handleClick: function() {
                        try { fedit.getInteraction().removeLastPoint(); } catch(e){}
                    }
                }),
                new ol.control.TextButton({
                    html: 'finish',
                    title: "finish",
                    handleClick: function() {// Prevent null objects on finishDrawing
                        var drawi = fedit.getInteraction();
                        var lkey = drawi.on('drawend', function(e) {
                            ol.Observable.unByKey(lkey);
                            //drawi.unByKey(lkey);
                            var c = e.feature.getGeometry().getCoordinates();
                            if (c[0].length < 4) {
                                throw "Bad Polygon";
                            }
                        });
                        try {
                            drawi.finishDrawing();
                        }catch(e){
                            ol.Observable.unByKey(lkey);
                            //drawi.unByKey(lkey);
                        }
                    }
                })
            ]
        })
    });
    editbar1.addControl ( fedit );

    // Add a simple push button to save features
    var save = new ol.control.Button({
        html: '<i class="fa fa-download"></i>',
        title: "Save",
        handleClick: function(e) {
            //var json= new ol.format.GeoJSON().writeFeatures(editLayer.getSource().getFeatures());
            var geojson = new ol.format.GeoJSON().writeFeatures(editLayer.getSource().getFeatures(), {
                featureProjection: "EPSG:3857"
            });
            //info(json);
            console.log(geojson);
        }
    });
    mainbar1.addControl (save);

    // Show info
    function info(i) {
        $("#info").html(i||"");
    }

});