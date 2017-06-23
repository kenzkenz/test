var editLayer = new ol.layer.Vector({
    name:"editLayer",
    source: new ol.source.Vector(),
    style:commonstyleFunction
});
$(function(){
    // Main control bar
    var mainbar1 = new ol.control.Bar();
    map1.addControl(mainbar1);
    // Edit control bar
    var editbar1 = new ol.control.Bar({
        toggleOne: true,	// one control active at the same time
        group:false		// group controls together
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
                //var features = selectCtrl.getInteraction().getFeatures();
                var features = editFeatureSelect.getFeatures();
                if (!features.getLength()) info("Select an object first...");
                else info(features.getLength()+" object(s) deleted.");
                for (var i=0, f; f=features.item(i); i++) {
                    editLayer.getSource().removeFeature(f);
                }
                //selectCtrl.getInteraction().getFeatures().clear();
                editFeatureSelect.getFeatures().clear();
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
    editFeatureSelect.on('select', function(e) {
        console.log(e["selected"].length);
        if(e["selected"].length) {
            var fillColor = e["selected"][0]["I"]["_fillColor"];
            var content = "";
            content += "作成中！作成中！作成中！<br>";
            content += '<input type="text" class="form-control" id="color-input" value="' + fillColor + '">';
            mydialog({
                id: "edit-dialog",
                class: "edit-dialog",
                map: "map1",
                title: "プロパティ",
                content: content,
                top: "100px",
                left: "220px",
                rmDialog: true
            });
            $("#color-input").spectrum({
                preferredFormat: "rgb",
                showAlpha: true,
                //flat: true,
                showInput: true,
                allowEmpty: true,
                change: function (color) {
                    //console.log(color.toRgbString());
                    var features = editFeatureSelect.getFeatures();
                    //console.log(features["a"][0]["I"]["_fillColor"])
                    features["a"][0]["I"]["_fillColor"] = color.toRgbString();
                    editLayer.getSource().changed();
                }
            });
        }else{
            $(".edit-dialog").remove();
        }
    });



        //map1.addInteraction(editFeatureSelect);
    var modify = new ol.interaction.Modify({
        features:editFeatureSelect.getFeatures()
    });
    map1.addInteraction(modify);
    var snap = new ol.interaction.Snap({
       source:editLayer.getSource()
    });
    map1.addInteraction(snap);
    //------------------------------------------------------------------------------------------------------------------
    //選択
    var selectCtrl = new ol.control.Toggle({
        html: '<i class="fa fa-hand-pointer-o"></i>',
        title: "選択",
        //interaction: editFeatureSelect,
        bar: sbar,
        active:false,
        onToggle: function(active) {
            if(active) {
                modify.setActive(true);
                map1.addInteraction(editFeatureSelect);
                console.log(editFeatureSelect.getFeatures())


            }else{
                modify.setActive(false);
                map1.removeInteraction(editFeatureSelect);
            }
        }
    });
    editbar1.addControl (selectCtrl);

    // Add editing tools
    var pointEdit = new ol.control.Toggle({//ポイント
            html: '<i class="fa fa-map-marker" ></i>',
            title:"ポイント",
            interaction: new ol.interaction.Draw({
                type: "Point",
                source:editLayer.getSource()
            })
    });
    editbar1.addControl (pointEdit);
    //----------------------------------------------
    var pointDraw = pointEdit.getInteraction();
    pointDraw.on('drawend', function(e) {
        var prop = e["feature"]["I"];
        prop["_fillColor"] = "rgba(255,0,0,1.0)";
        if(editLayer.get("name")==="editLayer-import"){
            editLayer.getSource().addFeature(e["feature"]);
        }
    });
    //----------------------------------------------

    var lineEdit = new ol.control.Toggle({
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
                            try {
                                lineEdit.getInteraction().removeLastPoint();
                            }catch(e){
                            }
                        }
                    }),
                    new ol.control.TextButton({
                        html: 'Finish',
                        title: "finish",
                        handleClick: function() {// Prevent null objects on finishDrawing
                            var drawi = lineEdit.getInteraction();
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
    editbar1.addControl (lineEdit);
    //----------------------------------------------
    var lineDraw = lineEdit.getInteraction();
    lineDraw.on('drawend', function(e) {
        var prop = e["feature"]["I"];
        prop["_fillColor"] = "rgba(255,0,0,0.9)";
        if(editLayer.get("name")==="editLayer-import"){
            editLayer.getSource().addFeature(e["feature"]);
        }
    });
    //----------------------------------------------

    var polygonEdit = new ol.control.Toggle({
        html: '<i class="fa fa-bookmark-o fa-rotate-270" ></i>',
        title: "ポリゴン",
        interaction: new ol.interaction.Draw({
            type: "Polygon",
            source: editLayer.getSource()
        }),
        onToggle: function(active) {
            console.log(active);
            console.log(editLayer.getSource().getFeatures())
        },
        // Options bar ssociated with the control
        bar: new ol.control.Bar({
            controls:[
                new ol.control.TextButton({
                    html: "undo",//'<i class="fa fa-mail-reply"></i>',
                    title: "undo last point",
                    handleClick: function() {
                        try {
                            polygonEdit.getInteraction().removeLastPoint();
                        }catch(e){
                        }
                    }
                }),
                new ol.control.TextButton({
                    html: "finish",
                    title: "finish",
                    handleClick: function() {// Prevent null objects on finishDrawing
                        console.log("ポリゴンhandleClick");
                        var drawi = polygonEdit.getInteraction();
                        var lkey = drawi.on('drawend', function(e) {
                            console.log("ポリゴンdrawend");
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
    editbar1.addControl (polygonEdit);
    //----------------------------------------------
    var polygonDraw = polygonEdit.getInteraction();
    polygonDraw.on('drawend', function(e) {
        var prop = e["feature"]["I"];
        prop["_fillColor"] = "rgba(0,50,50,0.1)";
        if(editLayer.get("name")==="editLayer-import"){
            editLayer.getSource().addFeature(e["feature"]);
        }
        //editFeatureSelect.setActive(false);
        //editFeatureSelect.getFeatures().clear();
    });
    //----------------------------------------------

    //var drawi = polygonEdit.getInteraction();

    // Add a simple push button to save features
    var save = new ol.control.Button({
        html: '<i class="fa fa-download"></i>',
        title: "Save",
        handleClick: function(e) {
            var geojsonChar = new ol.format.GeoJSON().writeFeatures(editLayer.getSource().getFeatures(), {
                featureProjection: "EPSG:3857"
            });
            console.log(geojsonChar);
            var type = "text/plain";
            var blob = new Blob([geojsonChar], {type: type});

            $(".geojson-save-a").remove();
            $("body").append("<a class='geojson-save-a'></a>");

            $(".geojson-save-a").attr({
                "href": window.URL.createObjectURL(blob),
                "download":"edit.geojson"
            });
            $(".geojson-save-a")[0].click();//[0]が肝
        }
    });
    mainbar1.addControl (save);

    // Show info
    function info(i) {
        $("#info").html(i||"");
    }

});