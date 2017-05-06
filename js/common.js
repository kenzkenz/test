$(document).ajaxStart(function (){
    console.log("ajax-start");
    $("#loading-fa").show(500);
});
$(document).ajaxStop(function (){
    console.log("ajax-stop");
    $("#loading-fa").hide(500);
});

//-----------------------------------------------------------------------------
function funcMaps(element){
	var mapName = element.parents(".maps").attr("id");
	var mapElement = element.parents(".maps");
	if(mapName=="map1"){
		var ol3d = "ol3d1";
		var layers = useLayersArr1;
	}else{
		var ol3d = "ol3d2";
		var layers = useLayersArr2;
	}
	return {"name":mapName,"element":mapElement,"ol3d":ol3d,"layers":layers};
}
//------------------------------------------------------------------------------
//背景ダイアログの高さを設定する。
function funcHaikeiTblDivHeight(){
	if($(window).width()>1000){
		var height = $(window).height()-150;
	}else{
		if($(".dualscreen-btn").eq(0).text()=="1画面"){
			var height = $(window).height()/2-150;
		}else{
			var height = $(window).height()-150;
		}
	}
	$(".haikei-tbl-div").css("max-height",height + "px");
}
//------------------------------------------------------------------------------
//エクステントの座標系を変換する
function transformE(extent) {
	return ol.proj.transformExtent(extent,'EPSG:4326','EPSG:3857');
}
