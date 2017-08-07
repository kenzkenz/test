var useLayersArr1 = null;
var useLayersArr2 = null;
var plusLayer1 = [];
var plusLayer2 = [];
var plI = 0;


$(function(){
    //使用するレイヤーを設定
    useLayersArr1 = [pale1,
                    suiro1,douro1,syoutiiki1,
                    ooameasia07201,ooameasia07181,
                    t0802dol1,t0713dol21,t0713dol11,t0707dol1,t0707dol31,t0708dol11,t0710dol1,
                    kikenkeiryuuAll1,kyuukeisyakikenkasyoAll1,
                    blank1,relief1,osm1,mierune1,mieruneMono1,toner1,
                    ort1,amArr1,sengomiya1,sengonobe1,sengomiyako1,
                    aya1,sobo1,soboZ1,
                    miyagikotizu1,toukyoukotizu1,hukuikotizu1,simanekotizu1,yamagutikotizu1,koutikotizu1,hukuokakotizu1,sagakotizu1,nagasakikotizu1,kumamotokotizu1,ooitakotizu1,kotizu1,kagosimakotizu1,obikoyizu1,//obi1,
                    seamlessphoto1,gazo11,muro1,murous1,murosenzen1,
                    tondabayasik1,tondabayasit1,
                    kago1,sengokago1,
                    kawadake1,ryuuiki1,ecoris1,sekiz1,tisitu1,nihonCs1,csArr1,
                    //mrtiba1,mransei1,
                    tunami1,sinsuisoutei1,kikenkeiryuu1,kyuukeisyakikenkasyo1,
                    mesh1000z1,kousoku9syu1,bingroad1,
                    tunamimvt1,
                    namie1,
                    did1,
                    test,
                    //anno1,
                    youtotiiki1
                    ];
    useLayersArr2 = [pale2,
                    suiro2,douro2,syoutiiki2,
                    ooameasia07202,ooameasia07182,
                    t0802dol2,t0713dol22,t0713dol12,t0707dol2,t0707dol32,t0708dol12,t0710dol2,
                    kikenkeiryuuAll2,kyuukeisyakikenkasyoAll2,
                    blank2,relief2,osm2,mierune2,mieruneMono2,toner2,
                    ort2,amArr2,sengomiya2,sengonobe2,sengomiyako2,
                    aya2,sobo2,soboZ2,
                    miyagikotizu2,toukyoukotizu2,hukuikotizu2,simanekotizu2,yamagutikotizu2,koutikotizu2,hukuokakotizu2,sagakotizu2,nagasakikotizu2,kumamotokotizu2,ooitakotizu2,kotizu2,kagosimakotizu2,obikoyizu2,//obi2,
                    seamlessphoto2,gazo12,muro2,murous2,murosenzen2,
                    tondabayasik2,tondabayasit2,
                    kago2,sengokago2,
                    kawadake2,ryuuiki2,ecoris2,sekiz2,tisitu2,nihonCs2,csArr2,
                    //mrtiba2,mransei2,
                    tunami2,sinsuisoutei2,kikenkeiryuu2,kyuukeisyakikenkasyo2,
                    mesh1000z2,kousoku9syu2,bingroad2,
                    tunamimvt2,
                    namie2,
                    did2,
                    youtotiiki2
                    ];
    $("body").on("click",".secret",function() {
        //alert("22");
        alert("");
        $(".secret-tr").toggle();
    });
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
        if(prop["secret"]) {
            htmlChar += "<tr class='secret-tr' style='display:none;'>";
        }else{
            htmlChar += "<tr>";
        }

        htmlChar += "<td><label><input type='checkbox' name='haikei-check' value='" + i + "'" + chkChar + "> " + icon +  prop["title"] + "</label></td>";
        htmlChar += "<td class='td-slider'><div class='haikei-slider'></div></td>";
        htmlChar += "<td class='td-sort' title='ドラッグします。'><i class='fa fa-bars fa-lg'></i></td>";
        htmlChar += "<td class='td-info'><i class='fa fa-info-circle fa-lg primary'></i></td>";
        htmlChar += "</tr>";
    }
    htmlChar += "</table>";
    htmlChar += "<div style='text-align:right;'><span class='secret'>情報政策課</span></div>";
    htmlChar += "</div>";
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
        try {
            if (layer.get("name") === "sobo") {
                if ($(this).prop("checked")) {
                    var msg = "";
                    msg += "<img src='icon/sobo01.jpg' style='width:100%'>";
                    msg += "<div style='text-align:center;position:absolute;bottom:1px;left:50%;width:100px;margin-left:-50px;'><a href='http://sobokatamuki-br-council.org/' target='_blank'>詳細はこちら</a></div>";
                    $.notify({//options
                        message: msg
                    }, {//settings
                        type: "danger",
                        z_index: 999999,
                        placement: {
                            from: "top",
                            align: "center"
                        },
                        animate: {
                            enter: "animated fadeInDown",
                            exit: "animated fadeOutUp"
                        },
                        timer: 0
                    });
                }
            }
        }catch(e){}
        var trErement = $(this).parents("tr");
        if($(this).prop("checked")){
            if(!Array.isArray(layer)) {
                var bigMsg = layer.getProperties()["message"];
            }else{
                var bigMsg = layer[0].getProperties()["message"];
            }
            if(bigMsg) {
                var html = "";
                html += "<div class='big-msg-div'>" + bigMsg + "</div>";
                $("#" + mapName).append(html);
                $("#" + mapName + " .big-msg-div").animate({
                    fontSize: "15em"
                }, {
                    "duration": 2000,
                    "complete": function () {
                        $("#" + mapName + " .big-msg-div").remove();
                        //$("#" + mapName + " .big-msg-div").slideUp(500,function(){
                        //    $("#" + mapName + " .big-msg-div").remove();
                        //});
                    }
                });
            }

            if(!Array.isArray(layer)){
                layer.set("altitudeMode","clampToGround");
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
        try {
            var idandclass = layer.getProperties()["title"];
        }catch(e){
            var idandclass = layer[0].getProperties()["title"];
        }
        var myurl = location.href;
        $.ajax({
            type:"GET",
            url:"php/log.php",
            data:{
                idandclass:"背景名:" + idandclass,
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
        var mapName = mapObj["name"];
        $("#" + mapName + " .info-dialog").remove();
        var layer = mapObj["layers"][$(this).parents("tr").find("input").val()];
        if(!Array.isArray(layer)){
            var prop = layer.getProperties();
        }else{//配列のとき
            var prop = layer[0].getProperties();
        }
        var content = "<table class='info-tbl table table-bordered table-condensed' data-layername='" + prop["name"] + "'>";
        content += "<tr><td>背景名</td><td>" + prop["title"] + "</td></tr>";
        content += "<tr><td>出典</td><td>" + prop["origin"] + "</td></tr>";
        content += "<tr><td>説明</td><td>" + prop["detail"] + "</td></tr>";
        content += "</table>";
        content += prop["detail2"];
        mydialog({
            id:"info-dialog",
            class:"info-dialog",
            map:mapName,
            title:"インフォメーション",
            content:content,
            top:"100px",
            right:"20px",
            rmDialog:true
        });
        //------------------------------------------------------

        console.log(prop["name"]);

        if(prop["name"]==="keizai-census"){
            console.log(layer.getSource());
            var prop = layer.getSource()["a"]["a"]["gd"]["f"][0]["c"];
            console.log(prop);

            var mapObj = funcMaps($(this));
            var mapName = mapObj["name"];
            var option = "";
            for(key in prop){
                //console.log(key);
                if(key.indexOf("ks_T000")!=-1) option += "<option value='" + key +  "'>" + key.replace("ks_","") + "</option>"
                /*
                 table += "<tr>";
                 var prop = featureProp[key];
                 table += "<th class='popup-th'>" + key + "</th><td class='popup-td'>" + prop + "</td>";
                 table += "</tr>";
                 */
            }
            $("#" + mapName + " .target-select").html(option)
        }

        $("#" + mapName).on("change",".target-select",function() {
            var val = $(this).val();
            console.log(val);
            keizaiCensusTarget = val;
            layer.getSource().changed();
        });
        $("#" + mapName + " .kslimittext").spinner({
            max:5000, min:10, step:10,
            spin:function(event,ui){
                ksLimitChange(ui.value,mapName);
            }
        });
        function ksLimitChange(ksLimit0,mapName){
            ksLimit = ksLimit0;
            vtMaxColor = $("#" + mapName + " .syoutiiki-color-select").val();
            console.log(vtMaxColor);
            vtColor = d3.interpolateLab("white",vtMaxColor);
            layer.getSource().changed();
        }
        //------------------------------------------------------
        $("#" + mapName + " .syoutiikitext").spinner({
            max:5000, min:100, step:100,
            spin:function(event,ui){
                syoutiikiColorChange(ui.value,mapName);
            }
        });
        $("#" + mapName).on("change",".syoutiiki-color-select",function(){
            var mapObj = funcMaps($(this));
            var mapName = mapObj["name"];
            console.log(mapName);
            console.log($("#" + mapName + " .syoutiikitext").val());
            kyoudo = $("#" + mapName + " .syoutiikitext").val();
            syoutiikiColorChange(kyoudo,mapName);
        });
        function syoutiikiColorChange(kyoudo0,mapName){
            kyoudo = kyoudo0;
            vtMaxColor = $("#" + mapName + " .syoutiiki-color-select").val();
            console.log(vtMaxColor);
            vtColor = d3.interpolateLab("white",vtMaxColor);
            layer.getSource().changed();
        }
        //-------------------------------------------------------
        $("#" + mapName).on("change",".youtotiiki-cate-select",function() {
            var val = $(this).val();
            console.log(val);
            youtotiikiCateTarget = val;
            layer.getSource().changed();
        });
        //-------------------------------------------------------


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
    //------------------------------------------------------------
    //レイヤー追加ボタンを押した時
    $("body").on("click",".crop-btn",function() {
        alert("実験中！");
        //var mapObj = funcMaps($(this));
        //var mapName = mapObj["name"];
        var layer = $(this).parents("table").data("layername");
        console.log(layer);
        console.log(eval(layer).getFilters());
        eval(layer).removeFilter(eval(layer).getFilters()[0]);
        eval(layer).removeFilter(eval(layer).getFilters()[0]);
        console.log(eval(layer).getFilters());

    });
});
