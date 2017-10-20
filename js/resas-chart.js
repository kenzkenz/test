var pyramidData = [];
var pyramidGraph = [];
var suiiGraph = [];
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
//人口ピラミッドその１
function funcResasPyramid(mapName,cityCode,cityName){
    var yearLeftAr = ["'80","'85","'90","'95","'00","'05","'10","'15","'20","'25","'30","'35","'40","連続"];
    var pyramidButtons = "<div class='resas-pyramid-btn-group-div'><div class='btn-group'>";
    for (i=0; i<yearLeftAr.length; i++){
        pyramidButtons += "<button type='button' class='resas-pyramid-btn btn btn-primary btn-xs' data-citycode='" + cityCode + "' data-cityname='" + cityName + "' data-i='" + i + "'>";
        pyramidButtons += yearLeftAr[i];
        pyramidButtons += "</button>";
    }
    pyramidButtons += "</div></div>";
    var content = "";
    content += "<div id='resas-chart-pyramid-div-" + mapName + "-" + cityCode + "' class='resas-chart-pyramid-div'>";
    content += "</div>";
    content += pyramidButtons;
    mydialog({
        id:"resas-chart-pyramid-dialog-" + mapName + "-" + cityCode,
        class:"resas-chart-pyramid-dialog",
        map:mapName,
        title:"人口ピラミッド(RESAS)",
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
                    //citycode:"1",
                    hyou:hyou
                }
            }).done(function(json){
                console.log(json);
                console.log(JSON.parse(json["jsontext"]));
                resolve(json);
            }).fail(function(json){
                console.log("失敗!");
            });
        });
    };
    mysqlRead().then(function(json) {
        //console.log(json["jsontext"]);
        var target = 6;
        pyramidGraphFunc(JSON.parse(json["jsontext"]),target,cityCode,cityName,mapName);
        pyramidData.push({"cityCode":cityCode,"pyramidGets":JSON.parse(json["jsontext"])});
    })
}
//------------------------------------------------------------------------------
//人口ピラミッドその２
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
        "pointWidth":18,
        "pointPadding": 0,
        //borderWidth: 0
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
        pyramidGraph[cityName].series[0].setData(manGraphSeries["data"]);
        pyramidGraph[cityName].series[1].setData(womanGraphSeries["data"]);
        pyramidGraph[cityName].setTitle({text:cityName + "　" + yearLeft + "年"});
    }
}
//---------------------------------------------------------------------------------------------------------------
//人口推移その１
function funcResasZinkousuii(mapName,cityCode,cityName){
    var content = "";
    content += "<div id='resas-chart-suii-div-" + mapName + "-" + cityCode + "' class='resas-chart-suii-div'>";
    content += "</div>";
    mydialog({
        id:"resas-chart-suii-dialog-" + mapName + "-" + cityCode,
        class:"resas-chart-suii-dialog",
        map:mapName,
        title:"人口推移(RESAS)",
        content:content,
        top:"55px",
        right:"20px",
        //width:"400px",
        rmDialog:false,
        //hide:true,
        //minMax:true,
        rmDialog:true
    });
    console.log(resasZinkouAr[mapName]);

    if(resasZinkouAr[mapName]) {
        suiiFunc(resasZinkouAr[mapName], mapName, cityCode, cityName);
    }else{
        var resasUrl2 = "population/composition/perYear";
        var prefCode = cityCode.substring(0, 2);
        console.log(prefCode);
        var cityCode = cityCode;
        if(cityCode.length<3){
            cityCode = "-";
        }
        console.log(cityCode);

        $.ajax({
            type:"GET",
            url: resasUrl + resasUrl2,
            headers: {"X-API-KEY":resasKey},
            dataType:"json",
            data:{
                prefCode:prefCode,
                cityCode:cityCode
            }
        }).done(function(json){
            console.log(json);
            if(cityCode == "-"){
                cityCode = prefCode
            }
            suiiFunc(json, mapName, cityCode, cityName);
        }).fail(function(json){
            console.log('error!!!');
        });


    }
}
//---------------------------------------------------------------------------------------------------------------
//人口推移その２
function suiiFunc(resasZinkouAr,mapName,cityCode,cityName){
    if(resasZinkouAr.length>0) {
        var resasZinkou = resasZinkouAr.filter(function (item, index) {
            if (item.cityCode == cityCode) return true;
        });
        var zinkou = resasZinkou[0]["zinkou"];
    }else{
        var resasZinkou = resasZinkouAr
        var zinkou = resasZinkou["result"];
    }

    //console.log(resasZinkou[0]["zinkou"]["data"]);
    var nensyouAr = zinkou["data"][1]["data"];
    var seisanAr = zinkou["data"][2]["data"];
    var rounenAr = zinkou["data"][3]["data"];
    var souzinkouAr = zinkou["data"][0]["data"];

    var nensyouGraphDataAr = [];
    var seisanGraphDataAr = [];
    var rounenGraphDataAr = [];
    var souzinkouGraphDataAr = [];

    var timeAr = [];
    for (i=0; i<nensyouAr.length; i++){
        var rate = nensyouAr[i]["rate"];
        nensyouGraphDataAr.push(rate);
        var rate = seisanAr[i]["rate"];
        seisanGraphDataAr.push(rate);
        var rate = rounenAr[i]["rate"];
        rounenGraphDataAr.push(rate);
        var souzinkouValue = souzinkouAr[i]["value"];
        souzinkouGraphDataAr.push(souzinkouValue);
        var time = "'" + String(seisanAr[i]["year"]).slice(-2) + "年";
        timeAr.push(time);
    }
    //console.log(timeAr);
    var nensyouGraphSeries = {
        "yAxis":0,
        "name":"年少人口(%)",
        "data":nensyouGraphDataAr,
        "color":"green"
    };
    var seisanGraphSeries = {
        "yAxis":0,
        "name":"生産年齢人口(%)",
        "data":seisanGraphDataAr,
        "color":"skyblue"
    };
    var rounenGraphSeries = {
        "yAxis":0,
        "name":"老年人口(%)",
        "data":rounenGraphDataAr,
        "color":"#df4242"
    };
    var souzinkouGraphSeries = {
        "yAxis":1,
        "type":"column",
        "name":"総人口(人)",
        "data":souzinkouGraphDataAr,
        "color":"lightgrey"
    };

    suiiGraph[cityName] = Highcharts.chart({
        chart:{
            renderTo:"resas-chart-suii-div-" + mapName + "-" +  cityCode,
            type:"line",
            animation:true
            //aliginTicks:false
        },
        credits:{
            enabled:false
        },
        xAxis: {
            categories:timeAr,
            tickWidth: 0,
            gridLineWidth: 1,
            /*
            labels: {
                align: 'left',
                x: 3,
                y: -3
            }
            */
        },
        yAxis:[
            {//左
                title: {
                    text:null
                },
                labels:{
                    formatter: function() {
                        return Highcharts.numberFormat(Math.abs(this.value), 0) + "%";
                    }
                }
            },
            {//右
                title: {
                    text:null
                },
                labels:{
                    //formatter: function() {
                    //    return Highcharts.numberFormat(Math.abs(this.value), 0) + "%";
                   // }
                },
                opposite:true
            }
        ],
        plotOptions:{
            line:{
                dataLabels:{
                    enabled:true
                }
            }
        },
        title: {
            text:cityName + "　人口推移"
        },
        tooltip: {
            /*
            formatter: function(){
                return this.series.name +'　'+ this.point.category +'<br/>'+
                    '割合: '+ Highcharts.numberFormat(Math.abs(this.point.y), 0) + "%";
            },
            */
            shared: true,
            crosshairs: true
        },
        series: [
            souzinkouGraphSeries,
            nensyouGraphSeries,
            seisanGraphSeries,
            rounenGraphSeries
        ]
    });
}