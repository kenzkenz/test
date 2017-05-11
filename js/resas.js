var resasLayermap1 = null;
var resasLayermap2 = null;
$(function(){
	$(".resas-a").click(function(){
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        //既に存在しているときは抜ける。
        if($("#mydialog-resas-dialog-" + mapName).length!=0){
            $("#mydialog-resas-dialog-" + mapName).show();
            eval(mapName).addLayer(eval("resasLayer" + mapName));
            return;
        }
        //$.blockUI({message:null});
        var content = "";
        content += "<select class='resas-pref-select'></select>";
        //content += "<select class='resas-table-select'></select>";
        content += "<div class='resas-year-div'></div>";
        content += "<div class='resas-tbl-div minmax-div'>あああああああああああああああああああああ</div>";
        mydialog({
            id:"resas-dialog-" + mapName,
            class:"resas-dialog",
            map:mapName,
            title:"RESAS 作成中",
            content:content,
            top:"55px",
            left:"20px",
            width:"400px",
            rmDialog:false,
            //hide:true,
            minMax:true
        });
	});
});
