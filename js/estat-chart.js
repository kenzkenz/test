$(function() {
    var dialogId = 0;
    //-----------------------------------------------------------------------------
    //グラフ
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


//----------------------------------------------------------------------------------------------------------------------
//人口ピラミッドその１
function funcEstatPyramid(mapName,areaCode,areaName,json){

    var status = json["GET_STATS_DATA"]["RESULT"]["STATUS"];
    console.log(status);

    if(status!=0){
        alert(json["GET_STATS_DATA"]["RESULT"]["ERROR_MSG"]);
        return;
    }

    var content = "";
    content += "<div id='estat-chart-pyramid-div-" + mapName + "-" + areaCode + "' class='estat-chart-pyramid-div'>";
    content += "</div>";
    mydialog({
        id:"estat-chart-pyramid-dialog-" + mapName + "-" + areaCode,
        class:"estat-chart-pyramid-dialog",
        map:mapName,
        title:"人口ピラミッド(e-stat H22国勢調査)",
        content:content,
        top:"55px",
        right:"20px",
        //width:"400px",
        rmDialog:false,
        //hide:true,
        //minMax:true,
        rmDialog:true
    });
    //var areaName = "kkkkkkk";
    estatPyramidGraphFunc(json,areaCode,areaName,mapName);
}
//------------------------------------------------------------------------------
//人口ピラミッドその２
function estatPyramidGraphFunc(json,areaCode,areaName,mapName){
    console.log(json);
    console.log(json["GET_STATS_DATA"]);
    console.log(json["GET_STATS_DATA"]["RESULT"]);
    var status = json["GET_STATS_DATA"]["RESULT"]["STATUS"];
    console.log(status);

    if(status!=0){
        alert(json["GET_STATS_DATA"]["RESULT"]["ERROR_MSG"]);
        return;
    }

    console.log(json["GET_STATS_DATA"]["STATISTICAL_DATA"]);

    var azaName = json["GET_STATS_DATA"]["STATISTICAL_DATA"]["CLASS_INF"]["CLASS_OBJ"][2]["CLASS"]["@name"];
    console.log(azaName);

   //console.log(json["GET_STATS_DATA"]["STATISTICAL_DATA"]["DATA_INF"]);
    // console.log(json["GET_STATS_DATA"]["STATISTICAL_DATA"]["DATA_INF"]["VALUE"]);

    var valueArr = json["GET_STATS_DATA"]["STATISTICAL_DATA"]["DATA_INF"]["VALUE"];

    //T000573022,男０～４歳
    //T000573036,男７０～７４歳
    //T000573040,男７５歳以上
    var manGraphAr0 = [];
    var manGraphSeries = null;
    var womanGraphAr0 = [];
    var womanGraphSeries = null;

    var manCat = [
                "T000573022",
                "T000573023",
                "T000573024",
                "T000573025",
                "T000573026",
                "T000573027",
                "T000573028",
                "T000573029",
                "T000573030",
                "T000573031",
                "T000573032",
                "T000573033",
                "T000573034",
                "T000573035",
                "T000573036",
                "T000573040"
    ];
    var womanCat =[
                "T000573042",
                "T000573043",
                "T000573044",
                "T000573045",
                "T000573046",
                "T000573047",
                "T000573048",
                "T000573049",
                "T000573050",
                "T000573051",
                "T000573052",
                "T000573053",
                "T000573054",
                "T000573055",
                "T000573056",
                "T000573060"
    ];

    for (i=0; i<valueArr.length; i++) {
        var cat01 = valueArr[i]["@cat01"];
        var value = valueArr[i]["$"];
        if(manCat.indexOf(cat01)!=-1) {
            //console.log(value);
            if(value==="-") value = 0;
            value = -Number(value);
            //console.log(value);
            manGraphAr0.push(value);
        }
        if(womanCat.indexOf(cat01)!=-1) {
            //console.log(value);
            if(value==="-") value = 0;
            value = Number(value);
            //console.log(value);
            womanGraphAr0.push(value);
        }
    }
    console.log(manGraphAr0);
    console.log(womanGraphAr0);
    //console.log(leftGraphData);
    /*
    for (i=0; i<leftGraphData.length; i++){
        var value = -leftGraphData[i]["man"];
        manGraphAr0.push(value);
        var value = leftGraphData[i]["woman"];
        womanGraphAr0.push(value);
    }
    */
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
        '70-74', '75-'
    ];
    pyramidGraph[areaCode] = Highcharts.chart({
        chart:{
            //renderTo:"pyramidGraphDiv_" + mapName + cityCode,
            renderTo:"estat-chart-pyramid-div-" + mapName + "-" +  areaCode,
            type:"bar",
            animation:true,
            //aliginTicks:false
        },
        title: {
            //text:mapElement.find(".resasPrefSelect option:selected").text() + "　"  + mapElement.find(".zinkouSelect option:selected").text(),
            //text:areaName
            text:azaName
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
}
//----------------------------------------------------------------------------------------------------------------------
//H27人口ピラミッドその１
function funcEstatH27Pyramid(mapName,areaCode,areaName,json){
    var content = "";
    content += "<div id='estat-H27-chart-pyramid-div-" + mapName + "-" + areaCode + "' class='estat-chart-pyramid-div'>";
    content += "</div>";
    mydialog({
        id:"estat-H27-chart-pyramid-dialog-" + mapName + "-" + areaCode,
        class:"estat-chart-pyramid-dialog",
        map:mapName,
        title:"人口ピラミッド(e-stat H27国勢調査)",
        content:content,
        top:"55px",
        right:"20px",
        //width:"400px",
        rmDialog:false,
        //hide:true,
        //minMax:true,
        rmDialog:true
    });

    estatH27PyramidGraphFunc(json,areaCode,areaName,mapName);
}
//------------------------------------------------------------------------------
//H27人口ピラミッドその２
function estatH27PyramidGraphFunc(json,areaCode,areaName,mapName){
    console.log(json);
    var azaName = json["cityname"] + json["ooazaname"] + json["azaname"];
    var heikin = Math.floor(Number(json["heikin"])*100)/100;
    console.log(heikin);
    var heikinMan = Math.floor(Number(json["heikinman"])*100)/100;
    var heikinWoman = Math.floor(Number(json["heikinwoman"])*100)/100;
    var manGraphAr0 = [];
    var manGraphSeries = null;
    var womanGraphAr0 = [];
    var womanGraphSeries = null;

    var manCat = [
        "m01",
        "m02",
        "m03",
        "m04",
        "m05",
        "m06",
        "m07",
        "m08",
        "m09",
        "m10",
        "m11",
        "m12",
        "m13",
        "m14",
        "m15",
        //"m16",
        //"m17",
        //"m18",
        //"m19",
        //"m20",
        //"m21"
        "m28"
    ];
    var womanCat =[
        "w01",
        "w02",
        "w03",
        "w04",
        "w05",
        "w06",
        "w07",
        "w08",
        "w09",
        "w10",
        "w11",
        "w12",
        "w13",
        "w14",
        "w15",
        //"w16",
        //"w17",
        //"w18",
        //"w19",
        //"w20",
        //"w21"
        "w28"
    ];
    for (i=0; i<manCat.length; i++) {
        var key = manCat[i];
        var value = json[key];
        if(value==="-") value = 0;
        value = - Number(value);
        manGraphAr0.push(value);
    }
    for (i=0; i<womanCat.length; i++) {
        var key = womanCat[i];
        var value = json[key];
        if(value==="-") value = 0;
        value = Number(value);
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
    }
    /*
    var categories = [
        '0-4', '5-9', '10-14', '15-19',
        '20-24', '25-29', '30-34', '35-39', '40-44',
        '45-49', '50-54', '55-59', '60-64', '65-69',
        '70-74', '75-89', '80-84', '85-89', '90-94', '95-99', '100-'
    ];
    */
    var categories = [
        '0-4', '5-9', '10-14', '15-19',
        '20-24', '25-29', '30-34', '35-39', '40-44',
        '45-49', '50-54', '55-59', '60-64', '65-69',
        '70-74', '75-'
    ];
    pyramidGraph[areaCode + "H27"] = Highcharts.chart({
        chart:{
            //renderTo:"pyramidGraphDiv_" + mapName + cityCode,
            renderTo:"estat-H27-chart-pyramid-div-" + mapName + "-" +  areaCode,
            type:"bar",
            animation:true,
            //aliginTicks:false
        },
        title: {
            //text:mapElement.find(".resasPrefSelect option:selected").text() + "　"  + mapElement.find(".zinkouSelect option:selected").text(),
            //text:areaName
            text:azaName
            //x: -20 //center
        },
        subtitle: {
            text:"平均年齢:" + heikin + "歳(男:" + heikinMan + "歳・女:" + heikinWoman + "歳）"
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
}