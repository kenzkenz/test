var useLayersArr1 = null;
var useLayersArr2 = null;
var plusLayer1 = [];
var plusLayer2 = [];
var plI = 0;
$(function(){
    //使用するレイヤーを設定
    useLayersArr1 = [pale1,blank1,relief1,osm1,mierune1,mieruneMono1,toner1,
                    ort1,amArr1,sengomiya1,sengonobe1,sengomiyako1,
                    aya1,
                    seamlessphoto1,gazo11,muro1,murous1,
                    kago1,sengokago1,
                    ryuuiki1,ecoris1,seki1,tisitu1,nihonCs1,csArr1,
                    mrtiba1,mransei1,
                    tunami1,sinsuisoutei1,kikenkeiryuu1,kyuukeisyakikenkasyo1
                    ];
    useLayersArr2 = [pale2,blank2,relief2,osm2,mierune2,mieruneMono2,toner2,
                    ort2,amArr2,sengomiya2,sengonobe2,sengomiyako2,
                    aya2,
                    seamlessphoto2,gazo12,muro2,murous2,
                    kago2,sengokago2,
                    ryuuiki2,ecoris2,seki2,tisitu2,nihonCs2,csArr2,
                    mrtiba2,mransei2,
                    tunami2,sinsuisoutei2,kikenkeiryuu2,kyuukeisyakikenkasyo2
                    ];
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
    //チェックボックスをカスタム。iCheckに。
    mapElement.find("input:checkbox[name='haikei-check']").iCheck({
        checkboxClass:"icheckbox_flat-blue",
        radioClass:"iradio_flat-blue"
    });
    //チェックボックスを押した時★★★★★-------------------------------------------------------------------------
    mapElement.find("input:checkbox[name='haikei-check']").on("ifChanged",function(event){
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
        //---------------------------------------------------------------------
        var ua = navigator.userAgent;
        var idandclass = layer.getProperties()["title"];
        var myurl = location.href;
        $.ajax({
            type:"GET",
            url:"php/log.php",
            data:{
                idandclass:idandclass,
                ua:ua,
                myurl:myurl
            }
        }).done(function(){
        }).fail(function(){
            console.log("ログ失敗!");
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
        if($(this).attr("class")!="plus-tr") {
            if (!Array.isArray(layer)) {
                layer.setZIndex(-e);

                //------------------------------
                //swipeのため
                swipeCtr.removeLayer(layer);
                if (e == 1) {
                    swipeCtr.addLayer(layer, true);
                } else if (e == 0) {
                    swipeCtr.addLayer(layer);
                }
                //------------------------------

            } else {
                for (var i = 0; i < layer.length; i++) {
                    layer[i].setZIndex(-e);

                    //------------------------------
                    //swipeのため
                    swipeCtr.removeLayer(layer);
                    if (e == 1) {
                        swipeCtr.addLayer(layer, true);
                    } else if (e == 0) {
                        swipeCtr.addLayer(layer);
                    }
                    //------------------------------
                }
            }
        }else{
            var Num = Number($(this).find("input:checkbox[name='haikei-check-plus']").val());
            if(mapName=="map1") {
                var plusLayer = plusLayer1[Num];
            }else{
                var plusLayer = plusLayer2[Num];
            }
            plusLayer.setZIndex(-e);

            //------------------------------
            //swipeのため
            swipeCtr.removeLayer(plusLayer);
            if (e == 1) {
                swipeCtr.addLayer(plusLayer, true);
            } else if (e == 0) {
                swipeCtr.addLayer(plusLayer);
            }
            //------------------------------

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
        content += "<tr><td>出典</td><td>" + prop["origin"] + "</td></tr>";
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
    });
    //------------------------------------------------------------
    //プラスアイコンを押した時
    $("body").on("click",".dialog-plus",function(){
        var mapObj = funcMaps($(this));
        var id = "plus-dialog-" + mapObj["name"];
        var content = "地図タイルのURLを入力します。<br>・国土地理院標準地図の例：<br>　http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png";
            content += "<br>・国土地理院空中写真（1936年頃：東京都23区）の例<br>　http://cyberjapandata.gsi.go.jp/xyz/ort_riku10/{z}/{x}/{y}.png"
            content += "<input type='text' class='form-control plus-input' placeholder='例：http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png'>";
            content += '<div class="plus-div"><button type="button" class="btn btn-primary plus-btn">追加</button></div>';
        mydialog({
            id: id,
            class: "plus-dialog",
            map: mapObj["name"],
            title: "背景レイヤー追加",
            content: content,
            top: "55px",
            right: "20px",
            //hide:true,
            //plus:true
        });
        return false;
    });
    //------------------------------------------------------------
    //レイヤー追加ボタンを押した時
    $("body").on("click",".plus-btn",function() {
        plI++;
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        var plusUrl = $(this).parents(".dialog-base").find(".plus-input").val();
        if(plusUrl=="") return;
        if(plusUrl.indexOf("mtile.pref.miyazaki")!=-1) {
            plusUrl = plusUrl;
        }else{
            plusUrl = "./php/proxy-png.php?url=" + plusUrl;
        }
        $(this).parents(".dialog-base").find(".plus-input").val("");
        plusLayer1[plI] = new ol.layer.Tile({
            title:"pulus",
            origin:"",
            detail:"",
            icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
            source:new ol.source.XYZ({
                url:plusUrl,
                crossOrigin:"anonymous"
            })
        });
        plusLayer2[plI] = new ol.layer.Tile({
            title:"pulus",
            origin:"",
            detail:"",
            icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
            source:new ol.source.XYZ({
                url:plusUrl,
                crossOrigin:"anonymous"
            })
        });
        if(mapName=="map1") {
            var plusLayer = plusLayer1[plI];
        }else{
            var plusLayer = plusLayer2[plI];
        }
        eval(mapName).addLayer(plusLayer);
        var htmlChar = "<tr class='plus-tr'>";
        htmlChar += "<td><label><input type='checkbox' name='haikei-check-plus' value='" + plI + "' checked> <i class='fa fa-map-o fa-fw' style='color:red;'></i> 追加レイヤー" + plI + "</label></td>";
        htmlChar += "<td class='td-slider'><div class='haikei-slider'></div></td>";
        htmlChar += "<td class='td-sort' title='ドラッグします。'><i class='fa fa-bars fa-lg'></i></td>";
        htmlChar += "<td class='td-info'><i class='fa fa-info-circle fa-lg primary'></i></td>";
        htmlChar += "</tr>";
        $(this).parents(".dialog-base").hide(500);
        $("#" + mapName + " .haikei-tbl tbody").prepend(htmlChar);
        //チェックボックスをカスタム。iCheckに。
        var tgtTr = $("#" + mapName + " .haikei-tbl tbody tr:first");
        tgtTr.find("input:checkbox[name='haikei-check-plus']").iCheck({
            checkboxClass:"icheckbox_flat-blue",
            radioClass:"iradio_flat-blue"
        });
        //
        tgtTr.find("input:checkbox[name='haikei-check-plus']").on("ifChanged",function(event) {
            var Num = Number($(this).val());;
            if (mapName == "map1") {
                var plusLayer = plusLayer1[Num];
            } else {
                var plusLayer = plusLayer2[Num];
            }
            if($(this).prop("checked")) {
                eval(mapName).addLayer(plusLayer);
            }else {
                eval(mapName).removeLayer(plusLayer);
            }
        });
        tgtTr.find(".haikei-slider").slider({
            min:0,max:1,value:1,step:0.01,
            slide: function(event, ui){
                plusLayer.setOpacity(ui.value);
            }
        });
    });
});
