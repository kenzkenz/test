var haikeiMsgFlg = true;
$(function(){
    $("body").on("click",".haikei-btn",function(){
        var mapObj = funcMaps($(this));
        if ($("#mydialog-haikei-dialog-" + mapObj["name"]).length==0){
            var id = "haikei-dialog-" + mapObj["name"];
            var content = "";
            mydialog({
                id: id,
                class: "haikei-dialog",
                map: mapObj["name"],
                title: "背景レイヤー",
                content: content,
                top: "55px",
                right: "20px",
                hide:true,
                plus:true
            });
            funcHaikeiTableCreate(mapObj["element"], mapObj["name"]);//ファンクションはlayer-00.js
        }else {
            if(haikeiMsgFlg) {
                $.notify({//options
                    message: "<div style='text-align:center;'><i class='fa fa-exclamation fa-fw'></i>背景は順次追加していく予定です。</div>"
                }, {//settings
                    type: "info",
                    z_index: 999999,
                    placement: {
                        from: "bottom",
                        align: "center"
                    },
                    animate: {
                        enter: "animated fadeInDown",
                        exit: "animated fadeOutUp"
                    }
                });
                haikeiMsgFlg = false;
            }
            funcHaikeiTblDivHeight();//common.jsにある関数
            var mapWidth = $(this).parents(".maps").width();
            var dialogLeft = Number($("#mydialog-haikei-dialog-" + mapObj["name"]).css("left").replace("px",""));
            if(mapWidth/2>dialogLeft) {
                $("#mydialog-haikei-dialog-" + mapObj["name"]).toggle("drop");
            }else{
                $("#mydialog-haikei-dialog-" + mapObj["name"]).toggle("drop",{direction:"right"});
            }
        }
    });
    //---------------------------------------------------------------------------
    //この２行は特になくても構わない。事前にメニューを読み込んで表示を滑らかにしているだけ
    $("#map1 .haikei-btn").click();
    $("#map2 .haikei-btn").click();
    //$(".haikei-dialog").hide();
    //---------------------------------------------------------------------------
});
