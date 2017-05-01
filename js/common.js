function funcMaps(element){
	var mapName = element.parents(".maps").attr("id");
	var mapElement = element.parents(".maps");
	if(mapName=="map1"){
		var ol3d = "ol3d1";
	}else{
		var ol3d = "ol3d2";
	};
	return {"name":mapName,"element":mapElement,"ol3d":ol3d};
};
function funcHaikeiTblDivHeight(){
	if($(window).width()>1000){
		var height = $(window).height()-150;
	}else{
		if($(".dualscreen-btn").eq(0).text()=="1画面"){
			var height = $(window).height()/2-150;
		}else{
			var height = $(window).height()-150;
		}
	};
	$(".haikei-tbl-div").css("max-height",height + "px");
}
