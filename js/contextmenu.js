var myContextOverlay1 = null;
var myContextOverlay2 = null;
var circleLayer1 = null;
var circleLayer2 = null;
var mesh500Source1 = null;
var mesh500Layer1 = null;
var mesh500Source2 = null;
var mesh500Layer2 = null;
$(function(){

    var worker = new Worker("js/worker.js");

    var coord1 = null;
    var coord2 = null;
    //自作コンテキストメニュー（右クリックメニュー）
    var content = "";
        content += "<button type='button' class='close myContextOverlay-close'>&times;</button>";
        content += "作成中！<br>";
        content += "<div style='margin:10px 0;'>半径：<input type='text' class='kmtext' value='5' size='2'> KM</div>";
        content += "<button type='button' class='zinkoumesh-btn btn btn-primary btn-block'>500M人口メッシュ</button>";
        content += "<button type='button' class='circlrdelete-btn btn btn-primary btn-block'>円削除</button>";
    $("#map1").append('<div id="myContextOverlay-div1" class="myContextOverlay-div">' + content + '</div>');
    $("#map2").append('<div id="myContextOverlay-div2" class="myContextOverlay-div">' + content + '</div>');

    myContextOverlay1 = new ol.Overlay({
        element:$("#myContextOverlay-div1")[0],
        autoPan:true
    });
    map1.addOverlay(myContextOverlay1);

    myContextOverlay2 = new ol.Overlay({
        element:$("#myContextOverlay-div2")[0],
        autoPan:true
    });
    map2.addOverlay(myContextOverlay2);

    $("#map1 .kmtext,#map2 .kmtext").spinner({
        max:50, min:5, step:1,
        spin:function(event,ui){
            map1.removeLayer(circleLayer1);
            map1.removeLayer(mesh500Layer1);
            var km = ui.value;
            var circleCenterX = coord1[0];//15438034; //the X center of your circle
            var circleCenterY = coord1[1];//4186771; //the Y center of your circle
            var circleRadius = km * 1179;
            var pointsToFind = 30;
            var circleCoords1 = createCirclePointCoords(circleCenterX,circleCenterY,circleRadius,pointsToFind);
            //console.log(circleCoords1);
            var circlesource = new ol.source.Vector({
                features: [
                    new ol.Feature({
                    	id:1,
                    	geometry: new ol.geom.Polygon([circleCoords1])
                    })
                ]
            });
            //-------------------------------------
            circleLayer1 = new ol.layer.Vector({
                name:"circleLayer",
                source: circlesource,
                style: function(feature,resolution){
                    style = [
                        new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: "grey",
                                width: 1
                            }),
                            fill: new ol.style.Fill({
                                color: 'rgba(0,100,200,0.3)'
                            })
                        })
                    ];
                    return style;
                }
            });
            circleLayer1.set("altitudeMode","clampToGround");
            map1.addLayer(circleLayer1);
            circleLayer1.setZIndex(9999);
        }//
    });
    //--------------------------------------------------------------------------------------
    $(".myContextOverlay-close").click(function(){
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        if(mapName==="map1") {
            myContextOverlay1.setPosition(null);
        }else{
            myContextOverlay2.setPosition(null);
        }
    });
    //--------------------------------------------------------------------------------------
    $(".zinkoumesh-btn").click(function(){
        //var coord = map1.getCoordinateFromPixel([myContextmenuLeft,myContextmenuTop])
        var pixel = map1.getPixelFromCoordinate(coord1);
        var currentFeatureLayer = map1.forEachFeatureAtPixel(pixel,function(feature,layer){
            return [feature,layer];
        });
        console.log(currentFeatureLayer);
        if(!currentFeatureLayer){
            alert("範囲を設定してください。");
            return;
        }
        var extent = currentFeatureLayer[0].getGeometry().getExtent();
        console.log(extent);
        mesh500Source1 = new ol.source.Vector({});
        mesh500Layer1 = new ol.layer.Vector({
            //deleteflg:true,
            name:"mesh500Layer",
            source: mesh500Source1,
            style: function(feature,resolution){
                if(resolution<9.6){
                    var text = feature.getProperties()["_top"] + Number(feature.getProperties()["zinkou"]).toLocaleString() + "人";
                }else{
                    var text = feature.getProperties()["_top"]=="TOP\n" ? "TOP":""
                };
                var fillColor = feature.getProperties()["_fillColor"];
                if(resolution<76.5){
                    var stroke = new ol.style.Stroke({
                        color:"gray",
                        lineDash: [1],
                        width:1
                    })
                }else{
                    var stroke = null
                }
                style = [new ol.style.Style({
                    stroke:stroke,
                    fill: new ol.style.Fill({
                        color:fillColor
                    }),
                    text: new ol.style.Text({
                        font: "16px helvetica,sans-serif",
                        text: text,
                        fill: new ol.style.Fill({
                            color:feature.getProperties()["_top"]=="TOP\n" ? "white":"dimgray"
                        })
                    })
                })];
                return style;
            }
        });

        var extentLeftTop = ol.proj.transform([extent[0],extent[3]],"EPSG:3857","EPSG:4326");
        var extentRightTop = ol.proj.transform([extent[2],extent[3]],"EPSG:3857","EPSG:4326");
        var extentRightTopMeshcode = coord2meshcode(extentRightTop);
        var extentLeftDown = ol.proj.transform([extent[0],extent[1]],"EPSG:3857","EPSG:4326");
        var target = extentLeftTop;
        var end = extentRightTop;
        var ii =0;
        var prevMeshcode = "";
        console.log(target);
        console.log(end);
        //---------------------------------------------------------------------------------
        worker.postMessage({prevMeshcode:prevMeshcode,extentRightTopMeshcode:extentRightTopMeshcode,extentLeftDown:extentLeftDown,target:target});
        worker.onmessage=function(evt) {
            console.log(evt.data.length);
            for (i=0; i<evt.data.length; i++){
                meshcode2polygon(evt.data[i],currentFeatureLayer[0]);
            }
            var zinkouAjax = function(){//プロミスのファンクション
                return new Promise(function(resolve,reject){
                    var features = mesh500Source1.getFeatures();
                    var meshType = "zinkouMesh";
                    /*
                     if(elementId == "featureInCircle"){
                     meshType = "zinkouMesh";
                     }else{
                     meshType = "keizaiMesh";
                     }
                     */
                    var instr = "";
                    console.log(features.length);
                    for (i=0; i<features.length; i++){
                        instr += features[i].getProperties()["meshCode"] + ",";
                    }
                    instr = instr.substr(0,instr.length-1);
                    $.ajax({
                        type:"POST",
                        url:"php/estatzinkouselect.php",
                        dataType:"json",
                        data:{
                            instr:instr,
                            meshType:meshType
                        }
                    }).done(function(json){
                        console.log("done-mysqlRead");
                        //console.log(JSON.stringify(json["meshcodeAr"]));
                        console.log(json);
                        resolve([json,meshType]);
                    }).fail(function(json){
                        console.log("失敗!");
                    });
                });
            };
            zinkouAjax().then(function(jsonMeshtype) {
                console.log(jsonMeshtype[0]);
                var setProp = new Promise(function(resolve,reject){
                    var features = mesh500Source1.getFeatures();
                    var resultCopy = jsonMeshtype[0]["result"];
                    if(jsonMeshtype[0].result){//★どうやらここが遅い
                        for (i=0; i<features.length; i++){
                            var meshCode = features[i].getProperties()["meshCode"];
                            for (ii=0; ii<resultCopy.length; ii++){
                                if (resultCopy[ii]["meshCode"] == meshCode){
                                    //console.log("マッチ")
                                    if(jsonMeshtype[1]==="zinkouMesh"){
                                        var zinkou = resultCopy[ii]["zinkou"];
                                    }else {
                                        var zinkou = resultCopy[ii]["zyuugyouin"];
                                    }
                                    features[i]["I"]["zinkou"] = zinkou;
                                    features[i]["I"]["_polygonHeight"] = zinkou;
                                    resultCopy.splice(ii,1);
                                    break;
                                }
                            }
                        }
                    }
                    console.log("done2");
                    resolve();
                });
                setProp.then(function(json) {
                    console.log(json);
                    aaa();

                });
            });
            function aaa(){
                var features = mesh500Source1.getFeatures();
                var zinkouArr = [];
                for (i=0; i<features.length; i++){
                    zinkouArr.push(features[i].getProperties()["zinkou"]);
                }
                var max = Math.max.apply(null,zinkouArr);
                var min = Math.min.apply(null,zinkouArr);
                var color100 = (max-min)/100
                var d3Color = d3.interpolateLab("mistyrose","red");
                var meshCodeStr = "";
                for (i=0; i<features.length; i++){
                    //console.log(features[i].getProperties()["meshCode"]);
                    meshCodeStr += features[i].getProperties()["meshCode"] + ",";
                    var zinkou = features[i].getProperties()["zinkou"]
                    var c100 = (zinkou-min)/color100/100;
                    var color0 = new RGBColor(d3Color(c100));
                    var rgb = new RGBColor(d3Color(c100)).toRGB();
                    var rgba = "rgba(" + color0.r + "," + color0.g + "," + color0.b +"," + "0.8)";
                    if(zinkou==0) rgba = "rgba(0,0,255,0.3)";
                    if(zinkou==max){
                        var top = "TOP\n";
                    }else{
                        var top = "";
                    }
                    features[i]["I"]["zinkou"] = zinkou;
                    features[i]["I"]["_fillColor"] = rgba;
                    features[i]["I"]["_polygonHeight"] = zinkou;
                    features[i]["I"]["_top"] = top;

                    //souzinkou[layerId] = souzinkou[layerId] + Number(zinkou);
                }
                //console.log(meshCodeStr);
                /*
                if(currentFeatureLayer[1].get("name").split("_")[1] != "zinkouOn"){
                    circleLayer[layerId].getSource().getFeatures()[0].setProperties({
                        "人口":souzinkou[layerId]
                    })
                }
                */
                /*
                createMeasureTooltip(features[0],"総計" + souzinkou[layerId].toLocaleString() + "人")
                measureTooltipElement.className = "tooltip tooltip-static " + "tStatic" + layerI;
                measureTooltipElement = null;
                */
                mesh500Layer1.set("altitudeMode","clampToGround");
                map1.addLayer(mesh500Layer1);
                mesh500Layer1.setZIndex(9999);
                //sliderCreate();
                console.log("aaa終了")
            }
        };

        //map1.addLayer(mesh500Layer1);

    });
    //--------------------------------------------------------------------------------------
    $(".circlrdelete-btn").click(function(){
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        if(mapName==="map1") {
            map1.removeLayer(circleLayer1);
            map1.removeLayer(mesh500Layer1);
        }else{
            map2.removeLayer(circleLayer2);
            map2.removeLayer(mesh500Layer2);
        }
    });
    //-------------------------------------------------------------------------------------

    $("#map1")[0].addEventListener('contextmenu',myContextmenu1,false);
    $("body").on("mouseenter",".dialog-content,.dialog-base",function(){//contentにマウスが当たったら通常の右クリックメニュー復活。
        $("#map1")[0].removeEventListener('contextmenu',myContextmenu1,false);
    }).on("mouseleave",".dialog-content,.dialog-base",function(){//contentからマウスが抜けたら通常の右クリックメニューを無効化。
        $("#map1")[0].addEventListener('contextmenu',myContextmenu1,false);
    });

    $("#map2")[0].addEventListener('contextmenu',myContextmenu2,false);
    $("body").on("mouseenter",".dialog-content,.dialog-base",function(){//contentにマウスが当たったら通常の右クリックメニュー復活。
        $("#map2")[0].removeEventListener('contextmenu',myContextmenu2,false);
    }).on("mouseleave",".dialog-content,.dialog-base",function(){//contentからマウスが抜けたら通常の右クリックメニューを無効化。
        $("#map2")[0].addEventListener('contextmenu',myContextmenu2,false);
    });

    function myContextmenu1(evt){
        var myContextmenuTop = evt.clientY;
        var myContextmenuLeft = evt.clientX;
        coord1 = map1.getCoordinateFromPixel([myContextmenuLeft,myContextmenuTop]);
        evt.preventDefault();
        myContextOverlay1.setPosition(coord1);
    }
    function myContextmenu2(evt){
        var myContextmenuTop = evt.clientY;
        var myContextmenuLeft = evt.clientX - $("body").width()/2;
        coord2 = map2.getCoordinateFromPixel([myContextmenuLeft,myContextmenuTop]);
        evt.preventDefault();
        myContextOverlay2.setPosition(coord2);
    }
});


//-----------------------------------------------------------------------------------------
//円の座標を作る。
function createCirclePointCoords(circleCenterX,circleCenterY,circleRadius,pointsToFind){
    var angleToAdd = 360/pointsToFind;
    var coords = [];
    var angle = 45;
    var firstCoord;
    for (var i=0;i<pointsToFind;i++){
        angle = angle+angleToAdd;
        //console.log(angle);
        var coordX = circleCenterX + circleRadius * Math.cos(angle*Math.PI/180);
        var coordY = circleCenterY + circleRadius * Math.sin(angle*Math.PI/180);
        coords.push([coordX,coordY]);
        //最初のポイントを足すことによって多角形をきれいにとじる。
        if(i==0) firstCoord = [coordX,coordY];
        if(i==pointsToFind-1) coords.push(firstCoord);
    }
    return coords;
}
//--------------------------------------------------------------------------------------------------
//座標からメッシュコードを作る。
function coord2meshcode(coordinate){
    var target = coordinate;
    //var target = [139.71475,35.7007777]
    //var target = [131.20357990264893,31.664376636720988]
    //console.log(target);
    //------------------------------------------
    //一次メッシュ
    var z11 = Math.floor(target[1]*60/40);
    var z11a = (target[1]*60) % z11;
    var z12 = Math.floor(target[0]-100);
    var z12a = (target[0]-100) % z12;
    //------------------------------------------
    //二次メッシュ
    var z21 = Math.floor(z11a/5);
    //var z21a = z11a % z21;
    var z21a = z11a - (z21*5);
    var z22 = Math.floor(z12a*60/7.5);
    var z22a = (z12a*60) - (z22*7.5);
    //------------------------------------------
    //三次メッシュ
    var z31 = Math.floor(z21a*60/30);
    var z31a =(z21a*60) - (z31*30);
    var z32 = Math.floor(z22a*60/45);
    var z32a =(z22a*60) - (z32*45);
    //------------------------------------------
    //５００メートルメッシュ
    var z41 = Math.floor(z31a/15);
    var z42 = Math.floor(z32a/22.5);
    var z41plus42 = (z41*2) + (z42+1)
    //console.log("500メッシュ" + z41plus42)
    //------------------------------------------
    var meshCodeStr = String(z11) + String(z12) + String(z21) + String(z22) + String(z31) + String(z32) + String(z41plus42);
    //console.log(meshCodeStr)
    return meshCodeStr;
};
//--------------------------------------------------------------------------------------------------
//メッシュコードからポリゴンを作る
function meshcode2polygon(meshCodeStr,targetFeature){
    //console.log(meshCodeStr)
    var z11 = Number(meshCodeStr.slice(0,2));
    //console.log(z11)
    var z12 = Number(meshCodeStr.slice(2,4))
    //console.log(z12)
    var z21 = Number(meshCodeStr.slice(4,5))
    //console.log(z21)
    var z22 = Number(meshCodeStr.slice(5,6))
    //console.log(z22)
    var z31 = Number(meshCodeStr.slice(6,7))
    //console.log(z31)
    var z32 = Number(meshCodeStr.slice(7,8))
    //console.log(z32)
    var z4 = Number(meshCodeStr.slice(8,9))
    //console.log(z4)

    if(z4==1){
        var z4lat = 0;
        var z4lon = 0;
    }else if(z4==2){
        var z4lat = 0;
        var z4lon = 22.5;
    }else if(z4==3){
        var z4lat = 15;
        var z4lon = 0;
    }else if(z4==4){
        var z4lat = 15;
        var z4lon = 22.5;
    };
    var lat = ((z11/1.5*3600)+(z21*5*60)+(z31*30) + z4lat)/3600;
    var lon = (((z12+100)*3600)+(z22*7.5*60)+(z32*45) + z4lon)/3600;

    var mesh500LeftBottom = [lon,lat];
    //console.log("左下=" + mesh500LeftBottom)
    var mesh500LeftTop = [mesh500LeftBottom[0],mesh500LeftBottom[1] + 15/3600]
    //console.log("左上=" + mesh500LeftTop)
    var mesh500RightTop = [mesh500LeftBottom[0] + 22.5/3600,mesh500LeftBottom[1] + 15/3600]
    //console.log("右上=" + mesh500RightTop)
    var mesh500RightBottom = [mesh500LeftBottom[0] + 22.5/3600,mesh500LeftBottom[1]]
    //console.log("右下=" + mesh500RightBottom)
    var mesh500Coord= [mesh500LeftBottom,mesh500LeftTop,mesh500RightTop,mesh500RightBottom]
    //console.log(mesh500Coord)
    //------------------------------------------
    //座標系を変更
    mesh500LeftBottom = ol.proj.fromLonLat(mesh500LeftBottom)
    //console.log("h左下=" + mesh500LeftBottom)
    mesh500LeftTop = ol.proj.fromLonLat(mesh500LeftTop)
    //console.log("h左上=" + mesh500LeftTop)
    mesh500RightTop = ol.proj.fromLonLat(mesh500RightTop)
    //console.log("h右上=" + mesh500RightTop)
    mesh500RightBottom = ol.proj.fromLonLat(mesh500RightBottom)
    //console.log("h右下=" + mesh500RightBottom)
//	var mesh500Coord= [mesh500LeftBottom,mesh500LeftTop,mesh500RightTop,mesh500RightBottom]
    var mesh500Coord= [mesh500LeftTop,mesh500RightTop,mesh500RightBottom,mesh500LeftBottom,mesh500LeftTop]
    //console.log(mesh500Coord)

    var geometry = new ol.geom.Polygon([mesh500Coord]);
    var featureExtent = geometry.getExtent();
    var featureCenter = ol.extent.getCenter(featureExtent);
    var pixel = map1.getPixelFromCoordinate(featureCenter);
    var pixelFeature = map1.forEachFeatureAtPixel(pixel,function(feature,layer){
        if(feature===targetFeature){
            //console.log(layer.getProperties()["name"])
            return feature
        }
    });
    if(pixelFeature){
        console.log(111111111111111)
        var newFeature = new ol.Feature({
            geometry:geometry,
            //name: "newFeature",
            meshCode:meshCodeStr,
            zinkou:0,
            _fillColor:"rgba(0,0,255,0.3)",
            _top:"",
            _popup:"zinkou"
        });
        mesh500Source1.addFeature(newFeature);
    }
}
