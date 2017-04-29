$(function(){
    $("body").on("click",".haikei-btn",function(){
        if($("#mydialog-haikei-dialog").length==0){
            var id = "haikei-dialog";
            var content = "";
                content += "<table class='table table-bordered table-condensed'><tr><th>作成中</th><th>作成中作成中</th></tr><tr><td>作成中</td><td>作成中作成中</td></tr></table>";
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
