var dataLayer = [];
$(function(){
    $(".data-btn").click(function(){
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        var id = "data-dialog-" + mapObj["name"];
        var content = "";
        mydialog({
            id: id,
            class: "data-dialog",
            map:mapName,
            title: "データレイヤー 作成中",
            content: content,
            top: "55px",
            left: "10px",
            //hide:true,
            //plus:true
        });
        funcDataTableCreate(mapObj,mapName);
    });
    //------------------------------------------------------------------------------------------------------------------
    function funcDataTableCreate(mapObj,mapName) {
        var htmlChar = "作成中。現在地取得ボタンは右下に移動!";
            htmlChar += "<div class='data-tbl-div'><table class='data-tbl table table-bordered table-condensed'>";
        for(var i = 0; i < dataLayerArr.length; i++){
            var obj = dataLayerArr[i];
            var layerId = mapName + "-" + obj["id"];
            htmlChar += "<tr data-opacity='" + obj["opacity"] + "'>";
            htmlChar += "<td><label><input type='checkbox' name='data-check' value='" + layerId + "'>" + obj["icon"] + obj["title"] +  "</label></td>";
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
        //チェックボックスを押した時★★★★★-------------------------------------------------------------------------
        $("#" + mapName + " input:checkbox[name='data-check']").on("ifChanged",function(event){
            var mapObj = funcMaps($(this));
            var mapName = mapObj["name"];
            var dataLayerId = $(this).val();
            var tgtTr = $(this).parents("tr");
            var opacity = tgtTr.data("opacity");
            if($(this).prop("checked")) {
                dataLayerCreate(dataLayerId, mapName, tgtTr,opacity);
            }else {
                eval(mapName).removeLayer(dataLayer[dataLayerId]);
                tgtTr.find(".data-slider").remove();
            }
            tgtTr.prependTo($(this).parents(".data-tbl"));
            $(this).parents(".data-tbl-div").animate({scrollTop:0});
        })
    }
    //------------------------------------------------------------------------------------------------------------------
    $("body").on("click",".data-td-info",function(){
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        var targetId = $(this).parents("tr").find("input:checkbox[name='data-check']").val();
        var dataLayerFilter = dataLayerArr.filter(function (item,index) {
           if(item.id===targetId) return true;
        });
        var obj = dataLayerFilter[0];
        var content = "<table class='data-info-tbl table table-bordered table-condensed'>";
            content += "<tr><td>データ名</td><td>" + obj["title"] + "</td></tr>";
            content += "<tr><td>出典</td><td>" + obj["origin"] + "</td></tr>";
            content += "<tr><td>説明</td><td>" + obj["detail"] + "</td></tr>";
            content += "</table>";
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
    //データレイヤー　クリエイト　ファンクション
    function dataLayerCreate(dataLayerId,mapName,tgtTr,opacity){
        $.ajax({
            type:"get",
            url:"php/geojson-create.php",
            dataType:"json",
            data:{
                dataLayerId:dataLayerId.split("-")[1]
            }
        }).done(function(json){
            var geojsonObject = json.geojson;
            var vectorSource = new ol.source.Vector({
                features: (new ol.format.GeoJSON()).readFeatures(geojsonObject,{featureProjection:'EPSG:3857'})
            });
            var styleFunction = function(feature, resolution) {
                var prop = feature.getProperties();
                var geoType = feature.getGeometry().getType();
                console.log(geoType);
                var fillColor = prop["_fillColor"];
                switch (geoType){
                    case "Point":
                        var style = new ol.style.Style({
                            image: new ol.style.Circle({
                                radius: 12,
                                fill: new ol.style.Fill({color:fillColor}),
                                stroke: new ol.style.Stroke({color: "white", width: 1})
                            })
                        });
                        break;
                    case "Polygon":
                        var style = new ol.style.Style({
                            fill: new ol.style.Fill({
                                color:fillColor
                            }),
                            stroke: new ol.style.Stroke({
                                color: '#0ff',
                                width: 1
                            })
                        });
                        break;
                    default:
                }
                return style;
            };
            dataLayer[dataLayerId] = new ol.layer.Vector({
                name:"dataLayer",
                source:vectorSource,
                style:styleFunction
                /*
                style: new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 12,
                        fill: new ol.style.Fill({color: "red"}),
                        stroke: new ol.style.Stroke({color: "white", width: 1})
                    })
                })
                */
            });
            dataLayer[dataLayerId].set("altitudeMode","clampToGround");
            eval(mapName).addLayer(dataLayer[dataLayerId]);
            dataLayer[dataLayerId].setOpacity(opacity);
            dataLayer[dataLayerId].setZIndex(9999);
            //スライダー---------------------------
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
            "origin":"オリジン",
            "detail":"ディティール",
            "icon":"<i class='fa fa-picture-o fa-fw' style='color:gray;'></i>",
            "opacity":"0.5"
        },
        {
            "id":"youtotiiki",
            "title":"宮崎県用途地域",
            "origin":"オリジン",
            "detail":"ディティール",
            "icon":"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
            "opacity":"0.5"
        }
    ];
