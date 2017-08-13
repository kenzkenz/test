var popup1;
var popup2;
$(function(){
    popup1 = new ol.Overlay.Popup();
    map1.addOverlay(popup1);
    popup2 = new ol.Overlay.Popup();
    map2.addOverlay(popup2);
    //-----------------------------------------------
    map1.on("singleclick", function(evt) {
        funcPopupShow(evt,"map1");
    });
    map2.on("singleclick", function(evt) {
        funcPopupShow(evt,"map2");
    });
    //-----------------------------------------------
    map1.on("pointermove",function(evt){
        funcPointerMove(evt,"map1");
    });
    //-----------------------------------------------
    map2.on("pointermove",function(evt){
        funcPointerMove(evt,"map2");
    });
    //-----------------------------------------------
    //ポップアップ
    function funcPopupShow(evt,map){
        var pixel = eval(map).getPixelFromCoordinate(evt.coordinate);
        var layerObj = eval(map).forEachFeatureAtPixel(pixel,function(feature,layer){
            return {"layer":layer,"feature":feature};
        });
        if(!layerObj) return;
        var layer = layerObj["layer"];
        var feature = layerObj["feature"];
        if(layerObj["layer"]) {
            var layerName = layerObj["layer"].getProperties()["name"];
        }else{
            //console.log("レイヤーなし!！");
            return;
        }
        console.log(layerName);
        switch (layerName){//ここで処理を分岐
            case "wikiCommonsLayer":
                funcWikiPopup(feature,map);
                break;
            case "estatLayer":
                funcEstatPopup(feature,map,evt);
                break;
            case "weatherLayer":
                funcWeatherPopup(feature,map,evt);
                break;
            case "panoLayer":
                funcPanoPopup(feature,map,evt);
                break;
            case "csvLayer":
                funcCsvPopup(feature,map,evt);
                break;
            case "circleLayer":
                console.log("circleLayer");
                //funcCsvPopup(feature,map,evt);
                break;
            case "mesh500Layer":
                console.log("mesh500Layer");
                funcMesh500Popup(feature,map,evt);
                break;
            case "dataLayer":
                funcDataLayerPopup(feature,map,evt);
                break;
            case "higasi9Layer":
                funcHigasi9LayerPopup(feature,map,evt);
                break;
            case "resasLayer":
                funcResasLayerPopup(feature,map,evt);
                break;
            case "gpxLayer":
                funcDataLayerPopup(feature,map,evt);
                break;
            case "yakubaLayer":
                funcyakubaLayerPopup(feature,map,evt);
                break;
            case "mobakuu":
                funcMobakuuPopup(feature,map,evt);
                break;
            case "chome":
                funcChomePopup(layer,feature,map,evt);
                break;
            case "douro":
                funcDouroPopup(feature,map,evt);
                break;
            case "overpassLayer":
                funcOverpassLayerPopup(feature,map,evt);
                break;
            case "tunamimvt":
                funcTunamimvtPopup(feature,map,evt);
                break;
            case "keizai-census":
                funcKeizaiCensusPopup(feature,map,evt);
                break;
            case "suiro":
                funcSuiroPopup(feature,map,evt);
                break;
            case "youtotiiki":
                funcYoutotiikiPopup(layer,feature,map,evt);
                break;
            case "500mesh":
                //funcYoutotiikiPopup(layer,feature,map,evt);
                console.log(feature.getProperties());
                break;
            case "dozyouzu":
                funcDozyouzuPopup(feature,map,evt);
                console.log(feature.getProperties());
                break;
            case "syokusei":
                funcSyokuseiPopup(feature,map,evt);
                console.log(feature.getProperties());
                break;
            default:
        }
    }
    //-----------------------------------------------
    function funcSyokuseiPopup(feature,map,evt){
        var featureProp = feature.getProperties();
        var geoType = feature.getGeometry().getType();
        if(geoType==="Point"){
            var coord = feature.getGeometry().getCoordinates();
        }else{
            var coord = evt.coordinate;
        }
        console.log(featureProp);
        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
        table += "<tr><th class='popup-th' style='width:70px;'>大分類</th><td class='popup-td'>" + featureProp["DAI_N"]  + "</td></tr>";
        //table += "<tr><th class='popup-th'>凡例コード</th><td class='popup-td'>" + featureProp["HANREI_C"] + "</td></tr>";
        table += "<tr><th class='popup-th'>凡例</th><td class='popup-td'>" + featureProp["HANREI_N"] + "</td></tr>";
        table += "<tr><th class='popup-th'>植生コード</th><td class='popup-td'>" + featureProp["SYOKU_C"] + "</td></tr>";
        table += "<tr><th class='popup-th'>植生</th><td class='popup-td'>" + featureProp["SYOKU_N"] + "</td></tr>";
        table += "</table>";

        content += table;
        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //-----------------------------------------------
    function funcDozyouzuPopup(feature,map,evt){
        var featureProp = feature.getProperties();
        var geoType = feature.getGeometry().getType();
        if(geoType==="Point"){
            var coord = feature.getGeometry().getCoordinates();
        }else{
            var coord = evt.coordinate;
        }

        var noukenUrl = "http://soil-inventory.dc.affrc.go.jp/explain/";
        var dozyouAr =
            [
                {"id":"B1","name":"有機質土","url":"B.php","detail":"湿生植物の遺体が、過湿のため分解を免れ厚く堆積した土壌。主として沖積地や海岸砂丘の後背湿地、谷地、高山などの湿地に分布する。"},
                {"id":"C1","name":"ポドゾル","url":"C1.php","detail":"漂白した層と腐植または鉄・アルミニウムが集積した層の層序をもつ土壌。自然状態では、漂白層の上に粗腐植層が存在しているのが一般的である。"},
                {"id":"D1","name":"未熟黒ボク土","url":"D1.php","detail":"堆積した火山放出物が、ある程度の土壌化作用を受け、リン酸を固定する性質や有機物の集積（全炭素で3％以上）を示しはじめた段階の土壌である。"},
                {"id":"D2","name":"グライ黒ボク土","url":"D2.php","detail":"地下水位の高い場所にある黒ボク土で、一年を通じて水で飽和されている層が50cm以内に出てくる土壌。黒ボク土の分布域を刻む谷底、谷地、沖積低湿地などの地下水位の高いところに分布している。"},
                {"id":"D3","name":"多湿黒ボク土","url":"D3.php","detail":"地下水の影響で湿っている黒ボク土。黒ボク土の分布域に接する台地間の谷底、台地内の谷地、沖積低地に分布が広いが、排水の不良な台地にも分布している。"},
                {"id":"D4","name":"褐色黒ボク土","url":"D4.php","detail":"森林下に出来る黒ボク土で、有機物含量は高いが、黒色味が弱く褐色の表層を持つ。天然林下の風化火山灰土壌は、有機物含量が高くても黒色を呈しないことがある。ブナ林下に典型的に発達する。"},
                {"id":"D5","name":"非アロフェン質黒ボク土","url":"D5.php","detail":"容積重が小さく、リン酸吸収係数も高い「黒ボク特徴」を示すが、主要粘土鉱物は結晶性の2：1型鉱物である。土壌中からカルシウムやマグネシウムなどの塩基が溶脱すると、2：1型粘土鉱物に吸着される交換性Al が多量に存在するようになり、強酸性を示す。"},
                {"id":"D6","name":"アロフェン質黒ボク土","url":"D6.php","detail":"最も普通に見られる黒ボク土。主として火山放出物を母材とし、良好な排水条件下における風化によって生成した結晶度の弱い粘土鉱物（アロフェン、イモゴライト）と腐植の集積によって特徴づけられる土壌。"},
                {"id":"E1","name":"石灰性暗赤色土","url":"E1.php","detail":"石灰岩など石灰質の母材から出来た土壌。暗い赤色のことが多いが、石灰質母材から出来ていてpHが高く塩基に富んでいれば、必ずしも暗赤色で無くてもよい。主に南西諸島の石灰岩地帯に分布する。"},
                {"id":"E2","name":"酸性暗赤色土","url":"E2.php","detail":"暗赤色の次表層の一部で酸性（ｐHが5.5未満）を示す土壌。塩基が下方に流れる溶脱作用の進んだ結果、元々中性付近だった暗赤色土が酸性化した土壌、および熱水変成作用によって生成した火山系暗赤色土が相当する。"},
                {"id":"E3","name":"塩基性暗赤色土","url":"E3.php","detail":"主に超塩基性岩（かんらん岩、蛇紋岩）から出来て、pHが高い土壌。超塩基性岩が地表にでている場所に分布する。"},
                {"id":"F1","name":"低地水田土","url":"F1.php","detail":"元々地下水の影響が無いか弱いところに水田を作ったため、鉄集積層が出来たり、灰色化した特徴的な断面をもつようになった低地の土壌。"},
                {"id":"F2","name":"グライ低地土","url":"F2.php","detail":"低地土大群の中で、最も地下水位が高く、年間を通じてほとんど水に飽和されたグライ層が50cm以内に出てくる土壌。"},
                {"id":"F3","name":"灰色低地土","url":"F3.php","detail":"中間的な湿性状態の沖積地の土壌。日本の水田の代表的な土壌。季節的地下水の飽和により発達した地下水湿性特徴を示す斑鉄層が地表下50cm以内に現れる。"},
                {"id":"F4","name":"褐色低地土","url":"F4.php","detail":"沖積低地の中では最も乾いた土地にある、黄褐色の次表層を持つ土壌。"},
                {"id":"F5","name":"未熟低地土","url":"F5.php","detail":"未風化の土砂が堆積したままの土壌。鉄が風化遊離しないため斑鉄をもたず、ふつう灰色（土砂そのものの色）を呈してしていることが多い。"},
                {"id":"G1","name":"粘土集積赤黄色土","url":"G1.php","detail":"「粘土集積層」をもつ赤黄色土。本土壌群は主に、本州の中位段丘から高位段丘上および南西諸島一帯の平坦で安定した地形面に分布する。畑、果樹園などに利用されている。"},
                {"id":"G2","name":"風化変質赤黄色土","url":"G2.php","detail":"「粘土集積層」をもたず、「風化変質層」をもつ赤黄色土。この土壌群は、主に、本州の中位段丘から高位段丘上および南西諸島一帯に分布する。「風化変質層」：風化を受けて色が変わったり、粘土が多くなったり、塊状の構造が出来たりした層。"},
                {"id":"H1","name":"停滞水グライ土","url":"H1.php","detail":"　台地、丘陵地、山地にある排水不良な土壌。本土壌には、2つのタイプがある。ひとつは台地、丘陵地、山地の排水不良な微凹地に分布するもので、北海道などでみられる。その分布は局所的な場合が多く、分布する場所の微地形や排水状態の違いにより、疑似グライ土や泥炭土へ移行する場合がある。もうひとつは、台地、丘陵地および山地の棚田のように人為的要因によるもので、稲作期の人為的湛水状態に加えて非稲作期も過湿になりやすい多雪地や排水不良地にみられる。"},
                {"id":"I1","name":"褐色森林土","url":"I1.php","detail":"火山灰の影響の少ない山地・丘陵地に分布する褐色あるいは黄褐色の「風化変質層」をもつ土壌。「風化変質層」：風化を受けて色が変わったり粘土が多くなったり塊状の構造が出来たりした層"},
                {"id":"J1","name":"火山放出物未熟土","url":"J1.php","detail":"噴火から年数が少なく未風化な火山灰、軽石などからなる未熟な土壌。とくに北海道、東北、関東、九州などの活火山の周辺部に分布する。"},
                {"id":"J2","name":"砂質未熟土","url":"J2.php","detail":"砂丘地の未熟な土壌。主として、海岸線に沿う砂丘地、砂堆、砂洲、砂嘴などの微高地に分布する。"},
                {"id":"J3","name":"固結岩屑土","url":"J3.php","detail":"地表から30cm以内に固結した岩盤が現われる未熟土。侵食の激しい山地、丘陵地の傾斜面に分布する土層の浅い土壌である。"},
                {"id":"J4","name":"陸成未熟土","url":"J4.php","detail":"山地、丘陵地、洪積台地の風化の進んでいない未熟な土壌。西南日本に広く分布するマサ（花崗岩風化物）の多くや南西諸島に分布する泥灰岩由来のジャーガルが本土壌群に相当する。"},
                {"id":"","name":"","url":".php","detail":""},
                {"id":"","name":"","url":".php","detail":""}

            ];
        console.log(featureProp);
        var targetId = featureProp["SG_CD"];
        console.log(targetId);
        var dozyouArFilter = dozyouAr.filter(function (item,index) {
            if(item.id===targetId) return true;
        });

        var target = dozyouArFilter[0];
        console.log(target)



        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
        table += "<tr><th class='popup-th'>土壌分類記号</th><td class='popup-td'>" + featureProp["SSerGrCD"] + "</td></tr>";
        table += "<tr><th class='popup-th' style='width:80px;'>土壌分類名</th><td class='popup-td'>" + featureProp["SoilName"]  + "</td></tr>";
        if(target) {
            table += "<tr><th class='popup-th'>説明</th><td class='popup-td'>" + target["detail"] + "</td></tr>";
            table += "<tr><th class='popup-th'>リンク</th><td class='popup-td'><a href='" + noukenUrl + target["url"] + "' target='_blank'>農研機構のページ</a></td></tr>";
        }

        /*
         for(key in featureProp){
         table += "<tr>";
         var prop = featureProp[key];
         table += "<th class='popup-th'>" + key + "</th><td class='popup-td'>" + prop + "</td>";
         table += "</tr>";
         }
         */
        table += "</table>";

        content += table;
        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //-----------------------------------------------
    function funcYoutotiikiPopup(layer,feature,map,evt){
/*
        youtoFeaturesFlg = true;
        youtoFeatures = [];
        layer.getSource().changed();
        layer.getSource().on('change', function(evt) {
            console.log(55555555555555)
            console.log(youtoFeatures);
        });
*/
        var extent = eval(map).getView().calculateExtent(eval(map).getSize());
        console.log(extent);
        /*
        layer.forEachFeatureIntersectingExtent(extent, function(feature) {
            console.log(88888)
            //selectedFeatures.push(feature);
            //info.push(feature.get('name'));
        });
        */
        console.log(layer);
        console.log(layer.getSource());
        //console.log(layer.getSource().getFeatures());
        //layer.getSource().changed();
        //var prop = layer.getSource()["a"]["a"]["gd"]["f"][0]["c"];
        var prop = layer.getSource()["a"]["a"]["gd"]["f"];
        console.log(prop);
/*
        layer.getSource().on('change', function(evt){
            console.log(9999);
            var source = evt.target;
            if (source.getState() === 'ready') {
                //var numFeatures = source.getFeatures().length;
                //var numFeatures = source["a"]["a"]["gd"]["f"].length;
                //console.log("Count after change: " + numFeatures);
                console.log(source)
            }
        });
        */




        var featureProp = feature.getProperties();
        var geoType = feature.getGeometry().getType();
        if(geoType==="Point"){
            var coord = feature.getGeometry().getCoordinates();
        }else{
            var coord = evt.coordinate;
        }
        console.log(featureProp);
        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
        table += "<tr><th class='popup-th' style='width:110px;'>行政区域コード</th><td class='popup-td'>" + featureProp["A29_001"]  + "</td></tr>";
        table += "<tr><th class='popup-th'>都道府県名</th><td class='popup-td'>" + featureProp["A29_002"] + "</td></tr>";
        table += "<tr><th class='popup-th'>市区町村名</th><td class='popup-td'>" + featureProp["A29_003"] + "</td></tr>";
        table += "<tr><th class='popup-th'>用途地域分類</th><td class='popup-td'>" + featureProp["A29_004"] + "</td></tr>";
        table += "<tr><th class='popup-th'>用途地域名</th><td class='popup-td'>" + featureProp["A29_005"] + "</td></tr>";
        table += "<tr><th class='popup-th'>建ぺい率</th><td class='popup-td'>" + featureProp["A29_006"] + "</td></tr>";
        table += "<tr><th class='popup-th'>容積率</th><td class='popup-td'>" + featureProp["A29_007"] + "</td></tr>";
        table += "<tr><th class='popup-th'>総括図作成団体名</th><td class='popup-td'>" + featureProp["A29_008"] + "</td></tr>";
        table += "<tr><th class='popup-th'>総括図作成年</th><td class='popup-td'>" + featureProp["A29_009"] + "</td></tr>";
        table += "<tr><th class='popup-th'>備考</th><td class='popup-td'>" + featureProp["A29_010"] + "</td></tr>";
        /*
         for(key in featureProp){
         table += "<tr>";
         var prop = featureProp[key];
         table += "<th class='popup-th'>" + key + "</th><td class='popup-td'>" + prop + "</td>";
         table += "</tr>";
         }
         */
        table += "</table>";

        content += table;
        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //-----------------------------------------------
    function funcSuiroPopup(feature,map,evt){
        var featureProp = feature.getProperties();
        var geoType = feature.getGeometry().getType();
        if(geoType==="Point"){
            var coord = feature.getGeometry().getCoordinates();
        }else{
            var coord = evt.coordinate;
        }
        console.log(featureProp);
        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
            table += "<tr><th class='popup-th'>区分</th><td class='popup-td'>" + featureProp["rivCtg"]  + "</td></tr>";
            table += "<tr><th class='popup-th'>type</th><td class='popup-td'>" + featureProp["type"] + "</td></tr>";
        /*
         for(key in featureProp){
         table += "<tr>";
         var prop = featureProp[key];
         table += "<th class='popup-th'>" + key + "</th><td class='popup-td'>" + prop + "</td>";
         table += "</tr>";
         }
         */
        table += "</table>";

        content += table;
        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //-----------------------------------------------
    function funcKeizaiCensusPopup(feature,map,evt){
        var featureProp = feature.getProperties();
        var geoType = feature.getGeometry().getType();
        if(geoType==="Point"){
            var coord = feature.getGeometry().getCoordinates();
        }else{
            var coord = evt.coordinate;
        }
        console.log(featureProp)
        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
            table += "<tr><th class='popup-th'>コード</th><td class='popup-td'>" + featureProp["KEY_CODE"]  + "</td></tr>";
            table += "<tr><th class='popup-th'>自治体</th><td class='popup-td'>" + featureProp["KEN_NAME"] + featureProp["CSS_NAME"] + "</td></tr>";
            table += "<tr><th class='popup-th'>字</th><td class='popup-td'>" + featureProp["MOJI"]  + "</td></tr>";
        //table += "<tr><th class='popup-th'>幅</th><td class='popup-td'>" + featureProp["rnkWidth"] + "</td></tr>";
        /*
         for(key in featureProp){
         table += "<tr>";
         var prop = featureProp[key];
         table += "<th class='popup-th'>" + key + "</th><td class='popup-td'>" + prop + "</td>";
         table += "</tr>";
         }
         */
        table += "</table>";

        content += table;
        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }


    //-----------------------------------------------
    function funcTunamimvtPopup(feature,map,evt){
        var featureProp = feature.getProperties();
        var geoType = feature.getGeometry().getType();
        if(geoType==="Point"){
            var coord = feature.getGeometry().getCoordinates();
        }else{
            var coord = evt.coordinate;
        }
        console.log(featureProp)
        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
        table += "<tr><th class='popup-th'>浸水</th><td class='popup-td'>" + featureProp["A40_003"]  + "</td></tr>";
        //table += "<tr><th class='popup-th'>幅</th><td class='popup-td'>" + featureProp["rnkWidth"] + "</td></tr>";
        /*
         for(key in featureProp){
         table += "<tr>";
         var prop = featureProp[key];
         table += "<th class='popup-th'>" + key + "</th><td class='popup-td'>" + prop + "</td>";
         table += "</tr>";
         }
         */
        table += "</table>";

        content += table;
        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //-----------------------------------------------
    function funcOverpassLayerPopup(feature,map,evt){
        var featureProp = feature.getProperties();
        var geoType = feature.getGeometry().getType();
        if(geoType==="Point"){
            var coord = feature.getGeometry().getCoordinates();
        }else{
            var coord = evt.coordinate;
        }
        console.log(featureProp)
        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
        /*
        table += "<tr><th class='popup-th'>種類</th><td class='popup-td'>" + featureProp["rdCtg"]  + "</td></tr>";
        table += "<tr><th class='popup-th'>幅</th><td class='popup-td'>" + featureProp["rnkWidth"] + "</td></tr>";
        */

         for(key in featureProp){
             var prop = featureProp[key];
             if(key!=="geometry" && key!=="meta") {
                 table += "<tr>";
                 if (key == "tags") {
                     var props = "";
                     for (key2 in prop) {
                         var prop2 = key2 + " = " + prop[key2] + "<br>";
                         props += prop2
                     }
                     prop = props;
                 }
                 table += "<th class='popup-th'>" + key + "</th><td class='popup-td'>" + prop + "</td>";
                 table += "</tr>";
             }
         }

        table += "</table>";

        content += table;
        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //-----------------------------------------------
    function funcDouroPopup(feature,map,evt){
        var featureProp = feature.getProperties();
        var geoType = feature.getGeometry().getType();
        if(geoType==="Point"){
            var coord = feature.getGeometry().getCoordinates();
        }else{
            var coord = evt.coordinate;
        }
        console.log(featureProp)
        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
        table += "<tr><th class='popup-th'>種類</th><td class='popup-td'>" + featureProp["rdCtg"]  + "</td></tr>";
        table += "<tr><th class='popup-th'>幅</th><td class='popup-td'>" + featureProp["rnkWidth"] + "</td></tr>";
        /*
         for(key in featureProp){
         table += "<tr>";
         var prop = featureProp[key];
         table += "<th class='popup-th'>" + key + "</th><td class='popup-td'>" + prop + "</td>";
         table += "</tr>";
         }
         */
        table += "</table>";

        content += table;
        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //-----------------------------------------------
    function funcChomePopup(layer,feature,map,evt){
        var featureProp = feature.getProperties();
        var geoType = feature.getGeometry().getType();
        if(geoType==="Point"){
            var coord = feature.getGeometry().getCoordinates();
        }else{
            var coord = evt.coordinate;
        }
        console.log(feature);
        //console.log(feature.get());
        //console.log(feature.getAll())

        console.log(layer);
        console.log(layer.getSource());

        console.log(featureProp);
        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
            table += "<tr><th class='popup-th'>コード</th><td class='popup-td'>" + featureProp["KEY_CODE"] + "</td></tr>";

            table += "<tr><th class='popup-th'>自治体</th><td class='popup-td'>" + featureProp["KEN_NAME"] + featureProp["GST_NAME"] + "</td></tr>";
            table += "<tr><th class='popup-th'>小地域</th><td class='popup-td'>" + featureProp["MOJI"] + "</td></tr>";
            //table += "<tr><th class='popup-th'>自治体</th><td class='popup-td popup-td-zititai'></td></tr>";
            //table += "<tr><th class='popup-th'>小地域</th><td class='popup-td popup-td-aza'></td></tr>";

            table += "<tr><th class='popup-th' style='font-weight: bold;'>人口</th><td class='popup-td' style='font-weight: bold;font-size: 20px;'>" + Math.floor(Number(featureProp["JINKO"])).toLocaleString() + "人</td></tr>";
            table += "<tr><th class='popup-th'>面積</th><td class='popup-td'>" + Math.floor(Number(featureProp["AREA"])).toLocaleString() + "</td></tr>";
            table += "<tr><th class='popup-th'>密度</th><td class='popup-td'>" + Number(featureProp["JINKO"])/Number(featureProp["AREA"]) + "</td></tr>";
        table += "</table>";
        content += table;
        content += "<button type='button' class='btn btn-xs btn-primary btn-block' data-action='syoutiiki-H27-pyramid-btn'>人口ピラミッド(estatH27)</button>";
        content += "<button type='button' class='btn btn-xs btn-primary btn-block' data-action='syoutiiki-pyramid-btn'>人口ピラミッド(estatH22)</button>";
        content += "<input type='hidden' class='pref-code' value='" + featureProp["KEN"] + "'>";
        content += "<input type='hidden' class='area-code' value='" + featureProp["KEY_CODE"] + "'>";
        content += "<input type='hidden' class='area-name' value='" + featureProp["MOJI"] + "'>";

        //------------------------------------------------------------------------------------------------------------
        /*
        var areaCode = featureProp["KEY_CODE"];
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
            $("#" + map + " .popup-td-zititai").text(json["cityname"]);
            $("#" + map + " .popup-td-aza").text(json["ooazaname"] + json["azaname"]);
        }).fail(function(){
            console.log("失敗!");
        });
        */
        //-------------------------------------------------------------------------------------------


        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    function funcSyoutiikiPyramid(mapName,prefCode,areaCode,areaName){
        var tgtUrl = "http://api.e-stat.go.jp/rest/2.1/app/json/getStatsData?";
        $.ajax({
            type:"get",
            url:"php/proxy-estat-syoutiiki.php",
            dataType:"json",
            data:{
                tgtUrl:tgtUrl,
                statsDataId:"T000573" + prefCode,
                //cdArea:"45201121003"
                cdArea:areaCode
                //cntGetFlg:"Y"
            }
        }).done(function(json){
            console.log(json);
            funcEstatPyramid(mapName,areaCode,areaName,json["json"]);
        }).fail(function(){
            console.log("失敗!");
        });
    }

    function funcSyoutiikiH27Pyramid(mapName,prefCode,areaCode,areaName){
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
            funcEstatH27Pyramid(mapName,areaCode,areaName,json);
        }).fail(function(){
            console.log("失敗!");
        });

    }



    /*
    var tgtUrl = "http://api.e-stat.go.jp/rest/2.1/app/json/getMetaInfo?";
    $.ajax({
        type:"get",
        url:"php/proxy-estat.php",
        dataType:"json",
        data:{
            tgtUrl:tgtUrl,
            statsDataId:"C0020050245201",
            cntGetFlg:"Y"
        }
    }).done(function(json){
        var metainfoAr = json["json"]["GET_META_INFO"]["METADATA_INF"]["CLASS_INF"]["CLASS_OBJ"][1]["CLASS"];
        var option = "<option value='99'>統計表を選択</option>";
        for (i=0; i<metainfoAr.length; i++){
            option += "<option value='" + metainfoAr[i]["@code"] + "'>" + (i+1) + "-"  + metainfoAr[i]["@name"] + "</option>";
        }
        citySelectOption = option;
        //$("#" + mapName + " .estat-table-select").html(option);
        //$.unblockUI();
        //resolve();
    }).fail(function(){
        console.log("失敗!");
    });
    */

    //-----------------------------------------------
    function funcyakubaLayerPopup(feature,map,evt){
        var featureProp = feature.getProperties();
        var geoType = feature.getGeometry().getType();
        if(geoType==="Point"){
            var coord = feature.getGeometry().getCoordinates();
        }else{
            var coord = evt.coordinate;
        }
        console.log(featureProp);
        var cityCode = ("0" + featureProp["市区町村コード"]).slice(-5);
        console.log(cityCode.substr(2,3));
        if(cityCode.substr(2,3)==="000") {
            cityCode = cityCode.substr(0,2)
        }
        console.log(cityCode);

        /*
        if(featureProp["コード"].length>2) {
            var cityCode = ("0" + featureProp["コード"]).slice(-5);
        }else{
            var cityCode = featureProp["コード"];
        }
        */
        var content = "";
        content += "<input type='hidden' class='city-code' value='" + cityCode + "'>";
        content += "<input type='hidden' class='city-name' value='" + featureProp["自治体名"] + "'>";
        content += "<div style='text-align:center;'><b>" + featureProp["自治体名"] + "</b></div><hr class='my-hr'>";
        content += "読み：" + featureProp["読み"] + "<br>";
        content += "都道府県：" + featureProp["都道府県"] + "<br>";
        content += "所在地：" + featureProp["所在地"];
        content += "<hr class='my-hr'>";
        content += "<button type='button' class='pyramid-btn btn btn-xs btn-primary btn-block' data-action='pyramid-btn'>人口ピラミッド(RESAS)</button>";
        content += "<button type='button' class='zinkousuii-btn btn btn-xs btn-primary btn-block' data-action='zinkousuii-btn'>人口推移(RESAS)</button>";
        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //-----------------------------------------------
    function funcHigasi9LayerPopup(feature,map,evt){
        var featureProp = feature.getProperties();
        var geoType = feature.getGeometry().getType();
        if(geoType==="Point"){
            var coord = feature.getGeometry().getCoordinates();
        }else{
            var coord = evt.coordinate;
        }
        console.log(featureProp)
        if(featureProp["コード"].length>2) {
            var cityCode = ("0" + featureProp["コード"]).slice(-5);
        }else{
            var cityCode = featureProp["コード"];
        }

        var content = "";
        content += "<input type='hidden' class='city-code' value='" + cityCode + "'>";
        content += "<input type='hidden' class='city-name' value='" + featureProp["自治体名"] + "'>";
        content += "<div style='text-align:center;'><b>" + featureProp["自治体名"] + "</b></div><hr class='my-hr'>";

        content += "人口：" + featureProp["人口"];

        content += "<hr class='my-hr'>";
        content += "<button type='button' class='pyramid-btn btn btn-xs btn-primary btn-block' data-action='pyramid-btn'>人口ピラミッド(RESAS)</button>";
        content += "<button type='button' class='zinkousuii-btn btn btn-xs btn-primary btn-block' data-action='zinkousuii-btn'>人口推移(RESAS)</button>";
        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //-----------------------------------------------
    function funcMobakuuPopup(feature,map,evt){
        var featureProp = feature.getProperties();
        var geoType = feature.getGeometry().getType();
        if(geoType==="Point"){
            var coord = feature.getGeometry().getCoordinates();
        }else{
            var coord = evt.coordinate;
        }

        var content = "";
            content += "自治体名：" + featureProp["自治体名"] + "<br>";
            content += "人数：" + featureProp["人数"].toLocaleString() + "人";


        if(map=="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //-----------------------------------------------
    function funcGpxLayerPopup(feature,map,evt){
        alert("作成中！")
    }
    //-----------------------------------------------
    function funcEstatPopup(feature,map,evt){
        var featureProp = feature.getProperties();
        var geoType = feature.getGeometry().getType();
        if(geoType==="Point"){
            var coord = feature.getGeometry().getCoordinates();
        }else{
            var coord = evt.coordinate;
        }
        if(featureProp["コード"].length>2) {
            var cityCode = ("0" + featureProp["コード"]).slice(-5);
        }else{
            var cityCode = featureProp["コード"];
        }
        var content = "";
            content += "<input type='hidden' class='city-code' value='" + cityCode + "'>";
            content += "<input type='hidden' class='city-name' value='" + featureProp["自治体名"] + "'>";
            content += "<div style='text-align:center;'><b>" + featureProp["自治体名"] + "</b></div><hr class='my-hr'>";
            var hyouText = $(".estat-year-div").text();
            if(hyouText) content += $(".estat-year-div").text().split("　")[1] + "<br>";//表名
            var lank = $("#" + map + " .tr-" + cityCode).find(".estat-lank-td").text();
            if(hyouText) content += "順位" + lank + "：　<span style='font-size:20px;'>" + featureProp["value"] + "</span>";
            content += "<hr class='my-hr'>";
            content += "<button type='button' class='pyramid-btn btn btn-xs btn-primary btn-block' data-action='pyramid-btn'>人口ピラミッド(RESAS)</button>";
            content += "<button type='button' class='zinkousuii-btn btn btn-xs btn-primary btn-block' data-action='zinkousuii-btn'>人口推移(RESAS)</button>";
        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //-----------------------------------------------
    function funcResasLayerPopup(feature,mapName,evt) {
        var featureProp = feature.getProperties();
        var geoType = feature.getGeometry().getType();
        if(geoType==="Point"){
            var coord = feature.getGeometry().getCoordinates();
        }else{
            var coord = evt.coordinate;
        }
        if(featureProp["コード"].length>2) {
            var cityCode = ("0" + featureProp["コード"]).slice(-5);
        }else{
            var cityCode = featureProp["コード"];
        }
        var kizyunThTxt = $("#" + mapName).find(".resas-kizyun-th").text();
        var kizyunTdTxt = Number($("#" + mapName + " .tr-" + cityCode).find(".resas-kizyun-td").text()).toLocaleString();
        var zinkouThTxt = $("#" + mapName).find(".resas-zinkou-th").text();
        var zinkouTdTxt = Number($("#" + mapName + " .tr-" + cityCode).find(".resas-zinkou-td").text()).toLocaleString();
        var zougenrituTdTxt = $("#" + mapName + " .tr-" + cityCode).find(".resas-zougenritu-td").text();
        var content = "";
            content += "<input type='hidden' class='city-code' value='" + cityCode + "'>";
            content += "<input type='hidden' class='city-name' value='" + featureProp["自治体名"] + "'>";
            content += "<div style='text-align:center;'><b>" + featureProp["自治体名"] + "</b></div><hr class='my-hr'>";
            content += "増減率：<span style='font-size:24px;'>" + zougenrituTdTxt + "</span><br>";
            content += kizyunThTxt + "：" + kizyunTdTxt + "人<br>";
            content += zinkouThTxt + "：" + zinkouTdTxt + "人<br>";
            content += "<hr class='my-hr'>";
            content += "<button type='button' class='pyramid-btn btn btn-xs btn-primary btn-block' data-action='pyramid-btn'>人口ピラミッド</button>";
            content += "<button type='button' class='zinkousuii-btn btn btn-xs btn-primary btn-block' data-action='zinkousuii-btn'>人口推移</button>";
        if(mapName==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //------------------------------------------------------------------------------------------------------------------
    popup1.getElement().addEventListener("click", function(event) {
        var mapName = "map1";
        aaa(event,mapName);
    }, false);
    popup2.getElement().addEventListener("click", function(event) {
        var mapName = "map2";
        aaa(event,mapName);
    }, false);
    function aaa(event,mapName){
        var contentElement = $(event["target"]).parents(".ol-popup-content");
        var action = event["target"].getAttribute("data-action");
        var cityCode = contentElement.find(".city-code").val();
        console.log(cityCode);
        var cityName = contentElement.find(".city-name").val();
        var prefCode = contentElement.find(".pref-code").val();
        var areaCode = contentElement.find(".area-code").val();
        var areaName = contentElement.find(".area-name").val();

        if(action){
            switch (action) {
                case "pyramid-btn":
                    funcResasPyramid(mapName,cityCode,cityName);
                    break;
                case "zinkousuii-btn":
                    funcResasZinkousuii(mapName,cityCode,cityName);
                    break;
                case "syoutiiki-pyramid-btn":
                    funcSyoutiikiPyramid(mapName,prefCode,areaCode,areaName);
                    break;
                case "syoutiiki-H27-pyramid-btn":
                    funcSyoutiikiH27Pyramid(mapName,prefCode,areaCode,areaName);
                    break;
            }
        }
    }
    //-----------------------------------------------
    function funcDataLayerPopup(feature,map,evt) {
        var featureProp = feature.getProperties();
        var geoType = feature.getGeometry().getType();
        if (geoType === "Point") {
            var coord = feature.getGeometry().getCoordinates();
        } else {
            var coord = evt.coordinate;
        }
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
        var maxKeyLength = 0;
        for(key in featureProp){
            if(key!="geometry"){
                if(String(key.indexOf("_"))==-1 && key != "id"){
                    table += "<tr>";
                    var prop = featureProp[key].replace("<img src='","<img src='./php/proxy-jpeg.php?url=");
                    table += "<th class='popup-th'>" + key + "</th><td class='popup-td'>" + prop + "</td>";
                    table += "</tr>";
                    if(maxKeyLength<key.length) maxKeyLength = key.length
                }
            }
        }
        table += "</table>";
        var content = "";
            content += table;
        if (map==="map1") {
            popup1.show(coord, content);
            $("#map1 .popup-th").css({
                "width":(maxKeyLength + 2) + "em"
            });
        } else {
            popup2.show(coord, content);
        }
    }
    //-----------------------------------------------
    function funcMesh500Popup(feature,map,evt) {
        var properties = feature.getProperties();
        var coord = evt.coordinate;
        var meshCodeStr = properties["meshCode"];
        var tgtUrl = "http://api.e-stat.go.jp/rest/2.1/app/json/getStatsData?";
        var zinkouAjax = function(){
            var sdId = "T000609M" + meshCodeStr.slice(0,4);
            return new Promise(function(resolve,reject){
                $.ajax({
                    type:"GET",
                    url:"php/proxy-estat-zinkou.php",
                    dataType:"json",
                    data:{
                        tgtUrl:tgtUrl,
                        statsDataId:sdId,
                        cdArea:meshCodeStr
                    }
                }).done(function(json){
                    resolve(json);
                }).fail(function(json){
                    alert("失敗!");
                });
            });
        };
        var keizaiAjax = function(){
            var sdId = "T000617M" + meshCodeStr.slice(0,4);
            return new Promise(function(resolve,reject){
                $.ajax({
                    type:"GET",
                    url:"php/proxy-estat-zinkou.php",
                    dataType:"json",
                    data:{
                        tgtUrl:tgtUrl,
                        statsDataId:sdId,
                        cdArea:meshCodeStr
                    }
                }).done(function(json){
                    resolve(json);
                    //console.log(json)
                    //console.log(JSON.stringify(json));
                    /*
                     var dataInfArr = json["GET_STATS_DATAS"]["STATISTICAL_DATA_LIST"]["DATA_INF_LIST"]["DATA_INF"];
                     console.log(dataInfArr);
                     if(dataInfArr){
                     if(dataInfArr.length==2){
                     content += "総人口：" + dataInfArr[0]["VALUE"][0]["$"] + "人";
                     content += "<br>男：" + dataInfArr[0]["VALUE"][1]["$"] + "人";
                     content += "　女：" + dataInfArr[0]["VALUE"][2]["$"] + "人";
                     content += "<br>世帯数：" + dataInfArr[0]["VALUE"][3]["$"] + "世帯";
                     content += "<hr>事業所数：" + dataInfArr[1]["VALUE"][0]["$"] + "事業所";
                     content += "<br>従業員数：" + dataInfArr[1]["VALUE"][1]["$"] + "人";
                     content += "<hr>従業員数/総人口：" + (dataInfArr[1]["VALUE"][1]["$"] / dataInfArr[0]["VALUE"][0]["$"]).toFixed(3);
                     }else{
                     if(dataInfArr["@requestNo"]=="1"){
                     content += "総人口：" + dataInfArr["VALUE"][0]["$"] + "人";
                     content += "<br>男：" + dataInfArr["VALUE"][1]["$"] + "人";
                     content += "　女：" + dataInfArr["VALUE"][2]["$"] + "人";
                     content += "<br>世帯数：" + dataInfArr["VALUE"][3]["$"] + "世帯";
                     content += "<hr>事業所数：0事業所";
                     content += "<br>従業員数：0人";
                     }else{
                     content += "総人口：0人";
                     content += "<br>男：0人";
                     content += "　女：0人";
                     content += "<br>世帯数：0世帯";
                     content += "<hr>事業所数：" + dataInfArr["VALUE"][0]["$"] + "事業所";
                     content += "<br>従業員数：" + dataInfArr["VALUE"][1]["$"] + "人";
                     };
                     };
                     }else{
                     content += "総人口、事業所、従業員全て０";
                     }
                     //eval(popupCtrStr).show(coord,content);
                     console.log(content);
                     */
                }).fail(function(json){
                    alert("失敗!");
                });
            });
        };
        Promise.all([zinkouAjax(),keizaiAjax()]).then(function(results){
            var content = "";
            var datainfZ = results[0]["json"]["GET_STATS_DATA"]["STATISTICAL_DATA"]["DATA_INF"];
            if(datainfZ) {
                content += "総人口：<b>" + datainfZ["VALUE"][0]["$"] + "</b>人";
                content += "<br>男：" + datainfZ["VALUE"][1]["$"] + "人";
                content += "<br>女：" + datainfZ["VALUE"][2]["$"] + "人";
                content += "<br>世帯数：" + datainfZ["VALUE"][3]["$"] + "世帯";
            }else{
                content += "総人口：0人";
                content += "<br>男：0人";
                content += "　女：0人";
                content += "<br>世帯数：0世帯";
            }
            var datainfZ = results[1]["json"]["GET_STATS_DATA"]["STATISTICAL_DATA"]["DATA_INF"];
            if(datainfZ) {
                content += "<hr class='my-hr'>従業員数：<b>" + datainfZ["VALUE"][1]["$"] + "</b>人";
                content += "<br>事業所数：" + datainfZ["VALUE"][0]["$"] + "";
            }else{
                content += "<hr class='my-hr'>事業所数：0事業所";
                content += "<br>従業員数：0人";
            }
            content = "<div style='font-size:14px;'>" + content + "</div>";
            if(map==="map1") {
                popup1.show(coord,content);
            }else{
                popup2.show(coord,content);
            }
        });
    }
    //-----------------------------------------------
    function funcCsvPopup(feature,map,evt) {
        var featureProp = feature.getProperties();
        var geoType = feature.getGeometry().getType();
        if (geoType == "Point") {
            var coord = feature.getGeometry().getCoordinates();
        } else {
            var coord = evt.coordinate;
        }
        console.log(featureProp);
        //console.log($(".estat-year-div").text().split("　")[1]);
        //var content = $(".estat-year-div").text().split("　")[1] + "<br>";//表名
        //content += featureProp["自治体名"] + "　" + featureProp["value"];
        //content += "<br>" + featureProp["lank"];
        var content = "";
            content += featureProp["自治体名"] + "<br>";
            content += featureProp["数値"];
        if (map == "map1") {
            popup1.show(coord, content);
        } else {
            popup2.show(coord, content);
        }
    }
    //-----------------------------------------------
    function funcPanoPopup(feature,map,evt) {
        var coord = feature.getGeometry().getCoordinates();
        var featureProp = feature.getProperties();
        var value = featureProp["value"];
        //if(value) var keys = Object.keys(value);
        var content = "<table class='weather-tbl table table-bordered table-condensed'>";
        content += "<tr><td class='weather-td'>名称</td><td>" + featureProp["名称"] + "</td></tr>";
        content += "<tr><td>説明</td><td>" + featureProp["説明"] + "</td><tr>";
        content += "</table>";
        //if(value) content += "<span class='weather-span'>" + keys[0] + value[keys[0]] + "</span>";
        if(map==="map1") {
            popup1.show(coord,content);
            $("#pano-div").remove();
            var content = "";
            content += "<div id='pano-div' style='height:" + $(window).height() / 2 + "px'>";
            content += "<button type='button' class='fullscreen-btn btn btn-primary'>全画面</button>";
            content += "<div>";
            $("#map1").after(content);
            embedpano({
                id: "krpanoObj",
                swf: "panos/tour.swf",
                xml: "panos/" + featureProp["xml"],
                target: "pano-div",
                html5: "auto",
                mobilescale: 1.0,
                passQueryParameters: true
            });
        }else{
            popup2.show(coord,content);
        }
    }
    $("body").on("click",".fullscreen-btn",function() {
        if ($(this).text() == "全画面"){
            $("#map1").animate({"width": "100%", "height": "0px"}, 500, function () {
                $("#pano-div").animate({"width": "100%", "height": $(window).height() + "px"}, 500, function () {
                })
            });
            $(this).text("解除");
        }else{
            $("#map1").animate({"width": "100%", "height": $(window).height() / 2 + "px"}, 500, function () {
                $("#pano-div").animate({"width": "100%", "height": $(window).height()/2 + "px"}, 500, function () {
                })
            });
            $(this).text("全画面");
        }
    });
    //-----------------------------------------------
    function funcWeatherPopup(feature,map,evt){
        var coord = feature.getGeometry().getCoordinates();
        var featureProp = feature.getProperties();
        var value = featureProp["value"];
        if(value) var keys = Object.keys(value);
        var content = "<table class='weather-tbl table table-bordered table-condensed'>";
            content += "<tr><td class='weather-td'>所在地</td><td>" + featureProp["所在地"] + "</td></tr>";
            content += "<tr><td>観測所名</td><td>" + featureProp["観測所名"] + "</td><tr>";
            content += "</table>";
            if(value) content += "<span class='weather-span'>" + keys[0] + value[keys[0]] + "</span>";

        if(map=="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //-----------------------------------------------
    function funcWikiPopup(feature,map){
        var featureProp = feature.getProperties();
        var content = "";
        content += featureProp["title"] + "<br>";
        content += "<a href='" + featureProp["url"] + "' TARGET='_blank'><img class='wiki-img'></a>";
        content += "<div style='text-align:center;'><i class='img-loading fa fa-spinner fa-spin fa-3x fa-fw'></i></div>";
        content += "copy:" +  featureProp["copy"];
        content += "<br>user:" +  featureProp["user"];
        content += "<br><a href='" + featureProp["descriptionurl"] + "?uselang=ja' TARGET='_blank'><label>Wikiへ</label></a>";
        var coord = feature.getGeometry().getCoordinates();
        //popup1.show(coord,content);
        if(map=="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
        var url=featureProp["thumbnail"];
        var imgPreloader=new Image();
        imgPreloader.onload=function() {
            //ロード完了で画像を表示
            $("#" + map + " .img-loading").hide();
            $("#" + map + " .wiki-img").attr({'src':url});
        };
        imgPreloader.src=url;
    }
    //-----------------------------------------------
    //ホバー関係をここに集めている。
    $("#map1").append('<div id="hoverMsg1-div" class="hoverMsg-div"></div>');
    $("#map2").append('<div id="hoverMsg2-div" class="hoverMsg-div"></div>');

    var hoverMsg1 = new ol.Overlay({
        element:$("#hoverMsg1-div")[0],
        autoPan:true
    });
    map1.addOverlay(hoverMsg1);
    var hoverMsg2 = new ol.Overlay({
        element:$("#hoverMsg2-div")[0],
        autoPan:true
    });
    map2.addOverlay(hoverMsg2);
    //-------------------------
    function funcPointerMove(evt,map){
        var pixel = eval(map).getPixelFromCoordinate(evt.coordinate);
        var feature = eval(map).forEachFeatureAtPixel(pixel,function(feature,layer){
            if(layer){
                //if(layer.getProperties()["name"]=="WikiCommonsLayer"){
                    return feature;
                //};
            }
        });
        if(feature){
            $(".ol-viewport").css({cursor:"pointer"});
            var prop =  feature.getProperties();
            var hoverText = prop["_hover"];

            //if(!feature) return;

            //console.log(feature.getGeometry());

            try {
                var coord = feature.getGeometry().getCoordinates();
            }catch(e){
                return;
            }

            if(hoverText) {
                var pic = null;
                for(var key in prop){
                    if(key!=="geometry") {
                        var match = prop[key].match(/<img.src(.*?)>/);
                        if(match){
                            pic = match[0];
                            break;
                        }
                    }
                }
                if(pic) hoverText = pic.replace("<img src='","<img src='./php/proxy-jpeg.php?url=") + "<br>" + hoverText;
                if (map === "map1") {
                    $("#hoverMsg1-div").html(hoverText).css({"color":prop["_fillColor"]});
                    hoverMsg1.setPosition(coord);
                } else {
                    $("#hoverMsg2-div").html(hoverText).css({"color":prop["_fillColor"]});
                    hoverMsg2.setPosition(coord);
                }
            }
        }else{
            $(".ol-viewport").css({cursor:""});
        }
    }
    //-------------------------
    map1.on("singleclick", function(evt) {
        hoverMsg1.setPosition(null);
    });
    map2.on("singleclick", function(evt) {
        hoverMsg2.setPosition(null);
    });
    //-------------------------
    hoverMsg1.getElement().addEventListener("click", function(event) {
        hoverMsg1.setPosition(null);
    }, false);
    hoverMsg2.getElement().addEventListener("click", function(event) {
        hoverMsg2.setPosition(null);
    }, false);
});