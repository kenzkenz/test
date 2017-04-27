$(function(){
    $("body").on("click",".haikei_Btn",function(){
        var id = "haikei_Dialog";
        var content = "";
            content += "作成中作成中作成中作成中作成中作成中<br>作成中作成中作成中作成中作成中作成中";
        myDialog({
            id:id,
            map:"map1",
            title:"背景",
            content:content,
            top:"50px",
            right:"10px"
        });

    });
});
