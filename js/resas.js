var resasKey = "ZKE7BccwVM8e2onUYC7iX2tnuuZwZJfuOTf3rL93";
var resasUrl = "https://opendata.resas-portal.go.jp/api/v1/"
var resasLayermap1 = null;
var resasLayermap2 = null;
$(function(){
	$(".resas-a").click(function(){
        $.notify({//options
            message:"<div style='text-align:center;'><i class='fa fa-exclamation fa-fw'></i>RESAS人口構成連携機能は現在作成中です！！！！</div>"
        },{//settings
            type:"danger",
            z_index:999999,
            placement: {
                from:"bottom",
                align:"center"
            },
            animate: {
                enter:"animated fadeInDown",
                exit:"animated fadeOutUp"
            }
        });
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        //既に存在しているときは抜ける。
        if($("#mydialog-resas-dialog-" + mapName).length!=0){
            $("#mydialog-resas-dialog-" + mapName).show();
            eval(mapName).addLayer(eval("resasLayer" + mapName));
            return;
        }
        //$.blockUI({message:null});
        var content = "";
        content += "<select class='resas-pref-select'></select>";
        //content += "<select class='resas-table-select'></select>";
        content += "<select class='resas-zinkou-select'>";
        content += "<option value='0'>総人口</option>";
        content += "<option value='1'>年少人口</option>";
        content += "<option value='2'>生産年齢人口</option>";
        content += "<option value='3'>老年人口</option>";
        //content += "<option value='4'>年少人口割合</option>";
        //content += "<option value='5'>生産年齢人口割合</option>";
        //content += "<option value='6'>老年人口割合</option>";
        content += "</select>";
        content += "<div class='resas-year-div'></div>";
        content += "<div class='resas-tbl-div minmax-div'></div>";
        mydialog({
            id:"resas-dialog-" + mapName,
            class:"resas-dialog",
            map:mapName,
            title:"RESAS 作成中 現在完成度５０％程度",
            content:content,
            top:"55px",
            left:"20px",
            width:"400px",
            rmDialog:false,
            //hide:true,
            minMax:true
        });
        var option = "<option value=''>都道府県</option><option value='pref'>全国</option>";
        for(var i = 0; i <prefAr.length; i++){
            option += "<option value='" + prefAr[i]["id"] + "'>" + prefAr[i]["id"].substr(0,2) + "-" + prefAr[i]["name"] +  "</option>";
        }
        $("#" + mapName + " .resas-pref-select").html(option);
        $("#" + mapName + " .resas-pref-select").select2({
            width:"100px"
        });
        $("#" + mapName + " .resas-zinkou-select").select2({
            width:"180px"
        });
        //----------------------------------------------------------------------
        //都道府県を選択したとき
        $("#" + mapName + " .resas-pref-select").on("change",function() {

        });
	});
    //-----------------------------------------------------------------------------
    //都道府県を選択
    $("body").on("change",".resas-pref-select",function(){
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        var pref = $(this).val().substr(0,2);
        console.log(pref);
        var resasAjax = function(){
            return new Promise(function(resolve,reject){
                var prefcode = pref;
                var hyou = "zinkoukousei";
                $.ajax({
                    type:"GET",
                    url:"./php/resas-select.php",
                    dataType:"json",
                    data:{
                        prefcode:prefcode,
                        citycode:"",
                        hyou:hyou
                    }
                }).done(function(json){
                    resolve(json["jsontext"]);
                }).fail(function(json){
                    console.log("失敗!");
                });
            });
        };
        resasAjax().then(function(jsontext){
            var resasDataAr = JSON.parse(jsontext);
            console.log(resasDataAr);
            var cityCode = resasDataAr[0]["cityCode"];
            var cityName = resasDataAr[0]["cityName"];
            var boundaryYear = resasDataAr[0]["zinkou"]["boundaryYear"];
            var zinkoSelectedText = $("#" + mapName + " .resas-zinkou-select option:selected").text();
            var zinkoSelectedVal = $("#" + mapName + " .resas-zinkou-select").val();
            console.log(zinkoSelectedVal);

            console.log(boundaryYear);
            console.log(cityCode);
            console.log(cityName);
            var tblHtml = "<table class='resas-tbl table table-bordered table-hover tablesorter'>";
            tblHtml += "<thead><tr class='info'>";
            tblHtml += "<th></th>";
            tblHtml += "<th>コード</th>";
            tblHtml += "<th>自治体名</th>";
            tblHtml += "<th class='resas-kizyun-th'></th>";//基準年・・・boundaryYearから拾えないので後でDOMで書き換える。
            tblHtml += "<th class='resas-zinkou-th'></th>";//人口
            tblHtml += "<th class='resas-zougen-th'>増減</th>";//増減
            tblHtml += "<th class='resas-zougenritu-th'>増減率</th>";//増減率
            //tblHtml += "<th>年少人口</th>";
            //tblHtml += "<th>生産年齢<br>人口</th>";
            //tblHtml += "<th>老年人口</th>";
            tblHtml += "</tr></thead><tbody>";
            for (var i = 0; i < resasDataAr.length; i++) {
                if(resasDataAr[i]["zinkou"]) {
                    var yearAr = resasDataAr[i]["zinkou"]["data"][zinkoSelectedVal]["data"];
                    for (var j = 0; j < yearAr.length; j++) {
                        if (yearAr[j]["year"] < boundaryYear) {
                            if(yearAr[j + 1]) {
                                var boundaryYear2 = yearAr[j + 1]["year"];//実際に存在する年で基準年を取り直している。
                                var boundaryYearNum = j + 1;
                            }
                        }
                    }
                    var lastYearNum = resasDataAr[i]["zinkou"]["data"][zinkoSelectedVal]["data"].length-1;
                    var lastYear = resasDataAr[i]["zinkou"]["data"][zinkoSelectedVal]["data"][lastYearNum]["year"];
                    tblHtml += "<tr class='tr-" + resasDataAr[i]["cityCode"] + "'>";
                    tblHtml += "<td class='resas-lank-td'></td>";
                    tblHtml += "<td>" + resasDataAr[i]["cityCode"] + "</td>";
                    tblHtml += "<td class='resas-city-td'>" + resasDataAr[i]["cityName"] + "</td>";
                    if(resasDataAr[i]["zinkou"]["data"][zinkoSelectedVal]["data"][boundaryYearNum]) {
                        var kizyunZinkou = resasDataAr[i]["zinkou"]["data"][zinkoSelectedVal]["data"][boundaryYearNum]["value"];
                        tblHtml += "<td class='resas-kizyun-td'>" + kizyunZinkou + "</td>";//基準年
                    }else{
                        var kizyunZinkou = null;
                        tblHtml += "<td class='resas-kizyun-td'></td>";//基準年
                    }
                    var zinkou = resasDataAr[i]["zinkou"]["data"][zinkoSelectedVal]["data"][lastYearNum]["value"];
                    tblHtml += "<td class='resas-zinkou-td'>" + zinkou + "</td>";//総人口
                    if(kizyunZinkou) {
                        var zougen = zinkou - kizyunZinkou;
                        var zougenritu = Math.floor(zinkou/kizyunZinkou*10000)/100 + "%";
                    }else{
                        var zougen = "";
                        var zougenritu = "";
                    }
                    tblHtml += "<td class='resas-zougen-td'>" + zougen + "</td>";//増減
                    tblHtml += "<td class='resas-zougenritu-td'>" + zougenritu + "</td>";//増減率


                    //tblHtml += "<td class='resas-nensyou-td'>" + resasDataAr[i]["zinkou"]["data"][1]["data"][lastYearNum]["value"] + "</td>";//年少人口
                    //tblHtml += "<td class='resas-seisan-td'>" + resasDataAr[i]["zinkou"]["data"][2]["data"][lastYearNum]["value"] + "</td>";//生産年齢人口
                    //tblHtml += "<td class='resas-rounen-td'>" + resasDataAr[i]["zinkou"]["data"][3]["data"][lastYearNum]["value"] + "</td>";//老年人口
                    tblHtml += "</tr>";
                }
            }
            tblHtml += "</tbody></table>";
            $("#" + mapName + " .resas-tbl-div").html(tblHtml);
            $("#" + mapName + " .resas-tbl-div .resas-kizyun-th").text(boundaryYear2 + zinkoSelectedText);
            $("#" + mapName + " .resas-tbl-div .resas-zinkou-th").text(lastYear + zinkoSelectedText);
            funcHaikeiTblDivHeight();
        });
    });
    //-----------------------------------------------------------------------------
    //総人口、年少人口等々を選択
    $("body").on("change",".resas-zinkou-select",function(){
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        $("#" + mapName + " .resas-pref-select").change();
    });



	//------------------------------------------------------------------------------------------------------------------
	function resasTableCreate(mapName,val){

    }
});
