//旧日本軍地図
//宮崎
var am1_1 = new ol.layer.Tile({
    title:"宮崎県戦前地図（昭和7年頃）",
    origin:"<a href='http://stanford.maps.arcgis.com/apps/SimpleViewer/index.html?appid=733446cc5a314ddf85c59ecc10321b41' target='_blank'>スタンフォード大学</a>",
    detail:"",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    extent:transformE([131.25056622503527,31.836781105613056,131.50012046119798,32.00354506835566]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/miyazaki/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am1_2 = new ol.layer.Tile({
    title:"宮崎県戦前地図（昭和7年頃）",
    origin:"<a href='http://stanford.maps.arcgis.com/apps/SimpleViewer/index.html?appid=733446cc5a314ddf85c59ecc10321b41' target='_blank'>スタンフォード大学</a>",
    detail:"",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    extent:transformE([131.25056622503527,31.836781105613056,131.50012046119798,32.00354506835566]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/miyazaki/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
//都城
var am2_1 = new ol.layer.Tile({
    extent:transformE([130.999818018711,31.670127206260517,131.25056885722856,31.837115950360143]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/miyakonozyou/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am2_2 = new ol.layer.Tile({
    extent:transformE([130.999818018711,31.670127206260517,131.25056885722856,31.837115950360143]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/miyakonozyou/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am3_1 = new ol.layer.Tile({
    extent:transformE([131.500883873363,32.503524876287884,131.7502006552019,32.67010018951352]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/nobeoka/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am3_2 = new ol.layer.Tile({
    extent:transformE([131.500883873363,32.503524876287884,131.7502006552019,32.67010018951352]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/nobeoka/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am4_1 = new ol.layer.Tile({
    extent:transformE([131.5003418093163,32.336373434935794,131.75004587143377,32.50349612061554]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/hyuuga/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am4_2 = new ol.layer.Tile({
    extent:transformE([131.5003418093163,32.336373434935794,131.75004587143377,32.50349612061554]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/hyuuga/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am5_1 = new ol.layer.Tile({
    extent:transformE([130.75026485812523,31.836857349333087,130.9999048401102,32.00381013847621]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/kobayasi/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am5_2 = new ol.layer.Tile({
    extent:transformE([130.75026485812523,31.836857349333087,130.9999048401102,32.00381013847621]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/kobayasi/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am6_1 = new ol.layer.Tile({
    extent:transformE([131.25048827350017,31.335968278973056,131.5000544975787,31.503352310968538]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/kusima/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am6_2 = new ol.layer.Tile({
    extent:transformE([131.25048827350017,31.335968278973056,131.5000544975787,31.503352310968538]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/kusima/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am7_1 = new ol.layer.Tile({
    extent:transformE([131.250386182446,31.503349054230412,131.50022301037762,31.670255913045978]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/nitinan/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am7_2 = new ol.layer.Tile({
    extent:transformE([131.250386182446,31.503349054230412,131.50022301037762,31.670255913045978]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/nitinan/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am8_1 = new ol.layer.Tile({
    extent:transformE([131.25053423491997,31.670160398205866,131.50041310255244,31.836782766773325]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/oryuuzako/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am8_2 = new ol.layer.Tile({
    extent:transformE([131.25053423491997,31.670160398205866,131.50041310255244,31.836782766773325]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/oryuuzako/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am9_1 = new ol.layer.Tile({
    extent:transformE([131.25037453480826,32.17034863528973,131.5006754029662,32.33716014442463]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/osuzu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am9_2 = new ol.layer.Tile({
    extent:transformE([131.25037453480826,32.17034863528973,131.5006754029662,32.33716014442463]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/osuzu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am10_1 = new ol.layer.Tile({
    extent:transformE([130.99985741873192,31.836654818014196,131.25056885722856,32.00392682530581]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/noziri/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am10_2 = new ol.layer.Tile({
    extent:transformE([130.99985741873192,31.836654818014196,131.25056885722856,32.00392682530581]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/noziri/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am11_1 = new ol.layer.Tile({
    extent:transformE([131.25041338514575,32.00337180350894,131.50047390862383,32.17043035861637]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/tuma/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am11_2 = new ol.layer.Tile({
    extent:transformE([131.25041338514575,32.00337180350894,131.50047390862383,32.17043035861637]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/tuma/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am12_1 = new ol.layer.Tile({
    extent:transformE([131.00038318987654,31.336973011210645,131.25066895762924,31.503544477264697]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/sibusi/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am12_2 = new ol.layer.Tile({
    extent:transformE([131.00038318987654,31.336973011210645,131.25066895762924,31.503544477264697]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/sibusi/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am13_1 = new ol.layer.Tile({
    extent:transformE([131.00000725037037,31.503437165392768,131.25056885722856,31.67026915303441]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/sueyosi/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am13_2 = new ol.layer.Tile({
    extent:transformE([131.00000725037037,31.503437165392768,131.25056885722856,31.67026915303441]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/sueyosi/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am14_1 = new ol.layer.Tile({
    extent:transformE([130.75063786147157,31.669953693342137,131.0005857450508,31.837040474520208]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/kokubu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am14_2 = new ol.layer.Tile({
    extent:transformE([130.75063786147157,31.669953693342137,131.0005857450508,31.837040474520208]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/kokubu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am15_1 = new ol.layer.Tile({
    extent:transformE([131.00070055286884,32.00323830511229,131.25043203341363,32.170574861494984]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/suki/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am15_2 = new ol.layer.Tile({
    extent:transformE([131.00070055286884,32.00323830511229,131.25043203341363,32.170574861494984]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/suki/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am16_1 = new ol.layer.Tile({
    extent:transformE([130.75057242382138,32.00329033962615,131.00068655037254,32.170366661874354]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/kakutou/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am16_2 = new ol.layer.Tile({
    extent:transformE([130.75057242382138,32.00329033962615,131.00068655037254,32.170366661874354]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/kakutou/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am17_1 = new ol.layer.Tile({
    extent:transformE([131.00044068123879,32.16981882157501,131.25032068562584,32.337033023203276]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/murasyo/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am17_2 = new ol.layer.Tile({
    extent:transformE([131.00044068123879,32.16981882157501,131.25032068562584,32.337033023203276]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/murasyo/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
})
var am18_1 = new ol.layer.Tile({
    extent:transformE([131.25040068507633,32.33702753091045,131.50047458079487,32.5037771071228]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/mikado/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am18_2 = new ol.layer.Tile({
    extent:transformE([131.25040068507633,32.33702753091045,131.50047458079487,32.5037771071228]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/mikado/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am19_1 = new ol.layer.Tile({
    extent:transformE([131.00039859304007,32.336747591505144,131.2504079421723,32.50343232546682]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/siiba/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am19_2 = new ol.layer.Tile({
    extent:transformE([131.00039859304007,32.336747591505144,131.2504079421723,32.50343232546682]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/siiba/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am20_1 = new ol.layer.Tile({
    extent:transformE([131.25038460532747,32.50338275352104,131.5005051503587,32.67002352689943]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/morotuka/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am20_2 = new ol.layer.Tile({
    extent:transformE([131.25038460532747,32.50338275352104,131.5005051503587,32.67002352689943]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/morotuka/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am21_1 = new ol.layer.Tile({
    extent:transformE([131.00045001360684,32.503424859293176,131.25051249375718,32.67012814722169]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/kuraoka/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am21_2 = new ol.layer.Tile({
    extent:transformE([131.00045001360684,32.503424859293176,131.25051249375718,32.67012814722169]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/kuraoka/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am22_1 = new ol.layer.Tile({
    extent:transformE([131.50032905948035,32.67002808833402,131.7503455741878,32.83671444343426]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/kumada/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am22_2 = new ol.layer.Tile({
    extent:transformE([131.50032905948035,32.67002808833402,131.7503455741878,32.83671444343426]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/kumada/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am23_1 = new ol.layer.Tile({
    extent:transformE([131.25036694277364,32.67004814981307,131.50038266415572,32.836702959034625]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/mitai/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am23_2 = new ol.layer.Tile({
    extent:transformE([131.25036694277364,32.67004814981307,131.50038266415572,32.836702959034625]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/mitai/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am24_1 = new ol.layer.Tile({
    extent:transformE([131.00036466866217,32.67004107184289,131.25040300090123,32.83671325988827]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/takamori/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am24_2 = new ol.layer.Tile({
    extent:transformE([131.00036466866217,32.67004107184289,131.25040300090123,32.83671325988827]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/takamori/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am25_1 = new ol.layer.Tile({
    extent:transformE([131.500507939699,32.00243803833361,131.7493984466061,32.17034975581035]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/takanabenew/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am25_2 = new ol.layer.Tile({
    extent:transformE([131.500507939699,32.00243803833361,131.7493984466061,32.17034975581035]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/takanabenew/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am26_1 = new ol.layer.Tile({
    extent:transformE([131.5003627328563,32.17057323295701,131.7489722986756,32.336669620988346]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/tunonew/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var am26_2 = new ol.layer.Tile({
    extent:transformE([131.5003627328563,32.17057323295701,131.7489722986756,32.336669620988346]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/army/tunonew/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var amArr1 = [am1_1,am2_1,am3_1,am4_1,am5_1,am6_1,am7_1,am8_1,am9_1,am10_1,am11_1,am12_1,am13_1,
            am14_1,am15_1,am16_1,am17_1,am18_1,am19_1,am20_1,am21_1,am22_1,am23_1,am24_1,am25_1,am26_1];
var amArr2 = [am1_2,am2_2,am3_2,am4_2,am5_2,am6_2,am7_2,am8_2,am9_2,am10_2,am11_2,am12_2,am13_2,
            am14_2,am15_2,am16_2,am17_2,am18_2,am19_2,am20_2,am21_2,am22_2,am23_2,am24_2,am25_2,am26_2];