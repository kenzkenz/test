var myHighcharts_map;
var myHighcharts_map2;
var pyramidData = [];
var pyramidGraph = [];
var syusseiData = [];
var syusseiGraph = [];
var suiiGraph = [];
$(function(){
	$("body").on("click",".graphDialogBtn",function(){
		var mapElement = $(this).parents(".mapBros");
		var mapElementID = mapElement.attr("id");
		var title = "グラフ"
		var content = "<div style='padding:10px;text-align:right;'>" +
					"<div id='cityGraphDiv_" + mapElementID + "'></div>" +
					"<button class='graphShow'>市町村全表示</button><button class='graphHide'>市町村全非表示</button>" +
				"</div>"
		var top = 65;
		//var left = $("#myDialog_estat_" + mapElementID).offset().left + $("#myDialog_estat_" + mapElementID).width() + 10;
		var right = 10;
		myDialog({
			id:"graphDialog_" + mapElementID,
			parent:mapElementID,
			title:title,
			content:content,
			top:top + "px",
			right:right + "px"
		});
		var dialogbaseId = $(this).parents(".dialog-base").attr("id");
		console.log(dialogbaseId);
		if(dialogbaseId.indexOf("estat")!=-1){
			if(mapElement.find(".cityTable th").index(mapElement.find(".cityTable .headerSortUp"))!=-1){
				var targetEq = mapElement.find(".cityTable th").index(mapElement.find(".cityTable .headerSortUp"));
				var target = "." + mapElement.find(".cityTable td").eq(targetEq).attr("class");
			}else if(mapElement.find(".cityTable th").index(mapElement.find(".cityTable .headerSortDown"))!=-1){
				var targetEq = mapElement.find(".cityTable th").index(mapElement.find(".cityTable .headerSortDown"));
				var target = "." + mapElement.find(".cityTable td").eq(targetEq).attr("class");
			}else{
				var target = ".valueTd";
			};
			console.log(target)
			graphCreate_estat(mapElement,target);
		}else{
			//var target = ".souzinkouRituTd";
			graphCreate_resas(mapElement,target);
		};
		return false;
	});
	//------------------------------------------------------------------------------------------
	//全非表示
	$("body").on("click",".graphHide",function(){
		loading();
		var mapElement = $(this).parents(".mapBros");
		var mapElementID = mapElement.attr("id");
		console.log(mapElementID);
		for (i=0; i<eval("myHighcharts_" + mapElementID).series.length;i++){
			eval("myHighcharts_" + mapElementID).series[i].hide();
		};
		loadingClose();
	});
	//------------------------------------------------------------------------------------------
	//全表示
	$("body").on("click",".graphShow",function(){
		loading();
		var mapElement = $(this).parents(".mapBros");
		var mapElementID = mapElement.attr("id");
		for (i=0; i<eval("myHighcharts_" + mapElementID).series.length;i++){
			eval("myHighcharts_" + mapElementID).series[i].show();
		};
		loadingClose();
	});
	//------------------------------------------------------------------------------------------
	//
	$("body").on("click",".pyramidBtn",function(){
		var mapElement = $(this).parents(".mapBros");
		var mapElementID = mapElement.attr("id");
		var cityCode = $(this).data("citycode");
		var yearLeft = $(this).text();
		var cityName = $(this).data("cityname");
		//$(this).siblings(".pyramidBtnClicked").removeClass("pyramidBtnClicked");
		//console.log(cityCode);
		//console.log(yearLeft);
		//var target = $(this).parents("div").find(".pyramidBtn").index(this);
		var target = $(this).data("i");
		//console.log(target);
		for (i=0; i<pyramidData.length; i++){
			if(pyramidData[i]["cityCode"]==cityCode){
				//console.log(pyramidData[i]["pyramidGets"]);
				pyramidGraphFunc(pyramidData[i]["pyramidGets"],target,cityCode,cityName,mapElementID,true);
				loadingClose();
				flg = true;
				break;
			};
		};
		//$(this).addClass("pyramidBtnClicked");
	});
	//------------------------------------------------------------------------------------------
	//
	$("body").on("click",".pyramidRenzokuBtn",function(){
		var bros = $(this).siblings()
		var count = 0;
		var saiki = function(){
			bros.eq(count).click();
			count++
			var st = setTimeout(saiki,500);
			if(count+1>bros.length){
				clearTimeout(st);
			};
		};
		saiki();
	});
	//------------------------------------------------------------------------------------------
});
//----------------------------------------------------------------------------
function graphCreate_estat(mapElement,target){
	var mapElementID = mapElement.attr("id");
	console.log(target);
	$("#cityGraphDiv_" + mapElementID).html("")
	console.log(cityDataAr);
	console.log(cityDataAr[0]["VALUE"]);
	var graphAr0 = [];
	var graphAr1 = [];
	var timeAr = [];
	var areaAr = [];
	var subtitle = "";
	if(cityDataAr[0]["VALUE"].length>0){
		var tani = cityDataAr[0]["VALUE"][0]["@unit"];
	}else{
		var tani = cityDataAr[0]["VALUE"]["@unit"]
	};
	for (i=0; i<cityDataAr[0]["VALUE"].length;i++){
		var time = Number(cityDataAr[0]["VALUE"][i]["@time"]) + "年";
		timeAr.push(time);
	};
	for (i=0; i<cityDataAr.length; i++){
		var filterValue = cityValuesAr.filter(function(item,index){
			if(cityDataAr[i]["VALUE"].length>0){
				if(item.citycode == cityDataAr[i]["VALUE"][0]["@area"]) return true;
			}else{
				if(item.citycode == cityDataAr[i]["VALUE"]["@area"]) return true;
			};
		});
		if(cityDataAr[0]["VALUE"].length>0){
			for (j=0; j<cityDataAr[i]["VALUE"].length; j++){
				if(target==".zinkouwariTd" || target==".mensekiwariTd" || target==".ziyuuwariTd"){
					var value = Number(cityDataAr[i]["VALUE"][j]["$"])/Number(filterValue[0][target]);
					graphAr0.push(value);

				}else{
					var value = Number(cityDataAr[i]["VALUE"][j]["$"]);
					graphAr0.push(value);
				};
			};
		}else{
			if(target==".valueTd"){
				var value = Number(cityDataAr[i]["VALUE"]["$"]);
				graphAr0.push(value);
			}else{
				var value = Number(cityDataAr[i]["VALUE"]["$"])/Number(filterValue[0][target]);
				graphAr0.push(value);
			};
		};
		if(cityDataAr[i]["VALUE"].length>0){
			var filterCity = cityValuesAr.filter(function(item,index){
				if(item.citycode == cityDataAr[i]["VALUE"][0]["@area"]) return true;
			});
		}else{
			var filterCity = cityValuesAr.filter(function(item,index){
				if(item.citycode == cityDataAr[i]["VALUE"]["@area"]) return true;
			});
		};
		//console.log(filterCity[0]["name"])
		graphAr1.push({
			"name":filterCity[0]["cityname"],
			"type":"line",
			"data":graphAr0
		});
		graphAr0=[];
	};
	//console.log(JSON.stringify(graphAr1));
	//console.log(areaAr);
	switch (target){
		case ".zinkouwariTd":
			subtitle="人口割"
			break;
		case ".mensekiwariTd":
			subtitle="面積割"
			break;
		case ".ziyuuwariTd":
			subtitle = mapElement.find(".estatHyouSelect option:selected").text() + " ÷ " + mapElement.find(".estatHyouSelect2 option:selected").text()
			break;
	};
	//subtitle = target;
	if($("#myDialog_graphDialog_" + mapElementID).length>0){
		this["myHighcharts_" + mapElementID] = Highcharts.chart({
			chart:{
				renderTo:"cityGraphDiv_" + mapElementID,
				//type:"line",
				animation:false,
				//aliginTicks:false
			},
			title: {
				text:mapElement.find(".estatHyouSelect option:selected").text(),
				x: -20 //center
			},
			subtitle: {
					text:subtitle
			},
			credits:{
				enabled:false
			},
			xAxis: {
				categories:timeAr,
			},
			yAxis:{
				title: {
					text: "単位:"+tani
				}
			},
			tooltip: {
				valueSuffix:tani
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 0
		 	},
			series:graphAr1,
			exporting:{
				enabled:true
			}
		});
	};
	//alert(999)
};
//----------------------------------------------------------------------------
var resasGraphAr0 = [];
var resasGraphAr = [];
function graphCreate_resas(mapElement){
	var mapElementID = mapElement.attr("id");
	var zinkouGets = eval("zinkouGets_" + mapElementID)
	//console.log(eval("zinkouGets_" + mapElementID));
	$("#cityGraphDiv_" + mapElementID).html("")
	if(mapElementID=="map"){
		var kugirinenIndex = kugirinenIndex_map;
	}else{
		var kugirinenIndex = kugirinenIndex_map2;
	};
	var graphAr0 = [];
	var graphAr1 = [];
	var timeAr = [];
	var areaAr = [];
	var subtitle = "";
	for (i=0; i<zinkouGets[0]["zinkou"]["data"][0]["data"].length; i++){
		var time = zinkouGets[0]["zinkou"]["data"][0]["data"][i]["year"];
		//console.log(time);
		timeAr.push(time);
	};
	var zinkouSelectVal = Number(mapElement.find(".zinkouSelect").val());
	//console.log(zinkouSelectVal);
	var flg = true;
	var titleText = zinkouGets[0]["zinkou"]["data"][0]["data"][kugirinenIndex]["year"] + "年を基準とした率"
	switch (zinkouSelectVal){
		case 4:
			flg = false;
			zinkouSelectVal = zinkouSelectVal - 3;
			titleText = "％";
			break;
		case 5:
			flg = false;
			zinkouSelectVal = zinkouSelectVal - 3;
			titleText = "％";
			break;
		case 6:
			flg = false;
			zinkouSelectVal = zinkouSelectVal - 3;
			titleText = "％";
			break;
	};
	for (i=0; i<zinkouGets.length; i++){
		var name = zinkouGets[i]["cityName"];
		//console.log(name);
		if(zinkouGets[i]["zinkou"]!=undefined){
			for (j=0; j<zinkouGets[i]["zinkou"]["data"][zinkouSelectVal]["data"].length; j++){
				if(flg){
					var value = zinkouGets[i]["zinkou"]["data"][zinkouSelectVal]["data"][j]["ritu"];
				}else{
					var value = zinkouGets[i]["zinkou"]["data"][zinkouSelectVal]["data"][j]["rate"];
				};
				graphAr0.push(value);
			};
			graphAr1.push({
				"name":name,
				"type":"line",
				"data":graphAr0
			});
		};
		graphAr0=[];
	};
	//console.log(graphAr1);
	if($("#myDialog_graphDialog_" + mapElementID).length>0){
		this["myHighcharts_" + mapElementID] = Highcharts.chart({
			chart:{
				renderTo:"cityGraphDiv_" + mapElementID,
				//type:"line",
				animation:false,
				//aliginTicks:false
			},
			title: {
				text:mapElement.find(".resasPrefSelect option:selected").text() + "　"  + mapElement.find(".zinkouSelect option:selected").text(),
				x: -20 //center
			},
			subtitle: {
					text:subtitle
			},
			credits:{
				enabled:false
			},
			xAxis: {
				categories:timeAr,
			},
			yAxis:{
				title: {
					//text: "単位:"+tani
					text:titleText
				}
			},
			tooltip: {
				//valueSuffix:tani
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 0
		 	},
			series:graphAr1,
			exporting:{
				enabled:true
			}
		});
	};
	//alert(999)
};
//--------------------------------------------------------------------------------
//人口ピラミッド１
function pyramidFunc(mapElementID,cityCode,cityName,yearLeft){
	var yearLeftAr = [1980,1985,1990,1995,2000,2005,2010,2015,2020,2025,2030,2035,2040];
	loading();
	console.log(mapElementID);
	//console.log(cityCode.length);
	var prefCode = String(cityCode).substr(0,2);
	var title = "人口ピラミッド"
	var pyramidButtons = "";
	var target = null;
	for (i=0; i<yearLeftAr.length; i++){
		pyramidButtons += "<span class='pyramidBtn btn0' data-citycode='" + cityCode + "' data-cityname='" + cityName + "' data-i='" + i + "'>";
		pyramidButtons += yearLeftAr[i];
		pyramidButtons += "</span>";
		if(yearLeftAr[i] == yearLeft) target = i;
	};

	target = 6;

	console.log(target);
	console.log(cityCode);
	var content = "<div style='padding:10px;text-align:left;'>" +
				"<div id='pyramidGraphDiv_" + mapElementID + cityCode + "' class='pyramidGraphDiv'></div>" +
				"<div>" +
				pyramidButtons +
				"　<span class='pyramidRenzokuBtn btn0'>連続</span>" +
				"</div>" +
			"</div>"
	var top = 65;
	var right = 10;
	myDialog({
		id:"pyramidGraphDialog_" + mapElementID + cityCode,
		parent:mapElementID,
		title:title,
		content:content,
		top:top + "px",
		right:right + "px"
	});
	//------------------------------------------------------------------------
	var mysqlRead = function(){
		return new Promise(function(resolve,reject){
			var hyou = "pyramid";
			$.ajax({
				type:"GET",
				url:"./php/resasselect.php",
				dataType:"json",
				data:{
					prefcode:"",
					citycode:cityCode,
					hyou:hyou
				},
				}).done(function(json){
					resolve(json);
				}).fail(function(json){
					console.log("失敗!");
			});
		});
	};
	//------------------------------------------------------------------------
	console.log(pyramidData.length);
	var pflg = false;
	if(pyramidData.length==0){
		mysqlRead().then(function(json){
			if(json["jsontext"]==null){
				console.log("RESAS APIから取得します。");
				resasRequest(prefCode,cityCode,yearLeft)
			}else{
				console.log("自データベースから取得します。")
				pyramidGraphFunc(JSON.parse(json["jsontext"]),target,cityCode,cityName,mapElementID);
				pyramidData.push({"cityCode":cityCode,"pyramidGets":JSON.parse(json["jsontext"])});
				loadingClose();
			};
		});
	}else{
		for (i=0; i<pyramidData.length; i++){
			console.log(cityCode);
			if(pyramidData[i]["cityCode"]==cityCode){
				console.log("メモリーから取得します。");
				pyramidGraphFunc(pyramidData[i]["pyramidGets"],target,cityCode,cityName,mapElementID);
				loadingClose();
				pflg = true;
				break;
			};
		};
		if(pflg==false){
			mysqlRead().then(function(json){
				if(json["jsontext"]==null){
					console.log("RESAS APIから取得します。");
					resasRequest(prefCode,cityCode,yearLeft)
				}else{
					console.log("自データベースから取得します。")
					pyramidGraphFunc(JSON.parse(json["jsontext"]),target,cityCode,cityName,mapElementID);
					pyramidData.push({"cityCode":cityCode,"pyramidGets":JSON.parse(json["jsontext"])});
					loadingClose();
				};
			});
		};
	};

	function resasRequest(prefCode,cityCode,yearLeft){
		var resasUrl2 = "population/composition/pyramid";
		//var prefCode = mapElement.find(".resasPrefSelect").val();
		var prefCode = prefCode;
		console.log(prefCode);
		var cityCode = cityCode;
		console.log(cityCode);
		var yearLeft = yearLeft;
		console.log(yearLeft);
		var yearRight = 2040;
		if(String(cityCode).length<=2){//全国のとき
			var cityCode2 = "-";
		}else{
			var cityCode2 = cityCode;
		};
		var pyramidGet = [];
		for (i=0; i<yearLeftAr.length; i++){
			pyramidGet[i] =
				new Promise(function(resolve,reject){
					$.ajax({
						type:"GET",
						url: resasUrl + resasUrl2,
						headers: {"X-API-KEY":resasKey},
						dataType:"json",
						data:{
							prefCode:prefCode,
							cityCode:cityCode2,
							yearLeft:yearLeftAr[i],
							yearRight:yearRight
						},
						}).done(function(json){
							resolve(json);
						}).fail(function(){
							loadingClose();
							console.log('error!!!');
					});
				});
		};
		Promise.all(pyramidGet).then(function(pyramidGets){
			pyramidGraphFunc(pyramidGets,target,cityCode,cityName,mapElementID);
			loadingClose();
			pyramidData.push({"cityCode":cityCode,"pyramidGets":pyramidGets});
			var hyou = "pyramid";
			var jsonText = JSON.stringify(pyramidGets);
			$.ajax({
				type:"POST",
				url:"./php/resasinsert.php",
				data:{
					prefcode:"",
					citycode:cityCode,
					hyou:hyou,
					jsonText:jsonText
				},
				}).done(function(){
					//resolve();
					console.log("人口ピラミッド追加成功")
					loadingClose();
				}).fail(function(){
					console.log("人口ピラミッド追加失敗!");
					loadingClose();
			});
		});
	};
};
//------------------------------------------------------------------------------
//人口ピラミッド２
function pyramidGraphFunc(pyramidGets,target,cityCode,cityName,mapElementID,btnFlg){
	var yearLeft = pyramidGets[target]["result"]["yearLeft"]["year"];
	//console.log(yearLeft);
	var leftGraphData = pyramidGets[target]["result"]["yearLeft"]["data"];
	//console.log(leftGraphData);
	var manGraphAr0 = [];
	var manGraphSeries = null;
	var womanGraphAr0 = [];
	var womanGraphSeries = null;
	for (i=0; i<leftGraphData.length; i++){
		var value = -leftGraphData[i]["man"];
		manGraphAr0.push(value);
		var value = leftGraphData[i]["woman"];
		womanGraphAr0.push(value);
	};
	manGraphSeries = {
		"name":"男",
		"data":manGraphAr0,
		"color":"#1b486d",
		"pointWidth":18
	};
	womanGraphSeries = {
		"name":"女",
		"data":womanGraphAr0,
		"color":"#df4242",
		"pointWidth":18
	};
	var womanMax = Math.max.apply(null,womanGraphAr0);
	//console.log(womanMax);
	var manMax = Math.abs(Math.min.apply(null,manGraphAr0));
	//console.log(manMax);
	if(womanMax>manMax){
		var ywidth = womanMax;
	}else{
		var ywidth = manMax;
	};
	var categories = [
	    '0-4', '5-9', '10-14', '15-19',
	    '20-24', '25-29', '30-34', '35-39', '40-44',
	    '45-49', '50-54', '55-59', '60-64', '65-69',
	    '70-74', '75-79', '80-84', '85-89', '90 + '
	];
	if(!btnFlg){
		pyramidGraph[cityName] = Highcharts.chart({
			chart:{
				renderTo:"pyramidGraphDiv_" + mapElementID + cityCode,
				type:"bar",
				animation:true,
				//aliginTicks:false
			},
			title: {
				//text:mapElement.find(".resasPrefSelect option:selected").text() + "　"  + mapElement.find(".zinkouSelect option:selected").text(),
				text:cityName + "　" + yearLeft + "年",
				//x: -20 //center
			},
			subtitle: {
					//text:subtitle
			},
			credits:{
				enabled:false
			},
			//xAxis: {
			//	categories:timeAr,
			//},
			xAxis: [
				{
					categories:categories,
					reversed:false,
					labels:{
						step: 1
					}
				}, {
					opposite:true,
					reversed:false,
					categories:categories,
					linkedTo:0,
					labels:{
						step: 1
					}
				}
			],
			yAxis:{
				title:{
				    text: null
				},
				labels:{
					formatter: function() {
						return Highcharts.numberFormat(Math.abs(this.value), 0);
						//return (Math.abs(this.value) / 1000000) + 'M';
					}
				},
				min:-ywidth,
				max:ywidth
			},
			plotOptions: {
			    series: {
				  stacking: 'normal'
			    }
			},
			tooltip: {
			    formatter: function(){
				  return this.series.name +'　年齢 '+ this.point.category +'歳<br/>'+
					'人口: '+ Highcharts.numberFormat(Math.abs(this.point.y), 0) + "人";
			    }
			},
			exporting:{
				enabled:true
			},
			series: [manGraphSeries,womanGraphSeries]
		});
	}else{
		//console.log(cityName);
		//console.log(manGraphSeries["data"]);
		pyramidGraph[cityName].series[0].setData(manGraphSeries["data"]);
		pyramidGraph[cityName].series[1].setData(womanGraphSeries["data"]);
		pyramidGraph[cityName].setTitle({text:cityName + "　" + yearLeft + "年"});
	};
	$("#pyramidGraphDiv_" + mapElementID + cityCode).next("div").find(".pyramidBtn").removeClass("pyramidBtnClicked");
	$("#pyramidGraphDiv_" + mapElementID + cityCode).next("div").find(".pyramidBtn").eq(target).addClass("pyramidBtnClicked");
};
//--------------------------------------------------------------------------------
//出生数１
function syusseiFunc(mapElementID,cityCode,cityName){
	loading();
	var prefCode = String(cityCode).substr(0,2);
	var title = "出生数・死亡数/転入数・転出数"
	var pyramidButtons = "";
	var content = "<div style='padding:10px;text-align:left;'>" +
				"<div id='syusseiGraphDiv_" + mapElementID + cityCode + "' class='pyramidGraphDiv'></div>" +
				//"<div>" +
				//pyramidButtons +
				//"　<span class='pyramidRenzokuBtn btn0'>連続</span>" +
				"</div>" +
			"</div>"
	var top = 65;
	var right = 10;
	myDialog({
		id:"syusseiGraphDialog_" + mapElementID + cityCode,
		parent:mapElementID,
		title:title,
		content:content,
		top:top + "px",
		right:right + "px"
	});
	var flg = false;
	for (i=0; i<syusseiData.length; i++){
		if(syusseiData[i]["cityCode"]==String(cityCode)){
			syusseiGraphFunc(syusseiData[i]["syusseiGets"],cityCode,cityName,mapElementID);
			loadingClose();
			flg = true;
			break;
		};
	};
	if(flg==false){
		var resasUrl2 = "population/sum/estimate";
		//var prefCode = mapElement.find(".resasPrefSelect").val();
		var prefCode = prefCode;
		var cityCode = cityCode;
		//var yearLeft = yearLeft;
		//var yearRight = 2040;
		if(String(cityCode).length<=2){//全国のとき
			var cityCode2 = "-";
		}else{
			var cityCode2 = cityCode;
		};
		var syusseiGet = [];
		//for (i=0; i<yearLeftAr.length; i++){
			syusseiGet[0] =
				new Promise(function(resolve,reject){
					$.ajax({
						type:"GET",
						url: resasUrl + resasUrl2,
						headers: {"X-API-KEY":resasKey},
						dataType:"json",
						data:{
							prefCode:prefCode,
							cityCode:cityCode2,
							//yearLeft:yearLeftAr[i],
							//yearRight:yearRight
						},
						}).done(function(json){
							//console.log(json);
							resolve(json);
						}).fail(function(){
							loadingClose();
							console.log('error!!!');
					});
				});

		//};
		Promise.all(syusseiGet).then(function(syusseiGets){
			console.log(syusseiGets);
			syusseiGraphFunc(syusseiGets,cityCode,cityName,mapElementID);
			syusseiData.push({"cityCode":cityCode,"syusseiGets":syusseiGets});
			loadingClose();
		});
	};
};
//------------------------------------------------------------------------------
//出生数２
function syusseiGraphFunc(syusseiGets,cityCode,cityName,mapElementID,btnFlg){
	//var yearLeft = pyramidGets[target]["result"]["yearLeft"]["year"];
	var tennyuusuuAr = syusseiGets[0]["result"]["data"][1]["data"];
	var tensyutusuuAr = syusseiGets[0]["result"]["data"][2]["data"];
	var syusseisuuAr = syusseiGets[0]["result"]["data"][3]["data"];
	var sibousuuAr = syusseiGets[0]["result"]["data"][4]["data"];
	console.log(syusseiGets);
	console.log(syusseisuuAr);
	console.log(cityName);
	var tennyuuGraphSeries = [];
	var tennyuuGraphDataAr = [];
	var tensyutuGraphSeries = [];
	var tensyutuGraphDataAr = [];
	var syusseiGraphSeries = [];
	var syuuseiGraphDataAr = [];
	var sibouGraphSeries = [];
	var sibouGraphDataAr = [];
	var timeAr = [];
	for (i=0; i<tennyuusuuAr.length; i++){
		var value = tennyuusuuAr[i]["value"];
		tennyuuGraphDataAr.push(value);
		var value = tensyutusuuAr[i]["value"];
		tensyutuGraphDataAr.push(value);
		var value = syusseisuuAr[i]["value"];
		syuuseiGraphDataAr.push(value);
		var value = sibousuuAr[i]["value"];
		sibouGraphDataAr.push(value);

		var time = Number(tennyuusuuAr[i]["year"]) + "年";
		timeAr.push(time);
	};
	tennyuuGraphSeries = {
		"name":"転入数",
		"data":tennyuuGraphDataAr,
		//"color":"#1b486d",
	};
	tensyutuGraphSeries = {
		"name":"転出数",
		"data":tensyutuGraphDataAr,
		//"color":"#1b486d",
	};
	syusseiGraphSeries = {
		"name":"出生数",
		"data":syuuseiGraphDataAr,
		//"color":"#1b486d",
		//"pointWidth":18
	};
	sibouGraphSeries = {
		"name":"死亡数",
		"data":sibouGraphDataAr,
		//"color":"#1b486d",
	};

	syusseiGraph[cityName] = Highcharts.chart({
		chart:{
			renderTo:"syusseiGraphDiv_" + mapElementID + cityCode,
			type:"line",
			animation:true,
			//aliginTicks:false
		},
		credits:{
			enabled:false
		},
		xAxis: {
			categories:timeAr,
		},
		yAxis:{
			title: {
				text:null// "単位:人"
			},
			labels:{
				formatter: function() {
					return Highcharts.numberFormat(Math.abs(this.value), 0) + "人";
					//return (Math.abs(this.value) / 1000000) + 'M';
				}
			},
		},
		title: {
			text:cityName + "　出生数・死亡数/転入数・転出数",
		},
		series: [tennyuuGraphSeries,tensyutuGraphSeries,syusseiGraphSeries,sibouGraphSeries]
	});
};
//---------------------------------------------------------------------------------------------------------------
//人口推移
function suiiFunc(mapElementID,cityCode,cityName){
	var zinkouGets = eval("zinkouGets_" + mapElementID);
	console.log(zinkouGets);
	var zinkouGet = zinkouGets.filter(function(item,index){
		if(item.cityCode == cityCode) return true;
	});
	console.log(zinkouGet);
	var prefCode = String(cityCode).substr(0,2);
	var title = "人口推移"
	var content = "<div style='padding:10px;text-align:left;'>" +
				"<div id='suiiGraphDiv_" + mapElementID + cityCode + "' class='pyramidGraphDiv'></div>" +
				//"<div>" +
				//pyramidButtons +
				//"　<span class='pyramidRenzokuBtn btn0'>連続</span>" +
				"</div>" +
			"</div>"
	var top = 65;
	var right = 10;
	myDialog({
		id:"suiiGraphDialog_" + mapElementID + cityCode,
		parent:mapElementID,
		title:title,
		content:content,
		top:top + "px",
		right:right + "px"
	});

	var nensyouAr = zinkouGet[0]["zinkou"]["data"][1]["data"];
	var seisanAr = zinkouGet[0]["zinkou"]["data"][2]["data"];
	var rounenAr = zinkouGet[0]["zinkou"]["data"][3]["data"];

	var nensyouGraphDataAr = [];
	var nensyouGraphSeries = [];
	var seisanGraphDataAr = [];
	var seisanGraphSeries = [];
	var rounenGraphDataAr = [];
	var rounenGraphSeries = [];
	var timeAr = [];
	console.log(nensyouAr);

	for (i=0; i<nensyouAr.length; i++){
		var rate = nensyouAr[i]["rate"];
		nensyouGraphDataAr.push(rate);
		var rate = seisanAr[i]["rate"];
		seisanGraphDataAr.push(rate);
		var rate = rounenAr[i]["rate"];
		rounenGraphDataAr.push(rate);
		var time = seisanAr[i]["year"] + "年";
		timeAr.push(time);
	};
	nensyouGraphSeries = {
		"name":"年少人口",
		"data":nensyouGraphDataAr,
		"color":"green",
	};
	seisanGraphSeries = {
		"name":"生産年齢人口",
		"data":seisanGraphDataAr,
		"color":"skyblue",
	};
	rounenGraphSeries = {
		"name":"老年人口",
		"data":rounenGraphDataAr,
		"color":"#df4242",
	};

	suiiGraph[cityName] = Highcharts.chart({
		chart:{
			renderTo:"suiiGraphDiv_" + mapElementID + cityCode,
			type:"line",
			animation:true,
			//aliginTicks:false
		},
		credits:{
			enabled:false
		},
		xAxis: {
			categories:timeAr,
		},
		yAxis:{
			title: {
				text:null// "単位:人"
			},
			labels:{
				formatter: function() {
					return Highcharts.numberFormat(Math.abs(this.value), 0) + "%";
					//return (Math.abs(this.value) / 1000000) + 'M';
				}
			},
		},
		title: {
			text:cityName + "　人口推移",
		},
		tooltip: {
		    formatter: function(){
			  return this.series.name +'　'+ this.point.category +'<br/>'+
				'割合: '+ Highcharts.numberFormat(Math.abs(this.point.y), 0) + "%";
		    }
		},
		series: [nensyouGraphSeries,seisanGraphSeries,rounenGraphSeries]
	});




};
