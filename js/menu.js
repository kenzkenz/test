$(function() {


    //--------------------------------------------------------------------------
    //メニューボタン
    $(".menu-btn").click(function () {
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        var content = "";
        content += "<input type='checkbox' data-toggle='toggle' class='swipe-toggle'>：<a class='hidden-div-open'>画面スワイプ</a>";
        content += "<div class='hidden-div'>";
        content += "分割方法を設定します。<br>";
        content += "　<label><input type='radio' name='swipe-radio-" + mapName + "' value='horizontal' checked> 横分割</label>";
        content += "　<label><input type='radio' name='swipe-radio-" + mapName + "' value='vertival'> 縦分割</label></div>";
        content += "<hr class='my-hr'>";
        content += "<input type='checkbox' data-toggle='toggle' class='wiki-toggle'>：<a class='hidden-div-open'>Wikimedia Commons</a>";
        content += "<div class='hidden-div'>";
        content += "ウィキメディア・コモンズに投稿された写真を表示します。</div>";
        content += "<hr class='my-hr'>";
        content += "<input type='checkbox' data-toggle='toggle' class='flood-toggle'>：<a class='hidden-div-open'>海面上昇シミュレーション</a>";
        content += "<div class='hidden-div'>";
        content += "スライダーの最大値を設定します。";
        content += "<select class='selectpicker flood-select'>";
        content += "<option value='100'>最大値100メートル</option>";
        content += "<option value='200'>最大値200メートル</option>";
        content += "<option value='1000'>最大値1000メートル</option>";
        content += "<option value='2000'>最大値2000メートル</option>";
        content += "<option value='4000'>最大値4000メートル</optionvalue>";
        content += "</select></div>";
        content += "<hr class='my-hr'>";
        content += "<input type='checkbox' data-toggle='toggle' class='rotate-toggle' checked>：<a class='hidden-div-open'>スマホ2D時回転ロック</a>";
        content += "<div class='hidden-div'>";
        content += "onにするとスマホ、タブレットのタッチ操作での回転を止めます。</div>";
        content += "<hr class='my-hr'>動作がおかしいときにリセットします。";
        content += "<button type='button' class='reset-btn btn btn-primary btn-block'>座標リセット</button>";
        mydialog({
            id: "menu-dialog-" + mapName,
            class: "menu-dialog",
            map: mapName,
            title: " ",
            content: content,
            top: "55px",
            left: "20px",
            width: "230px",
            rmDialog: false
        });
        $(".flood-toggle,.rotate-toggle,.wiki-toggle,.swipe-toggle").bootstrapToggle();
        $(".flood-select").selectpicker({
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
    //この２行は特になくても構わない。事前にメニューを読み込んで表示を滑らかにしているだけ
    $(".menu-btn").click();
    $(".menu-dialog").hide();
    //--------------------------------------------------------------------------
});