var dataLayer1 = [];
var dataLayer2 = [];
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
    function funcDataTableCreate(mapElement,mapName) {
        if (mapName === "map1") {
            //var layers = useLayersArr1;
            //console.log(mapName);
        } else {
            //var layers = useLayersArr2;
        }
        var htmlChar = "作成中。現在地取得ボタンは右下に移動!";
            htmlChar += "<div class='data-tbl-div'><table class='data-tbl table table-bordered table-condensed'>";
        for(var i = 0; i < dataLayerArr.length; i++){
            var obj = dataLayerArr[i];
            htmlChar += "<tr data-opacity='" + obj["opacity"] + "'>";
            htmlChar += "<td><label><input type='checkbox' name='data-check' value='" + obj["id"] + "'>" + obj["icon"] + obj["title"] +  "</label></td>";
            htmlChar += "<td class='data-td-slider'><div class='data-slider'></div></td>";
            htmlChar += "<td class='data-td-sort' title='ドラッグします。'><i class='fa fa-bars fa-lg'></i></td>";
            htmlChar += "<td class='data-td-info'><i class='fa fa-info-circle fa-lg primary'></i></td>";
            htmlChar += "</tr>";
        }
        htmlChar += "</table></div>";
        $("#" + mapName + " .data-dialog .dialog-content").html(htmlChar);
        funcHaikeiTblDivHeight();//common.jsにある関数
        /*
        $("#" + mapName + " .data-slider").eq(0).slider({
            min:0,max:1,value:1,step:0.01,
            slide: function(event,ui){
                layers[0].setOpacity(ui.value);
            }
        });
        */
        $("#" + mapName + " .data-tbl tbody").sortable({
            handle:".data-td-sort",
            update:function(event,ui){
                //funcHaikeiLayerSort(mapElement,mapName);
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
            console.log(opacity);
            if($(this).prop("checked")) {
                dataLayerCreate(dataLayerId, mapName, tgtTr,opacity);
            }else{
                
            }
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
    //
    function dataLayerCreate(dataLayerId,mapName,tgtTr,opacity){
        $.ajax({
            type:"get",
            url:"php/geojson-create.php",
            dataType:"json",
            data:{
                dataLayerId:dataLayerId
            }
        }).done(function(json){
            //console.log(json);
            var geojsonObject = json.geojson;
            var vectorSource = new ol.source.Vector({
                features: (new ol.format.GeoJSON()).readFeatures(geojsonObject,{featureProjection:'EPSG:3857'})
            });
            if(mapName==="map1"){
                var dataLayer = dataLayer1[dataLayerId];
            }else{
                var dataLayer = dataLayer2[dataLayerId];
            }
            dataLayer = new ol.layer.Vector({
                name:"dataLayer",
                source:vectorSource,
                style: new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 12,
                        fill: new ol.style.Fill({color: "red"}),
                        stroke: new ol.style.Stroke({color: "white", width: 1})
                    })
                })
            });
            dataLayer.set("altitudeMode","clampToGround");
            eval(mapName).addLayer(dataLayer);
            dataLayer.setOpacity(opacity);
            dataLayer.setZIndex(9999);

            tgtTr.find(".data-slider").slider({
                min:0,max:1,value:1,step:0.01,
                slide: function(event, ui){
                    dataLayer.setOpacity(ui.value);
                }
            });
            tgtTr.find(".ui-slider-handle").css({
                "left":opacity*100 + "%"
            })

        }).fail(function(){
            alert("失敗!");
        });
    }
});
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
