$(function(){
	$(".estat-a").click(function(){
		var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        var content = "作成中<br>";
			content += "<select class='estat-pref-select'>";
	        content += "<option value='100'>宮崎県</option>";
			content += "<option value='101'>宮城県</option>";
			content += "<option value='102'>大分県</option>";
			content += "</select>"
		mydialog({
			id:"estat-dialog-" + mapName,
			class:"estat-dialog",
			map:mapName,
			title:"e-stat",
			content:content,
			top:"55px",
			left:"20px",
			width:"230px",
			rmDialog:false,
			//hide:true
		});
		/*
		$("#" + mapName + " .estat-pref-select").chosen({
			disable_search_threshold:100,
			width:"150px"
		});
		*/
		$("#" + mapName + " .estat-pref-select").select2();

	});
});
