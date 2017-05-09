$(function(){
	$(".estat-a").click(function(){
		var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        var content = "";
			content += "<select class='estat-pref-select'>";
	        content += "<option value='100'>宮崎県</option>";
			content += "<option value='101'>宮城県</option>";
			content += "<option value='102'>大分県</option>";
			content += "</select>";
			content += "<select class='estat-table-select'>";
			content += "<option value='100'>宮崎県</option>";
			content += "<option value='101'>宮城県</option>";
			content += "<option value='102'>大分県</option>";
			content += "</select>";
		mydialog({
			id:"estat-dialog-" + mapName,
			class:"estat-dialog",
			map:mapName,
			title:"e-stat　作成中",
			content:content,
			top:"55px",
			left:"20px",
			//width:"400px",
			rmDialog:false,
			//hide:true
		});
		var option = "<option value=''>都道府県を選択</option>";
        for(var i = 0; i <prefAr.length; i++){
        	option += "<option value='" + prefAr[i]["id"] + "'>" + prefAr[i]["id"].substr(0,2) + "-" + prefAr[i]["name"] +  "</option>";
        	//console.log(prefAr[i])
        }
		$(".estat-pref-select").html(option);

		$("#" + mapName + " .estat-pref-select").select2({
			width:"150px",
		})
		$("#" + mapName + " .estat-table-select").select2({
			width:"200px",
		}).on("change",function(){
			console.log($(this).val());
        })
        //------------------------------------------------------------------------------------------
        //estatの表情報を取得してセレクトボックスを作る。都道府県用（全国）
        var tgtUrl = "http://api.e-stat.go.jp/rest/2.1/app/json/getMetaInfo?";
        $.ajax({
            type:"get",
            url:"php/proxy-estat.php",
            dataType:"json",
            data:{
                //estatUrl:"http://api.e-stat.go.jp/rest/2.1/app/json/getMetaInfo/",
				tgtUrl:tgtUrl,
                statsDataId:"C0020050245000",
                cntGetFlg:"Y"
            },
        }).done(function(json){
            console.log(json);
            var metainfoAr = json["json"]["GET_META_INFO"]["METADATA_INF"]["CLASS_INF"]["CLASS_OBJ"][1]["CLASS"];
            var option = "<option value='99'>統計表を選択</option>";
            for (i=0; i<metainfoAr.length; i++){
                option += "<option value='" + metainfoAr[i]["@code"] + "'>" + (i+1) + "-"  + metainfoAr[i]["@name"] + "</option>";
            };
            //selectOptionCity = option;
            $(".estat-table-select").html(option);
            //resolve(json);
        }).fail(function(){
            console.log("セレクトボックス作成失敗!");
        });
		//ここまでセレクトボックス作成
		//-----------------------------------------------------------------------------------------
		$("#" + mapName + " .estat-pref-select").on("change",function(){
			console.log($(this).val());
			//国交省のapiを使用　http://www.land.mlit.go.jp/webland/api.html#todofukenlist
			var tgtUrl = "http://www.land.mlit.go.jp/webland/api/CitySearch?";
			var area = $(this).val().substr(0,2)
			console.log(area);
			$.ajax({
				type:"GET",
				//url:"http://www.land.mlit.go.jp/webland/api/CitySearch",
				url:"php/proxy-webland.php",
				dataType:"json",
				data:{
					//area:("0" + val).slice(-2)
					tgtUrl:tgtUrl,
					area:area
				},
				}).done(function(json){
					//resolve(json);
					console.log(json);
				}).fail(function(){
					console.log("失敗!");
			});
		})







	});
});
