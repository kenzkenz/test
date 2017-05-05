$(function(){
    $("body").on("click",".haikei-btn",function(){
        var mapObj = funcMaps($(this));
        var id = "haikei-dialog-" + mapObj["name"];
        var content = "";
         mydialog({
             id: id,
             class: "haikei-dialog",
             map: mapObj["name"],
             title: "背景レイヤー",
             content: content,
             top: "55px",
             right: "20px"
         });
        funcHaikeiTableCreate(mapObj["element"], mapObj["name"]);//ファンクションはlayer-00.js
        funcHaikeiTblDivHeight();//common.jsにある関数
    });
});
