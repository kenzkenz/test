$(function(){
    $("body").on("click",".haikei-btn",function(){
        if($("#mydialog-haikei-dialog").length==0){
            var id = "haikei-dialog";
            var content = "";
            mydialog({
                id:id,
                map:"map1",
                title:"背景レイヤー",
                content:content,
                top:"50px",
                right:"10px"
            });
            haikeiTableCreate();//ファンクションはraster.jsに
        }else{
            $("#mydialog-haikei-dialog").show();
        };
    });
});
