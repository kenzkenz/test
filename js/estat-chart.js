$(function() {

    //-----------------------------------------------------------------------------
    //グラフ
    $("body").on("click", ".estat-chart-icon", function () {
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        alert("グラフ機能は作成中です!")

        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        /*
        //既に存在しているときは抜ける。
        if($("#mydialog-estat-chart-dialog-" + mapName).length!=0){
            $("#mydialog-estat-chart-dialog-" + mapName).show();
            return;
        }
        */
        //$.blockUI({message:null});
        var content = "作成中！！！！！！！！！！！！！！！";
        mydialog({
            id:"estat-chart-dialog-" + mapName,
            class:"estat-chart-dialog",
            map:mapName,
            title:"e-stat グラフ",
            content:content,
            top:"55px",
            right:"20px",
            //width:"400px",
            rmDialog:false,
            //hide:true,
            //minMax:true
            rmDialog:true
        });


    });

});