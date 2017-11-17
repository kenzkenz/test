var drawSource = null;
var drawLayer = null
$(function() {
    var selectedFeature = null;
    var selectHtml = "";
        selectHtml += "<div id='draw-div'>";
        //selectHtml += "ドロー実験中。まだ動作しません。<br><br>";
        selectHtml += "<h4>step1 形を作る</h4>";
        selectHtml += "<div class='draw-div2'>";
            selectHtml += "形状 ";
            selectHtml += "<select id='drawType'>";
                selectHtml += "<option value='0' selected>なし</option>";
                selectHtml += "<option value='Point'>点(Point)</option>";
                selectHtml += "<option value='LineString'>線(LineString)</option>";
                selectHtml += "<option value='Polygon'>面(Polygon)</option>";
                selectHtml += "<option value='PolygonHole'>面に穴を開ける</option>";
                selectHtml += "<option value='Transform'>面の移動と回転</option>";
                selectHtml += "<option value='Circle'>円</option>";
            selectHtml += "</select>";
        selectHtml += "</div>";
        selectHtml += "<hr class='my-hr'>";
        selectHtml += "<h4>step2 色を塗る</h4>";
        selectHtml += "<div class='draw-div2'>";
            selectHtml += "選択モード ";
            selectHtml += "<select class='drawSelect'>";
                selectHtml += "<option value='off'>オフ</option>";
                selectHtml += "<option value='on'>オン</option>";
            selectHtml += "</select>";
            selectHtml += "　色選択 ";
            selectHtml += "<select id='drawColor'>";
                selectHtml += "<option value='red'>赤</option>";
                selectHtml += "<option value='green'>緑</option>";
                selectHtml += "<option value='blue'>青</option>";
                selectHtml += "<option value='yellow'>黄</option>";
                selectHtml += "<option value='gray'>灰</option>";
                selectHtml += "<option value='silver'>銀</option>";
                selectHtml += "<option value='black'>黒</option>";
                selectHtml += "<option value='maroon'>maroon</option>";
                selectHtml += "<option value='purple'>purple</option>";
                selectHtml += "<option value='olive'>olive</option>";
                selectHtml += "<option value='navy'>navy</option>";
                selectHtml += "<option value='teal'>teal</option>";
                selectHtml += "<option value='fuchsia'>fuchsia</option>";
                selectHtml += "<option value='lime'>lime</option>";
                selectHtml += "<option value='aqua'>aqua</option>";
            selectHtml += "</select>";
            selectHtml += "　　<button type='button' id='colorSave-btn' class='btn btn-xs btn-primary'>　反映　</button>";
        selectHtml += "</div>";

        selectHtml += "<hr class='my-hr'>";
        selectHtml += "<h4>step3 項目</h4>";
        selectHtml += "<div class='draw-div2'>";
        //selectHtml += "作成中";
        selectHtml += "選択モード ";
        selectHtml += "<select class='drawSelect'>";
        selectHtml += "<option value='off'>オフ</option>";
        selectHtml += "<option value='on'>オン</option>";
        selectHtml += "</select>";

        selectHtml += "<table id='propTable' class='popup-tbl table table-bordered table-hover'>";
        selectHtml += "<tr><th class='prop-th0'>項目名</th><th class='prop-th1'></th></tr>";
        selectHtml += "<tr><td class='prop-td'><input type='text' class='prop-input-text-name'></td><td class='prop-td'><input type='text' class='prop-input-text-val'></td></tr>";
        selectHtml += "<tr><td class='prop-td'><input type='text' class='prop-input-text-name'></td><td class='prop-td'><input type='text' class='prop-input-text-val'></td></tr>";
        selectHtml += "<tr><td class='prop-td'><input type='text' class='prop-input-text-name'></td><td class='prop-td'><input type='text' class='prop-input-text-val'></td></tr>";
        selectHtml += "<tr><td class='prop-td'><input type='text' class='prop-input-text-name'></td><td class='prop-td'><input type='text' class='prop-input-text-val'></td></tr>";
        selectHtml += "<tr><td class='prop-td'><input type='text' class='prop-input-text-name'></td><td class='prop-td'><input type='text' class='prop-input-text-val'></td></tr>";
        selectHtml += "<tr><td class='prop-td'><input type='text' class='prop-input-text-name'></td><td class='prop-td'><input type='text' class='prop-input-text-val'></td></tr>";

        selectHtml += "</table>";
        selectHtml += "<button type='button' id='propSave-btn' class='btn btn-xs btn-primary btn-block'>反映</button>";
        /*
        selectHtml += "<div class='btn-group btn-group-justified' style='width:300px;'>";
        selectHtml += "<div class='btn-group'><button type='button' id='propCancel-btn' class='btn btn-xs btn-primary'>戻す</button></div>";
        selectHtml += "<div class='btn-group'><button type='button' id='propSave-btn' class='btn btn-xs btn-primary'>反映</button></div>";
        selectHtml += "</div>";
        */
        selectHtml += "</div>";

        selectHtml += "<hr class='my-hr'>";
        selectHtml += "<h4>step4 保存</h4>";
        selectHtml += "<div class='draw-div2'>";
        //selectHtml += "保存 ";

        selectHtml += "<div class='btn-group btn-group-justified' style='width:300px;'>";
        selectHtml += "<div class='btn-group'><button type='button' id='drawGeojson-btn' class='btn btn-xs btn-primary'>GEOJSON</button></div>";
        selectHtml += "<div class='btn-group'><button type='button' id='drawCsv-btn' class='btn btn-xs btn-primary'>CSV</button></div>";
        selectHtml += "</div>";

        selectHtml += "</div>";

        selectHtml += "</div>";

        //$("#map1").append(selectHtml);

        var content = selectHtml;
        /*
        mydialog({
            id:"draw-dialog",
            class:"draw-dialog",
            map:"map1",
            title:"ドロー実験中",
            content:content,
            top:"100px",
            left:"20px",
            //rmDialog:true
        });
        */

    $(".draw-btn").click(function(){
        mydialog({
            id:"draw-dialog",
            class:"draw-dialog",
            map:"map1",
            title:"ドロー実験中",
            content:content,
            top:"60px",
            left:"10px",
            //rmDialog:true
        });
    });
    
    drawSource = new ol.source.Vector();
    drawLayer = new ol.layer.Vector({
        source:drawSource,
        name:"drawLayer",
        style:commonstyleFunction
        /*
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#ffcc33',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ffcc33'
                })
            })
        })
        */
    });

    map1.addLayer(drawLayer);
    drawLayer.set("selectable",true);
    drawLayer.set("altitudeMode","clampToGround");
    drawLayer.setZIndex(9999);
    var modify = new ol.interaction.Modify({source:drawSource});
    modify.on("modifyend", function(e) {
        console.log(e)
    });



    map1.addInteraction(modify);
    var draw,snap,drawhole,transform,circle;
    //------------------------------------------------------------------------------------------------------------------
    
    function addInteractions() {
        var typeVal = $("#drawType").val();
        console.log(typeVal);
        //if(typeVal==="0") return;
        switch (typeVal) {
            case "Polygon":
                draw = new ol.interaction.Draw({
                    source:drawSource,
                    type:typeVal,
                    geometryFunction:function(coordinates, geometry) {
                        this.nbpts = coordinates[0].length;
                        if (geometry) geometry.setCoordinates([coordinates[0].concat([coordinates[0][0]])]);
                        else geometry = new ol.geom.Polygon(coordinates);
                        return geometry;
                    }
                });
                break;
            case "LineString":
                draw = new ol.interaction.Draw({
                    source:drawSource,
                    type:typeVal,
                    geometryFunction:function(coordinates, geometry) {
                        if (geometry) geometry.setCoordinates(coordinates);
                        else geometry = new ol.geom.LineString(coordinates);
                        this.nbpts = geometry.getCoordinates().length;
                        return geometry;
                    }
                });
                break;
            default:
                draw = new ol.interaction.Draw({
                    source:drawSource,
                    type:typeVal
                });
        }
        circle = new ol.interaction.Draw({
            source:drawSource,
            type:"Circle",
            geometryFunction:ol.interaction.Draw.createRegularPolygon(32)
        });
        snap = new ol.interaction.Snap({source:drawSource});
        drawhole  = new ol.interaction.DrawHole ({
            layers:[drawLayer]
        });
        transform = new ol.interaction.Transform ({
            /*
             translateFeature: $("#translateFeature").prop('checked'),
             scale: $("#scale").prop('checked'),
             rotate: $("#rotate").prop('checked'),
             keepAspectRatio: $("#keepAspectRatio").prop('checked') ? ol.events.condition.always : undefined,
             translate: $("#translate").prop('checked'),
             stretch: $("#stretch").prop('checked'),
             */
        });

        switch (typeVal) {
            case "0":
                return;
                break;
            case "Polygon":
            case "LineString":
            case "Point":
                map1.addInteraction(modify);
                map1.addInteraction(draw);
                map1.addInteraction(snap);
                draw.on("drawend", function(e) {
                    var prop = e["feature"]["D"];
                    prop["_fillColor"] = "rgba(51,122,255,0.7)";
                    //if(editLayer.get("name")==="editLayer-import"){
                    //    editLayer.getSource().addFeature(e["feature"]);
                    //}
                    //featureSelect.setActive(false);
                    featureSelect.getFeatures().clear();
                });
                break;
            case "PolygonHole":
                map1.addInteraction(modify)
                map1.addInteraction(drawhole);
                map1.addInteraction(snap);
                break;
            case "Transform":
                map1.addInteraction(transform);
                map1.addInteraction(snap);
                setHandleStyle();
                break;
            case "Circle":
                map1.addInteraction(circle);
                circle.on("drawend", function(e) {
                    var prop = e["feature"]["D"];
                    prop["_fillColor"] = "rgba(51,122,255,0.7)";
                    featureSelect.getFeatures().clear();
                });


                /*
                map1.on("singleclick",function(evt) {
                    var coord = ol.proj.transform(evt.coordinate,"EPSG:3857","EPSG:4326");
                    console.log(coord);
                    var precisionCircle = ol.geom.Polygon.circular(
                        // WGS84 Sphere //
                        new ol.Sphere(6378137),
                        //[131.423860, 31.911069],
                        coord,
                        2000,
                        // Number of verticies //
                        32).transform('EPSG:4326', 'EPSG:3857');
                    var precisionCircleFeature = new ol.Feature(precisionCircle);
                    drawSource.addFeature(precisionCircleFeature);
                });
                */


                /*
                map1.on("singleclick",function(evt){
                    console.log(ol.proj.transform(evt.coordinate,"EPSG:3857","EPSG:4326"));
                    var coord = evt.coordinate;
                    var circleCenterX = coord[0];//15438034; //the X center of your circle
                    var circleCenterY = coord[1];//4186771; //the Y center of your circle

                    var km = 5;
                    //var circleCenterX = coord1[0];//15438034; //the X center of your circle
                    //var circleCenterY = coord1[1];//4186771; //the Y center of your circle
                    var circleRadius = km * 1179;
                    var pointsToFind = 30;
                    var circleCoords1 = createCirclePointCoords(circleCenterX, circleCenterY, circleRadius, pointsToFind);
                    console.log(circleCoords1);
                    var circlesource = new ol.source.Vector({
                        features: [
                            new ol.Feature({
                                id: 1,
                                geometry: new ol.geom.Polygon([circleCoords1])
                            })
                        ]
                    });
                });
                */

                break;
        }
    }

    function setHandleStyle() {
        if (!transform instanceof ol.interaction.Transform) return;
        var circle = new ol.style.RegularShape({
            fill: new ol.style.Fill({color:[255,255,255,0.01]}),
            stroke: new ol.style.Stroke({width:1, color:[0,0,0,0.01]}),
            radius: 8,
            points: 10
        });
        transform.setStyle ('rotate',
            new ol.style.Style(
                {	text: new ol.style.Text (
                    {	text:'\uf0e2',
                        font:"16px Fontawesome",
                        textAlign: "left",
                        fill:new ol.style.Fill({color:'red'})
                    }),
                    image: circle
                }));
        // Center of rotation
        transform.setStyle ('rotate0',
            new ol.style.Style(
                {	text: new ol.style.Text (
                    {	text:'\uf0e2',
                        font:"20px Fontawesome",
                        fill: new ol.style.Fill({ color:[255,255,255,0.8] }),
                        stroke: new ol.style.Stroke({ width:2, color:'red' })
                    }),
                }));
        // Style the move handle
        transform.setStyle('translate',
            new ol.style.Style(
                {	text: new ol.style.Text (
                    {	text:'\uf047',
                        font:"20px Fontawesome",
                        fill: new ol.style.Fill({ color:[255,255,255,0.8] }),
                        stroke: new ol.style.Stroke({ width:2, color:'red' })
                    })
                }));

        transform.set('translate', interactionTransform.get('translate'));
    }

    //drawhole.setActive(false);
    //フィーチャーセレクト
    var featureSelect = new ol.interaction.Select({
        layers:function(layer){
            return layer.get("selectable") == true;
        },
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.8)'
            }),
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 2
            }),
            image: new ol.style.RegularShape({
                fill: new ol.style.Fill({
                    color:"red"
                }),
                stroke: new ol.style.Stroke({
                    color: "white",
                    width: 1
                }),
                points:5,
                radius: 16,
                radius2: 8,
                angle:0
            }),
            text: new ol.style.Text({
                font: "14px sans-serif",
                text: "選",
                fill: new ol.style.Fill({
                    color:"white"
                }),
                offsetY:0,
                /*
                 stroke: new ol.style.Stroke({
                 color: "white",
                 width: 3
                 })
                 */
            })
            /*
            image: new ol.style.Circle({
                radius: 20,
                fill: new ol.style.Fill({
                    color: '#ffcc33'
                }),
                stroke: new ol.style.Stroke({
                    color: "white",
                    width: 1
                })
            })
            */
        })
    });

    featureSelect.on("select", function(e) {
        var features = e.selected;
        console.log(features);
        selectedFeature = features[0];
        $(".prop-input-text-name").val("");
        $(".prop-input-text-val").val("");
        if(!features) return;
        var prop = features[0].getProperties();
        console.log(prop);
        var i = 0;
        for(key in prop){
            //console.log(prop[key]);
            //console.log(key);
            if(key!=="geometry" && key.substr(0,1)!=="_"){
                console.log(key);
                $(".prop-input-text-name").eq(i).val(key);
                $(".prop-input-text-val").eq(i).val(prop[key]);
                i++
            }
        }
    });

    //ドロータイプ選択
    $("body").on("change","#drawType",function(){
        map1.removeInteraction(modify);
        map1.removeInteraction(draw);
        map1.removeInteraction(drawhole);
        map1.removeInteraction(snap);
        map1.removeInteraction(transform);
        map1.removeInteraction(circle);
        map1.removeInteraction(featureSelect);
        featureSelect.getFeatures().clear();
        addInteractions();
        $(".drawSelect").val("off");
        $(".drawSelect").css({
            color:"black"
        })
    });
    //フィーチャー選択
    $("body").on("change",".drawSelect",function(){
        var val = $(this).val();
        $(".drawSelect").val(val);
        var interactions = map1.getInteractions().getArray();
        var DragRotateAndZoomInteraction = interactions.filter(function(interaction) {
            return interaction instanceof ol.interaction.DragRotateAndZoom;
        })[0];
        if (val === "on"){
            map1.removeInteraction(modify);
            map1.removeInteraction(draw);
            map1.removeInteraction(drawhole);
            map1.removeInteraction(snap);
            map1.removeInteraction(transform);
            map1.removeInteraction(circle);
            map1.addInteraction(featureSelect);
            $("#drawType").val("0");
            $(".drawSelect").css({
                color:"red"
            });
            DragRotateAndZoomInteraction.setActive(false);
        }else{
            map1.addInteraction(modify);
            map1.addInteraction(draw);
            map1.removeInteraction(drawhole);
            map1.addInteraction(snap);
            map1.removeInteraction(featureSelect);
            $(".drawSelect").css({
                color:"black"
            });
            DragRotateAndZoomInteraction.setActive(true);
        }
    });
    //色設定
    $("body").on("change","#cdrawColor",function(){

    });
    //------------------------------------------------------------------------------------------------------------------
    //色保存
    $("body").on("click","#colorSave-btn",function() {
        var colorVal = $("#drawColor").val();
        var rgb = d3.rgb(colorVal);
        var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0.7)";

        console.log(colorVal);

        console.log(rgba);

        console.log(featureSelect.getFeatures());
        console.log(featureSelect.getFeatures().getProperties());
        console.log(featureSelect.getFeatures().getProperties()["length"]);
        var features = featureSelect.getFeatures()["a"];
        console.log(features);

        if(!features.length){
            alert("選択されていません。選択モードをオンにして地物をクリックしてください。");
            return;
        }
        console.log(features[0].getProperties());

        for(var i = 0; i <features.length; i++){
            features[i].setProperties({
                "_fillColor":rgba
            });
        }
        featureSelect.getFeatures().clear();
        //alert("反映しました。")

    });
    //------------------------------------------------------------------------------------------------------------------
    //属性保存
    $("body").on("click","#propSave-btn",function(){
        console.log(selectedFeature);
        var nameElements = $(".prop-input-text-name");
        var valElements = $(".prop-input-text-val");
        var features = featureSelect.getFeatures()["a"];
        console.log(features);

        if(!features.length){
            alert("選択されていません。選択モードをオンにして地物をクリックしてください。");
            return;
        }
        console.log(features[0].getProperties());

        for(var i = 0; i <nameElements.length; i++) {
            var name = nameElements.eq(i).val();
            var val = valElements.eq(i).val();
            console.log(name,val);
            for (var j = 0; j < features.length; j++) {
                /*
                features[j].setProperties({
                    //"_fillColor":colorVal
                    "id": "9999"
                });
                */
                console.log(features[j]["D"][name])
                if(name) features[j]["D"][name] = val
            }
        }
        featureSelect.getFeatures().clear();
        alert("反映しました。")
    });
    //------------------------------------------------------------------------------------------------------------------
    //属性キャンセル
    $("body").on("click","#propCancel-btn",function(){
        alert("作成中")
    });
    //------------------------------------------------------------------------------------------------------------------
    document.onkeyup=function(e){

    };
    $(window).keyup(function(e){
        var keycode = e.keyCode;
        console.log(keycode);
        //var focusTagName = $(":focus")[0].tagName;
        //console.log(focusTagName);
        if($(":focus").val()) return;//input等でvalがあるときは抜ける。
        var features = featureSelect.getFeatures();
        switch (keycode) {
            case 8://mac
            case 46:
                if(!features.item(0)) return;
                if(confirm("選択された地物を削除しますか？")){
                    for (var i=0, f; f=features.item(i); i++) {
                        drawSource.removeFeature(f);
                    }
                    featureSelect.getFeatures().clear();
                }
                break;
            case 27:
                console.log(draw.nbpts);
                //draw.removeLastPoint();
                console.log(draw);
                if (draw.nbpts>1) draw.removeLastPoint();

                /*
                try {
                    if (draw.nbpts>=1) draw.removeLastPoint();
                }catch(e){
                    console.log("er")
                }
                */
                break;
        }
    });
    //------------------------------------------------------------------------------------------------------------------
    //geojsonで保存
    $("body").on("click","#drawGeojson-btn",function(){
    //$("#drawGeojson-btn").click(function(){
        var features = drawSource.getFeatures();
        console.log(features);
        if(!features.length) {
            alert("データがありません。");
            return;
        }

        var geojsonChar = new ol.format.GeoJSON().writeFeatures(features, {
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
    });
    //------------------------------------------------------------------------------------------------------------------
    //csvで保存
    $("body").on("click","#drawCsv-btn",function(){
        //$("#drawGeojson-btn").click(function(){
        var features = drawSource.getFeatures();
        console.log(features);
        if(!features.length) {
            alert("データがありません。");
            return;
        }
        var headerAr = [];
        var header = "";
        var content = "";
        for(var i = 0; i <features.length; i++) {
            var prop = features[i].getProperties();
            for(key in prop){
                if(key!=="geometry" && key.substr(0,1)!=="_") {
                    //console.log(key);
                    switch (key) {
                        case "経度":
                            key = "経度old";
                            break;
                        case "緯度":
                            key = "緯度old";
                            break;
                    }
                    PushArray(headerAr, key)
                }
            }
        }
        console.log(headerAr);
        if(headerAr.length) {
            header = headerAr.join() + ",";
        }
        for(var i = 0; i <features.length; i++){
            var prop = features[i].getProperties();
            for(var j = 0; j <headerAr.length; j++) {
                var val = prop[headerAr[j]];
                var lonOld,latOld;
                switch (headerAr[j]) {
                    case "経度old":
                        val = prop["経度"];
                        lonOld = val;
                        break;
                    case "緯度old":
                        val = prop["緯度"];
                        latOld = val;
                        break;
                    default:
                }
                if(val) {
                    val = val.replace("\n","");
                    content += val + ",";
                }else{
                    content += "-,";
                }
            }
            var coord = features[i].getGeometry().getCoordinates();
            console.log(coord);
            var lonlat = ol.proj.transform(coord,"EPSG:3857","EPSG:4326");
            //content += lonlat;
            var lonDifference = 0;
            var latDifference = 0;
            lonDifference = Number(lonOld)-lonlat[0];
            latDifference = Number(latOld)-lonlat[1];
            var geoType = features[i].getGeometry().getType() + ",";
            content += geoType;

            console.log(isNaN(lonlat[0]));
            if(isNaN(lonlat[0])) lonlat = ["",""];

            var coordString = '"' + JSON.stringify(coord) + '"';
            var fillColor = '"' + prop["_fillColor"] + '"';
            if(!fillColor) fillColor = "-";
            if(lonOld) {
                if (Math.abs(lonDifference) > 0.000001 || Math.abs(latDifference) > 0.000001) {
                    //console.log("変化");
                    content += lonlat;
                    content += "," + coordString;
                    content += "," + fillColor;
                    content += ",移動\n"
                } else {
                    //console.log("nasi");
                    content += Number(lonOld) + "," + Number(latOld);
                    content += "," + coordString;
                    content += "," + fillColor;
                    content += ",-\n";
                }
            }else{
                content += lonlat;
                content += "," + coordString;
                content += "," + fillColor;
                content += ",-\n"
            }
            if(i===0) {
                header = header + "_type,経度,緯度,_coord,_fillColor,移動" + "\n";
                content = header + content;
            }
        }
        // Unicodeコードポイントの配列に変換する
        var unicode_array = str_to_unicode_array(content);
        // SJISコードポイントの配列に変換
        var sjis_code_array = Encoding.convert(
            unicode_array, // ※文字列を直接渡すのではない点に注意
            'SJIS',  // to
            'UNICODE' // from
        );
        // 文字コード配列をTypedArrayに変換する
        var uint8_array = new Uint8Array( sjis_code_array );
        var type = "text/csv";
        //var blob = new Blob([content], {type: type});
        var blob = new Blob([uint8_array], {type: type});

        $(".csv-save-a").remove();
        $("body").append("<a class='csv-save-a'></a>");

        $(".csv-save-a").attr({
            "href": window.URL.createObjectURL(blob),
            "download":"csv.csv"
        });
        $(".csv-save-a")[0].click();//[0]が肝
    });
    //ドラッグアンドドロップのインタラクション-----------------------------
    var dragAndDrop = new ol.interaction.DragAndDrop({
        formatConstructors: [
            //ol.format.GPX,
            ol.format.GeoJSON,
            //ol.format.IGC,
            //ol.format.KML,
            //ol.format.TopoJSON
        ]
    });
    map1.addInteraction(dragAndDrop);

    //ドラッグアンドドロップでレイヤーを作る
    dragAndDrop.on('addfeatures', function(event) {
        map1.removeLayer(drawLayer);
        //drawSource = new ol.source.Vector();
        var fileExtension = event["file"]["name"].split(".")[event["file"]["name"].split(".").length - 1]
        console.log(fileExtension);

        //if(fileExtension!=="geojson") return;

        switch (fileExtension) {
            case "geojson":
                geojsonRead(event);
                break;
            case "csv":
                csvRead(event.file);
                break;
            default:
                return;
        }
    });
    var geojsonRead = function(event) {
        drawSource = new ol.source.Vector({
            features: event.features
        });
        drawLayer.setSource(drawSource);
        drawLayer.set("altitudeMode","clampToGround");
        map1.addLayer(drawLayer);
        map1.getView().fit(drawSource.getExtent());
        drawLayer.setZIndex(9999);
        drawLayer.set("selectable",true);
        var modify = new ol.interaction.Modify({source:drawSource});
        map1.addInteraction(modify);
        var snap = new ol.interaction.Snap({source:drawSource});
        map1.addInteraction(snap);
    };

    //-------------------------------------------------------------------------------------
    var csvRead = function(file){
        drawSource = new ol.source.Vector();
        console.log(file);
        csvarr = [];
        var file_reader = new FileReader();
        file_reader.readAsBinaryString(file);//ここ超重要。文字コード変換のために必要
        file_reader.onload = function(e) {
            //console.log(file_reader.result);
            var result = e.target.result;
            var sjisArray = str2Array(result);
            var uniArray = Encoding.convert(sjisArray, 'UNICODE', 'SJIS');
            var result = Encoding.codeToString(uniArray);
            console.log(result); //csvデータ(string)

            //console.log(result.match(/\[(.*?)\]/));

            var matches = result.match(/\[.*\]/gi);
            console.log(matches);
            if(matches) {
                for (var i = 0; i < matches.length; i++) {
                    result = result.replace(matches[i], matches[i].replace(/,/gi, "demi"))
                }
                console.log(result);
            }
            var matches = result.match(/rgba.*\)/gi);
            console.log(matches);
            if(matches) {
                for (var i = 0; i < matches.length; i++) {
                    result = result.replace(matches[i], matches[i].replace(/,/gi, "demi"))
                }
                console.log(result);
            }

            // 選択したCSVファイルから２次元配列を生成
            console.log(result.indexOf("\r\n"));
            console.log(result.indexOf("\n"));
            console.log(result.indexOf("\r"));

            if(result.indexOf("\r\n")!==-1) {
                var rows = result.split("\r\n");

            }else if(result.indexOf("\n")!==-1) {
                var rows = result.split("\n");
            }else{
                var rows = result.split("\r");
            }
            //var rows = result.split("\r");
            var max = 0;
            rangemin = 9999999999;

            var headerAr = rows[0].split(",");
            console.log(headerAr);

            var csvlon,csvlat;
            var csvType = "";
            var columnAr = [];
            var csvGeoType = null;
            var csvCoord = null;
            var csvFillColor = null;
            for(var i = 0; i <headerAr.length; i++){
                //console.log(headerAr[i])
                if (headerAr[i] === "経度") csvlon = i;
                if (headerAr[i] === "緯度") csvlat = i;
                if (headerAr[i] === "_type") csvGeoType = i;
                if (headerAr[i] === "_coord") csvCoord = i;
                if (headerAr[i] === "_fillColor") csvFillColor = i;
                if (headerAr[i] === "経度"){
                    csvType = "draw";
                }
                columnAr.push(headerAr[i]);
            }

            $(rows).each(function () {
                var split = this.split(/,|\t/);
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
            console.log(csvarr);
            for (var i=0; i < csvarr.length; i++) {
                if(i===0) {
                    /*
                    for (var j = 0; j < csvarr[0].length; j++) {
                        //-------------------------------------------
                        if (csvarr[0][j] === "市町村コード") cityCode = j;
                        if (csvarr[0][j] === "数値") suuti = j;
                        if (csvarr[0][j] === "色") iro = j;
                        if (csvarr[0][j] === "色"){
                            csvType = "city";
                        }
                        //-------------------------------------------
                        //ドローのcsv用
                        if (csvarr[0][j] === "経度") csvlon = j;
                        if (csvarr[0][j] === "緯度") csvlat = j;

                        if (csvarr[0][j] === "_type") csvGeoType = j;
                        if (csvarr[0][j] === "_coord") csvCoord = j;
                        if (csvarr[0][j] === "経度"){
                            csvType = "draw";
                        }
                        columnAr.push(csvarr[0][j])
                    }
                    */
                }else{
                    //-----------------------------------------------
                    switch (csvType) {
                        case "city":
                            var obj = {
                                "citycode": csvarr[i][cityCode],
                                "prop": {
                                    "citycode": csvarr[i][cityCode],
                                    "suuti": csvarr[i][suuti],
                                    "iro": csvarr[i][iro]
                                }
                            };
                            break;
                        case "draw":
                            var geoType = csvarr[i][csvGeoType];
                            console.log(geoType);
                            var lonlat = [Number(csvarr[i][csvlon]),Number(csvarr[i][csvlat])];
                            lonlat = ol.proj.transform(lonlat,"EPSG:4326","EPSG:3857");
                            switch (geoType) {
                                case "LineString":
                                case "Polygon":
                                    var coord = JSON.parse((JSON.parse(csvarr[i][csvCoord].replace(/demi/gi,","))));//1回目のJSON.parseで"をとって2回目のJSON.parseでパース
                                    console.log(coord);
                                    switch (geoType) {
                                        case "Polygon":
                                            var geometry = new ol.geom.Polygon(coord);
                                            break;
                                        case "LineString":
                                            var geometry = new ol.geom.LineString(coord);
                                            break;
                                        default:
                                    }
                                    break;
                                default://ポイントのときはデフォルトで処理
                                    var geometry = new ol.geom.Point(lonlat);
                            }
                            var newFeature = new ol.Feature({
                                geometry: geometry,
                                //_fillColor:"red"
                            });
                            //var fillColor = JSON.parse(csvarr[i][csvFillColor].replace(/demi/gi,","));
                            var fillColor = csvarr[i][csvFillColor];
                            if(fillColor) {
                                fillColor = fillColor.replace(/demi/gi,",").replace(/"/gi,"");
                                console.log(fillColor);
                                newFeature["D"]["_fillColor"] = fillColor;
                            }else{
                                newFeature["D"]["_fillColor"] = "blue";
                            }
                            //newFeature["D"]["_fillColor"] = "red";
                            for(var j = 0; j <columnAr.length; j++){
                                console.log(columnAr[j])
                                if(columnAr[j].substr(0,1)!=="_") newFeature["D"][columnAr[j]] = csvarr[i][j]
                            }
                            //console.log(newFeature);
                            //editLayer.getSource().addFeature(newFeature);
                            drawSource.addFeature(newFeature);
                            break;
                    }
                    cityObjAr.push(obj);
                    //-----------------------------------------------
                    if(csvarr[i][cityCode]){
                        inChar += "," + csvarr[i][cityCode];
                        valueAr.push(csvarr[i][suuti]);
                    }
                }
            }
            switch (csvType) {
                case "city":
                    $("#modal-div").modal();
                    break;
                case "draw":
                    drawLayer.setSource(drawSource);
                    drawLayer.set("altitudeMode","clampToGround");
                    map1.addLayer(drawLayer);
                    map1.getView().fit(drawSource.getExtent());
                    drawLayer.setZIndex(9999);
                    drawLayer.set("selectable",true);
                    var modify = new ol.interaction.Modify({source:drawSource});
                    map1.addInteraction(modify);
                    var snap = new ol.interaction.Snap({source:drawSource});
                    map1.addInteraction(snap);
                    break;
            }
        };
    }
});

