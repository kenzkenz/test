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


        /*
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
        }
        */
        //alert(999)
    };

});