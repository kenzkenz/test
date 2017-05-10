var estatLayermap1 = null;
var estatLayermap2 = null;
$(function(){
	var cityDataAr = null;
	var citySelectOption = null;
	var prefSelectOption = null;
	//----------------------------------------------------------------------------------------------
	$(".estat-a").click(function(){
		var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
		//既に存在しているときは抜ける。
		if($("#mydialog-estat-dialog-" + mapName).length!=0){
			$("#mydialog-estat-dialog-" + mapName).show();
			return;
		}
        $.blockUI({message:null});
        var content = "";
			content += "<select class='estat-pref-select'></select>";
			content += "<select class='estat-table-select'></select>";
			content += "<div class='estat-year-div'></div>";
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
		var option = "<option value=''>都道府県を選択</option><option value='pref'>全国</option>";
        for(var i = 0; i <prefAr.length; i++){
        	option += "<option value='" + prefAr[i]["id"] + "'>" + prefAr[i]["id"].substr(0,2) + "-" + prefAr[i]["name"] +  "</option>";
        }
		$("#" + mapName + " .estat-pref-select").html(option);
		$("#" + mapName + " .estat-pref-select").select2({
			width:"100px"
		});
		$("#" + mapName + " .estat-table-select").select2({
			width:"250px"
		});
        //------------------------------------------------------------------------------------------
        var cityTableAjax = function(){
            return new Promise(function(resolve,reject){
				//estatの表情報を取得してセレクトボックスを作る。市町村用
				var tgtUrl = "http://api.e-stat.go.jp/rest/2.1/app/json/getMetaInfo?";
				$.ajax({
					type:"get",
					url:"php/proxy-estat.php",
					dataType:"json",
					data:{
						tgtUrl:tgtUrl,
						statsDataId:"C0020050245201",
						cntGetFlg:"Y"
					}
				}).done(function(json){
					var metainfoAr = json["json"]["GET_META_INFO"]["METADATA_INF"]["CLASS_INF"]["CLASS_OBJ"][1]["CLASS"];
					var option = "<option value='99'>統計表を選択</option>";
					for (i=0; i<metainfoAr.length; i++){
						option += "<option value='" + metainfoAr[i]["@code"] + "'>" + (i+1) + "-"  + metainfoAr[i]["@name"] + "</option>";
					}
					citySelectOption = option;
                    $("#" + mapName + " .estat-table-select").html(option);
					//$.unblockUI();
					resolve();
				}).fail(function(){
					console.log("セレクトボックス作成失敗!");
				});
            });
        };
        var prefTableAjax = function(){
            return new Promise(function(resolve,reject){
                //estatの表情報を取得してセレクトボックスを作る。全国用（都道府県）
                var tgtUrl = "http://api.e-stat.go.jp/rest/2.1/app/json/getMetaInfo?";
                $.ajax({
                    type:"get",
                    url:"php/proxy-estat.php",
                    dataType:"json",
                    data:{
                        tgtUrl:tgtUrl,
                        statsDataId:"C0020050245000",
                        cntGetFlg:"Y"
                    }
                }).done(function(json){
                    var metainfoAr = json["json"]["GET_META_INFO"]["METADATA_INF"]["CLASS_INF"]["CLASS_OBJ"][1]["CLASS"];
                    var option = "<option value='99'>統計表を選択</option>";
                    for (i=0; i<metainfoAr.length; i++){
                        option += "<option value='" + metainfoAr[i]["@code"] + "'>" + (i+1) + "-"  + metainfoAr[i]["@name"] + "</option>";
                    }
                    prefSelectOption = option;
                    resolve();
                }).fail(function(){
                    console.log("セレクトボックス作成失敗!");
                });
            });
        };
        Promise.all([cityTableAjax(),prefTableAjax()]).then(function(results){
            $.unblockUI();
        });
		//ここまでセレクトボックス作成
		//-----------------------------------------------------------------------------------------
		//都道府県セレクトボックスを選択したとき
		$("#" + mapName + " .estat-pref-select").on("change",function(){
            $.blockUI({message:null});
            if($(this).val()=="pref"){//全国を選択したとき
				alert("準備に数秒ほどかかります。");
                var vectorSource = new ol.source.Vector({
                    url:"geojson/pref.geojson",
                    format: new ol.format.GeoJSON()
                })
                estatLayerCreate(vectorSource,mapName);

                eval("estatLayer" + mapName).getSource().once("change", function(evt){//
                    var extent = eval("estatLayer" + mapName).getSource().getExtent();
                    eval(mapName).getView().fit(extent,eval(mapName).getSize());
                });

                var tblHtml = "<table class='estat-tbl table table-bordered table-hover tablesorter'>";
                tblHtml += "<thead><tr class='info'><th>コード</th><th>自治体名</th><th class='estat-zinkou-th'>人口</th><th>value</th><th>単位</th></tr></thead><tbody>";
                for (var i = 0; i < prefAr.length; i++) {
                    tblHtml += "<tr class='tr-" + prefAr[i]["id"] + "'>";
                    tblHtml += "<td>" + prefAr[i]["id"] + "</td>";
                    tblHtml += "<td class='estat-city-td'>" + prefAr[i]["name"] + "</td>";
                    tblHtml += "<td class='estat-zinkou-td'>" + "" + "</td>";
                    tblHtml += "<td class='estat-value-td'>" + "" + "</td>";
                    tblHtml += "<td class='estat-unit-td'>" + "" + "</td>";
                    tblHtml += "</tr>";
                }
                tblHtml += "</tbody></table>";
                $("#" + mapName + " .estat-tbl-div").html(tblHtml);
                $("#" + mapName + " .estat-table-select").html(prefSelectOption);
                funcHaikeiTblDivHeight();//common.jsにある関数
                $.unblockUI();
                alert("準備終了");
			}else{//各都道府県を選択したとき
                var prefName = $("#" + mapName + " .estat-pref-select option:selected").text().split("-")[1];
                $.ajax({
                    type:"GET",
                    url:"php/pref.php",
                    dataType:"json",
                    data:{
                        layerid:"gyouseikai",
                        prefname:prefName
                    }
                }).done(function(json){
                    console.log(json)
                    var geojsonObject = json.geojson;
                    var vectorSource = new ol.source.Vector({
                        features: (new ol.format.GeoJSON()).readFeatures(geojsonObject,{featureProjection:'EPSG:3857'})
                    });
                    estatLayerCreate(vectorSource,mapName);
                    var extent = eval("estatLayer" + mapName).getSource().getExtent();
                    eval(mapName).getView().fit(extent,eval(mapName).getSize());
                    //----------------------------------------------------------
                }).fail(function(json){
                    console.log("失敗!");
                });
                //国交省のapiを使用　http://www.land.mlit.go.jp/webland/api.html#todofukenlist
                $("#" + mapName + " .estat-table-select").html(citySelectOption);
                var tgtUrl = "http://www.land.mlit.go.jp/webland/api/CitySearch?";
                var area = $(this).val().substr(0, 2);
                var cityAjax = function () {
                    return new Promise(function (resolve, reject) {
                        $.ajax({
                            type: "GET",
                            url: "php/proxy-webland.php",
                            dataType: "json",
                            data: {
                                tgtUrl: tgtUrl,
                                area: area
                            }
                        }).done(function (json) {
                            resolve(json);
                        }).fail(function () {
                            console.log("失敗!");
                        });
                    });
                };
                var zinkouAjax = function () {
                    return new Promise(function (resolve, reject) {
                        var statsdataId = "C00200502" + area;
                        var cdcat01 = "A1101";//人口
                        $.ajax({
                            type: "GET",
                            url: "php/estat-select.php",
                            dataType: "json",
                            data: {
                                statsdataId: statsdataId,
                                cdcat01: cdcat01
                            }
                        }).done(function (json) {
                            resolve(json["jsontext"]);
                        }).fail(function () {
                            console.log("失敗!!!!!");
                        });
                    });
                };
                //------------------------------------------------------------------
                Promise.all([cityAjax(), zinkouAjax()]).then(function (results) {
                    //---------------------------------
                    var cityAr = results[0]["json"]["data"];
                    var tblHtml = "<table class='estat-tbl table table-bordered table-hover tablesorter'>";
                    tblHtml += "<thead><tr class='info'><th>コード</th><th>自治体名</th><th class='estat-zinkou-th'>人口</th><th>value</th><th>単位</th></tr></thead><tbody>";
                    for (var i = 0; i < cityAr.length; i++) {
                        tblHtml += "<tr class='tr-" + cityAr[i]["id"] + "'>";
                        tblHtml += "<td>" + cityAr[i]["id"] + "</td>";
                        tblHtml += "<td class='estat-city-td'>" + cityAr[i]["name"] + "</td>";
                        tblHtml += "<td class='estat-zinkou-td'>" + "" + "</td>";
                        tblHtml += "<td class='estat-value-td'>" + "" + "</td>";
                        tblHtml += "<td class='estat-unit-td'>" + "" + "</td>";
                        tblHtml += "</tr>";
                    }
                    tblHtml += "</tbody></table>";
                    $("#" + mapName + " .estat-tbl-div").html(tblHtml);
                    var zinkouAr = JSON.parse(results[1])["GET_STATS_DATAS"]["STATISTICAL_DATA_LIST"]["DATA_INF_LIST"]["DATA_INF"];
                    zinkouTdSet(zinkouAr, mapName);
                    funcHaikeiTblDivHeight();//common.jsにある関数
                    //---------------------------------
                    $.unblockUI();
                });
            }
		});
		//----------------------------------------------------------------------
		//表を選択したとき
		$("#" + mapName + " .estat-table-select").on("change",function(){
			console.log($(this).val());
			var selectVal = $("#" + mapName + " .estat-pref-select").val();
			if(selectVal!="pref") {
                var sid = $("#" + mapName + " .estat-pref-select").val().substr(0, 2);//例45
            }else{
                var sid = "";
			}
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
                        }
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
                    $("#" + mapName + " .estat-year-div").html(selectBox + "年　" + $("#" + mapName + " .estat-table-select option:selected").text().split("-")[1]);
                    var unit = cityDataAr[0]["VALUE"][0]["@unit"];
                }else{
                    $("#" + mapName + " .estat-year-div").html(cityDataAr[0]["VALUE"]["@time"] + "年　" + $("#" + mapName + " .estat-table-select option:selected").text().split("-")[1]);
                    var unit = cityDataAr[0]["VALUE"]["@unit"];
                }
                $("#" + mapName + " .estat-year-select").select2({
                    width:"60px",
					minimumResultsForSearch:Infinity
                });
                $("#" + mapName + " .estat-unit-td").html(unit);
              	estatTdSet(mapName);
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
	//----------------------------------------------------------------------------
	// tdに数値等をセットしていく関数
	function estatTdSet(mapName,tgtYear){
		var valueAr = [];
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
				try {
                    valueAr.push(Number(cityDataAr[i]["VALUE"][tgtYear]["$"]));//色をつけるための前準備
                }catch(e){}
            }else{
            	try {
                    var erement = $("#" + mapName + " .tr-" + cityDataAr[i]["VALUE"]["@area"]);
                    erement.find(".estat-value-td").html(cityDataAr[i]["VALUE"]["$"]);
                }catch(e){
                    erement.find(".estat-value-td").html("");
				}
                //var zinkouwari = Math.floor(erement.find(".valueTd").text()/erement.find(".zinkouTd").text()*1000)/1000;
                //erement.find(".zinkouwariTd").html(zinkouwari);
				try {
                    valueAr.push(Number(cityDataAr[i]["VALUE"]["$"]));
                }catch(e){}
            }
        }
		if($("#" + mapName + " .estat-tbl .header").length==0){//初めてのとき
            $("#" + mapName + " .estat-tbl").tablesorter({sortList:[[3,1]]});
        }else{//２回目以降のとき
            var html = $("#" + mapName + " .estat-tbl-div").html();
            $("#" + mapName + " .estat-tbl-div").html(html);
            $("#" + mapName + " .estat-tbl").tablesorter({sortList:[[3,1]]});
		}
        var color100Ar = funcColor100(valueAr);
        var color100 = color100Ar[0];
        var min = color100Ar[2];
        var d3Color = d3.interpolateLab("white", "red");
        var d3ColorM = d3.interpolateLab("white", "blue");
        $("#" + mapName + " .estat-tbl tbody tr").each(function(){
        	var tgt = ".estat-value-td";
            var value = Number($(this).find(tgt).text());
            if(value>0){//値がプラスだったとき
                var c100 = (value-min)/color100/100;
                var color0 = new RGBColor(d3Color(c100));
                var rgb = new RGBColor(d3Color(c100)).toRGB();
                var rgba = "rgba(" + color0.r + "," + color0.g + "," + color0.b +"," + "0.8)";
            }else{//値がマイナスだったとき
                var c100 = (0-value)/color100/100;
                var color0 = new RGBColor(d3ColorM(c100));
                var rgb = new RGBColor(d3ColorM(c100)).toRGB();
                var rgba = "rgba(" + color0.r + "," + color0.g + "," + color0.b +"," + "0.8)";
            }
            var features = eval("estatLayer" + mapName).getSource().getFeatures();
            for (i=0; i<features.length; i++){
                if(features[i].getProperties()["自治体名"]==$(this).find(".estat-city-td").text()){
                    features[i]["H"]["_fillColor"] = rgba;
                    features[i]["H"]["_polygonHeight"] = Math.floor(c100*50000) + 1000;
                }
            }
            eval("estatLayer" + mapName).getSource().changed();
            $(this).find("td").css({
                background:rgba
            });
        });
	}
	//----------------------------------------------------------------------------
    function estatLayerCreate(vectorSource,mapName){
        eval(mapName).removeLayer(eval("estatLayer" + mapName));
        this["estatLayer" + mapName] = new ol.layer.Vector({
            name:"estatLayer_zinkouOn",
            source:vectorSource,
            //minResolution:611,
            style: function(feature,resolution){
                var fillColor = feature.getProperties()["_fillColor"];
                style = [
                    new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color:"gray",
                            width: 1
                        }),
                        fill: new ol.style.Fill({
                            color:fillColor ? fillColor:"rgba(0,120,200,0.2)"
                        })
                    })
                ];
                return style;
            }
        });
        eval("estatLayer" + mapName).set("altitudeMode","clampToGround");
        eval(mapName).addLayer(eval("estatLayer" + mapName));
        eval("estatLayer" + mapName).setZIndex(9999);
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
			}
			$("#" + mapName + " .estat-zinkou-th").html(nen + "人口");
			var tgtTr = $("#" + mapName + " .tr-" + cityCode);
			tgtTr.find(".estat-zinkou-td").html(zinkou);
		}
	}
});
