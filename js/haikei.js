$(function(){
    $("body").on("click",".haikei-btn",function(){
        var mapObj = funcMaps($(this));
        if($("#mydialog-haikei-dialog-"+mapObj["name"]).length==0){
            var id = "haikei-dialog-"+mapObj["name"];
            var content = "";
            mydialog({
                id:id,
                class:"haikei-dialog",
                map:mapObj["name"],
                title:"背景レイヤー",
                content:content,
                top:"50px",
                right:"10px"
            });
            funcHaikeiTableCreate(mapObj["element"],mapObj["name"]);//ファンクションはraster.jsに
        }else{
            $("#mydialog-haikei-dialog-"+mapObj["name"]).show(500);
        };
    });
});
