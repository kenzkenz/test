$(function(){
	var cityDataAr = null;
	//----------------------------------------------------------------------------------------------
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
				$("#" + mapName + " .estat-tbl-div").html("<div class='estat-year-div'>年度</div>" + tblHtml);
				var zinkouAr = JSON.parse(results[1])["GET_STATS_DATAS"]["STATISTICAL_DATA_LIST"]["DATA_INF_LIST"]["DATA_INF"];
				zinkouTdSet(zinkouAr,mapName)
				funcHaikeiTblDivHeight();//common.jsにある関数
				//---------------------------------
			});
		})
		//----------------------------------------------------------------------
		//表を選択したとき
		$("#" + mapName + " .estat-table-select").on("change",function(){
			console.log($(this).val());
            var sid = $("#" + mapName + " .estat-pref-select").val().substr(0,2);//例45
            var cdcat01 = $(this).val();
            var estatAjax = function(){//プロミスのファンクション
               return new Promise(function(resolve,reject){
					/*
					if(cityCodeAr[0].slice(-3)!="000"){
						var sid = cityCodeAr[0].substring(0,2);//各都道府県の市区町村
					}else{
						var sid = "";//全国
					};
					*/
                    var statsdataId = "C00200502" + sid;
                    $.ajax({
                        type:"GET",
                        url:"php/estat-select.php",
                        dataType:"json",
                        data:{
                            statsdataId:statsdataId,
                            cdcat01:cdcat01
                        },
						}).done(function(json){
                        	resolve(json["jsontext"])
						}).fail(function(json){
							console.log("失敗!");
                    });
                });
            };

            estatAjax().then(function(jsonText){
            	//33岡山県がデータがないようだ。
            	//console.log(JSON.parse(jsonText))
                cityDataAr = JSON.parse(jsonText)["GET_STATS_DATAS"]["STATISTICAL_DATA_LIST"]["DATA_INF_LIST"]["DATA_INF"];
                var yearAr = cityDataAr[0]["VALUE"];
                var option = "";
                for(i=0;i<yearAr.length;i++){
                	if(yearAr.length-1==i) {
                        option += "<option value='" + i + "' selected>" + yearAr[i]["@time"] + "</option>";
                    }else{
                        option += "<option value='" + i + "'>" + yearAr[i]["@time"] + "</option>";
					}
                }
                var selectBox = "<select class='estat-year-select'>" + option + "</select>";
                if(yearAr.length>0){
                    $("#" + mapName + " .estat-year-div").html(selectBox + "年　" + $(".estat-table-select option:selected").text());
                    var unit = cityDataAr[0]["VALUE"][0]["@unit"];
                }else{
                    $("#" + mapName + " .estat-year-div").html(cityDataAr[0]["VALUE"]["@time"] + "年　" + $(".estat-table-select option:selected").text());
                    var unit = cityDataAr[0]["VALUE"]["@unit"];
                }
                $("#" + mapName + " .estat-unit-td").html(unit);
              	estatTdSet(mapName)
            })
		});
	});
	//-----------------------------------------------------------------------------
    $("body").on("change",".estat-year-select",function(){
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
		var tgtYear = $(this).val();
        estatTdSet(mapName,tgtYear);
    });
	//-----------------------------------------------------------------------------
	function estatTdSet(mapName,tgtYear){
        for (i=0; i<cityDataAr.length; i++){
			if(!tgtYear) tgtYear = cityDataAr[i]["VALUE"].length - 1;//最後の年を取得している。
            if(cityDataAr[i]["VALUE"].length>0){
            	try {
                    var erement = $("#" + mapName + " .tr-" + cityDataAr[i]["VALUE"][tgtYear]["@area"]);
                    erement.find(".estat-value-td").html(cityDataAr[i]["VALUE"][tgtYear]["$"]);
                }catch(e){
                    erement.find(".estat-value-td").html("");
				}
                //var zinkouwari = Math.floor(erement.find(".valueTd").text()/erement.find(".zinkouTd").text()*1000)/1000;
                //erement.find(".zinkouwariTd").html(zinkouwari);
            }else{
            	try {
                    var erement = $("#" + mapName + " .tr-" + cityDataAr[i]["VALUE"]["@area"]);
                    erement.find(".estat-value-td").html(cityDataAr[i]["VALUE"]["$"]);
                }catch(e){
                    erement.find(".estat-value-td").html("");
				}
                //var zinkouwari = Math.floor(erement.find(".valueTd").text()/erement.find(".zinkouTd").text()*1000)/1000;
                //erement.find(".zinkouwariTd").html(zinkouwari);
            };
        }
	}
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
