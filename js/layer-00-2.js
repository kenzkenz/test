var useLayersArr1 = null;
var useLayersArr2 = null;
$(function(){
    //使用するレイヤーを設定
    useLayersArr1 = [pale1,blank1,relief1,osm1,mierune1,mieruneMono1,toner1,amArr1,ort1,seamlessphoto1,gazo11,muro1,murous1,
                    tunami1,sinsuisoutei1,kikenkeiryuu1,kyuukeisyakikenkasyo1,
                    ryuuiki1,ecoris1,obi1,tisitu1,nihonCs1,csArr1];
    useLayersArr2 = [pale2,blank2,relief2,osm2,mierune2,mieruneMono2,toner2,amArr2,ort2,seamlessphoto2,gazo12,muro2,murous2,
                    tunami2,sinsuisoutei2,kikenkeiryuu2,kyuukeisyakikenkasyo2,
                    ryuuiki2,ecoris2,obi2,tisitu2,nihonCs2,csArr2];
    /*
    useLayersArr1 = [pale1,osm1,mierune1,mieruneMono1,amArr1,ort1,seamlessphoto1,gazo11,muro1,muroQ1,
        tunami1,sinsuisoutei1,kikenkeiryuu1,kyuukeisyakikenkasyo1,ryuuiki1,ecoris1,
        obi1,tisitu1,nihonCs1,csArr1];
    useLayersArr2 = [pale2,osm2,mierune2,mieruneMono2,amArr2,ort2,seamlessphoto2,gazo12,muro2,muroQ2,
        tunami2,sinsuisoutei2,kikenkeiryuu2,kyuukeisyakikenkasyo2,ryuuiki2,ecoris2,
        obi2,tisitu2,nihonCs2,csArr2];
     */
});
//------------------------------------------------------------------------------
//背景ダイアログ用のテーブルを作成する。haikei.jsで使っている。
function funcHaikeiTableCreate(mapElement,mapName){
    if(mapName=="map1"){
        var layers = useLayersArr1;
    }else{
        var layers = useLayersArr2;
    }
    var htmlChar = "<div class='haikei-tbl-div'><table class='haikei-tbl table table-bordered table-condensed'>";
    for(var i = 0; i <layers.length; i++){
        if(i==0){
            var chkChar = "checked";
        }else{
            var chkChar = "";
        }
        if(!Array.isArray(layers[i])){//配列でないとき
            var prop = layers[i].getProperties();
        }else{//配列のとき
            var prop = layers[i][0].getProperties();
        }
        if(prop["icon"]) {
            var icon = prop["icon"] + " ";
        }else{
            var icon = "";
        }
        htmlChar += "<tr>";
        htmlChar += "<td><label><input type='checkbox' name='haikei-check' value='" + i + "'" + chkChar + "> " + icon +  prop["title"] + "</label></td>";
        htmlChar += "<td class='td-slider'><div class='haikei-slider'></div></td>";
        htmlChar += "<td class='td-sort' title='ドラッグします。'><i class='fa fa-bars fa-lg'></i></td>";
        htmlChar += "<td class='td-info'><i class='fa fa-info-circle fa-lg primary'></i></td>";
        htmlChar += "</tr>";
    }
    htmlChar += "</table></div>";
    mapElement.find(".haikei-dialog .dialog-content").html(htmlChar);
    funcHaikeiTblDivHeight();//common.jsにある関数
    mapElement.find(".haikei-slider").eq(0).slider({
        min:0,max:1,value:1,step:0.01,
        slide: function(event,ui){
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
    mapElement.find("input:checkbox[name='haikei-check']").iCheck({
        checkboxClass:"icheckbox_flat-blue",
        radioClass:"iradio_flat-blue"
    });
    //チェックボックスを押した時★★★★★-------------------------------------------------------------------------
    mapElement.find("input:checkbox[name='haikei-check']").on("ifChanged",function(event){
    //mapElement.find("input").on("ifChanged",function(event){
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
                }
                //ズーム利を設定する。
                if(layer.getProperties()["zoom"]){
                    var zoom = layer.getProperties()["zoom"];
                    eval(mapName).getView().setZoom(zoom);
                }
            }else{//配列のとき
                for(var i = 0; i < layer.length; i++){
                    eval(mapName).addLayer(layer[i]);
                }
            }
            trErement.children().animate({
                "background-color":"#FFC0CB"
            },1000).animate({
                "background-color":"white"
            },1000);
            trErement.prependTo($(this).parents(".haikei-tbl"));
            //$(this).parents(".haikei-tbl-div").scrollTop(0);
            $(this).parents(".haikei-tbl-div").animate({scrollTop:0});
            funcHaikeiLayerSort(mapElement,mapName);
        }else{
            if(!Array.isArray(layer)){
                eval(mapName).removeLayer(layer);
            }else{//配列のとき
                for(var i = 0; i < layer.length; i++){
                    eval(mapName).removeLayer(layer[i]);
                }
            }
        }
        var tgtTr = $(this).parents("tr");
        tgtTr.find(".haikei-slider").slider({
            min:0,max:1,value:1,step:0.01,
            slide: function(event, ui){
                if(!Array.isArray(layer)){
                    layer.setOpacity(ui.value);
                }else{
                    for(var i = 0; i < layer.length; i++){
                        layer[i].setOpacity(ui.value);
                    }
                }
            }
        });
    });
}
//------------------------------------------------------------------------------
//背景レイヤーの重なり順をtr順に変更する。
function funcHaikeiLayerSort(mapElement,mapName){
    //--------------------------------------
    //swipeのため
    if(mapName=="map1"){
        var swipeCtr = swipeCtr1;
    }else{
        var swipeCtr = swipeCtr2;
    }
    if(mapElement.find(".swipe-toggle").prop("checked")){
        eval(mapName).addControl(swipeCtr);
    }else{
        eval(mapName).removeControl(swipeCtr);
    }
    //縦分割か横分割か
    swipeCtr.set("orientation",$("input:radio[name='swipe-radio-" + mapName + "']:checked").val());
    //-------------------------------------

    mapElement.find(".haikei-tbl tbody tr").each(function(e){
        if(mapName=="map1"){
            var layer = useLayersArr1[Number($(this).find("input:checkbox").val())];
        }else{
            var layer = useLayersArr2[Number($(this).find("input:checkbox").val())];
        }
        if(!Array.isArray(layer)){
            layer.setZIndex(-e);

            //------------------------------
            //swipeのため
            swipeCtr.removeLayer(layer);
            if(e==1) {
                swipeCtr.addLayer(layer,true);
            }else if(e==0) {
                swipeCtr.addLayer(layer);
            }
            //------------------------------

        }else{
            for (var i = 0; i < layer.length; i++){
                layer[i].setZIndex(-e);

                //------------------------------
                //swipeのため
                swipeCtr.removeLayer(layer);
                if(e==1) {
                    swipeCtr.addLayer(layer,true);
                }else if(e==0) {
                    swipeCtr.addLayer(layer);
                }
                //------------------------------
            }
        }
    });
}
//------------------------------------------------------------------------
$(function(){
    //--------------------------------------------------------------------------
    //インフォメーションを押したとき
    $("body").on("click",".td-info",function(){
        var mapObj = funcMaps($(this));
        var layer = mapObj["layers"][$(this).parents("tr").find("input").val()];
        if(!Array.isArray(layer)){
            var prop = layer.getProperties();
        }else{//配列のとき
            var prop = layer[0].getProperties();
        }
        var content = "<table class='info-tbl table table-bordered table-condensed'>";
        content += "<tr><td>背景名</td><td>" + prop["title"] + "</td></tr>";
        content += "<tr><td>出展</td><td>" + prop["origin"] + "</td></tr>";
        content += "<tr><td>説明</td><td>" + prop["detail"] + "</td></tr>";
        content += "</table>";
        mydialog({
            id:"info-dialog",
            class:"info-dialog",
            map:mapObj["name"],
            title:"インフォメーション",
            content:content,
            top:"100px",
            right:"20px",
            rmDialog:true
        });
        return false;
    });
    //------------------------------------------------------------
    //スワイプトグルを操作したとき
    $("body").on("change",".swipe-toggle",function(){
        var mapObj = funcMaps($(this));
        funcHaikeiLayerSort(mapObj["element"], mapObj["name"]);
    })
});
