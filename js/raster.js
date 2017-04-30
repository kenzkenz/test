var useLayersArr1 = null;
var useLayersArr2 = null
$(function(){
    //使用するレイヤーを設定
    useLayersArr1 = [pale1,seamlessphoto1,osm1,csArr1];
    useLayersArr2 = [pale2,seamlessphoto2,osm2,csArr2];
});
//------------------------------------------------------------------------------
//エクステントの座標系を変換する
function transformE(extent) {
	return ol.proj.transformExtent(extent,'EPSG:4326','EPSG:3857');
};
//------------------------------------------------------------------------------
//国土地理院淡色地図のレイヤー
var pale1 = new ol.layer.Tile({
    title:"国土地理院_単色地図",
    origin:"国土地理院",
    detail:"国土地理院の単色地図",
    source:new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"http://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
        minZoom:2,
        maxZoom:18
    })
})
var pale2 = new ol.layer.Tile({
    title:"国土地理院_単色地図",
    origin:"国土地理院",
    detail:"国土地理院の単色地図",
    source:new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"http://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
        minZoom:2,
        maxZoom:18
    })
})
//空中写真のレイヤー
var seamlessphoto1 = new ol.layer.Tile({
    title:"国土地理院_空中写真",
    origin:"国土地理院",
    detail:"国土地理院の空中写真",
    source:new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"http://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",
        minZoom:2,
        maxZoom:18
    })
})
var seamlessphoto2 = new ol.layer.Tile({
    title:"国土地理院_空中写真",
    origin:"国土地理院",
    detail:"国土地理院の空中写真",
    source:new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"http://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",
        minZoom:2,
        maxZoom:18
    })
})
//オープンストリートマップ
var osm1 = new ol.layer.Tile({
    title:"OpenStreetMap",
    origin:"OpenStreetMap Japan",
    detail:"OpenStreetMapは、道路地図などの地理情報データを誰でも利用できるよう、フリーの地理情報データを作成することを目的としたプロジェクトです。",
	source: new ol.source.OSM
});
var osm2 = new ol.layer.Tile({
    title:"OpenStreetMap",
    origin:"OpenStreetMap Japan",
    detail:"OpenStreetMapは、道路地図などの地理情報データを誰でも利用できるよう、フリーの地理情報データを作成することを目的としたプロジェクトです。",
	source: new ol.source.OSM
});
var ort = new ol.layer.Tile({
    title:"宮崎県航空写真",
    origin:"宮崎県県土整備部砂防課",
    detail:"砂防課が平成２５年度に撮影した航空写真をオルソ補正したもの",
	source: new ol.source.OSM
});
var cs1k1 = new ol.layer.Tile({
    title:"CS立体地図実験中",
    origin:"",
    detail:"",
    extent:transformE([128.4,32.5,129.5306,34.7]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"http://mtile.pref.miyazaki.lg.jp/tile/cs/1/{z}/{x}/{-y}.png",
		//minZoom :1,
		maxZoom:15
	})
});
var cs1k2 = new ol.layer.Tile({
    title:"CS立体地図実験中",
    origin:"",
    detail:"",
    extent:transformE([128.4,32.5,129.5306,34.7]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"http://mtile.pref.miyazaki.lg.jp/tile/cs/1/{z}/{x}/{-y}.png",
		//minZoom :1,
		maxZoom:15
	})
});
var cs2k1 = new ol.layer.Tile({
	extent:transformE([129.02,30.2,132.9,34]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"http://mtile.pref.miyazaki.lg.jp/tile/cs/2/{z}/{x}/{-y}.png",
		//minZoom :1,
		maxZoom:15
	})
});
var cs2k2 = new ol.layer.Tile({
	extent:transformE([129.02,30.2,132.9,34]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"http://mtile.pref.miyazaki.lg.jp/tile/cs/2/{z}/{x}/{-y}.png",
		//minZoom :1,
		maxZoom:15
	})
});
var csArr1 = [cs1k1,cs2k1];
var csArr2 = [cs1k2,cs2k2];
//------------------------------------------------------------------------------
//背景ダイアログ用のテーブルを作成する。haikei.jsで使っている。
function funcHaikeiTableCreate(mapElement,mapName){
    if(mapName=="map1"){
        var layers = useLayersArr1;
    }else{
        var layers = useLayersArr2;
    };
    var htmlChar = "<table class='haikei-tbl table table-bordered table-condensed'>";
    for(var i = 0; i <layers.length; i++){
        if(i==0){
            var chkChar = "checked";
        }else{
            var chkChar = "";
        };
        if(!Array.isArray(layers[i])){//配列でないとき
            var prop = layers[i].getProperties();
        }else{//配列のとき
            var prop = layers[i][0].getProperties();
        };
        htmlChar += "<tr>";
        htmlChar += "<td><label><input type='checkbox' name='haikei-check' value='" + i + "'" + chkChar + ">　" + prop["title"]+ "</label></td>";
        htmlChar += "<td class='td-slider'><div class='haikei-slider'></div></td>";
        htmlChar += "<td class='td-sort'><i class='fa fa-bars fa-lg'></i></td>";
        htmlChar += "<td class='td-info'><i class='fa fa-info-circle fa-lg'></i></td>";
        htmlChar += "</tr>";
    };
    htmlChar += "</table>";
    mapElement.find(".dialog-content").html(htmlChar);
    mapElement.find(".haikei-slider").eq(0).slider({
        min:0,max:1,value:1,step:0.01,
        slide: function(event, ui){
            layers[0].setOpacity(ui.value);
        }
    });
    mapElement.find(".haikei-tbl tbody").sortable({
        handle:".td-sort",
        update:function(event,ui){
            funcHaikeiLayerSort(mapElement,mapName);
        }
    }).disableSelection();
    //チェックボックスをカスタム
    mapElement.find("input").iCheck({
        checkboxClass:"icheckbox_flat-blue",
        radioClass:"iradio_square-red",
    });
    //チェックボックスを押した時
    mapElement.find("input").on("ifChanged",function(event){
        //背景レイヤーの追加、削除
        var layer = layers[Number($(this).val())];
        var trErement = $(this).parents("tr");
        if($(this).prop('checked')){
            if(!Array.isArray(layer)){
                eval(mapName).addLayer(layer);
            }else{//配列のとき
                for (var i = 0; i < layer.length; i++){
                    eval(mapName).addLayer(layer[i]);
                };
            };
            trErement.children().animate({
                "background-color":"#FFC0CB"
            },1000).animate({
                "background-color":"white"
            },1000);
            trErement.prependTo($(this).parents(".haikei-tbl"));
            funcHaikeiLayerSort(mapElement,mapName);
        }else{
            if(!Array.isArray(layer)){
                eval(mapName).removeLayer(layer);
            }else{//配列のとき
                for(var i = 0; i < layer.length; i++){
                    eval(mapName).removeLayer(layer[i]);
                };
            };
        };
        var tgtTr = $(this).parents("tr");
        tgtTr.find(".haikei-slider").slider({
            min:0,max:1,value:1,step:0.01,
            slide: function(event, ui){
                if(!Array.isArray(layer)){
                    layer.setOpacity(ui.value);
                }else{
                    for(var i = 0; i < layer.length; i++){
                        layer[i].setOpacity(ui.value);
                    };
                };
            }
        });
    });
    $("body").on("click",".td-info",function(){
        alert("作成中");
    });
};
//------------------------------------------------------------------------------
//背景レイヤーの重なり順をｔｒ順に変更する。
function funcHaikeiLayerSort(mapElement,mapName){
    mapElement.find(".haikei-tbl tbody tr").each(function(e){
        if(mapName=="map1"){
            var layer = useLayersArr1[Number($(this).find("input:checkbox").val())];
        }else{
            var layer = useLayersArr2[Number($(this).find("input:checkbox").val())];
        };
        if(!Array.isArray(layer)){
            layer.setZIndex(-e);
        }else{
            for (var i = 0; i < layer.length; i++){
                layer[i].setZIndex(-e);
            };
        };
    });
};
