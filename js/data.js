var dataLayer = [];
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
                title: "データレイヤー 作成中",
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
        var htmlChar = "作成中!検証中！試行中！";
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
        htmlChar += "</table></div>";
        $("#" + mapName + " .data-dialog .dialog-content").html(htmlChar);
        funcHaikeiTblDivHeight();//common.jsにある関数
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
        //チェックボックスを押した時★★★★★-------------------------------------------------------------------------------
        $("#" + mapName + " input:checkbox[name='data-check']").on("ifChanged",function(event){
            var mapObj = funcMaps($(this));
            var mapName = mapObj["name"];
            var dataLayerId = $(this).val();
            var tgtTr = $(this).parents("tr");
            var opacity = tgtTr.data("opacity");
            var zoom = tgtTr.data("zoom");
            if($(this).prop("checked")) {
                dataLayerCreate(dataLayerId, mapName, tgtTr,opacity,zoom);
            }else {
                eval(mapName).removeLayer(dataLayer[dataLayerId]);
                tgtTr.find(".data-slider").remove();
            }
            tgtTr.prependTo($(this).parents(".data-tbl"));
            $(this).parents(".data-tbl-div").animate({scrollTop:0});
        })
    }
    //------------------------------------------------------------------------------------------------------------------
    //インフォメーションダイアログ生成
    $("body").on("click",".data-td-info",function(){
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        var targetLayer = $(this).parents("tr").find("input:checkbox[name='data-check']").val();
        var targetId = targetLayer.split("-")[1];
        console.log(targetLayer);
        var dataLayerFilter = dataLayerArr.filter(function (item,index) {
           if(item.id===targetId) return true;
        });
        var obj = dataLayerFilter[0];
        console.log(obj);
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
            type:"get",
            url:"php/geojson-create.php",
            dataType:"json",
            data:{
                dataLayerId:dataLayerId.split("-")[1]
            }
        }).done(function(json){
            //console.log(json.geojson);
            //console.log(JSON.stringify(json.geojson));
            var geojsonObject = json.geojson;
            var vectorSource = new ol.source.Vector({
                features: (new ol.format.GeoJSON()).readFeatures(geojsonObject,{featureProjection:'EPSG:3857'})
            });
            //スタイルファンクション---------------------
            var styleFunction = function(feature, resolution) {
                var prop = feature.getProperties();
                var geoType = feature.getGeometry().getType();
                var fillColor = prop["_fillColor"];

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
                    var pointRadius = 10;
                }else{
                    var pointRadius = 12;
                }
                switch (geoType){
                    case "LineString":
                        var style = new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color:fillColor,
                                width:6
                            })
                        });
                        break;
                    case "Point":
                        var style = new ol.style.Style({
                            image: new ol.style.Circle({
                                radius:pointRadius,
                                fill: new ol.style.Fill({color:fillColor}),
                                stroke: new ol.style.Stroke({color: "white", width: 1})
                            })
                        });
                        break;
                    case "Polygon":
                    case "MultiPolygon":
                        var style = new ol.style.Style({
                            fill: new ol.style.Fill({
                                color:fillColor
                            }),
                            stroke: new ol.style.Stroke({
                                color: "gray",
                                width: 1
                            })
                        });
                        break;
                    default:
                }
                return style;
            };
            //--------------------------------------
            dataLayer[dataLayerId] = new ol.layer.Vector({
                name:"dataLayer",
                source:vectorSource,
                style:styleFunction
            });
            dataLayer[dataLayerId].set("altitudeMode","clampToGround");
            eval(mapName).addLayer(dataLayer[dataLayerId]);
            dataLayer[dataLayerId].setOpacity(opacity);
            dataLayer[dataLayerId].setZIndex(9999);
            console.log(zoom)
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
                    valueAr.push(features[i]["I"]["75歳以上比率"]);
                }
                var color100Ar = funcColor100(valueAr);
                var color100 = color100Ar[0];
                var min = color100Ar[2];
                var d3Color = d3.interpolateLab("white", "purple");
                for (i = 0; i < features.length; i++) {
                    var value = features[i]["I"]["75歳以上比率"];
                    var c100 = (value-min)/color100/100;
                    var color0 = new RGBColor(d3Color(c100));
                    var rgb = new RGBColor(d3Color(c100)).toRGB();
                    var rgba = "rgba(" + color0.r + "," + color0.g + "," + color0.b +"," + "0.9)";
                    var targetFillColor = d3Color(c100);
                    //var fillColor = d3Color(features[i]["I"]["75歳以上比率"]);
                    features[i]["I"]["_fillColor"] = rgba;
                    features[i]["I"]["_polygonHeight"] = c100*c100*100000;
                }
            }
        }).fail(function(){
            alert("失敗!");
        });
    }
});
//------------------------------------------------------------------------------
//データレイヤーの重なり順をtr順に変更する。
function funcDataLayerSort(mapName){
    $("#" + mapName + " .data-tbl tbody tr").each(function(e){
        var layerId = $(this).find("input:checkbox[name='data-check']").val();
        dataLayer[layerId].setZIndex(-e + 9999);
    });
}
//----------------------------------------------------------------------------------------------------------------------

var dataLayerArr =
    [
        {
            "id":"zinzya",
            "title":"宮崎県神社",
            "origin":"",
            "detail":"試行中",
            "icon":"<i class='fa fa-tree fa-fw' style='color:gray;'></i>",
            "opacity":"0.5",
            "zoom":""

        },
        {
            "id":"youtotiiki",
            "title":"宮崎県用途地域",
            "origin":"",
            "detail":"試行中",
            "icon":"<i class='fa fa-map fa-fw' style='color:orangered;'></i>",
            "opacity":"0.5",
            "zoom":""
        },
        {
            "id":"senkyoku",
            "title":"小選挙区75歳以上比率",
            "origin":"<a href='http://www.csis.u-tokyo.ac.jp/~nishizawa/senkyoku/' target='_blank'>衆議院議員選挙の小選挙区に関するデータを提供するページ</a>",
            "detail":"",
            "icon":"<i class='fa fa-area-chart fa-fw' style='color:purple;'></i>",
            "opacity":"1",
            "zoom":"6"
        },
        {
            "id":"kousokudouro",
            "title":"高速道路",
            "origin":"",
            "detail":"試行中",
            "icon":"<i class='fa fa-car fa-fw' style='color:red;'></i>",
            "opacity":"0.8",
            "zoom":""
        },
        {
            "id":"kousokudourohigasi9",
            "title":"高速道路(東九州)",
            "origin":"",
            "detail":"試行中",
            "icon":"<i class='fa fa-car fa-fw' style='color:red;'></i>",
            "opacity":"0.9",
            "zoom":""
        },
        {
            "id":"mitinoeki",
            "title":"道の駅",
            "origin":"",
            "detail":"試行中",
            "icon":"<i class='fa fa-car fa-fw' style='color:midnightblue;'></i>",
            "opacity":"1",
            "zoom":""
        },
        {
            "id":"koureisyasisetu",
            "title":"高齢者福祉施設",
            "origin":"",
            "detail":"試行中",
            "icon":"<i class='fa fa-user fa-fw' style='color:black;'></i>",
            "opacity":"1",
            "zoom":""
        },
        {
            "id":"osusumesi",
            "title":"宮崎オススめし",
            "origin":"",
            "detail":"試行中",
            "icon":"<i class='fa fa-cutlery fa-fw' style='color:orange;'></i>",
            "opacity":"1",
            "zoom":""
        }
    ];
