var useLayersArr1 = null;
var useLayersArr2 = null
$(function(){
    //使用するレイヤーを設定
    useLayersArr1 = [pale1,seamlessphoto1,osm1,ort1,tunami1,sinsuisoutei1,kikenkeiryuu1,
                    kyuukeisyakikenkasyo1,tisitu1,mierune1,ryuuiki1,ecoris1,muro1,csArr1];
    useLayersArr2 = [pale2,seamlessphoto2,osm2,ort2,tunami2,sinsuisoutei2,kikenkeiryuu2,
                    kyuukeisyakikenkasyo2,tisitu2,mierune2,ryuuiki2,ecoris2,muro2,csArr2];
});
//------------------------------------------------------------------------------
//エクステントの座標系を変換する
function transformE(extent) {
	return ol.proj.transformExtent(extent,'EPSG:4326','EPSG:3857');
};
//------------------------------------------------------------------------------
//背景ダイアログ用のテーブルを作成する。haikei.jsで使っている。
function funcHaikeiTableCreate(mapElement,mapName){
    if(mapName=="map1"){
        var layers = useLayersArr1;
    }else{
        var layers = useLayersArr2;
    };
    var htmlChar = "<div class='haikei-tbl-div'><table class='haikei-tbl table table-bordered table-condensed'>";
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
        htmlChar += "<td><label><input type='checkbox' name='haikei-check' value='" + i + "'" + chkChar + ">　" + prop["title"] + "</label></td>";
        htmlChar += "<td class='td-slider'><div class='haikei-slider'></div></td>";
        htmlChar += "<td class='td-sort' title='ドラッグします。'><i class='fa fa-bars fa-lg'></i></td>";
        htmlChar += "<td class='td-info'><i class='fa fa-info-circle fa-lg primary'></i></td>";
        htmlChar += "</tr>";
    };
    htmlChar += "</table></div>";
    mapElement.find(".dialog-content").html(htmlChar);
    funcHaikeiTblDivHeight();//common.jsにある関数
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
    //チェックボックスを押した時★★★★★
    mapElement.find("input").on("ifChanged",function(event){
        //背景レイヤーの追加、削除
        var layer = layers[Number($(this).val())];
        var trErement = $(this).parents("tr");
        if($(this).prop("checked")){
            if(!Array.isArray(layer)){
                eval(mapName).addLayer(layer);
                //座標を移動する。
                if(layer.getProperties()["coord"]){
                    var lonlat = layer.getProperties()["coord"];
                    lonlat = ol.proj.transform(lonlat,"EPSG:4326","EPSG:3857");
                    eval(mapName).getView().setCenter(lonlat);
                };
                //ズーム利を設定する。
                if(layer.getProperties()["zoom"]){
                    var zoom = layer.getProperties()["zoom"];
                    console.log(zoom);
                    eval(mapName).getView().setZoom(zoom);
                };
            }else{//配列のとき
                for(var i = 0; i < layer.length; i++){
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
        var mapObj = funcMaps($(this));
        var content = "作成中！！！！！！！！！！！！！！！";
        mydialog({
            id:"info-dialog",
            class:"info-dialog",
            map:mapObj["name"],
            title:"インフォメーション",
            content:content,
            top:"90px",
            right:"20px"
        });
        return false;
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
