$(function(){
    $("body").on("click",".haikei-btn",function(){
        var id = "haikei-dialog";
        var content = "";
            content += "<table class='table table-bordered table-condensed'><tr><th>作成中</th><th>作成中作成中</th></tr><tr><td>作成中</td><td>作成中作成中</td></tr></table>";
        mydialog({
            id:id,
            map:"map1",
            title:"背景",
            content:content,
            top:"50px",
            right:"10px"
        });
        haikeiTableCreate();//ファンクションはraster.jsに
    });
});
