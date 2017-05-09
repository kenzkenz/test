$(function(){
	$(".estat-a").click(function(){
		var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
		//既に存在しているときは抜ける。
		if($("#mydialog-estat-dialog-" + mapName).length!=0){
			$("#mydialog-estat-dialog-" + mapName).show();
			return;
		}
        var content = "";
			content += "<select class='estat-pref-select'></select>";
			content += "<select class='estat-table-select'></select>";
			content += "<div class='estat-tbl-div'></div>";
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
		$("#" + mapName + " .estat-pref-select").html(option);
		$("#" + mapName + " .estat-pref-select").select2({
			width:"150px",
		});
		$("#" + mapName + " .estat-table-select").select2({
			width:"200px",
		});
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
		//都道府県を選択したとき
		$("#" + mapName + " .estat-pref-select").on("change",function(){
			//国交省のapiを使用　http://www.land.mlit.go.jp/webland/api.html#todofukenlist
			var tgtUrl = "http://www.land.mlit.go.jp/webland/api/CitySearch?";
			var area = $(this).val().substr(0,2);
			var cityAjax = function(){
				return new Promise(function(resolve,reject){
					$.ajax({
						type:"GET",
						url:"php/proxy-webland.php",
						dataType:"json",
						data:{
							tgtUrl:tgtUrl,
							area:area
						},
						}).done(function(json){
							resolve(json);
						}).fail(function(){
							console.log("失敗!");
					});
				});
			};
			var zinkouAjax = function(){
				return new Promise(function(resolve,reject){
					//var statsdataId = "C00200502" + ("0" + val).slice(-2);
					var statsdataId = "C00200502" + area;
					var cdcat01 = "A1101";//人口
					$.ajax({
						type:"GET",
						url:"php/estat-select.php",
						dataType:"json",
						data:{
							statsdataId:statsdataId,
							cdcat01:cdcat01
						},
						}).done(function(json){
							resolve(json["jsontext"]);
						}).fail(function(){
							console.log("失敗!!!!!");
					});
				});
			};
			//------------------------------------------------------------------
			Promise.all([cityAjax(),zinkouAjax()]).then(function(results){
				console.log(results);
				//---------------------------------
				var cityAr = results[0]["json"]["data"];
				var tblHtml = "<table class='estat-tbl table table-bordered table-hover'>";
				tblHtml += "<tr class='info'><th>コード</th><th>自治体名</th><th class='estat-zinkou-th'>人口</th><th>value</th><th>単位</th></tr>";
				for(var i = 0; i < cityAr.length; i++){
					tblHtml += "<tr class='tr-" + cityAr[i]["id"] + "'>";
					tblHtml += "<td>" + cityAr[i]["id"] + "</td>";
					tblHtml += "<td>" + cityAr[i]["name"] + "</td>";
					tblHtml += "<td class='estat-zinkou-td'>" + "" + "</td>";
					tblHtml += "<td class='estat-value-td'>" + "" + "</td>";
					tblHtml += "<td class='estat-unit-td'>" + "" + "</td>";
					tblHtml += "</tr>"
				}
				tblHtml += "</table>";
				$("#" + mapName + " .estat-tbl-div").html(tblHtml);
				var zinkouAr = JSON.parse(results[1])["GET_STATS_DATAS"]["STATISTICAL_DATA_LIST"]["DATA_INF_LIST"]["DATA_INF"];
				console.log(zinkouAr);
				zinkouTdSet(zinkouAr,mapName)
				funcHaikeiTblDivHeight();//common.jsにある関数
				//---------------------------------
			});
		})
		//----------------------------------------------------------------------
		//表を選択したとき
		$("#" + mapName + " .estat-table-select").on("change",function(){
			console.log($(this).val());
		});
	});
	//--------------------------------------------------------------------------
	function zinkouTdSet(zinkouAr,mapName){
		for (i=0; i<zinkouAr.length; i++){
			if(zinkouAr[i]["VALUE"].length>0){
				var cityCode = zinkouAr[i]["VALUE"][0]["@area"];
				var last = zinkouAr[i]["VALUE"].length-1;
				var zinkou = zinkouAr[i]["VALUE"][last]["$"];
				var nen = zinkouAr[i]["VALUE"][last]["@time"];
			}else{
				var cityCode = zinkouAr[i]["VALUE"]["@area"];
				var zinkou = zinkouAr[i]["VALUE"]["$"];
				var nen = zinkouAr[i]["VALUE"]["@time"];
			};
			$("#" + mapName + " .estat-zinkou-th").html(nen + "人口")
			var tgtTr = $("#" + mapName + " .tr-" + cityCode);
			tgtTr.find(".estat-zinkou-td").html(zinkou);
		};
	}
});
