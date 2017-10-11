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
function funcEstatPyramid(mapName,estatCode,areaCode,areaName,json){
    var status = json["GET_STATS_DATA"]["RESULT"]["STATUS"];
    console.log(status);
    if(status!=0){
        alert(json["GET_STATS_DATA"]["RESULT"]["ERROR_MSG"]);
        return;
    }
    var content = "";
    content += "<div id='estat-chart-pyramid-div-" + mapName + "-" + estatCode + areaCode + "' class='estat-chart-pyramid-div'>";
    content += "</div>";
    var title = "";
    if(estatCode==="T000573") {
        title = "人口ピラミッド(e-stat H22国勢調査 年齢5歳階級)"
    }else{
        title = "人口ピラミッド(e-stat H17国勢調査 年齢5歳階級)"
    }
    mydialog({
        id:"estat-chart-pyramid-dialog-" + mapName + "-" + estatCode + areaCode,
        class:"estat-chart-pyramid-dialog",
        map:mapName,
        title:title,
        content:content,
        top:"55px",
        right:"20px",
        //width:"400px",
        rmDialog:false,
        //hide:true,
        //minMax:true,
        rmDialog:true
    });
    estatPyramidGraphFunc(json,estatCode,areaCode,areaName,mapName);
}
//------------------------------------------------------------------------------
//人口ピラミッドその２
function estatPyramidGraphFunc(json,estatCode,areaCode,areaName,mapName){
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
    console.log(valueArr);

    //T000573022,男０～４歳
    //T000573036,男７０～７４歳
    //T000573040,男７５歳以上
    var manGraphAr0 = [];
    var manGraphSeries = null;
    var womanGraphAr0 = [];
    var womanGraphSeries = null;
    console.log(estatCode);
    if(estatCode==="T000573") {//平成22年度
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
        var womanCat = [
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
        var jinkou = valueArr[0]["$"];
        var jinkouman = valueArr[20]["$"];
        var jinkouwoman = valueArr[40]["$"];
        var heikin = null;
        var heikinMan = null;
        var heikinWoman = null;
    }else if(estatCode==="T000051") {//平成17年度
        var manCat = [
            estatCode + "024",
            estatCode + "025",
            estatCode + "026",
            estatCode + "027",
            estatCode + "028",
            estatCode + "029",
            estatCode + "030",
            estatCode + "031",
            estatCode + "032",
            estatCode + "033",
            estatCode + "034",
            estatCode + "035",
            estatCode + "036",
            estatCode + "037",
            estatCode + "038",
            estatCode + "043"
        ];
        var womanCat =[
            estatCode + "046",
            estatCode + "047",
            estatCode + "048",
            estatCode + "049",
            estatCode + "050",
            estatCode + "051",
            estatCode + "052",
            estatCode + "053",
            estatCode + "054",
            estatCode + "055",
            estatCode + "056",
            estatCode + "057",
            estatCode + "058",
            estatCode + "059",
            estatCode + "060",
            estatCode + "065"
        ];
        var jinkou = valueArr[0]["$"];
        var jinkouman = valueArr[22]["$"];
        var jinkouwoman = valueArr[44]["$"];
        var heikin = Math.floor((Number(valueArr[21]["$"]) / Number(valueArr[0]["$"]))*10)/10;
        var heikinMan = Math.floor((Number(valueArr[43]["$"]) / Number(valueArr[22]["$"]))*10)/10;
        var heikinWoman = Math.floor((Number(valueArr[65]["$"]) / Number(valueArr[44]["$"]))*10)/10;
    }
    console.log(jinkou);
    console.log(jinkouman);
    console.log(heikin);
    console.log(heikinMan);
    console.log(heikinWoman);

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
            renderTo:"estat-chart-pyramid-div-" + mapName + "-" + estatCode + areaCode,
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
            //text:"平均:" + heikin + "歳(男:" + heikinMan + "歳・女:" + heikinWoman + "歳）人口:" + jinkou + "人(男:" + jinkouman + "人・女:" + jinkouwoman + "人)"
            //text:"人口:" + jinkou + "人(男:" + jinkouman + "人・女:" + jinkouwoman + "人)"
            text:"人口:" + jinkou + "人(男:" + jinkouman + "人・女:" + jinkouwoman + "人)<br>平均:" + heikin + "歳(男:" + heikinMan + "歳・女:" + heikinWoman + "歳）"
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
        content += "<input type='hidden' class='pyramid-keycode' value='" + areaCode + "'>";
    mydialog({
        id:"estat-H27-chart-pyramid-dialog-" + mapName + "-" + areaCode,
        class:"estat-chart-pyramid-dialog",
        map:mapName,
        title:"人口ピラミッド(e-stat H27国勢調査 年齢5歳階級)",
        content:content,
        top:"55px",
        right:"20px",
        //width:"400px",
        rmDialog:false,
        //hide:true,
        //minMax:true,
        rmDialog:true,
        download:true
    });
    estatH27PyramidGraphFunc(json,areaCode,areaName,mapName);
}
//------------------------------------------------------------------------------
//H27人口ピラミッドその２
function estatH27PyramidGraphFunc(json,areaCode,areaName,mapName){
    console.log(json);
    var azaName = json["cityname"] + json["ooazaname"] + json["azaname"];
    var heikin = Math.floor(Number(json["heikin"])*10)/10;
    console.log(heikin);
    var heikinMan = Math.floor(Number(json["heikinman"])*10)/10;
    var heikinWoman = Math.floor(Number(json["heikinwoman"])*10)/10;
    var jinkou = json["jinkou"];
    var jinkouman = json["jinkouman"];
    var jinkouwoman = json["jinkouwoman"];

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
            //text:"平均:" + heikin + "歳(男:" + heikinMan + "歳・女:" + heikinWoman + "歳）人口:" + jinkou + "人(男:" + jinkouman + "人・女:" + jinkouwoman + "人)"
            text:"人口:" + jinkou + "人(男:" + jinkouman + "人・女:" + jinkouwoman + "人)<br>平均:" + heikin + "歳(男:" + heikinMan + "歳・女:" + heikinWoman + "歳）"
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
$(function() {
    $("body").on("click",".dialog-download",function() {
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        console.log(mapName);
        var areaCode = $("#" + mapName + " .pyramid-keycode").val();
        console.log(areaCode);
        var citycode = areaCode.substr(0,5);
        var azacode = areaCode.substr(5,6);
        $.ajax({
            type:"get",
            url:"php/syoutiiki-select.php",
            dataType:"json",
            data:{
                citycode:citycode,
                azacode:azacode
            }
        }).done(function(json){
            console.log(json);
            var content = "";
                content += "市区町村コード,町丁字コード,地域識別番号,秘匿処理,秘匿先情報,合算地域,";
                content += "都道府県名,市区町村名,大字・町名,字・丁目名,";
                content += "総数,0～4歳,5～9歳,10～14歳,15～19歳,20～24歳,25～29歳,30～34歳,35～39歳,40～44歳,45～49歳,50～54歳,55～59歳,60～64歳,65～69歳,70～74歳,75～79歳,80～84歳,85～89歳,90～94歳,95～99歳,100歳以上,年齢「不詳」,総年齢,平均年齢,15歳未満,15～64歳,65歳以上,75歳以上,85歳以上,外国人,";
                content += "男総数,男0～4歳,男5～9歳,男10～14歳,男15～19歳,男20～24歳,男25～29歳,男30～34歳,男35～39歳,男40～44歳,男45～49歳,男50～54歳,男55～59歳,男60～64歳,男65～69歳,男70～74歳,男75～79歳,男80～84歳,男85～89歳,男90～94歳,男95～99歳,男100歳以上,男年齢「不詳」,男総年齢,男平均年齢,男15歳未満,男15～64歳,男65歳以上,男75歳以上,男85歳以上,男外国人,";
                content += "女総数,女0～4歳,女5～9歳,女10～14歳,女15～19歳,女20～24歳,女25～29歳,女30～34歳,女35～39歳,女40～44歳,女45～49歳,女50～54歳,女55～59歳,女60～64歳,女65～69歳,女70～74歳,女75～79歳,女80～84歳,女85～89歳,女90～94歳,女95～99歳,女100歳以上,女年齢「不詳」,女総年齢,女平均年齢,女15歳未満,女15～64歳,女65歳以上,女75歳以上,女85歳以上,女外国人";

                content += "\n";

                content += json["citycode"] + ",";
                content += json["azacode"] + ",";
                content += json["sikibetu"] + ",";
                content += json["hitoku"] + ",";
                content += json["hitokusaki"] + ",";
                content += json["gassann"] + ",";

                content += json["prefname"] + ",";
                content += json["cityname"] + ",";
                content += json["ooazaname"] + ",";
                content += json["azaname"] + ",";
                content += json["s00"] + ",";
                content += json["s01"] + ",";
                content += json["s02"] + ",";
                content += json["s03"] + ",";
                content += json["s04"] + ",";
                content += json["s05"] + ",";
                content += json["s06"] + ",";
                content += json["s07"] + ",";
                content += json["s08"] + ",";
                content += json["s09"] + ",";
                content += json["s10"] + ",";
                content += json["s11"] + ",";
                content += json["s12"] + ",";
                content += json["s13"] + ",";
                content += json["s14"] + ",";
                content += json["s15"] + ",";
                content += json["s16"] + ",";
                content += json["s17"] + ",";
                content += json["s18"] + ",";
                content += json["s19"] + ",";
                content += json["s20"] + ",";
                content += json["s21"] + ",";
                content += json["s22"] + ",";
                content += json["s23"] + ",";
                content += json["s24"] + ",";
                content += json["s25"] + ",";
                content += json["s26"] + ",";
                content += json["s27"] + ",";
                content += json["s28"] + ",";
                content += json["s29"] + ",";
                content += json["s30"] + ",";

                content += json["m00"] + ",";
                content += json["m01"] + ",";
                content += json["m02"] + ",";
                content += json["m03"] + ",";
                content += json["m04"] + ",";
                content += json["m05"] + ",";
                content += json["m06"] + ",";
                content += json["m07"] + ",";
                content += json["m08"] + ",";
                content += json["m09"] + ",";
                content += json["m10"] + ",";
                content += json["m11"] + ",";
                content += json["m12"] + ",";
                content += json["m13"] + ",";
                content += json["m14"] + ",";
                content += json["m15"] + ",";
                content += json["m16"] + ",";
                content += json["m17"] + ",";
                content += json["m18"] + ",";
                content += json["m19"] + ",";
                content += json["m20"] + ",";
                content += json["m21"] + ",";
                content += json["m22"] + ",";
                content += json["m23"] + ",";
                content += json["m24"] + ",";
                content += json["m25"] + ",";
                content += json["m26"] + ",";
                content += json["m27"] + ",";
                content += json["m28"] + ",";
                content += json["m29"] + ",";
                content += json["m30"] + ",";

                content += json["w00"] + ",";
                content += json["w01"] + ",";
                content += json["w02"] + ",";
                content += json["w03"] + ",";
                content += json["w04"] + ",";
                content += json["w05"] + ",";
                content += json["w06"] + ",";
                content += json["w07"] + ",";
                content += json["w08"] + ",";
                content += json["w09"] + ",";
                content += json["w10"] + ",";
                content += json["w11"] + ",";
                content += json["w12"] + ",";
                content += json["w13"] + ",";
                content += json["w14"] + ",";
                content += json["w15"] + ",";
                content += json["w16"] + ",";
                content += json["w17"] + ",";
                content += json["w18"] + ",";
                content += json["w19"] + ",";
                content += json["w20"] + ",";
                content += json["w21"] + ",";
                content += json["w22"] + ",";
                content += json["w23"] + ",";
                content += json["w24"] + ",";
                content += json["w25"] + ",";
                content += json["w26"] + ",";
                content += json["w27"] + ",";
                content += json["w28"] + ",";
                content += json["w29"] + ",";
                content += json["w30"] + "\n";

            // Unicodeコードポイントの配列に変換する
            var unicode_array = str_to_unicode_array(content);
            // SJISコードポイントの配列に変換
            var sjis_code_array = Encoding.convert(
                unicode_array, // ※文字列を直接渡すのではない点に注意
                'SJIS',  // to
                'UNICODE' // from
            );
            // 文字コード配列をTypedArrayに変換する
            var uint8_array = new Uint8Array( sjis_code_array );

            var type = "text/csv";
            //var blob = new Blob([content], {type: type});
            var blob = new Blob([uint8_array], {type: type});

            $(".pyramid-save-a").remove();
            $("body").append("<a class='pyramid-save-a'></a>");

            $(".pyramid-save-a").attr({
                "href": window.URL.createObjectURL(blob),
                "download":"pyramid.csv"
            });
            $(".pyramid-save-a")[0].click();//[0]が肝

        }).fail(function(){
            console.log("失敗!");
        });

    })
});


//---------------------------------------------------------------------------------------------------------------
//国勢調査小地域の人口推移その１
function funcSyoutiikiZinkousuii(mapName,prefCode,areaCode,areaName){

    console.log(mapName,prefCode,areaCode,areaName);

    var content = "";
    content += "<div id='syoutiiki-chart-suii-div-" + mapName + "-" + areaCode + "' class='syoutiiki-chart-suii-div'>";
    content += "</div>";
    mydialog({
        id:"syoutiiki-chart-suii-dialog-" + mapName + "-" + areaCode,
        class:"syoutiiki-chart-suii-dialog",
        map:mapName,
        title:"人口推移",
        content:content,
        top:"55px",
        right:"20px",
        //width:"400px",
        rmDialog:false,
        //hide:true,
        //minMax:true,
        rmDialog:true
    });

    var tgtUrl = "http://api.e-stat.go.jp/rest/2.1/app/json/getStatsData?";
    var estatCodeAr = ["T000051","T000573"];//17年度　22年度の順
    var suiiAjax = [];

    for(var i = 0; i < estatCodeAr.length; i++) {
        suiiAjax[i] = new Promise(function (resolve, reject) {
            $.ajax({
                type: "get",
                url: "php/proxy-estat-syoutiiki.php",
                dataType: "json",
                data: {
                    tgtUrl: tgtUrl,
                    statsDataId: estatCodeAr[i] + prefCode,
                    cdArea: areaCode
                    //cntGetFlg:"Y"
                }
            }).done(function (json) {
                //console.log(json);
                resolve(json);
            }).fail(function () {
                console.log("失敗!");
            });
        });
    }

    suiiAjax[2] = new Promise(function (resolve, reject) {
        var citycode = areaCode.substr(0, 5);
        var azacode = areaCode.substr(5, 6);
        $.ajax({
            type: "get",
            url: "php/syoutiiki-select.php",
            dataType: "json",
            data: {
                citycode: citycode,
                azacode: azacode
            }
        }).done(function (json) {
            //console.log(json);
            resolve(json);
        }).fail(function () {
            console.log("失敗!");
        });
    });

    Promise.all(suiiAjax).then(function (results) {
        console.log(results);
        console.log("完了");
        syoutiikiSuiiFunc(results,mapName,areaCode,areaName)
    });
}
//---------------------------------------------------------------------------------------------------------------
//国勢調査小地域の人口推移その２
function syoutiikiSuiiFunc(results,mapName,areaCode,areaName){
    console.log(results,mapName,areaCode,areaName);
    var nensyouAr = [];
    var seisanAr = [];
    var rounenAr = [];
    var souzinkouAr = [];
    var timeAr = [];
    for(var i = 0; i < results.length; i++) {

        if(results[i]["json"]) {
            console.log(results[i]["json"]["GET_STATS_DATA"]["STATISTICAL_DATA"]);
            console.log();

            if(results[i]["json"]["GET_STATS_DATA"]["STATISTICAL_DATA"]["DATA_INF"]) {
                var values = results[i]["json"]["GET_STATS_DATA"]["STATISTICAL_DATA"]["DATA_INF"]["VALUE"];
            }else{
                alert("地区割の変更があったため人口推移を作れません。");
                return;
            }
            console.log(values);
            if (i === 0) {
                console.log(values[16]);
                nensyouAr.push(values[16]["$"]);
                seisanAr.push(values[17]["$"]);
                rounenAr.push(values[18]["$"]);
                souzinkouAr.push(values[0]["$"]);
            } else {
                console.log(values[16]);
                nensyouAr.push(values[16]["$"]);
                seisanAr.push(values[17]["$"]);
                rounenAr.push(values[18]["$"]);
                souzinkouAr.push(values[0]["$"]);
            }
            var estatCode = values[0]["@cat01"];
            console.log(estatCode);
            if(estatCode==="T000051001") {
                timeAr.push("H17年");
            }else if(estatCode==="T000573001"){
                timeAr.push("H22年");
            }
        }else{
            nensyouAr.push(results[i]["s25"]);
            seisanAr.push(results[i]["s26"]);
            rounenAr.push(results[i]["s27"]);
            souzinkouAr.push(results[i]["s00"]);
            timeAr.push("H27年");
        }

    }

    console.log(nensyouAr,seisanAr,rounenAr,souzinkouAr,timeAr);

    var nensyouGraphDataAr = [];
    var seisanGraphDataAr = [];
    var rounenGraphDataAr = [];
    var souzinkouGraphDataAr = [];

    for (i=0; i<nensyouAr.length; i++){
        var rate = Math.floor(Number(nensyouAr[i])/Number(souzinkouAr[i])*1000)/10;
        nensyouGraphDataAr.push(rate);
        var rate = Math.floor(Number(seisanAr[i])/Number(souzinkouAr[i])*1000)/10;
        seisanGraphDataAr.push(rate);
        var rate = Math.floor(Number(rounenAr[i])/Number(souzinkouAr[i])*1000)/10;
        rounenGraphDataAr.push(rate);
        var souzinkouValue = Number(souzinkouAr[i]);
        souzinkouGraphDataAr.push(souzinkouValue);
    }
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

    suiiGraph[areaCode] = Highcharts.chart({
        chart:{
            renderTo:"syoutiiki-chart-suii-div-" + mapName + "-" +  areaCode,
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
            text:areaName
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