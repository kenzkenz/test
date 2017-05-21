$(function(){
    //--------------------------------------------------------------------------
    //メニューボタン
    $(".menu-btn").click(function () {
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        var content = "";
        content += "<input type='checkbox' data-toggle='toggle' class='weather-toggle bs-toggle'>：<a class='hidden-div-open'>最新の気象データ</a>";
        content += "<div class='hidden-div hidden-div-weather'>";
        content += "出典：<a href='http://www.data.jma.go.jp/obd/stats/data/mdrr/docs/csv_dl_readme.html' target='_blank'>気象庁</a>";
        content += "　<a href='https://github.com/mq-sol/amedas' target='_blank'>geojson</a>";
        content += "<select class='weather-select'>";
        content += "<option value='00'>選択してください。</option>";
        content += "<option value='pre_rct/alltable/pre1h00'>1時間降水量</option>";
        content += "<option value='pre_rct/alltable/pre3h00'>3時間降水量</option>";
        content += "<option value='pre_rct/alltable/pre24h00'>24時間降水量</option>";
        content += "<option value='pre_rct/alltable/pre48h00'>48時間降水量</option>";
        content += "<option value='pre_rct/alltable/pre72h00'>72時間降水量</option>";
        content += "<option value='tem_rct/alltable/mxtemsadext00'>今日の最高気温</option>";
        content += "<option value='tem_rct/alltable/mntemsadext00'>今日の最低気温</option>";
        content += "<option value='wind_rct/alltable/mxwsp00'>今日の最大風速</option>";
        content += "<option value='wind_rct/alltable/gust00'>今日の最大瞬間風速</option>";
        content += "</select></div>";
        content += "<hr class='my-hr'>";
        content += "<input type='checkbox' data-toggle='toggle' class='swipe-toggle bs-toggle'>：<a class='hidden-div-open'>画面スワイプ</a>";
        content += "<div class='hidden-div'>";
        content += "分割方法を設定します。<br>";
        content += "　<label><input type='radio' name='swipe-radio-" + mapName + "' value='horizontal' checked> 横分割</label>";
        content += "　<label><input type='radio' name='swipe-radio-" + mapName + "' value='vertival'> 縦分割</label></div>";
        content += "<hr class='my-hr'>";
        content += "<input type='checkbox' data-toggle='toggle' class='wiki-toggle bs-toggle'>：<a class='hidden-div-open'>Wikimedia Commons</a>";
        content += "<div class='hidden-div'>";
        content += "ウィキメディア・コモンズに投稿された写真を表示します。</div>";
        content += "<hr class='my-hr'>";
        content += "<input type='checkbox' data-toggle='toggle' class='flood-toggle bs-toggle'>：<a class='hidden-div-open'>海面上昇シミュレーション</a>";
        content += "<div class='hidden-div'>";
        content += "スライダーの最大値を設定します。";
        content += "<select class='flood-select'>";
        content += "<option value='100'>最大値100メートル</option>";
        content += "<option value='200'>最大値200メートル</option>";
        content += "<option value='1000'>最大値1000メートル</option>";
        content += "<option value='2000'>最大値2000メートル</option>";
        content += "<option value='4000'>最大値4000メートル</optionvalue>";
        content += "</select></div>";
        content += "<hr class='my-hr'>";
        content += "<input type='checkbox' data-toggle='toggle' class='rotate-toggle bs-toggle' checked>：<a class='hidden-div-open'>スマホ2D時回転ロック</a>";
        content += "<div class='hidden-div'>";
        content += "onにするとスマホ、タブレットのタッチ操作での回転を止めます。</div>";
        content += "<hr class='my-hr'>動作がおかしいときにリセットします。";
        content += "<button type='button' class='reset-btn btn btn-primary btn-block'>座標リセット</button>";
        content += "<hr class='my-hr'>PNG形式で保存します。";
        content += "<a type='button' class='png-btn btn btn-primary btn-block'>PNG保存</a>";
        mydialog({
            id:"menu-dialog-" + mapName,
            class:"menu-dialog",
            map:mapName,
            title:" ",
            content:content,
            top:"55px",
            left:"20px",
            width:"230px",
            rmDialog:false,
            hide:true
        });
        $(".bs-toggle").bootstrapToggle();
        $(".flood-select,.weather-select").selectpicker({
            "selectedText": "cat"
        });
        $("input:radio[name='swipe-radio-" + mapName + "']").iCheck({
            checkboxClass: "icheckbox_flat-blue",
            radioClass: "iradio_flat-blue"
        });
        //------------------------------------------------------------
        //スワイプ分割ラジオを操作したとき
        $("input:radio[name='swipe-radio-" + mapName + "']").on("ifChecked", function (event) {
            var mapObj = funcMaps($(this));
            var mapObj = funcMaps($(this));
            funcHaikeiLayerSort(mapObj["element"], mapObj["name"]);
        });
        return false;
    });
    //--------------------------------------------------------------------------
    //隠しているメニューを表示
    $("body").on("click", ".hidden-div-open", function () {
        $(this).next().slideToggle(500);
    });
    //--------------------------------------------------------------------------
    //リセットボタン
    $("body").on("click",".reset-btn",function() {
        location.reload(true);
        localStorage.clear();
        location.reload(true);
    });
    //--------------------------------------------------------------------------
    //PNG保存ボタン
    $("body").on("click",".png-btn",function(){
        var msg = "";
        msg += "PNG保存、利用は各背景の利用規約等を参照してください。";
        $.notify({//options
            message:msg
        },{//settings
            type:"danger",
            z_index:999999,
            placement: {
                from:"top",
                align:"center"
            },
            animate: {
                enter:"animated fadeInDown",
                exit:"animated fadeOutUp"
            }
        });

        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        if($("#" + mapName + " .d3d2-btn").html()=="3D"){//表示が３Ｄのときは２Ｄ

            map1.removeControl(centerTarget1);
            map2.removeControl(centerTarget2);
            eval(mapName).once("postcompose",function(event){

                var type = 'image/png';
                var canvas = $("#" + mapName).find("canvas")[0];
                var dataurl = canvas.toDataURL(type);
                var bin = atob(dataurl.split(',')[1]);
                var buffer = new Uint8Array(bin.length);
                for (var i = 0; i < bin.length; i++){
                    buffer[i] = bin.charCodeAt(i);
                }
                var blob = new Blob([buffer.buffer],{type:type});
                $("#" + mapName + " .png-btn").attr({
                    "href":window.URL.createObjectURL(blob),
                    "download":"map2d.png"
                });
                map1.addControl(centerTarget1);
                map2.addControl(centerTarget2);
                console.log("完了")
            });
            eval(mapName).renderSync();
        }else{
            if(mapName=="map1"){
                var pngScene = ol3d1.getCesiumScene();
            }else{
                var pngScene = ol3d2.getCesiumScene();
            }
            var type = 'image/png';
            var canvas = document.createElement("canvas");
            pngScene.render();//セシウムのsceneを使う。
            var dataurl = pngScene.canvas.toDataURL(type);
            var bin = atob(dataurl.split(',')[1]);
            var buffer = new Uint8Array(bin.length);
            for (var i = 0; i < bin.length; i++){
                buffer[i] = bin.charCodeAt(i);
            }
            var blob = new Blob([buffer.buffer],{type:type});
            $("#" + mapName + " .png-btn").attr({
                "href":window.URL.createObjectURL(blob),
                "download":"map3d.png"
            })
        }
    });
    //--------------------------------------------------------------------------
    //この２行は特になくても構わない。事前にメニューを読み込んで表示を滑らかにしているだけ
    $("#map1 .menu-btn").click();
    $("#map2 .menu-btn").click();
    //$(".menu-dialog").hide();
    //--------------------------------------------------------------------------

});


