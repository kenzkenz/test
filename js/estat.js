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
		var option = "";
        for(var i = 0; i <prefAr.length; i++){
        	option += "<option value='" + prefAr[i]["id"] + "'>" + prefAr[i]["id"].substr(0,2) + "-" + prefAr[i]["name"] +  "</option>"
        	//console.log(prefAr[i])
        }
		$(".estat-pref-select").html(option)

		$("#" + mapName + " .estat-pref-select").select2({
			width:"200px",
		}).on("change",function(){
			console.log($(this).val());
        })

        //------------------------------------------------------------------------------------------
        //estatの表情報を取得してセレクトボックスを作る。都道府県用（全国）
        //var url = "http://api.e-stat.go.jp/rest/2.1/app/json/getMetaInfo/";
        $.ajax({
            type:"get",
            url:"php/estat.php",
            dataType:"json",
            data:{
                //estatUrl:"http://api.e-stat.go.jp/rest/2.1/app/json/getMetaInfo/",
                statsDataId:"C0020050245000",
                cntGetFlg:"Y"
            },
        }).done(function(json){
            console.log(json);
            var metainfoAr = json["GET_META_INFO"]["METADATA_INF"]["CLASS_INF"]["CLASS_OBJ"][1]["CLASS"];
            var option = "<option value='99'>統計表を選択</option>";
            for (i=0; i<metainfoAr.length; i++){
                option += "<option value='" + metainfoAr[i]["@code"] + "'>" + (i+1) + "_ "  + metainfoAr[i]["@name"] + "</option>";
            };
            //selectOptionCity = option;
            $(".estat-pref-select").html(option);


            //resolve(json);
        }).fail(function(){
            console.log("セレクトボックス作成失敗!");
        });


	});
});
