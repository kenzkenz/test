var pyramidData = [];
var pyramidGraph = [];
$(function() {
    $("body").on("click",".resas-pyramid-btn",function() {
        //console.log($(this).text());
        if($(this).text()!=="連続") {
            var mapObj = funcMaps($(this));
            var mapName = mapObj["name"];
            var cityCode = $(this).data("citycode");
            var cityName = $(this).data("cityname");
            var target = $(this).data("i");
            for (i = 0; i < pyramidData.length; i++) {
                if (pyramidData[i]["cityCode"] == cityCode) {
                    pyramidGraphFunc(pyramidData[i]["pyramidGets"], target, cityCode, cityName, mapName, true);
                    //flg = true;
                    break;
                }
            }
        }else{
            var bros = $(this).siblings();
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
        }
    })
});
//----------------------------------------------------------------------------------------------------------------------
function funcResasPyramid(mapName,cityCode,cityName){
    var yearLeftAr = ["'80","'85","'90","'95","'00","'05","'10","'15","'20","'25","'30","'35","'40","連続"];
    var pyramidButtons = "<div class='resas-pyramid-btn-group-div'><div class='btn-group'>";
    for (i=0; i<yearLeftAr.length; i++){
        pyramidButtons += "<button type='button' class='resas-pyramid-btn btn btn-primary btn-xs' data-citycode='" + cityCode + "' data-cityname='" + cityName + "' data-i='" + i + "'>";
        pyramidButtons += yearLeftAr[i];
        pyramidButtons += "</button>";
       // if(yearLeftAr[i] == yearLeft) target = i;
    }
    pyramidButtons += "</div></div>";
   // console.log(pyramidButtons);
    var content = "";
    content += "<div id='resas-chart-pyramid-div-" + mapName + "-" + cityCode + "' class='resas-chart-pyramid-div'>";
    content += "</div>";
    content += pyramidButtons;
    //content += "<button type='button' class='resas-pyramid-renzoku-btn btn btn-primary btn-block'>連続</button>";
    mydialog({
        id:"resas-chart-pyramid-dialog-" + mapName + "-" + cityCode,
        class:"resas-chart-pyramid-dialog",
        map:mapName,
        title:"人口ピラミッド",
        content:content,
        top:"55px",
        right:"20px",
        //width:"400px",
        rmDialog:false,
        //hide:true,
        //minMax:true,
        rmDialog:true
    });
    var mysqlRead = function(){
        return new Promise(function(resolve,reject){
            var hyou = "pyramid";
            $.ajax({
                type:"GET",
                url:"./php/resas-select.php",
                dataType:"json",
                data:{
                    prefcode:"",
                    citycode:cityCode,
                    hyou:hyou
                }
            }).done(function(json){
                resolve(json);
            }).fail(function(json){
                console.log("失敗!");
            });
        });
    };
    mysqlRead().then(function(json) {
        //console.log(json["jsontext"]);
        var target = 6;
        //var cityName = "実験市";
        pyramidGraphFunc(JSON.parse(json["jsontext"]),target,cityCode,cityName,mapName);
        pyramidData.push({"cityCode":cityCode,"pyramidGets":JSON.parse(json["jsontext"])});

    })
}

//------------------------------------------------------------------------------
//人口ピラミッド
function pyramidGraphFunc(pyramidGets,target,cityCode,cityName,mapName,btnFlg){
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
    }
    manGraphSeries = {
        "name":"男",
        "data":manGraphAr0,
        "color":"rgba(51,122,183,1.0)",
        "pointWidth":18
    };
    womanGraphSeries = {
        "name":"女",
        "data":womanGraphAr0,
        "color":"#d9534f",
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
                //renderTo:"pyramidGraphDiv_" + mapName + cityCode,
                renderTo:"resas-chart-pyramid-div-" + mapName + "-" +  cityCode,
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
    //$("#pyramidGraphDiv_" + mapElementID + cityCode).next("div").find(".pyramidBtn").removeClass("pyramidBtnClicked");
    //$("#pyramidGraphDiv_" + mapElementID + cityCode).next("div").find(".pyramidBtn").eq(target).addClass("pyramidBtnClicked");
}





















$(function() {
    var dialogId = 0;
    //-----------------------------------------------------------------------------
    //グラフ


    
    /*
    $("body").on("click", ".estat-chart-icon", function () {
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        dialogId++;
        var content = "";
        content += "<div id='estat-chart-div-" + dialogId + "' class='estat-chart-div'>";
        content += "</div>";
        mydialog({
            id:"estat-chart-dialog-" + mapName + "-" + dialogId,
            class:"estat-chart-dialog",
            map:mapName,
            title:"e-stat グラフ",
            content:content,
            top:"55px",
            right:"20px",
            //width:"400px",
            rmDialog:false,
            //hide:true,
            //minMax:true,
            rmDialog:true
        });
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        if(windowWidth<700){
            $(".estat-chart-div").css({
                "width":windowWidth-50 + "px",
                "height":windowHeight-150 + "px"
            });
        }
        estatChartCreate(mapName)
    });
    */
    //----------------------------------------------------------------------------
    function estatChartCreate(mapName,target){
        console.log(target);
        if(mapName=="map1"){
            var estatDataAr = estatDataArmap1;
        }else{
            var estatDataAr = estatDataArmap2;
        }
        console.log(estatDataAr);
        console.log(estatDataAr[0]["VALUE"]);
        var chartAr0 = [];
        var chartAr1 = [];
        var timeAr = [];
        var areaAr = [];
        var subtitle = "";
        if(estatDataAr[0]["VALUE"].length>0){
            var unit = estatDataAr[0]["VALUE"][0]["@unit"];
        }else{
            var unit = estatDataAr[0]["VALUE"]["@unit"];
        }
        for (i=0; i<estatDataAr[0]["VALUE"].length;i++){
            var time = Number(estatDataAr[0]["VALUE"][i]["@time"]) + "年";
            timeAr.push(time);
        }
        for (i=0; i<estatDataAr.length; i++){
            if(estatDataAr[i]["VALUE"][0]) {
                var cityName = estatDataAr[i]["VALUE"][0]["cityname"];
                for (j = 0; j < estatDataAr[i]["VALUE"].length; j++) {
                    //if(target==".zinkouwariTd" || target==".mensekiwariTd" || target==".ziyuuwariTd"){
                    //    var value = Number(cityDataAr[i]["VALUE"][j]["$"])/Number(filterValue[0][target]);
                    //    graphAr0.push(value);

                    //}else{
                    var value = Number(estatDataAr[i]["VALUE"][j]["$"]);
                    chartAr0.push(value);
                    //};
                }
                chartAr1.push({
                    "name": cityName,
                    "type": "line",
                    "data": chartAr0
                });
                chartAr0 = [];
            }
        }

        estatHichart = Highcharts.chart({
            chart:{
                renderTo:"estat-chart-div-" + dialogId,
                //type:"line",
                animation:false,
                //aliginTicks:false
            },
            title: {
                text:$("#" + mapName + " .estat-pref-select option:selected").text(),
                x: -20 //center
            },
            subtitle: {
                text:$("#" + mapName + " .estat-table-select option:selected").text()
            },
            credits:{
                enabled:false
            },
            xAxis: {
                categories:timeAr,
            },
            yAxis:{
                title: {
                    text: "単位:"+unit
                }
            },
            tooltip: {
                valueSuffix:unit
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series:chartAr1,
            exporting:{
                enabled:true
            }
        });
    }
});