var popup1;
var popup2;
var senkyokuPyramidJson1;
var senkyokuPyramidJson2;
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
        var features = [];
        var layers = [];
        eval(map).forEachFeatureAtPixel(pixel,function(feature,layer){
            console.log(22222);
            features.push(feature);
            layers.push(layer);
        });
        console.log(features);
        if(!features.length) return;

        var layer = layers[layers.length-1];
        var feature = features[features.length-1];//最後のfeatureを取得している。レイヤーが重なったとき問題があるかも。
        var layerName = layer.getProperties()["name"];

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
            case "tunamimiyazaki":
                funcTunamimiyazakiPopup(feature,map,evt);
                break;
            case "tunamihokkaidou":
                funcTunamihokkaidouPopup(feature,map,evt);
                console.log(evt);
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
            case "bunkazai":
                console.log(feature.getProperties());
                funcBunkazaiPopup(feature,map,evt);
                break;
            case "kumamoto":
                console.log(feature.getProperties());
                funcKumamotoPopup(feature,map,evt);
                break;
            case "totiriyou":
                console.log(feature.getProperties());
                funcTotiriyouPopup(feature,map,evt);
                break;
            case "tositiiki":
                console.log(feature.getProperties());
                funcTositiikiPopup(feature,map,evt);
                break;
            case "noukenkikou1":
                console.log(feature.getProperties());
                funcNoukenkikouModal(feature,map,evt);
                break;
            case "zinsokugazou":
                console.log(feature.getProperties());
                funcNoukenkikouModal(feature,map,evt);
                break;
            case "zenkokuiseki":
                console.log(feature.getProperties());
                funcZenkokuisekiPopup(feature,map,evt);
                break;
            case "gunma":
                console.log(feature.getProperties());
                funcGunmaisekiPopup(feature,map,evt);
                break;
            case "bunkatyoudb":
                console.log(feature.getProperties());
                funcBunkatyoudbPopup(feature,map,evt);
                break;
            case "syougakkouku":
                console.log(feature.getProperties());
                funcSyougakkoukuPopup(feature,map,evt);
                break;
            case "tyuugakkouku":
                console.log(feature.getProperties());
                funcTyuugakkoukuPopup(feature,map,evt);
                break;
            case "sizentikei":
                console.log(feature.getProperties());
                funcSizentikeiPopup(feature,map,evt);
                break;
            case "iryouken":
                console.log(feature.getProperties());
                funcIryoukenPopup(feature,map,evt);
                break;
            case "senkyoku":
                console.log(feature.getProperties());
                funcSenkyokuPopup(feature,map,evt);
                break;
            case "mesh500":
                console.log(feature.getProperties());
                funcMesh500Popup(feature,map,evt);
                break;
            case "syougyou500m":
                console.log(feature.getProperties());
                funcSyougyou500mPopup(feature,map,evt);
                break;
            case "syougyou1000m":
                console.log(feature.getProperties());
                funcSyougyou1000mPopup(feature,map,evt);
                break;
            case "syougyou1000mGyoutai":
                console.log(feature.getProperties());
                funcSyougyou1000mGyoutaiPopup(feature,map,evt);
                break;
            case "syougyou1000mKibo":
                console.log(feature.getProperties());
                funcSyougyou1000mKiboPopup(feature,map,evt);
                break;
            case "suikei1000m":
                console.log(feature.getProperties());
                funcSuikei1000mPopup(feature,map,evt);
                break;
            case "keizaicensus":
                console.log(feature.getProperties());
                funcKeizaiCensusPopup(feature,map,evt);
                break;
            case "fukushi":
                console.log(feature.getProperties());
                funcFukushiPopup(feature,map,evt);
                break;
            case "genekiritu":
                console.log(feature.getProperties());
                funcGebekirituPopup(layer,feature,map,evt);
                break;
            case "zaiseiryoku":
                console.log(feature.getProperties());
                funcZaiseiryokuPopup(layer,feature,map,evt);
                break;
            case "editLayer":
                console.log(feature.getProperties());
                //funcGebekirituPopup(layer,feature,map,evt);
                break;

            default:
        }
    }
    //-----------------------------------------------
    function funcSuikei1000mPopup(feature,map,evt){
        var prop = feature.getProperties();
        var coord = evt.coordinate;
        console.log(prop);
        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover' style='250px'>";
            table += "<tr><th class='popup-th' style='width:170px;'>メッシュコード</th><td class='popup-td' style='width:80px;'>" + prop["MESH_ID"] + "</td></tr>";
            table += "<tr><th class='popup-th'>市区町村コード</th><td class='popup-td''>" + prop["CITY_CODE"] + "</td></tr>";
            table += "<tr><th class='popup-th'>2010年総人口（補正なし）</th><td class='popup-td'><b>" + prop["POP2010"] + "</b></td></tr>";
            table += "<tr><th class='popup-th'>2050年総人口（補正なし）</th><td class='popup-td'><b>" + prop["POP2050"] + "</b></td></tr>";
            table += "<tr><th class='popup-th'>指数（補正なし）</th><td class='popup-td''>" + prop["INDEX"] + "</td></tr>";
            table += "<tr><th class='popup-th'>2010年総人口（補正あり）</th><td class='popup-td'><b>" + prop["P2010HOSEI"] + "</b></td></tr>";
            table += "<tr><th class='popup-th'>2050年総人口（補正あり）</th><td class='popup-td'><b>" + prop["P2050HOSEI"] + "</b></td></tr>";
            table += "<tr><th class='popup-th'>指数（補正あり）</th><td class='popup-td'>" + prop["INDEXHOSEI"] + "</td></tr>";
            table += "<tr><th class='popup-th'>2050年 年少人口数</th><td class='popup-td'>" + prop["POP2050_A"] + "</td></tr>";
            table += "<tr><th class='popup-th'>2050年 年少人口の指数</th><td class='popup-td'>" + prop["INDEX_A"] + "</td></tr>";
            table += "<tr><th class='popup-th'>2050年 生産年齢人口数</th><td class='popup-td'>" + prop["POP2050_B"] + "</td></tr>";
            table += "<tr><th class='popup-th'>2050年 生産年齢人口の指数</th><td class='popup-td'>" + prop["INDEX_B"] + "</td></tr>";
            table += "<tr><th class='popup-th'>2050年 老年人口数</th><td class='popup-td'>" + prop["POP2050_C"] + "</td></tr>";
            table += "<tr><th class='popup-th'>2050年 老年人口の指数</th><td class='popup-td'>" + prop["INDEX_C"] + "</td></tr>";
            table += "<tr><th class='popup-th'>2050年 75歳以上人口数</th><td class='popup-td'>" + prop["POP2050_D"] + "</td></tr>";
            table += "<tr><th class='popup-th'>2050年 75歳以上人口の指数</th><td class='popup-td'>" + prop["INDEX_D"] + "</td></tr>";
        content += table;
        content = content.replace(/undefined/gi,"");
        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //-----------------------------------------------
    function funcSyougyou1000mKiboPopup(feature,map,evt){
        var prop = feature.getProperties();
        var coord = evt.coordinate;
        console.log(prop);
        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover' style='width:300px;'>";
        for(var i = 0; i <syugyou1kKiboAr.length; i++){
            var key = Object.keys(syugyou1kKiboAr[i])[0];
            var val = syugyou1kKiboAr[i][key];
            //console.log(key,val);
            table += "<tr><th class='popup-th' style='width:250px;text-align:left;'>" + val + "</th><td class='popup-td' style='width:50px;'>" + prop[key] + "</td></tr>";
        }
        content += table;
        content = content.replace(/undefined/gi,"");
        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //-----------------------------------------------
    function funcSyougyou1000mGyoutaiPopup(feature,map,evt){
        var prop = feature.getProperties();
        var coord = evt.coordinate;
        console.log(prop);
        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover' style='width:300px;'>";
        for(var i = 0; i <syugyou1kGyoutaiAr.length; i++){
            var key = Object.keys(syugyou1kGyoutaiAr[i])[0];
            var val = syugyou1kGyoutaiAr[i][key];
            //console.log(key,val);
            table += "<tr><th class='popup-th' style='width:250px;text-align:left;'>" + val + "</th><td class='popup-td' style='width:50px;'>" + prop[key] + "</td></tr>";
        }
        content += table;
        content = content.replace(/undefined/gi,"");
        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //-----------------------------------------------
    function funcSyougyou1000mPopup(feature,map,evt){
        var prop = feature.getProperties();
        var coord = evt.coordinate;
        console.log(prop);
        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover' style='width:300px;'>";
        for(var i = 0; i <syugyou1kAr.length; i++){
            var key = Object.keys(syugyou1kAr[i])[0];
            var val = syugyou1kAr[i][key];
            //console.log(key,val);
            table += "<tr><th class='popup-th' style='width:250px;text-align:left;'>" + val + "</th><td class='popup-td' style='width:50px;'>" + prop[key] + "</td></tr>";
        }
        content += table;
        content = content.replace(/undefined/gi,"");
        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //-----------------------------------------------
    function funcSyougyou500mPopup(feature,map,evt){
        var prop = feature.getProperties();
        var coord = evt.coordinate;
        console.log(prop);
        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover' style='width:300px;'>";
        table += "<tr><th class='popup-th' style='width:250px;'>小売業計 従業所数</th><td class='popup-td' style='width:50px;'>" + prop["s22"] + "</td></tr>";
        table += "<tr><th class='popup-th'>小売業計 従業者数</th><td class='popup-td'>" + prop["s23"] + "</td></tr>";
        table += "<tr><th class='popup-th'>小売業計 年間販売額（千万円）</th><td class='popup-td'>" + prop["s24"] + "</td></tr>";
        table += "<tr><th class='popup-th'>小売業計 売場面積（千㎡）</th><td class='popup-td'>" + prop["s25"] + "</td></tr>";
        table += "<tr><th class='popup-th'>各種商品小売業 従業所数</th><td class='popup-td'>" + prop["s26"] + "</td></tr>";
        table += "<tr><th class='popup-th'>各種商品小売業 年間販売額（千万円）</th><td class='popup-td'>" + prop["s27"] + "</td></tr>";
        table += "<tr><th class='popup-th'>織物・衣服・身の回り品小売業 従業所数</th><td class='popup-td'>" + prop["s28"] + "</td></tr>";
        table += "<tr><th class='popup-th'>織物・衣服・身の回り品小売業 年間販売額（千万円）</th><td class='popup-td'>" + prop["s29"] + "</td></tr>";
        table += "<tr><th class='popup-th'>飲食料品小売業 従業所数</th><td class='popup-td'>" + prop["s30"] + "</td></tr>";

        table += "<tr><th class='popup-th'>飲食料品小売業 年間販売額（千万円）</th><td class='popup-td'>" + prop["s31"] + "</td></tr>";
        table += "<tr><th class='popup-th'>機械器具小売業 従業所数</th><td class='popup-td'>" + prop["s32"] + "</td></tr>";
        table += "<tr><th class='popup-th'>機械器具小売業 年間販売額（千万円）</th><td class='popup-td'>" + prop["s33"] + "</td></tr>";
        table += "<tr><th class='popup-th'>その他の小売業 従業所数</th><td class='popup-td'>" + prop["s34"] + "</td></tr>";
        table += "<tr><th class='popup-th'>その他の小売業 年間販売額（千万円）</th><td class='popup-td'>" + prop["s35"] + "</td></tr>";
        table += "<tr><th class='popup-th'>無店舗小売業 従業所数</th><td class='popup-td'>" + prop["s36"] + "</td></tr>";
        table += "<tr><th class='popup-th'>無店舗小売業 年間販売額（千万円）</th><td class='popup-td'>" + prop["s37"] + "</td></tr>";
        table += "<tr><th class='popup-th'>従業者規模別 ４人以下</th><td class='popup-td'>" + prop["s38"] + "</td></tr>";
        table += "<tr><th class='popup-th'>従業者規模別 ５～２９人以下</th><td class='popup-td'>" + prop["s39"] + "</td></tr>";
        table += "<tr><th class='popup-th'>従業者規模別 ３０～４９人以下</th><td class='popup-td'>" + prop["s40"] + "</td></tr>";

        table += "<tr><th class='popup-th'>従業者規模別 ５０人以上</th><td class='popup-td'>" + prop["s41"] + "</td></tr>";
        table += "<tr><th class='popup-th'>年間販売額階級別 ２００万円未満</th><td class='popup-td'>" + prop["s42"] + "</td></tr>";
        table += "<tr><th class='popup-th'>年間販売額階級別 ２００～２０００万円未満</th><td class='popup-td'>" + prop["s43"] + "</td></tr>";
        table += "<tr><th class='popup-th'>年間販売額階級別 ２，０００～１億円未満</th><td class='popup-td'>" + prop["s44"] + "</td></tr>";
        table += "<tr><th class='popup-th'>年間販売額階級別 １億円以上</th><td class='popup-td'>" + prop["s45"] + "</td></tr>";
        table += "<tr><th class='popup-th'>売場面積規模別 ２０㎡未満</th><td class='popup-td'>" + prop["s46"] + "</td></tr>";
        table += "<tr><th class='popup-th'>売場面積規模別 ２０～５０㎡未満</th><td class='popup-td'>" + prop["s47"] + "</td></tr>";
        table += "<tr><th class='popup-th'>売場面積規模別 ５０～５００㎡未満</th><td class='popup-td'>" + prop["s48"] + "</td></tr>";
        table += "<tr><th class='popup-th'>売場面積規模別 ５００～１５００㎡未満</th><td class='popup-td'>" + prop["s49"] + "</td></tr>";
        table += "<tr><th class='popup-th'>売場面積規模別 １５００～３０００㎡未満</th><td class='popup-td'>" + prop["s50"] + "</td></tr>";

        table += "<tr><th class='popup-th'>売場面積規模別 ３０００㎡以上</th><td class='popup-td'>" + prop["s51"] + "</td></tr>";
        table += "<tr><th class='popup-th'>買回品業種 従業者数</th><td class='popup-td'>" + prop["s52"] + "</td></tr>";
        table += "<tr><th class='popup-th'>買回品業種 年間販売額（千万円）</th><td class='popup-td'>" + prop["s53"] + "</td></tr>";
        table += "<tr><th class='popup-th'>買回品業種 売場面積（千㎡）</th><td class='popup-td'>" + prop["s54"] + "</td></tr>";
        table += "<tr><th class='popup-th'>最寄品業種 従業者数</th><td class='popup-td'>" + prop["s55"] + "</td></tr>";
        table += "<tr><th class='popup-th'>最寄品業種 年間販売額（千万円）</th><td class='popup-td'>" + prop["s56"] + "</td></tr>";
        table += "<tr><th class='popup-th'>最寄品業種 売場面積（千㎡）</th><td class='popup-td'>" + prop["s57"] + "</td></tr>";
        table += "<tr><th class='popup-th'>各種商品小売業 従業者数</th><td class='popup-td'>" + prop["s58"] + "</td></tr>";
        //table += "<tr><th class='popup-th'>各種商品小売業 年間販売額（千万円）</th><td class='popup-td'>" + prop["s59"] + "</td></tr>";
        //table += "<tr><th class='popup-th'>各種商品小売業 売場面積（千㎡）</th><td class='popup-td'>" + prop["s60"] + "</td></tr>";

        table += "<tr><th class='popup-th'>その他の業種 従業者数</th><td class='popup-td'>" + prop["s61"] + "</td></tr>";
        //table += "<tr><th class='popup-th'>その他の業種 年間販売額（千万円）</th><td class='popup-td'>" + prop["s62"] + "</td></tr>";
        //table += "<tr><th class='popup-th'>その他の業種 売場面積（千㎡）</th><td class='popup-td'>" + prop["s63"] + "</td></tr>";
        table += "<tr><th class='popup-th'>百貨店 従業者数</th><td class='popup-td'>" + prop["s64"] + "</td></tr>";
        //table += "<tr><th class='popup-th'>百貨店 年間販売額（千万円）</th><td class='popup-td'>" + prop["s65"] + "</td></tr>";
        //table += "<tr><th class='popup-th'>百貨店 売場面積（千㎡）</th><td class='popup-td'>" + prop["s66"] + "</td></tr>";
        table += "<tr><th class='popup-th'>総合スーパー 従業者数</th><td class='popup-td'>" + prop["s67"] + "</td></tr>";
        //table += "<tr><th class='popup-th'>総合スーパー 年間販売額（千万円）</th><td class='popup-td'>" + prop["s68"] + "</td></tr>";
        //table += "<tr><th class='popup-th'>総合スーパー 売場面積（千㎡）</th><td class='popup-td'>" + prop["s69"] + "</td></tr>";
        table += "<tr><th class='popup-th'>専門スーパー 従業者数</th><td class='popup-td'>" + prop["s70"] + "</td></tr>";

        table += "<tr><th class='popup-th'>専門スーパー 年間販売額（千万円）</th><td class='popup-td'>" + prop["s71"] + "</td></tr>";
        table += "<tr><th class='popup-th'>専門スーパー 売場面積（千㎡）</th><td class='popup-td'>" + prop["s72"] + "</td></tr>";
        table += "<tr><th class='popup-th'>コンビニエンス・ストア 従業者数</th><td class='popup-td'>" + prop["s73"] + "</td></tr>";
        table += "<tr><th class='popup-th'>コンビニエンス・ストア 年間販売額（千万円）</th><td class='popup-td'>" + prop["s74"] + "</td></tr>";
        table += "<tr><th class='popup-th'>コンビニエンス・ストア 売場面積（千㎡）</th><td class='popup-td'>" + prop["s75"] + "</td></tr>";
        table += "<tr><th class='popup-th'>広義ドラッグストア 従業者数</th><td class='popup-td'>" + prop["s76"] + "</td></tr>";
        //table += "<tr><th class='popup-th'>広義ドラッグストア 年間販売額（千万円）</th><td class='popup-td'>" + prop["s77"] + "</td></tr>";
        //table += "<tr><th class='popup-th'>広義ドラッグストア 売場面積（千㎡）</th><td class='popup-td'>" + prop["s78"] + "</td></tr>";
        table += "<tr><th class='popup-th'>その他のスーパー 従業者数</th><td class='popup-td'>" + prop["s79"] + "</td></tr>";
        table += "<tr><th class='popup-th'>その他のスーパー 年間販売額（千万円）</th><td class='popup-td'>" + prop["s80"] + "</td></tr>";

        table += "<tr><th class='popup-th'>その他のスーパー 売場面積（千㎡）</th><td class='popup-td'>" + prop["s81"] + "</td></tr>";
        table += "<tr><th class='popup-th'>専門店 従業者数</th><td class='popup-td'>" + prop["s82"] + "</td></tr>";
        table += "<tr><th class='popup-th'>専門店 年間販売額（千万円）</th><td class='popup-td'>" + prop["s83"] + "</td></tr>";
        table += "<tr><th class='popup-th'>専門店 売場面積（千㎡）</th><td class='popup-td'>" + prop["s84"] + "</td></tr>";
        table += "<tr><th class='popup-th'>家電大型専門店 従業者数</th><td class='popup-td'>" + prop["s85"] + "</td></tr>";
        //table += "<tr><th class='popup-th'>家電大型専門店 年間販売額（千万円）</th><td class='popup-td'>" + prop["s86"] + "</td></tr>";
        //table += "<tr><th class='popup-th'>家電大型専門店 売場面積（千㎡）</th><td class='popup-td'>" + prop["s87"] + "</td></tr>";
        table += "<tr><th class='popup-th'>中心店 従業者数</th><td class='popup-td'>" + prop["s88"] + "</td></tr>";
        table += "<tr><th class='popup-th'>中心店 年間販売額（千万円）</th><td class='popup-td'>" + prop["s89"] + "</td></tr>";
        table += "<tr><th class='popup-th'>中心店 売場面積（千㎡）</th><td class='popup-td'>" + prop["s90"] + "</td></tr>";

        table += "<tr><th class='popup-th'>その他の小売店 従業者数</th><td class='popup-td'>" + prop["s91"] + "</td></tr>";
        //table += "<tr><th class='popup-th'>その他の小売店 年間販売額（千万円）</th><td class='popup-td'>" + prop["s92"] + "</td></tr>";
        //table += "<tr><th class='popup-th'>その他の小売店 売場面積（千㎡）</th><td class='popup-td'>" + prop["s93"] + "</td></tr>";
        table += "<tr><th class='popup-th'>無店舗販売 従業者数</th><td class='popup-td'>" + prop["s94"] + "</td></tr>";
        table += "<tr><th class='popup-th'>無店舗販売 年間販売額（千万円）</th><td class='popup-td'>" + prop["s95"] + "</td></tr>";
        table += "<tr><th class='popup-th'>無店舗販売 売場面積（千㎡）</th><td class='popup-td'>" + prop["s96"] + "</td></tr>";

        content += table;

        content = content.replace(/undefined/gi,"");

        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //-----------------------------------------------
    function funcZaiseiryokuPopup(layer,feature,map,evt){

        var infoDialog = $("#mydialog-" + map + "-info-dialog-zaiseiryoku");
        console.log(infoDialog.length);
        if(infoDialog.length) {
            console.log("あり")
        }else{
            console.log("なし")
        }

        console.log(feature);
        var prop = feature.getProperties();
        var coord = evt.coordinate;
        var cityCode = prop["citycode"];
        console.log(cityCode);
        var content = "";
        content += "<input type='hidden' class='city-code' value='" + cityCode + "'>";
        content += "<input type='hidden' class='city-name' value='" + prop["N03_004"] + "'>";
        content += "<div style='text-align:center;'><b>" + prop["N03_004"] + "</b></div><hr class='my-hr'>";
        content += "都道府県：" + prop["N03_001"] + "<br>";
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
    function funcGebekirituPopup(layer,feature,map,evt){
        console.log(feature);
        var prop = feature.getProperties();
        var coord = evt.coordinate;
        var cityCode = prop["citycode"];
        console.log(cityCode);
        var content = "";
        content += "<input type='hidden' class='city-code' value='" + cityCode + "'>";
        content += "<input type='hidden' class='city-name' value='" + prop["N03_004"] + "'>";
        content += "<div style='text-align:center;'><b>" + prop["N03_004"] + "</b></div><hr class='my-hr'>";
        content += "都道府県：" + prop["N03_001"] + "<br>";
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
    function funcFukushiPopup(feature,map,evt){
        var featureProp = feature.getProperties();
        var coord = evt.coordinate;
        console.log(featureProp);
        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
        for(key in featureProp){
            table += "<tr>";
            var prop = featureProp[key];
            table += "<th class='popup-th'>" + key + "</th><td class='popup-td'>" + prop + "</td>";
            table += "</tr>";
        }
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
        console.log(featureProp);

        var cyoufuku = featureProp["KIGO_E"];
        if(cyoufuku) {
            cyoufuku += " この地区は重複があります。そのため計算が不正確です。"
        }else{
            cyoufuku = "";
        }

        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
        table += "<tr><th class='popup-th' style='width:70px;'>コード</th><td class='popup-td'>" + featureProp["KEY_CODE"] + "</td></tr>";
        table += "<tr><th class='popup-th'>地区名</th><td class='popup-td'>" + featureProp["KEN_NAME"] + featureProp["CSS_NAME"] + featureProp["MOJI"] + "</td></tr>";
        table += "<tr><th class='popup-th'>重複フラグ</th><td class='popup-td'>" + cyoufuku + "</td></tr>";
        //table += "<tr><th class='popup-th'>事業所数</th><td class='popup-td'>" + featureProp["JIGYOSHO"] + "</td></tr>";
        //table += "<tr><th class='popup-th' style='font-weight: bold;'>従業員数</th><td class='popup-td' style='font-weight: bold;font-size: 20px;'>" + Math.floor(Number(featureProp["JUGYOSHA"])).toLocaleString() + "人</td></tr>";
        //table += "<tr><th class='popup-th'>面積</th><td class='popup-td'>" + Math.floor(Number(featureProp["AREA"])).toLocaleString() + "</td></tr>";

        //table += "<tr><th class='popup-th'>密度</th><td class='popup-td'>" + Number(featureProp["JINKO"])/Number(featureProp["AREA"]) + "</td></tr>";
        table += "</table>";

        var table2 = "事業所数<table class='popup-tbl table table-bordered table-hover'>";
        table2 += "<tr><th class='popup-th' style='width:180px;'>総数（Ａ〜Ｓ全産業）</th><td class='popup-td' style='width:50px;'>" + featureProp["T000843001"] + "</td></tr>";
        table2 += "<tr><th class='popup-th'>Ａ〜Ｒ全産業（Ｓ公務を除く）</th><td class='popup-td'>" + featureProp["T000843002"] + "</td></tr>";
        table2 += "<tr><th class='popup-th'>Ａ〜Ｂ農林漁業</th><td class='popup-td'>" + featureProp["T000843003"] + "</td></tr>";
        table2 += "<tr><th class='popup-th'>Ｃ〜Ｓ非農林漁業</th><td class='popup-td'>" + featureProp["T000843004"] + "</td></tr>";

        table2 += "<tr><th class='popup-th'>Ｃ〜Ｒ非農林漁業（Ｓ公務を除く）</th><td class='popup-td'>" + featureProp["T000843005"] + "</td></tr>";
        table2 += "<tr><th class='popup-th'>Ｃ鉱業、採石業、砂利採取業</th><td class='popup-td'>" + featureProp["T000843006"] + "</td></tr>";
        table2 += "<tr><th class='popup-th'>Ｄ建設業</th><td class='popup-td'>" + featureProp["T000843007"] + "</td></tr>";
        table2 += "<tr><th class='popup-th'>Ｅ製造業</th><td class='popup-td'>" + featureProp["T000843008"] + "</td></tr>";
        table2 += "<tr><th class='popup-th'>Ｆ電気・ガス・熱供給・水道業</th><td class='popup-td'>" + featureProp["T000843009"] + "</td></tr>";
        table2 += "<tr><th class='popup-th'>Ｇ情報通信業</th><td class='popup-td'>" + featureProp["T000843010"] + "</td></tr>";
        table2 += "<tr><th class='popup-th'>Ｈ運輸業、郵便業</th><td class='popup-td'>" + featureProp["T000843011"] + "</td></tr>";
        table2 += "<tr><th class='popup-th'>Ｉ卸売業、小売業</th><td class='popup-td'>" + featureProp["T000843012"] + "</td></tr>";
        table2 += "<tr><th class='popup-th'>Ｊ金融業、保険業</th><td class='popup-td'>" + featureProp["T000843013"] + "</td></tr>";
        table2 += "<tr><th class='popup-th'>Ｋ不動産業、物品賃貸業</th><td class='popup-td'>" + featureProp["T000843014"] + "</td></tr>";
        table2 += "<tr><th class='popup-th'>Ｌ学術研究、専門・技術サービス業</th><td class='popup-td'>" + featureProp["T000843015"] + "</td></tr>";
        table2 += "<tr><th class='popup-th'>Ｍ宿泊業、飲食サービス業</th><td class='popup-td'>" + featureProp["T000843016"] + "</td></tr>";
        table2 += "<tr><th class='popup-th'>Ｎ生活関連サービス業、娯楽業</th><td class='popup-td'>" + featureProp["T000843017"] + "</td></tr>";
        table2 += "<tr><th class='popup-th'>Ο教育、学習支援業</th><td class='popup-td'>" + featureProp["T000843018"] + "</td></tr>";
        table2 += "<tr><th class='popup-th'>Ｐ医療、福祉</th><td class='popup-td'>" + featureProp["T000843019"] + "</td></tr>";
        table2 += "<tr><th class='popup-th'>Ｑ複合サービス事業</th><td class='popup-td'>" + featureProp["T000843020"] + "</td></tr>";
        table2 += "<tr><th class='popup-th'>Ｒサービス業（他に分類されないもの）</th><td class='popup-td'>" + featureProp["T000843021"] + "</td></tr>";
        table2 += "<tr><th class='popup-th'>Ｓ公務（他に分類されるものを除く）</th><td class='popup-td'>" + featureProp["T000843022"] + "</td></tr>";
        table2 += "<tr><th class='popup-th'>１〜４人</th><td class='popup-td'>" + featureProp["T000843023"] + "</td></tr>";
        table2 += "<tr><th class='popup-th'>５〜９人</th><td class='popup-td'>" + featureProp["T000843024"] + "</td></tr>";
        table2 += "<tr><th class='popup-th'>１０〜１９人</th><td class='popup-td'>" + featureProp["T000843025"] + "</td></tr>";
        table2 += "<tr><th class='popup-th'>２０〜２９人</th><td class='popup-td'>" + featureProp["T000843026"] + "</td></tr>";
        table2 += "<tr><th class='popup-th'>３０人以上</th><td class='popup-td'>" + featureProp["T000843027"] + "</td></tr>";
        table2 += "<tr><th class='popup-th'>出向・派遣従業者のみ</th><td class='popup-td'>" + featureProp["T000843028"] + "</td></tr>";
        table2 += "</table>";

        var table3 = "従業者数<table class='popup-tbl table table-bordered table-hover'>";
        table3 += "<tr><th class='popup-th' style='width:180px;'>総数（Ａ〜Ｓ全産業）</th><td class='popup-td' style='width:50px;'>" + featureProp["T000843029"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>男総数（Ａ〜Ｓ全産業）</th><td class='popup-td'>" + featureProp["T000843030"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>女総数（Ａ〜Ｓ全産業）</th><td class='popup-td'>" + featureProp["T000843031"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>Ａ〜Ｒ全産業（Ｓ公務を除く）</th><td class='popup-td'>" + featureProp["T000843032"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>男Ａ〜Ｒ全産業（Ｓ公務を除く）</th><td class='popup-td'>" + featureProp["T000843033"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>女Ａ〜Ｒ全産業（Ｓ公務を除く）</th><td class='popup-td'>" + featureProp["T000843034"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>Ａ〜Ｂ農林漁業</th><td class='popup-td'>" + featureProp["T000843035"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>Ｃ〜Ｓ非農林漁業</th><td class='popup-td'>" + featureProp["T000843036"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>Ｃ〜Ｒ非農林漁業（Ｓ公務を除く）</th><td class='popup-td'>" + featureProp["T000843037"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>Ｃ鉱業、採石業、砂利採取業</th><td class='popup-td'>" + featureProp["T000843038"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>Ｄ建設業</th><td class='popup-td'>" + featureProp["T000843039"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>Ｅ製造業</th><td class='popup-td'>" + featureProp["T000843040"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>Ｆ電気・ガス・熱供給・水道業</th><td class='popup-td'>" + featureProp["T000843041"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>Ｇ情報通信業</th><td class='popup-td'>" + featureProp["T000843042"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>Ｈ運輸業、郵便業</th><td class='popup-td'>" + featureProp["T000843043"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>Ｉ卸売業、小売業</th><td class='popup-td'>" + featureProp["T000843044"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>Ｊ金融業、保険業</th><td class='popup-td'>" + featureProp["T000843045"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>Ｋ不動産業、物品賃貸業</th><td class='popup-td'>" + featureProp["T000843046"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>Ｌ学術研究、専門・技術サービス業</th><td class='popup-td'>" + featureProp["T000843047"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>Ｍ宿泊業、飲食サービス業</th><td class='popup-td'>" + featureProp["T000843048"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>Ｎ生活関連サービス業、娯楽業</th><td class='popup-td'>" + featureProp["T000843049"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>Ο教育、学習支援業</th><td class='popup-td'>" + featureProp["T000843050"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>Ｐ医療、福祉</th><td class='popup-td'>" + featureProp["T000843051"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>Ｑ複合サービス事業</th><td class='popup-td'>" + featureProp["T000843052"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>Ｒサービス業（他に分類されないもの）</th><td class='popup-td'>" + featureProp["T000843053"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>Ｓ公務（他に分類されるものを除く）</th><td class='popup-td'>" + featureProp["T000843054"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>１〜４人</th><td class='popup-td'>" + featureProp["T000843055"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>５〜９人</th><td class='popup-td'>" + featureProp["T000843056"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>１０〜１９人</th><td class='popup-td'>" + featureProp["T000843057"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>２０〜２９人</th><td class='popup-td'>" + featureProp["T000843058"] + "</td></tr>";
        table3 += "<tr><th class='popup-th'>３０人以上</th><td class='popup-td'>" + featureProp["T000843059"] + "</td></tr>";
        table3 += "</table>";

        content += table + table2 + table3;
        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //------------------------------------------------------------------------------------------------------------------
    function funcMesh500Popup(feature,map,evt){
        console.log(feature);
        var prop = feature.getProperties();
        var coord = evt.coordinate;
        console.log(prop)

        var h27 = 0;
        var h22 = 0;
        var h17 = 0;
        var h12 = 0;
        var h07 = 0;

        if(prop["h27"]) h27 = Number(prop["h27"]).toLocaleString();
        if(prop["h22"]) h22 = Number(prop["h22"]).toLocaleString();
        if(prop["h17"]) h17 = Number(prop["h17"]).toLocaleString();
        if(prop["h12"]) h12 = Number(prop["h12"]).toLocaleString();
        if(prop["h07"]) h07 = Number(prop["h07"]).toLocaleString();

        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
        table += "<tr><th class='popup-th' style='width:45px;'>コード</th><td class='popup-td' style='width:60px;'>" + prop["KEY_CODE"] + "</td></tr>";
        table += "<tr><th class='popup-th'>平成27年人口</th><td class='popup-td' style='text-align:right'>" + h27 + "人</td></tr>";
        table += "<tr><th class='popup-th'>平成22年人口</th><td class='popup-td' style='text-align:right'>" + h22 + "人</td></tr>";
        table += "<tr><th class='popup-th'>平成17年人口</th><td class='popup-td' style='text-align:right'>" + h17 + "人</td></tr>";
        table += "<tr><th class='popup-th'>平成12年人口</th><td class='popup-td' style='text-align:right'>" + h12 + "人</td></tr>";
        table += "<tr><th class='popup-th'>平成07年人口</th><td class='popup-td' style='text-align:right'>" + h07 + "人</td></tr>";
        table += "</table>";
        //content += table;
        content += "<div id='" + map + "chart500' style='height:130px;width:270px;'></div>";
        content += "<div id='" + map + "pie500' style='height:170px;width:270px;margin-top:-15px;'></div>";
        content += "<div style='position:absolute;top:5px;'>人口推移</div>";
        content += "<div style='position:absolute;top:135px;'>H27人口構成</div>";
        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
        var souzinkouAr = [];
        var timeAr = ["h07","h12","h17","h22","h27"];
        for(var i=0;i<timeAr.length;i++){
            if(prop[timeAr[i]]) {
                souzinkouAr.push(Number(prop[timeAr[i]]));
            }else{
                souzinkouAr.push(0);
            }
        }

        var mesh500GraphSeries = {
            "yAxis":0,
            "name":"総人口(人)",
            "data":souzinkouAr,
            "color":"green",
            "showInLegend":false
        };

        var mesh500Chart = Highcharts.chart({
            chart:{
                renderTo:map + "chart500",
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
            },
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    enabled: false
                }
            },
            plotOptions:{
                line:{
                    dataLabels:{
                        enabled:true
                    }
                }
            },
            title: {
                text:null
            },
            tooltip: {
                shared: true,
                crosshairs: true
            },
            series: [
                mesh500GraphSeries
            ]
        });

        var nensyou = Number(prop["T000847006"]);
        var seisan = Number(prop["T000847012"]);
        var rounen = Number(prop["T000847018"]);
        var hitoku = 0;

        var jinkouData =[];

        if(prop["HTKSYORI"]==="*") {
            jinkouData.push({
                name: "人数が少ないため秘匿",
                color: "indigo",
                y: 1
            })

        }else{
            jinkouData.push({
                name: "年少人口",
                color: "green",
                y: nensyou
            });
            jinkouData.push({
                name: "生産年齢人口",
                color: "blue",
                y: seisan
            });
            jinkouData.push({
                name: "老年人口",
                color: "red",
                y: rounen
            });
        }

        var mesh500Pie = Highcharts.chart({
            chart:{
                renderTo:map + "pie500",
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            credits:{
                enabled:false
            },
            title: {
                text: null
            },
            tooltip: {
                pointFormat: '<b>{point.y}人 {point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name:"jinkoukousei",
                colorByPoint: true,
                data:jinkouData
            }]
        });
    }

    /*
    var mesh500Pie = Highcharts.chart({
        chart:{
            renderTo:map + "pie500",
            type:"line",
            animation:true
            //aliginTicks:false
        },
        credits:{
            enabled:false
        },
    */
    /*
    Highcharts.chart(map + "pie500", {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },

        */


    //-----------------------------------------------
    function funcSenkyokuPopup(feature,map,evt){
        var featureProp = feature.getProperties();
        var coord = evt.coordinate;
        console.log(featureProp);
        var content = "<button type='button' class='btn btn-xs btn-primary btn-block' data-action='senkyoku-pyramid-btn'>人口ピラミッド</button><br>";
        content += "<input type='hidden' class='senkyoku-code' value='" + featureProp["kucode"] + "'>";
        content += "<input type='hidden' class='senkyoku-name' value='" + featureProp["kuname"] + "'>";
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
        for(key in featureProp){
            table += "<tr>";
            var prop = featureProp[key];
            var ninFlg = true;
            var tani = "";
            switch (key) {
                case "kucode":
                    key = "選挙区コード";
                    ninFlg = false;
                    break;
                case "kuname":
                    key = "選挙区名";
                    ninFlg = false;
                    break;
                case "ken":
                    key = "都道府県";
                    ninFlg = false;
                    break;
                case "ku":
                    key = "区";
                    ninFlg = false;
                    break;
                case "男_平均年齢":
                case "女_平均年齢":
                case "総数_平均年齢":
                    tani = "歳";
                    break;
                case "layer":
                    ninFlg = false;
                    break;
                default:
                    tani = "人"
            }
            if(ninFlg === true) {
                prop = prop.toLocaleString() + tani;
                table += "<th class='popup-th' style='width:150px;'>" + key + "</th><td class='popup-td' style='text-align:right;'>" + prop + "</td>";
            }else{
                if(key!=="layer") table += "<th class='popup-th' style='width:150px;'>" + key + "</th><td class='popup-td' style='width:100px;'>" + prop + "</td>";
            }
            table += "</tr>";
        }
        content += table;

        if(map==="map1") {
            popup1.show(coord,content);
            senkyokuPyramidJson1 = featureProp;
        }else{
            popup2.show(coord,content);
            senkyokuPyramidJson2 = featureProp;
        }
    }
    //------------------------------------------------------------------------------------------------------------------
    function funcIryoukenPopup(feature,map,evt){
        console.log(feature);
        var prop = feature.getProperties();
        var coord = evt.coordinate;
        console.log(prop);
        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
        table += "<tr><th class='popup-th'style='width:120px;'>市区町村名</th><td class='popup-td'>" + prop["A38b_002"] + "</td></tr>";
        table += "<tr><th class='popup-th'>二次医療圏コード</th><td class='popup-td'>" +　prop["A38b_003"] + "</td></tr>";
        table += "<tr><th class='popup-th'>二次医療圏名</th><td class='popup-td'>" +　prop["A38b_004"] + "</td></tr>";
        table += "<tr><th class='popup-th'>面積(医療計画)</th><td class='popup-td' style='text-align:right'>" +　prop["A38b_005"] + "m2</td></tr>";
        table += "<tr><th class='popup-th'>面積(住基)</th><td class='popup-td' style='text-align:right'>" +　prop["A38b_006"] + "m2</td></tr>";
        table += "<tr><th class='popup-th'>人口(医療計画)</th><td class='popup-td' style='text-align:right'>" +　prop["A38b_007"].toLocaleString() + "人</td></tr>";
        table += "<tr><th class='popup-th'>総人口(住基)</th><td class='popup-td' style='text-align:right'>" +　prop["A38b_008"].toLocaleString() + "人</td></tr>";
        table += "<tr><th class='popup-th'>15才未満人口(住基)</th><td class='popup-td' style='text-align:right'>" +　prop["A38b_009"].toLocaleString() + "人</td></tr>";
        table += "<tr><th class='popup-th'>15才以上65才未満人口(住基)</th><td class='popup-td' style='text-align:right'>" +　prop["A38b_010"].toLocaleString() + "人</td></tr>";
        table += "<tr><th class='popup-th'>65才以上人口(住基)</th><td class='popup-td' style='text-align:right'>" +　prop["A38b_011"].toLocaleString() + "人</td></tr>";

        table += "</table>";

        content += table;
        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //------------------------------------------------------------------------------------------------------------------
    function funcSizentikeiPopup(feature,map,evt){
        var featureProp = feature.getProperties();
        var coord = evt.coordinate;
        console.log(featureProp);
        var code = featureProp["code"];
        console.log(code);
        var landFormName="";
        var naritachi="";
        var risk="";
        for(var i=0;i<codeList_sizen2.length;i++){
            if(codeList_sizen2[i][0]==code){
                landFormName = codeList_sizen2[i][1];
                naritachi = codeList_sizen2[i][2];
                risk = codeList_sizen2[i][3];
                break;
            }
        }
        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
        table += "<tr><th class='popup-th'style='width:90px;'>code</th><td class='popup-td'>" + code + "</td></tr>";
        table += "<tr><th class='popup-th'>分類名</th><td class='popup-td'>" +　landFormName + "</td></tr>";
        table += "<tr><th class='popup-th'>成り立ち</th><td class='popup-td'>" +　naritachi + "</td></tr>";
        table += "<tr><th class='popup-th'>リスク</th><td class='popup-td'>" +　risk + "</td></tr>";
        table += "</table>";
        content += table;
        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //------------------------------------------------------------------------------------------------------------------
    function funcTyuugakkoukuPopup(feature,map,evt){
        console.log(feature);
        var featureProp = feature.getProperties();
        var coord = evt.coordinate;
        console.log(featureProp);
        var type = feature.getGeometry().getType();
        console.log(type);
        if(type==="Polygon") {
            var cityCode = featureProp["A32_006"];
            var syutai = featureProp["A32_007"];
            var meisyou = featureProp["A32_008"];
            var syozaiti = featureProp["A32_009"];
        }else{
            var cityCode = featureProp["A32_001"];
            var syutai = featureProp["A32_002"];
            var meisyou = featureProp["A32_003"];
            var syozaiti = featureProp["A32_004"];
        }

        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
        table += "<tr><th class='popup-th'style='width:90px;'>市区町村コード</th><td class='popup-td'>" + cityCode + "</td></tr>";
        table += "<tr><th class='popup-th'>設置主体</th><td class='popup-td'>" +　syutai + "</td></tr>";
        table += "<tr><th class='popup-th'>名称</th><td class='popup-td'>" +　meisyou + "</td></tr>";
        table += "<tr><th class='popup-th'>所在地</th><td class='popup-td'>" +　syozaiti + "</td></tr>";

        table += "</table>";

        content += table;
        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //------------------------------------------------------------------------------------------------------------------
    function funcSyougakkoukuPopup(feature,map,evt){
        console.log(feature);
        var featureProp = feature.getProperties();
        var coord = evt.coordinate;
        console.log(featureProp);
        var type = feature.getGeometry().getType();
        console.log(type);
        if(type==="Polygon") {
            var cityCode = featureProp["A27_005"];
            var syutai = featureProp["A27_006"];
            var meisyou = featureProp["A27_007"];
            var syozaiti = featureProp["A27_008"];
        }else{
            var cityCode = featureProp["A27_001"];
            var syutai = featureProp["A27_002"];
            var meisyou = featureProp["A27_003"];
            var syozaiti = featureProp["A27_004"];
        }

        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
        table += "<tr><th class='popup-th'style='width:90px;'>市区町村コード</th><td class='popup-td'>" + cityCode + "</td></tr>";
        table += "<tr><th class='popup-th'>設置主体</th><td class='popup-td'>" +　syutai + "</td></tr>";
        table += "<tr><th class='popup-th'>名称</th><td class='popup-td'>" +　meisyou + "</td></tr>";
        table += "<tr><th class='popup-th'>所在地</th><td class='popup-td'>" +　syozaiti + "</td></tr>";

        table += "</table>";

        content += table;
        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //-----------------------------------------------
    function funcGunmaisekiPopup(feature,map,evt){
        var featureProp = feature.getProperties();
        var coord = evt.coordinate;
        console.log(featureProp);
        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
        for(key in featureProp){
            table += "<tr>";
            var prop = featureProp[key];
            table += "<th class='popup-th'>" + key + "</th><td class='popup-td'>" + prop + "</td>";
            table += "</tr>";
        }
        content += table;

        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //-----------------------------------------------
    function funcBunkatyoudbPopup(feature,map,evt){
        var featureProp = feature.getProperties();
        var coord = evt.coordinate;
        console.log(featureProp);
        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
        for(key in featureProp){
            table += "<tr>";
            var prop = featureProp[key];
            console.log(key);

            if(key=="名称"){
                var daityouId = featureProp["台帳ID"];
                var taisyouId = featureProp["管理対象ID"];
                console.log(daityouId);
                console.log(taisyouId);
                prop = "<a href='http://kunishitei.bunka.go.jp/bsys/maindetails.asp?register_id=" + daityouId + "&item_id=" + taisyouId + "' target='_blank'>" + prop + "</a>";
                console.log(prop);
            }

            table += "<th class='popup-th' style='width:100px;'>" + key + "</th><td class='popup-td'>" + prop + "</td>";
            table += "</tr>";
        }
        content += table;
        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //-----------------------------------------------
    function funcZenkokuisekiPopup(feature,map,evt){
        var featureProp = feature.getProperties();
        var coord = evt.coordinate;
        console.log(featureProp);
        var content = "";
         var table = "<table class='popup-tbl table table-bordered table-hover'>";
         for(key in featureProp){
             if(key!=="layer") {
                 table += "<tr>";
                 var prop = featureProp[key];
                 console.log(String(prop).substr(0, 4));
                 if (String(prop).substr(0, 4) == "http") {
                     prop = "<a href='" + prop + "' target='_blank'>" + prop + "</a>";
                 }
                 table += "<th class='popup-th' style='width:110px;'>" + key + "</th><td class='popup-td'>" + prop + "</td>";
                 table += "</tr>";
             }
         }
         content += table;
        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //---------------------------------------------------
    function funcNoukenkikouModal(feature,map,evt){
        console.log(feature);
        var featureProp = feature.getProperties();
        console.log(featureProp);
        console.log(feature.getGeometry());
        var coord = evt.coordinate;
        console.log(featureProp);
        var maxHeight = $(window).height()-150;
        console.log(maxHeight);
        $("#modal-img-div").remove();
        var content = "";
        content += '<div class="modal fade" id="modal-img-div" tabindex="-1">';
        content += '<div class="modal-dialog modal-lg">';
        content += '<div class="modal-content">';
        content += '<div class="modal-header">';
        content += '<button type="button" class="close" data-dismiss="modal"><span>×</span></button>';
        content += '<h4 class="modal-title">';
        content += featureProp["ID"];
        content += '</h4>';
        content += '</div>';
        content += '<div class="modal-body">';
        content += '<div class="modal-img">';
        content += featureProp["画像"];
        content += '</div>';
        content += '</div>';
        //content += '<div class="modal-footer">';
        //content += '<button type="button" class="btn btn-default" data-dismiss="modal">閉じる</button>';
        //content += '</div>';
        content += '</div>';
        content += '</div>';
        content += '</div>';
        $("body").append(content);

        $(".modal-img img").css({
            "max-height":maxHeight + "px"
        });

        $("#modal-img-div").modal();

    }
    //-----------------------------------------------
    function funcTositiikiPopup(feature,map,evt){
        var featureProp = feature.getProperties();
        var geoType = feature.getGeometry().getType();
        if(geoType==="Point"){
            var coord = feature.getGeometry().getCoordinates();
        }else{
            var coord = evt.coordinate;
        }
        console.log(featureProp);

        var layerNo = featureProp["layer_no"];
        var name = "";
        switch (layerNo) {
            case 1://都市地域
                name = "都市地域";
                break;
            case 2://市街化区域
                name = "市街化区域";
                break;
            case 3://市街化調整区域
                name = "市街化調整区域";
                break;
            case 4://その他用途地域
                name = "その他用途地域";
                break;
        }

        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
        table += "<tr><th class='popup-th' style='width:70px;'>コード</th><td class='popup-td'>" + featureProp["layer_no"]  + "</td></tr>";
        table += "<tr><th class='popup-th'>区分</th><td class='popup-td'>" + name + "</td></tr>";
        table += "<tr><th class='popup-th'>年度</th><td class='popup-td'>" + featureProp["fis_year"] + "</td></tr>";
        table += "<tr><th class='popup-th'>面積</th><td class='popup-td'>" + featureProp["area_size"] + "</td></tr>";
        table += "</table>";
        content += table;
        /*
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
        for(key in featureProp){
            table += "<tr>";
            var prop = featureProp[key];
            table += "<th class='popup-th'>" + key + "</th><td class='popup-td'>" + prop + "</td>";
            table += "</tr>";
        }
        content += table;
        */

        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //-----------------------------------------------
    function funcKumamotoPopup(feature,map,evt){
        var featureProp = feature.getProperties();
        var coord = evt.coordinate;
        console.log(featureProp);
        console.log(featureProp["ITM01_NAME"])
        if(!featureProp["ITM01_NAME"]) {
            var th01 = "遺跡番号";
            var td01 = featureProp["m_cont1"];
            var th02 = "遺跡名称"
            var td02 = featureProp["m_cont2"];
            var th03 = "所在地";
            var td03 = featureProp["m_cont3"];
            var th04 = "時代";
            var td04 = featureProp["m_cont4"];
            var th05 = "種別";
            var td05 = featureProp["m_cont5"];
            var th06 = "指定分類";
            var td06 = featureProp["m_cont6"];
            var th07 = "概要";
            var td07 = featureProp["summary"];
        }else{
            var th01 = "遺跡番号";
            var td01 = featureProp["ITM01_VAL"];
            var th02 = "遺跡名称"
            var td02 = featureProp["ITM02_VAL"];
            var th03 = "備考1";
            var td03 = featureProp["ITM03_VAL"];
            var th04 = "備考2";
            var td04 = featureProp["ITM04_VAL"];
            var th05 = "備考3";
            var td05 = featureProp["ITM05_VAL"];
            var th06 = "指定分類";
            var td06 = featureProp["ITM06_VAL"];
            var th07 = "概要";
            var td07 = "";
        }

        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
        table += "<tr><th class='popup-th' style='width:60px;'>" + th01 + "</th><td class='popup-td'>" + td01  + "</td></tr>";
        table += "<tr><th class='popup-th'>" + th02 + "</th><td class='popup-td'>" + td02 + "</td></tr>";
        table += "<tr><th class='popup-th'>" + th03 + "</th><td class='popup-td'>" + td03 + "</td></tr>";
        table += "<tr><th class='popup-th'>" + th04 + "</th><td class='popup-td'>" + td04 + "</td></tr>";
        table += "<tr><th class='popup-th'>" + th05 + "</th><td class='popup-td'>" + td05 + "</td></tr>";
        table += "<tr><th class='popup-th'>" + th06 + "</th><td class='popup-td'>" + td06 + "</td></tr>";
        table += "<tr><th class='popup-th'>" + th07 + "</th><td class='popup-td'>" + td07 + "</td></tr>";
        //table += "<tr><th class='popup-th'>出典</th><td class='popup-td'>" + syutten + "</td></tr>";
        table += "</table>";
        content += table;

        /*
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
        for(key in featureProp){
            table += "<tr>";
            var prop = featureProp[key];
            table += "<th class='popup-th'>" + key + "</th><td class='popup-td'>" + prop + "</td>";
            table += "</tr>";
        }
        content += table;
        */

        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //-----------------------------------------------
    map1.on("singleclick", function(evt) {

        //totiriyoul1

        //if(mapName=="map1"){
            var layers = useLayersArr1;
        //}else{
        //    var layers = useLayersArr2;
       /// }

        $("#map1" + " .haikei-tbl tbody tr").each(function(e) {
            var text = $(this).find("label").text();
            var chk = $(this).find("input").prop("checked");

            if(text.indexOf("全国土地利用細分メッシュ")!=-1){
                //console.log(text);
                //console.log(chk);
                if(chk){
                    getPixelVale(evt.coordinate,"map1",function(targetRgba){
                        //console.log(targetRgba);
                        var r = targetRgba[0];
                        var g = targetRgba[1];
                        var b = targetRgba[2];
                        //console.log(r,g,b);
                        var targetColor = "rgb(" + r + "," + g + "," + b + ")";
                        //console.log(targetColor);
                        var totiriyouArFilter = totiriyouAr.filter(function (item,index) {
                            if(item.color==targetColor) return true;
                        });
                        console.log(totiriyouArFilter[0]["name"])

                        var coord = evt.coordinate;

                        var content = "";
                        var table = "<table class='popup-tbl table table-bordered table-hover'>";
                        table += "<tr><th class='popup-th'style='width:80px;'>メッシュ</th><td class='popup-td'></td></tr>";
                        table += "<tr><th class='popup-th'>土地利用種</th><td class='popup-td'>" +　totiriyouArFilter[0]["name"] + "</td></tr>";

                        table += "</table>";

                        content += table;
                        popup1.show(coord,content);

                    });
                }
            }
        });
    });
    function funcTotiriyouPopup(feature,map,evt){
        console.log(feature);
        var featureProp = feature.getProperties();
        console.log(featureProp);
        console.log(feature.getGeometry());
        var coord = evt.coordinate;
        console.log(featureProp);


        //syoukubunArはcommon.jsにいる。
        var targetTotiriyou = featureProp["土地利用種"];
        console.log(targetTotiriyou);
        var totiriyouArFilter = totiriyouAr.filter(function (item,index) {
            if(item.id==targetTotiriyou) return true;
        });
        console.log(totiriyouArFilter[0]);

        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
        table += "<tr><th class='popup-th'style='width:80px;'>メッシュ</th><td class='popup-td'>" + featureProp["メッシュ"] + "</td></tr>";
        table += "<tr><th class='popup-th'>土地利用種</th><td class='popup-td'>" +　totiriyouArFilter[0]["name"] + "</td></tr>";

        table += "</table>";

        content += table;
        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //-----------------------------------------------
    function funcBunkazaiPopup(feature,map,evt){
        console.log(feature);
        var featureProp = feature.getProperties();
        console.log(featureProp);
        var geoType = feature.getGeometry().getType();
        console.log(feature.getGeometry());
        //if(geoType==="Point"){
        //    var coord = feature.getGeometry().getCoordinates();
        //}else{
            var coord = evt.coordinate;
        //}
        console.log(featureProp);

        var daikubunAr =
            [
                {"id":"1","name":"有形文化財","color":""},
                {"id":"2","name":"無形文化財","color":""},
                {"id":"3","name":"民俗文化財","color":""},
                {"id":"4","name":"記念物","color":""},
                {"id":"5","name":"文化的景観","color":""},
                {"id":"6","name":"伝統的建造物群","color":""},
                {"id":"7","name":"文化財の保存技術","color":""}
            ];
        var targetId004 = featureProp["P32_004"];
        console.log(targetId004);
        var daikubunArFilter = daikubunAr.filter(function (item,index) {
            if(item.id==targetId004) return true;
        });
        console.log(daikubunArFilter[0]);

        //syoukubunArはcommon.jsにいる。
        var targetId005 = featureProp["P32_005"];
        console.log(targetId005);
        var syoukubunArFilter = syoukubunAr.filter(function (item,index) {
            if(item.id==targetId005) return true;
        });
        console.log(syoukubunArFilter[0]);

        var levelAr =
            [
                {"id":"1","name":"敷地・号・建物レベル","color":""},
                {"id":"2","name":"番地レベル","color":""},
                {"id":"3","name":"大字・町丁目レベル","color":""},
                {"id":"4","name":"市区町村レベル","color":""},
                {"id":"5","name":"都道府県レベル","color":""},
                {"id":"9","name":"緯度経度レベル","color":""}
            ];
        var targetId009 = featureProp["P32_009"];
        console.log(targetId009);
        var levelArFilter = levelAr.filter(function (item,index) {
            if(item.id==targetId009) return true;
        });
        console.log(levelArFilter[0]);

        var content = "";
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
        table += "<tr><th class='popup-th'style='width:80px;'>種別大区分</th><td class='popup-td'>" + daikubunArFilter[0]["name"] + "</td></tr>";
        table += "<tr><th class='popup-th'>種別小区分</th><td class='popup-td'>" +　syoukubunArFilter[0]["name"] + "</td></tr>";
        table += "<tr><th class='popup-th'>名称</th><td class='popup-td'>" + featureProp["P32_006"]  + "</td></tr>";
        table += "<tr><th class='popup-th'>所在地</th><td class='popup-td'>" + featureProp["P32_007"] + "</td></tr>";
        table += "<tr><th class='popup-th'>指定年月日</th><td class='popup-td'>" + featureProp["P32_008"]  + "</td></tr>";
        table += "<tr><th class='popup-th'>レベル</th><td class='popup-td'>" + levelArFilter[0]["name"] + "</td></tr>";
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
        table += "<tr><th class='popup-th'></th><td class='popup-td'>" + featureProp["SSerGrCD"] + "</td></tr>";
        table += "<tr><th class='popup-th' style='width:80px;'>土壌分類名</th><td class='popup-td'>" + featureProp["SoilName"]  + "</td></tr>";
        if(target) {
            table += "<tr><th class='popup-th'>説明</th><td class='popup-td'>" + target["detail"] + "</td></tr>";
            table += "<tr><th class='popup-th'>リンク</th><td class='popup-td'><a href='" + noukenUrl + target["url"] + "' target='_blank'>農研機構のページ</a></td></tr>";
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
    function funcYoutotiikiPopup(layer,feature,map,evt){

        var extent = eval(map).getView().calculateExtent(eval(map).getSize());
        console.log(extent);
        console.log(layer);
        console.log(layer.getSource());
        //console.log(layer.getSource().getFeatures());
        //layer.getSource().changed();
        //var prop = layer.getSource()["a"]["a"]["gd"]["f"][0]["c"];
        var prop = layer.getSource()["a"]["a"]["gd"]["f"];
        console.log(prop);

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
        table += "</table>";

        content += table;
        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    //-----------------------------------------------
    function funcTunamihokkaidouPopup(feature,map,evt){
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
        if(featureProp["MAX_SIN"]) {
            table += "<tr><th class='popup-th' style='width:70px;'>浸水想定</th><td class='popup-td'>" + featureProp["MAX_SIN"] + "メートル</td></tr>";
        }else{

            var level = featureProp["level"];
            var levelText = "";
            switch (level) {
                case 1://0.3
                    levelText = "0.3m未満";
                    break;
                case 2://1
                    levelText = "0.3m以上〜1m未満";
                    break;
                case 3://2
                    levelText = "1m以上〜2m未満";
                    break;
                case 4://2〜5
                    levelText = "2m以上〜5m未満";
                    break;
                case 5://10
                    levelText = "5m以上〜10m未満";
                    break;
                case 6://20
                    levelText = "10m以上〜20m未満";
                    break;
                case 7:
                    levelText = "20m以上";
                    break;
            }
            table += "<tr><th class='popup-th' style='width:70px;'>浸水想定</th><td class='popup-td'>" + levelText + "</td></tr>";
            table += "<tr><th class='popup-th'>備考</th><td class='popup-td'>ズームすると詳細な浸水想定を表示します。</td></tr>";
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
    function funcTunamimiyazakiPopup(feature,map,evt){
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
        if(featureProp["H_M"]) {
            table += "<tr><th class='popup-th' style='width:70px;'>浸水想定</th><td class='popup-td'>" + featureProp["H_M"] + "メートル</td></tr>";
        }else{
            table += "<tr><th class='popup-th' style='width:70px;'>浸水想定</th><td class='popup-td'>" + featureProp["A40_003"] + "メートル</td></tr>";
            table += "<tr><th class='popup-th'>備考</th><td class='popup-td'>ズームすると詳細な浸水想定を表示します。</td></tr>";
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
        var prop = feature.getProperties();
        var coord = evt.coordinate;
        console.log(prop);
        var content = "";
        console.log(prop["H22KA01_"]);
        if (prop["H17KA01_"]!==undefined) {
            content += "平成17年度国勢調査";
        }else if(prop["H22KA01_"]!==undefined) {
            content += "平成22年度国勢調査";
        }else{
            content += "平成27年度国勢調査";
        }
        var table = "<table class='popup-tbl table table-bordered table-hover'>";
            table += "<tr><th class='popup-th'>コード</th><td class='popup-td'>" + prop["KEY_CODE"] + "</td></tr>";
            table += "<tr><th class='popup-th'>自治体</th><td class='popup-td'>" + prop["KEN_NAME"] + prop["GST_NAME"] + "</td></tr>";
            table += "<tr><th class='popup-th'>小地域</th><td class='popup-td'>" + prop["MOJI"] + "</td></tr>";
            table += "<tr><th class='popup-th' style='font-weight: bold;'>人口</th><td class='popup-td' style='font-weight: bold;font-size: 20px;'>" + Math.floor(Number(prop["JINKO"])).toLocaleString() + "人</td></tr>";
            table += "<tr><th class='popup-th'>面積</th><td class='popup-td'>" + Math.floor(Number(prop["AREA"])).toLocaleString() + "</td></tr>";
            //table += "<tr><th class='popup-th'>密度</th><td class='popup-td'>" + Number(prop["JINKO"])/Number(prop["AREA"]) + "</td></tr>";
            table += "</table>";

            content += table;
            content += "人口ピラミッド<br>";
            content += "<div class='btn-group btn-group-justified' style='margin-bottom:3px;'>";
            content += "<div class='btn-group'><button type='button' class='btn btn-xs btn-primary' data-action='syoutiiki-H27-pyramid-btn'>H27</button></div>";
            content += "<div class='btn-group'><button type='button' class='btn btn-xs btn-primary' data-action='syoutiiki-pyramid-btn' data-estatcode='T000573'>H22</button></div>";
            content += "<div class='btn-group'><button type='button' class='btn btn-xs btn-primary' data-action='syoutiiki-pyramid-btn' data-estatcode='T000051'>H17</button></div>";
            content += "</div>";

            content += "<button type='button' class='btn btn-xs btn-primary btn-block' data-action='syoutiiki-suii-btn'>人口推移</button>";

            content += "<input type='hidden' class='pref-code' value='" + prop["KEN"] + "'>";
            content += "<input type='hidden' class='area-code' value='" + prop["KEY_CODE"] + "'>";
            content += "<input type='hidden' class='area-name' value='" + prop["MOJI"] + "'>";
            //content += "<input type='hidden' class='estat-code' value='" + estatCode + "'>";

        if(map==="map1") {
            popup1.show(coord,content);
        }else{
            popup2.show(coord,content);
        }
    }
    function funcSyoutiikiPyramid(mapName,estatCode,prefCode,areaCode,areaName){
        var tgtUrl = "http://api.e-stat.go.jp/rest/2.1/app/json/getStatsData?";
        $.ajax({
            type:"get",
            url:"php/proxy-estat-syoutiiki.php",
            dataType:"json",
            data:{
                tgtUrl:tgtUrl,
                statsDataId:estatCode + prefCode,
                //cdArea:"45201121003"
                cdArea:areaCode
                //cntGetFlg:"Y"
            }
        }).done(function(json){
            console.log(json);
            funcEstatPyramid(mapName,estatCode,areaCode,areaName,json["json"]);
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

        var estatCode = event["target"].getAttribute("data-estatcode");

        var senkyokuCode = contentElement.find(".senkyoku-code").val();
        var senkyokuName = contentElement.find(".senkyoku-name").val();


        if(action){
            switch (action) {
                case "pyramid-btn":
                    funcResasPyramid(mapName,cityCode,cityName);
                    break;
                case "zinkousuii-btn":
                    funcResasZinkousuii(mapName,cityCode,cityName);
                    break;
                case "syoutiiki-pyramid-btn":
                    funcSyoutiikiPyramid(mapName,estatCode,prefCode,areaCode,areaName);
                    break;
                case "syoutiiki-H27-pyramid-btn":
                    funcSyoutiikiH27Pyramid(mapName,prefCode,areaCode,areaName);
                    break;
                case "senkyoku-pyramid-btn":
                    funcSenkyokuPyramid(mapName,senkyokuCode,senkyokuName);
                    break;
                case "syoutiiki-suii-btn":
                    //alert("作成中");
                    funcSyoutiikiZinkousuii(mapName,prefCode,areaCode,areaName);
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
    function funcMesh500Popup未使用(feature,map,evt) {
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
            try {
                var coord = feature.getGeometry().getCoordinates();
            }catch(e){
                return;
            }
            if(hoverText) {
                var pic = null;
                var pic1 = null;
                for(var key in prop){
                    if(key!=="geometry") {
                        var match = prop[key].match(/<img.src(.*?)>/);
                        if(match){
                            pic = match[0];
                            pic1 = match[1];
                            break;
                        }
                    }
                }
                console.log(pic);
                console.log(pic1);

                //pic = pic.replace(/"/gi,"'");
                if(pic) hoverText = pic.replace("<img src='","<img src='./php/proxy-jpeg.php?url=") + "<br>" + hoverText;
                //if(pic) hoverText = pic.replace("<img src='","<img src='./php/proxy-jpeg.php?url=") + "<br>" + hoverText;
                console.log(hoverText);
                if (map === "map1") {
                    $("#hoverMsg1-div").html(hoverText).css({
                        "color":prop["_fillColor"],
                        //"border":"solid 1px dimgrey"
                    });
                    hoverMsg1.setPosition(coord);
                } else {
                    $("#hoverMsg2-div").html(hoverText).css({
                        "color":prop["_fillColor"]
                    });
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