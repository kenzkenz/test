var wikiCommonsLayer1 = null;
var wikiCommonsLayer2 = null;
$(function(){
    var vectorSource = new ol.source.WikiCommons({
        strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({minZoom:14,maxZoom:14,tileSize:512})),
        lang:"ja"
    });
    wikiCommonsLayer1 = new ol.layer.Vector({
        name:'wikiCommonsLayer',
        source:vectorSource,
        maxResolution:152, // > zoom 10
        renderOrder:ol.ordering.yOrdering(),
        //style: function() { return iconStyle }
        style:new ol.style.Style({
            image:new ol.style.Circle({
                radius:10,
                fill:new ol.style.Fill({color:"green"}),
                stroke:new ol.style.Stroke({color:"white",width:1})
            })
        })
    });
    wikiCommonsLayer2 = new ol.layer.Vector({
        name:'wikiCommonsLayer',
        source:vectorSource,
        maxResolution:100, // > zoom 10
        renderOrder:ol.ordering.yOrdering(),
        //style: function() { return iconStyle }
        style:new ol.style.Style({
            image:new ol.style.Circle({
                radius:10,
                fill:new ol.style.Fill({color:"green"}),
                stroke:new ol.style.Stroke({color:"white",width:1})
            })
        })
    });
    //------------------------------------------------------------------------------------------
    $("body").on("change",".wiki-toggle",function(){
        var mapObj = funcMaps($(this));
        if(mapObj["name"]=="map1") {
            var layer = wikiCommonsLayer1;
        }else{
            var layer = wikiCommonsLayer2;
        }
        if($(this).prop("checked")){
            $.notify({//options
                icon: 'glyphicon glyphicon-warning-sign',
                message: 'ズーム率11以上で表示されます。'
            },{//settings
                type: "info",
                z_index: 999999,
                placement: {
                    from: "bottom",
                    align: "center"
                },
                animate: {
                    enter: 'animated fadeInDown',
                    exit: 'animated fadeOutUp'
                }
            });
            //alert("ある程度ズームアップしないと表示されません。ズーム率11以上\nまた、表示に時間がかかるかもしれません。しばらく様子を見てください。")
            layer.set("altitudeMode","clampToGround");
            eval(mapObj["name"]).addLayer(layer);
            layer.setZIndex(999999);
        }else{
            eval(mapObj["name"]).removeLayer(layer);
        }
    });
    //-----------------------------------------------------------------------------------------
    function wikiPointerMoveFunc(evt){
        var mapElementID = evt["map"]["D"]["target"];
        var pixel = eval(mapElementID).getPixelFromCoordinate(evt.coordinate);
        var feature = eval(mapElementID).forEachFeatureAtPixel(pixel,function(feature,layer){
            if(layer){
                if(layer.getProperties()["name"]=="wikiCommonsLayer"){
                    return feature;
                }
            }
        });
        if(feature){
            $(".ol-viewport").css({cursor:"pointer"});
        }else{
            $(".ol-viewport").css({cursor:""});
        }
    }
    //------------------------------------------------------------------------------------------
    //map2.on("singleclick",function(evt){
    //    wikiPopupShowFunc(evt);
    //});
    //------------------------------------------------------------------------------------------
    //map.on("singleclick",function(evt){
    //    wikiPopupShowFunc(evt);
    //});
    /*
    function wikiPopupShowFunc(evt){
        var mapElementID = evt["map"]["D"]["target"];
        if(mapElementID=="map"){
            var popupCtrStr = "popup";
        }else{
            var popupCtrStr = "popup2";
        };
        var feature = eval(mapElementID).forEachFeatureAtPixel(evt.pixel,function(feature,layer){
            if(layer.getProperties()["name"]=="wikiCommonsLayer"){
                return feature;
            };
        });
        if(feature){
            var featureProp = feature.getProperties();
            var content = "";
            content += featureProp["title"] + "<br>";
            //content += "<a href='" + featureProp["url"] + "' TARGET='_blank'><img src='" + featureProp["thumbnail"] +  "'></a>";
            content += "<a href='" + featureProp["url"] + "' TARGET='_blank'><img id='wikiImg'></a>";
            content += "<img id='wikiLoading' src='./loadinggif/loading03.gif'>";
            content += "copy:" +  featureProp["copy"];
            content += "<br>user:" +  featureProp["user"];
            content += "<br><a href='" + featureProp["descriptionurl"] + "?uselang=ja' TARGET='_blank'><label>Wikiへ</label></a>";
            var coord = evt.coordinate;
            eval(popupCtrStr).show(coord,content);
            var url=featureProp["thumbnail"];
            var imgPreloader=new Image();
            imgPreloader.onload=function() {
                //ロード完了で画像を表示
                $("#wikiLoading").hide();
                $("#wikiImg").attr({'src':url});
            }
            imgPreloader.src=url;
        };
    };
    */
});
