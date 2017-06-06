var estatLayermap1 = null;
var estatLayermap2 = null;
var estatDataArmap1 = null;
var estatDataArmap2 = null;
$(function(){
	var citySelectOption = null;
	var prefSelectOption = null;
    var cityTableAjax = function(){
        return new Promise(function(resolve,reject){
            //estatの表情報を取得してセレクトボックスのオプションを作る。市町村用
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
                //$("#" + mapName + " .estat-table-select").html(option);
                //$.unblockUI();
                //resolve();
            }).fail(function(){
                console.log("セレクトボックス作成失敗!");
            });
        });
    };
    var prefTableAjax = function(){
        return new Promise(function(resolve,reject){
            //estatの表情報を取得して統計表セレクトボックスのオプションを作る。全国用（都道府県）
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
                //resolve();
            }).fail(function(){
                console.log("セレクトボックス作成失敗!");
            });
        });
    };
    //ここは本当は必要ない。最初にアクセスしておくと二回目が早いようなので。
    //国交省のapiを使用　http://www.land.mlit.go.jp/webland/api.html#todofukenlist
    var tgtUrl = "http://www.land.mlit.go.jp/webland/api/CitySearch?";
    var area = 45;
    var cityAjax = function(){
        return new Promise(function (resolve,reject){
            $.ajax({
                type: "GET",
                url: "php/proxy-webland.php",
                dataType: "json",
                data: {
                    tgtUrl: tgtUrl,
                    area: area
                }
            }).done(function (json) {
                //resolve(json);
            }).fail(function () {
                console.log("失敗!");
            });
        });
    };
    //下三つは特にプロミスの必要はない。
    cityAjax();
    cityTableAjax();
    prefTableAjax();
	//----------------------------------------------------------------------------------------------
	$(".estat-a").click(function(){
        $.notify({//options
            message:"<div style='text-align:center;'><i class='fa fa-exclamation fa-fw'></i>このサービスは、政府統計総合窓口（e-stat）のAPI機能を使用していますが、サービスの内容は国によって保証されたものではありません。</div>"
        },{//settings
            type:"info",
            z_index:999999,
            placement: {
                from: "bottom",
                align: "center"
            },
            animate: {
                enter:"animated fadeInDown",
                exit:"animated fadeOutUp"
            }
        });
		var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
		//既に存在しているときは抜ける。
		if($("#mydialog-estat-dialog-" + mapName).length!=0){
			$("#mydialog-estat-dialog-" + mapName).show();
            if(eval("estatLayer" + mapName)) eval(mapName).addLayer(eval("estatLayer" + mapName));
			return;
		}
        var content = "";
		    content += "　出典:<a href='http://www.e-stat.go.jp/api/sample2/tokeidb/getStatsList?statsCode=00200502&openYears=2017&searchKind=3' target='_blank'>社会・人口統計体系（都道府県・市区町村のすがた）</a><br>";
			content += "<select class='estat-pref-select'></select>";
			content += "<select class='estat-table-select'></select>";
			content += "<div class='estat-year-div'></div>";
			content += "<div class='estat-tbl-div minmax-div'></div>";
		mydialog({
			id:"estat-dialog-" + mapName,
			class:"estat-dialog",
			map:mapName,
			title:"e-stat",
			content:content,
			top:"55px",
			left:"20px",
			//width:"400px",
			rmDialog:false,
			//hide:true,
            minMax:true
		});
		var option = "<option value=''>都道府県</option><option value='pref'>全国</option>";
        for(var i = 0; i <prefAr.length; i++){
        	option += "<option value='" + prefAr[i]["id"] + "'>" + prefAr[i]["id"].substr(0,2) + "-" + prefAr[i]["name"] +  "</option>";
        }
		$("#" + mapName + " .estat-pref-select").html(option);
		$("#" + mapName + " .estat-pref-select").select2({
			width:"115px",
            minimumResultsForSearch:Infinity
		});
		$("#" + mapName + " .estat-table-select").select2({
			width:"250px"
		});
        $("#" + mapName + " .estat-table-select").html(citySelectOption);
        //$(".select2-results__options").css({"height":"500xp"});
        //------------------------------------------------------------------------------------------
        /*
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
        */
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
                });
                estatLayerCreate(vectorSource,mapName);
                eval("estatLayer" + mapName).getSource().once("change", function(evt){
                    var extent = eval("estatLayer" + mapName).getSource().getExtent();
                    eval(mapName).getView().fit(extent,eval(mapName).getSize());
                });
                var tblHtml = "<table class='estat-tbl table table-bordered table-hover tablesorter'>";
                    tblHtml += "<thead><tr class='info'>";
                    tblHtml += "<th></th>";
                    tblHtml += "<th>コード</th>";
                    tblHtml += "<th>自治体名</th>";
                    tblHtml += "<th class='estat-zinkou-th'>人口</th>";
                    tblHtml += "<th class='estat-unit-th'></th>";
                    tblHtml += "</tr></thead><tbody>";
                for (var i = 0; i < prefAr.length; i++) {
                    tblHtml += "<tr class='tr-" + prefAr[i]["id"] + "'>";
                    tblHtml += "<td class='estat-lank-td'></td>";
                    tblHtml += "<td>" + prefAr[i]["id"] + "</td>";
                    tblHtml += "<td class='estat-city-td'>" + prefAr[i]["name"] + "</td>";
                    tblHtml += "<td class='estat-zinkou-td'>" + prefAr[i]["zinkou"] + "</td>";
                    tblHtml += "<td class='estat-value-td'>" + "" + "</td>";
                    //tblHtml += "<td class='estat-unit-td'>" + "" + "</td>";
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
                $("#" + mapName + " .estat-table-select").html(citySelectOption);
                //国交省のapiを使用　http://www.land.mlit.go.jp/webland/api.html#todofukenlist
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
                        tblHtml += "<thead><tr class='info'>";
                        tblHtml += "<th></th>";
                        tblHtml += "<th>コード</th>";
                        tblHtml += "<th>自治体名</th>";
                        tblHtml += "<th class='estat-zinkou-th'>人口</th>";
                        tblHtml += "<th class='estat-unit-th' data-tgt='.estat-value-td'></th>";
                        tblHtml += "<th class='estat-division-th' data-tgt='.estat-division-td'>@10万人</th>";
                        tblHtml += "</tr></thead><tbody>";
                    for (var i = 0; i < cityAr.length; i++) {
                        tblHtml += "<tr class='tr-" + cityAr[i]["id"] + "'>";
                        tblHtml += "<td class='estat-lank-td'></td>";
                        tblHtml += "<td class='estat-city-code'>" + cityAr[i]["id"] + "</td>";
                        tblHtml += "<td class='estat-city-td'>" + cityAr[i]["name"] + "</td>";
                        tblHtml += "<td class='estat-zinkou-td'>" + "" + "</td>";
                        tblHtml += "<td class='estat-value-td'>" + "" + "</td>";
                        //tblHtml += "<td class='estat-unit-td'>" + "" + "</td>";
                        tblHtml += "<td class='estat-division-td'>" + "" + "</td>";
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
			var selectVal = $("#" + mapName + " .estat-pref-select").val();
			if(selectVal!="pref") {
                var sid = $("#" + mapName + " .estat-pref-select").val().substr(0, 2);//例45
            }else{
                var sid = "";
			}
            var cdcat01 = $(this).val();
            var estatAjax = function(){//プロミスのファンクション
               return new Promise(function(resolve,reject){
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
            	console.log(JSON.parse(jsonText))
                this["estatDataAr" + mapName] = JSON.parse(jsonText)["GET_STATS_DATAS"]["STATISTICAL_DATA_LIST"]["DATA_INF_LIST"]["DATA_INF"];
                var yearAr = eval("estatDataAr" + mapName)[0]["VALUE"];
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
                    $("#" + mapName + " .estat-year-div").html(selectBox + "年　<i class='estat-chart-icon fa fa-line-chart fa-fw fa-2x'></i>" + $("#" + mapName + " .estat-table-select option:selected").text().split("-")[1]);
                    var unit = eval("estatDataAr" + mapName)[0]["VALUE"][0]["@unit"];
                }else{
                    $("#" + mapName + " .estat-year-div").html(eval("estatDataAr" + mapName)[0]["VALUE"]["@time"] + "年　" + $("#" + mapName + " .estat-table-select option:selected").text().split("-")[1]);
                    var unit = eval("estatDataAr" + mapName)[0]["VALUE"]["@unit"];
                }
                $("#" + mapName + " .estat-unit-th").html("単位:" + unit);
                $("#" + mapName + " .estat-year-select").select2({
                    width:"60px",
					minimumResultsForSearch:Infinity
                });
                //$("#" + mapName + " .estat-unit-td").html(unit);
              	estatTdSet(mapName);
            })
		});
	});
	//-----------------------------------------------------------------------------
    //ダイアログを消した時
    $("body").on("click",".estat-dialog .dialog-hidden",function(){
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        eval(mapName).removeLayer(eval("estatLayer" + mapName));
    });
	//-----------------------------------------------------------------------------
    //年を選択
    $("body").on("change",".estat-year-select",function(){
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
		var tgtYear = $(this).val();
        estatTdSet(mapName,tgtYear);
    });
    //-----------------------------------------------------------------------------
    //表のヘッダーをクリックしたとき
    $("body").on("click",".header",function(){
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        var tgt = $(this).data("tgt");
        console.log(tgt);
        var valueAr = [];
        if(tgt) {
            $("#" + mapName + " .estat-tbl tbody tr").each(function(i) {
                var num = $(this).find(tgt).text();
                valueAr.push(num);
            });
            tdColor(mapName,valueAr,tgt);
        }
    });
	//----------------------------------------------------------------------------
	// tdに数値等をセットしていく関数
	function estatTdSet(mapName,tgtYear){
        $("#" + mapName + " .estat-tbl-div").animate({scrollTop:0});
		var valueAr = [];
        for (i=0; i<eval("estatDataAr" + mapName).length; i++){
            //自治体名がないのでテーブルから取得する。--------------------------------------------
            try {
                var cityId = eval("estatDataAr" + mapName)[i]["VALUE"][0]["@area"];
                var cityName = $("#" + mapName + " .tr-" + cityId).find(".estat-city-td").text();
                eval("estatDataAr" + mapName)[i]["VALUE"][0]["cityname"] = cityName;
            }catch(e){
                //eval("estatDataAr" + mapName)[i]["VALUE"][0]["cityname"] = cityId;
            }
            //-------------------------------------------------------------------------------
			if(!tgtYear) tgtYear = eval("estatDataAr" + mapName)[i]["VALUE"].length - 1;//最後の年を取得している。
            if(eval("estatDataAr" + mapName)[i]["VALUE"].length>0){
            	try {
                    var erement = $("#" + mapName + " .tr-" + eval("estatDataAr" + mapName)[i]["VALUE"][tgtYear]["@area"]);
                    erement.find(".estat-value-td").html(eval("estatDataAr" + mapName)[i]["VALUE"][tgtYear]["$"]);
                    var division = eval("estatDataAr" + mapName)[i]["VALUE"][tgtYear]["$"] / (erement.find(".estat-zinkou-td").text() / 100000);
                    division = division.toFixed(3);
                    erement.find(".estat-division-td").html(division);
                }catch(e){
                    erement.find(".estat-value-td").html("");
                    erement.find(".estat-division-td").html("");
				}
                //var zinkouwari = Math.floor(erement.find(".valueTd").text()/erement.find(".zinkouTd").text()*1000)/1000;
                //erement.find(".zinkouwariTd").html(zinkouwari);
				try {
                    var num = Number(eval("estatDataAr" + mapName)[i]["VALUE"][tgtYear]["$"]);
                    if(isNaN(num)==false) valueAr.push(num);//色をつけるための前準備
                }catch(e){}
            }else{
            	try {
                    var erement = $("#" + mapName + " .tr-" + eval("estatDataAr" + mapName)[i]["VALUE"]["@area"]);
                    erement.find(".estat-value-td").html(eval("estatDataAr" + mapName)[i]["VALUE"]["$"]);

                }catch(e){
                    erement.find(".estat-value-td").html("");
                    erement.find(".estat-division-td").html("");
				}
                //var zinkouwari = Math.floor(erement.find(".valueTd").text()/erement.find(".zinkouTd").text()*1000)/1000;
                //erement.find(".zinkouwariTd").html(zinkouwari);
                try {
                    var num = Number(eval("estatDataAr" + mapName)[i]["VALUE"]["$"]);
                    if(isNaN(num)==false) valueAr.push(num);//色をつけるための前準備
                }catch(e){}
            }
        }
        //ソート-----------
		if($("#" + mapName + " .estat-tbl .header").length==0){//初めてのとき
            $("#" + mapName + " .estat-tbl").tablesorter({sortList:[[4,1]]});
        }else{//２回目以降のとき
            var html = $("#" + mapName + " .estat-tbl-div").html();
            $("#" + mapName + " .estat-tbl-div").html(html);
            $("#" + mapName + " .estat-tbl").tablesorter({sortList:[[4,1]]});

		}
        $("#" + mapName + " .estat-tbl").bind("sortEnd",function () {
            console.log(555);
            $("#" + mapName + " .estat-tbl tbody tr").each(function(i) {
                $(this).find(".estat-lank-td").text(i + 1);
            })
        });


		//----------------
        tdColor(mapName,valueAr,".estat-value-td");
        $("#" + mapName + " .estat-tbl").trigger("update");
	}
	//------------------------------------------------------------------------------------
    function tdColor(mapName,valueAr,tgt) {
        var color100Ar = funcColor100(valueAr);
        var color100 = color100Ar[0];
        var min = color100Ar[2];
        var d3Color = d3.interpolateLab("white", "red");
        var d3ColorM = d3.interpolateLab("white", "blue");
        $("#" + mapName + " .estat-tbl tbody tr").each(function(i){
            //console.log(i);
            $(this).find(".estat-lank-td").text(i+1);
            var value = Number($(this).find(tgt).text());
            if(value>0){//値がプラスだったとき
                var c100 = (value-min)/color100/100;
                var color0 = new RGBColor(d3Color(c100));
                var rgb = new RGBColor(d3Color(c100)).toRGB();
                var rgba = "rgba(" + color0.r + "," + color0.g + "," + color0.b +"," + "0.8)";
                var targetFillColor = d3Color(c100);
            }else{//値がマイナスだったとき
                var c100 = (0-value)/color100/100;
                var color0 = new RGBColor(d3ColorM(c100));
                var rgb = new RGBColor(d3ColorM(c100)).toRGB();
                var rgba = "rgba(" + color0.r + "," + color0.g + "," + color0.b +"," + "0.8)";
                var targetFillColor = d3ColorM(c100);
            }
            $(this).find("td").css({
                background:rgba,
                color:funcTextColor(color0.r,color0.g,color0.b)//背景に応じて色を変える。
            });
            //------------------------------------------------------------------------------------
            var features = eval("estatLayer" + mapName).getSource().getFeatures();
            for (i=0; i<features.length; i++){
                if(features[i].getProperties()["自治体名"]==$(this).find(".estat-city-td").text()){
                    var prevFillColor = features[i]["I"]["_targetFillColor"];
                    features[i]["I"]["_prevFillColor"] = prevFillColor;
                    features[i]["I"]["_targetFillColor"] = targetFillColor;
                    features[i]["I"]["_fillColor"] = rgba;
                    //features[i]["I"]["_polygonHeight"] = Math.floor(c100*50000) + 1000;
                    if(value>0) {
                        features[i]["I"]["_polygonHeight"] = (c100 * 50000) + 1000;
                    }else{
                        features[i]["I"]["_polygonHeight"] = 1000;
                    }
                    //features[i]["I"]["value"] = $(this).find(".estat-value-td").text() + $(this).find(".estat-unit-td").text();
                    features[i]["I"]["value"] = $(this).find(".estat-value-td").text() + $(this).parents("table").find(".estat-unit-th").text().split(":")[1];
                    //features[i]["I"]["lank"] = "順位" + $(this).find(".estat-lank-td").text() + "位";
                }
            }
            //eval("estatLayer" + mapName).getSource().changed();
            //---------------------------------------------------------------------------
            if($("#" + mapName + " .d3d2-btn").text()!="3D") {//3dのときアニメ処理しない
                eval("estatLayer" + mapName).getSource().changed();
                var element = $("#" + mapName + " .estat-tbl-div");
                var mapObj = funcMaps(element);
                var ol3d = eval(mapObj["ol3d"]);
                var estatLayer = eval("estatLayer" + mapName);
                if (estatLayer) {
                    var features = estatLayer.getSource().getFeatures();
                    czmlCreate(features,element);
                }
            }else {
                if (features.length > 100) {//市町村数が100を超える都道府県の場合アニメ処理しない
                    eval("estatLayer" + mapName).getSource().changed();
                } else {
                    //再起処理
                    var count = 1;
                    var saiki = function () {
                        for (j = 0; j < features.length; j++) {
                            var prevFillColor = features[j]["I"]["_prevFillColor"];
                            var targetFillColor = features[j]["I"]["_targetFillColor"];
                            var d3Color = d3.interpolateLab(prevFillColor, targetFillColor);
                            var color0 = new RGBColor(d3Color(count * 0.1));
                            var rgba = "rgba(" + color0.r + "," + color0.g + "," + color0.b + "," + "0.8)";
                            features[j]["I"]["_fillColor"] = rgba;
                        }
                        eval("estatLayer" + mapName).getSource().changed();
                        count++;
                        var st = setTimeout(saiki, 100);
                        if (count > 10) {
                            clearTimeout(st);
                        }
                    };
                    saiki();
                }
            }
        });
    }
	//----------------------------------------------------------------------------
    function estatLayerCreate(vectorSource,mapName){
        eval(mapName).removeLayer(eval("estatLayer" + mapName));
        this["estatLayer" + mapName] = new ol.layer.Vector({
            name:"estatLayer",
            zinkouset:"on",
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
