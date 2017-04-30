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
