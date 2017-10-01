
//----------------------------------------------------------------------------------------------------------------------
//選挙区人口ピラミッドその１
function funcSenkyokuPyramid(mapName,senkyokuCode,senkyokuName){
    console.log(mapName,senkyokuCode,senkyokuName);
    var content = "";
        content += "<div id='senkyoku-chart-pyramid-div-" + mapName + "-" + senkyokuCode + "' class='senkyoku-chart-pyramid-div'>";
        content += "</div>";
        content += "<input type='hidden' class='pyramid-keycode' value='" + senkyokuCode + "'>";
    mydialog({
        id:"estat-H27-chart-pyramid-dialog-" + mapName + "-" + senkyokuCode,
        class:"estat-chart-pyramid-dialog",
        map:mapName,
        title:"人口ピラミッド(H27国勢調査 年齢5歳階級)",
        content:content,
        top:"55px",
        right:"20px",
        //width:"400px",
        rmDialog:false,
        //hide:true,
        //minMax:true,
        rmDialog:true,
        //download:true
    });
    senkyokuPyramidGraphFunc(mapName,senkyokuCode,senkyokuName);
}
//------------------------------------------------------------------------------
//選挙区ピラミッドその２
function senkyokuPyramidGraphFunc(mapName,senkyokuCode,senkyokuName){
    if(mapName==="map1") {
        var json = senkyokuPyramidJson1;
    }else{
        var json = senkyokuPyramidJson2;
    }
    var senkyokuName = senkyokuName;

    var heikin = json["総数_平均年齢"];
    console.log(heikin);
    var heikinMan = json["男_平均年齢"];
    console.log(heikinMan);
    var heikinWoman = json["女_平均年齢"];
    console.log(heikinWoman);
    var jinkou = json["総数_総数（年齢）"].toLocaleString();
    console.log(jinkou);
    var jinkouman = json["男_総数（年齢）"].toLocaleString();
    console.log(jinkouman);
    var jinkouwoman = json["女_総数（年齢）"].toLocaleString();
    console.log(jinkouwoman);
    console.log(json);

    var manGraphAr0 = [];
    var manGraphSeries = null;
    var womanGraphAr0 = [];
    var womanGraphSeries = null;

    var manCat = [
        "男_0〜4歳",
        "男_5〜9歳",
        "男_10〜14歳",
        "男_15〜19歳",
        "男_20〜24歳",
        "男_25〜29歳",
        "男_30〜34歳",
        "男_35〜39歳",
        "男_40〜44歳",
        "男_45〜49歳",
        "男_50〜54歳",
        "男_55〜59歳",
        "男_60〜64歳",
        "男_65〜69歳",
        "男_70〜74歳",
        //"m16",
        //"m17",
        //"m18",
        //"m19",
        //"m20",
        //"m21"
        "男_（再掲）75歳以上"
    ];
    var womanCat =[
        "女_0〜4歳",
        "女_5〜9歳",
        "女_10〜14歳",
        "女_15〜19歳",
        "女_20〜24歳",
        "女_25〜29歳",
        "女_30〜34歳",
        "女_35〜39歳",
        "女_40〜44歳",
        "女_45〜49歳",
        "女_50〜54歳",
        "女_55〜59歳",
        "女_60〜64歳",
        "女_65〜69歳",
        "女_70〜74歳",
        //"m16",
        //"m17",
        //"m18",
        //"m19",
        //"m20",
        //"m21"
        "女_（再掲）75歳以上"
    ];
    for (i=0; i<manCat.length; i++) {
        var key = manCat[i];
        var value = json[key];
        if(value==="-") value = 0;
        value = - Number(value);
        manGraphAr0.push(value);
    }
    console.log(manGraphAr0);
    for (i=0; i<womanCat.length; i++) {
        var key = womanCat[i];
        var value = json[key];
        if(value==="-") value = 0;
        value = Number(value);
        womanGraphAr0.push(value);
    }
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
    pyramidGraph[senkyokuCode] = Highcharts.chart({
        chart:{
            //renderTo:"pyramidGraphDiv_" + mapName + cityCode,
            renderTo:"senkyoku-chart-pyramid-div-" + mapName + "-" +  senkyokuCode,
            type:"bar",
            animation:true,
            //aliginTicks:false
        },
        title: {
            //text:mapElement.find(".resasPrefSelect option:selected").text() + "　"  + mapElement.find(".zinkouSelect option:selected").text(),
            //text:areaName
            text:senkyokuName
            //x: -20 //center
        },
        subtitle: {
            text:"平均:" + heikin + "歳(男:" + heikinMan + "歳・女:" + heikinWoman + "歳）<br>人口:" + jinkou + "人(男:" + jinkouman + "人・女:" + jinkouwoman + "人)"
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
/*
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
                content += json["oosenkyokuName"] + ",";
                content += json["senkyokuName"] + ",";
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

 */