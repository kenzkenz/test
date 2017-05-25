$(function() {
    var panoLayer = null;
    $("body").on("click",".pano-btn",function(){
        if($("#map1").height()>$(window).height()/2) {
            if($("#map1 .dualscreen-btn").text()=="1画面"){
                //alert("2画面時には使用できません。1画面に戻してください。");
                $.notify({//options
                    message: "<div style='text-align:center;'><i class='fa fa-exclamation fa-fw'></i>2画面時には使用できません。1画面に戻してください。</div>"
                }, {//settings
                    type: "info",
                    z_index: 999999,
                    placement: {
                        from: "top",
                        align: "center"
                    },
                    animate: {
                        enter: "animated fadeInDown",
                        exit: "animated fadeOutUp"
                    }
                });
                return;
            }
            $("#map1").animate({"width": "100%", "height": $(window).height() / 2 + "px"}, 500, function () {
                var lonlat = [131.423860,31.911069];
                lonlat = ol.proj.transform(lonlat,"EPSG:4326","EPSG:3857");
                map1.getView().setCenter(lonlat);
                map1.getView().setZoom(10);
                map1.updateSize();
                $("#map1").after("<div id='pano-div' style='height:" + $(window).height() / 2 + "px'><br>！！！実験中！！！<br>緑のポイントをクリックしてください。<br>パノラマ写真のデータはYさんからお借りしております。<div>");
                //embedpano({swf:"panos/tour.swf", xml:"panos/tour.xml", target:"pano-div", html5:"auto", mobilescale:1.0, passQueryParameters:true});
                //embedpano({swf:"panos/tour.swf", xml:"http://bamboograss.penne.jp/hinataGIS/krpano119_pr10/MAKE_VTOUR_VR-OPT/tour.xml", target:"pano-div", html5:"auto", mobilescale:1.0, passQueryParameters:true});
                //http://bamboograss.penne.jp/hinataGIS/krpano119_pr10/MAKE_VTOUR_VR-OPT/
                var vectorSource = new ol.source.Vector({
                    url:"geojson/aosima.geojson",
                    format: new ol.format.GeoJSON()
                });

                panoLayer = new ol.layer.Vector({
                    name:'panoLayer',
                    source:vectorSource,
                    //maxResolution:100, // > zoom 10
                    //renderOrder:ol.ordering.yOrdering(),
                    //style: function() { return iconStyle }
                    style:new ol.style.Style({
                        image:new ol.style.Circle({
                            radius:10,
                            fill:new ol.style.Fill({color:"green"}),
                            stroke:new ol.style.Stroke({color:"white",width:1})
                        })
                    })
                });
                panoLayer.set("altitudeMode","clampToGround");
                map1.addLayer(panoLayer);
                panoLayer.setZIndex(999999);
            });
        }else{
            $("#map1").animate({"width": "100%", "height": $(window).height() + "px"}, 500, function () {
                map1.updateSize();
                $("#pano-div").remove();
                map1.removeLayer(panoLayer);
            });
        }
    });

})
