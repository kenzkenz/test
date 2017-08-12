
//var vtMaxColor = "indigo";
//var vtColor = d3.interpolateLab("white",vtMaxColor);
var youtotiiki1 = new ol.layer.VectorTile({
    title:"<span class='label label-default label-danger'>New</span>全国用途地域(MVT)",
    name:"youtotiiki",
    origin:"<a href='http://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A29.html' target='_blank'>国土数値情報　用途地域データ</a>",
    detail:"A29-11_01_GML～A29-11_47_GML 23年度",
    detail2:"<div style=''>" +
        "<select class='youtotiiki-cate-select'>" +
        "<option value='0' selected>全て表示</option>" +
        "<option value='1'>第一種低層住居専用地域</option>" +
        "<option value='2'>第二種低層住居専用地域</option>" +
        "<option value='3'>第一種中高層住居専用地域</option>" +
        "<option value='4'>第二種中高層住居専用地域</option>" +
        "<option value='5'>第一種住居地域</option>" +
        "<option value='6'>第二種住居地域</option>" +
        "<option value='7'>準住居地域</option>" +
        "<option value='8'>近隣商業地域</option>" +
        "<option value='9'>商業地域</option>" +
        "<option value='10'>準工業地域</option>" +
        "<option value='11'>工業地域</option>" +
        "<option value='12'>工業専用地域</option>" +
        "</select></div>",
    source: new ol.source.VectorTile({
        cacheSize:100000,
        /*
        format: new ol.format.MVT({
            featureClass: ol.Feature
        }),
        */
        format: new ol.format.MVT(),
        tileGrid: new ol.tilegrid.createXYZ({
            //minZoom:10,
            maxZoom:15
        }),
        tilePixelRatio:16,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/youtotiiki/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:1222.99,
    style: youtotiikiStyleFunction
});
var youtotiikiCateTarget = 0;
var youtotiiki2 = new ol.layer.VectorTile({
    title:"<span class='label label-default label-danger'>New</span>全国用途地域(MVT)",
    name:"youtotiiki",
    origin:"<a href='http://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A29.html' target='_blank'>国土数値情報　用途地域データ</a>",
    detail:"A29-11_01_GML～A29-11_47_GML 23年度",
    detail2:"<div style=''>" +
            "<select class='youtotiiki-cate-select'>" +
                "<option value='0' selected>全て表示</option>" +
                "<option value='1'>第一種低層住居専用地域</option>" +
                "<option value='2'>第二種低層住居専用地域</option>" +
                "<option value='3'>第一種中高層住居専用地域</option>" +
                "<option value='4'>第二種中高層住居専用地域</option>" +
                "<option value='5'>第一種住居地域</option>" +
                "<option value='6'>第二種住居地域</option>" +
                "<option value='7'>準住居地域</option>" +
                "<option value='8'>近隣商業地域</option>" +
                "<option value='9'>商業地域</option>" +
                "<option value='10'>準工業地域</option>" +
                "<option value='11'>工業地域</option>" +
                "<option value='12'>工業専用地域</option>" +
            "</select></div>",
    source: new ol.source.VectorTile({
        cacheSize:100000,
        format: new ol.format.MVT(),
        tileGrid: new ol.tilegrid.createXYZ({
            //minZoom:10,
            maxZoom:15
        }),
        tilePixelRatio:16,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/youtotiiki/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:1222.99,
    style: youtotiikiStyleFunction
});
//var kyoudo = 1000;
var youtoFeaturesFlg = false;
var youtoFeatures = [];
function youtotiikiStyleFunction(feature, resolution) {
    var prop = feature.getProperties();
    var cate = prop["A29_004"];
    var rgba = "rgba(255,0,0,0.5)";
    if(youtotiikiCateTarget==cate || youtotiikiCateTarget==0) {
        switch (cate) {
            case 1://第一種低層住居専用地域
                rgba = "rgba(51,204,153,0.8)";
                break;
            case 2://第二種低層住居専用地域
                rgba = "rgba(0,153,102,0.8)";
                break;
            case 3://第一種中高層住居専用地域
                rgba = "rgba(102,204,102,0.8)";
                break;
            case 4://第二種中高層住居専用地域
                rgba = "rgba(204,255,153,0.8)";
                break;
            case 5://第一種住居地域
                rgba = "rgba(255,255,153,0.8)";
                break;
            case 6://第二種住居地域
                rgba = "rgba(255,204,153,0.8)";
                break;
            case 7://準住居地域
                rgba = "rgba(255,204,102,0.8)";
                break;
            case 8://近隣商業地域
                rgba = "rgba(255,153,204,0.8)";
                break;
            case 9://商業地域
                rgba = "rgba(255,102,153,0.8)";
                break;
            case 10://準工業地域
                rgba = "rgba(204,153,255,0.8)";
                break;
            case 11://工業地域
                rgba = "rgba(204,255,255,0.8)";
                break;
            case 12://工業専用地域
                rgba = "rgba(102,204,255,0.8)";
                break;
            case 99://
                rgba = "rgba(0,0,0,0.8)";
                break;
        }
    }
    if(resolution<125.87) {
        var style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: rgba
            }),
            stroke: new ol.style.Stroke({
                color: "darkgray",
                width: 1
            })
        });
    }else{
        //if(val<0.2) return;
        var style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: rgba
            })
        });
    }
    return style;
}
//----------------------------------------------------------------------------------------------------------------------
var m500mesh1 = new ol.layer.VectorTile({
    title:"<span class='label label-default label-danger'>New</span>500Mメッシュ(MVT)test",
    name:"500mesh",
    origin:"",
    detail:"",
    detail2:"",
    source: new ol.source.VectorTile({
        //cacheSize:500000,
        /*
         format: new ol.format.MVT({
         featureClass: ol.Feature
         }),
         */


        format: new ol.format.MVT(),
        tileGrid: new ol.tilegrid.createXYZ({
            //minZoom:8,
            maxZoom:15
        }),
        tilePixelRatio:16,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/500mesh2/{z}/{x}/{y}.mvt"
    }),
    maxResolution:611.50,
    style: mesh500iStyleFunction
});
var meshMaxColor = "red";
var meshColor = d3.interpolateLab("white",meshMaxColor);
var meshKyoudo = 1000
function mesh500iStyleFunction(feature, resolution) {
    var prop = feature.getProperties();
    //var cate = prop["A29_004"];
    var rgba = "rgba(255,0,0,0.5)";
    //T000847003
    //T000846003

        var prop = feature.getProperties();
    /*
        if(resolution>38.22) {
            var val = prop["T000846003"];
        }else{
            var val = prop["T000847003"];
        }
    */

        var val = prop["T000847003"];
        if(!val){
            val = prop["T000846003"]/4;
        }

        //console.log(val)
        if(!val) val = 0;
        val = val/meshKyoudo;
        if(val>1) val = 1;
        var rgb = d3.rgb(meshColor(val));
        var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + val*0.9 + ")";
        if(resolution<19.11) {
            //if(val==0) return;
            var style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: rgba
                }),
                stroke: new ol.style.Stroke({
                    color: "darkgray",
                    width: 1
                })
            });
        }else{
            if(val<0.4) return;
            var style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: rgba
                })
            });
        }
        return style;
}

var dozyouzu1 = new ol.layer.VectorTile({
    title:"<span class='label label-default label-danger'>New</span>全国土壌図(MVT)",
    name:"dozyouzu",
    origin:"<a href='http://www.naro.affrc.go.jp/publicity_report/press/laboratory/niaes/074982.html' target='_blank'>農研機構</a>",
    detail:"",
    detail2:"<div style=''>" +
        "土壌分類選択:" +
        "<select class='dozyouzu-cate-select'>" +
        "<option value='0' selected>全て表示</option>" +
        "<option value='A'>造成土</option>" +
        "<option value='B'>有機質土</option>" +
        "<option value='C'>ポドゾル</option>" +
        "<option value='D'>黒ボク土</option>" +
        "<option value='E'>暗赤色土</option>" +
        "<option value='F'>低地土</option>" +
        "<option value='G'>赤黄色土</option>" +
        "<option value='H'>停滞水成土</option>" +
        "<option value='I'>褐色森林土</option>" +
        "<option value='J'>未熟土</option>" +
        "</select></div>",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        tileGrid: new ol.tilegrid.createXYZ({
            //minZoom:10,
            maxZoom:15
        }),
        tilePixelRatio:16,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/dozyouzu/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:1222.99,
    style: dozyouzuStyleFunction
});
var dozyouzu2 = new ol.layer.VectorTile({
    title:"<span class='label label-default label-danger'>New</span>全国土壌図(MVT)",
    name:"dozyouzu",
    origin:"<a href='http://www.naro.affrc.go.jp/publicity_report/press/laboratory/niaes/074982.html' target='_blank'>農研機構</a>",
    detail:"",
    detail2:"<div style=''>" +
    "土壌分類選択:" +
    "<select class='dozyouzu-cate-select'>" +
    "<option value='0' selected>全て表示</option>" +
    "<option value='A'>造成土</option>" +
    "<option value='B'>有機質土</option>" +
    "<option value='C'>ポドゾル</option>" +
    "<option value='D'>黒ボク土</option>" +
    "<option value='E'>暗赤色土</option>" +
    "<option value='F'>低地土</option>" +
    "<option value='G'>赤黄色土</option>" +
    "<option value='H'>停滞水成土</option>" +
    "<option value='I'>褐色森林土</option>" +
    "<option value='J'>未熟土</option>" +
    "</select></div>",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        tileGrid: new ol.tilegrid.createXYZ({
            //minZoom:10,
            maxZoom:15
        }),
        tilePixelRatio:16,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/dozyouzu/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:1222.99,
    style: dozyouzuStyleFunction
});
var dozyouzuTarget = "0";
function dozyouzuStyleFunction(feature, resolution) {
    var prop = feature.getProperties();
    //var cate = prop["SSerGrCD"];
    if(prop["SG_CD"]) {
        var cate = prop["SG_CD"].substr(0, 1);
        var cate2 = prop["SG_CD"].substr(1, 1);
    }else{
        return;
    }
    var rgba = "rgba(0,0,0,0.5)";
    if(dozyouzuTarget==cate || dozyouzuTarget==0) {

        switch (cate) {

            case "Z"://市街地／水域など
                rgba = "rgba(255,255,255,0.0)";
                break;
            case "A"://造成土
                var r = 255 - Number(cate2) * 10;
                rgba = "rgba(" + r + ",255,255,0.8)";
                break;
            case "B"://有機質土
                rgba = "rgba(0,0,0,0.8)";
                break;
            case "C"://ポドゾル
                rgba = "rgba(76,0,115,0.8)";
                break;

            case "D"://黒ボク土
                //console.log(cate2)
                switch (cate2){
                    case "1"://未熟黒ボク土
                        rgba = "rgba(245,150,79,0.8)";
                        break;
                    case "2"://グライ黒ボク土
                        rgba = "rgba(244,146,117,0.8)";
                        break;
                    case "3"://多湿黒ボク土
                        rgba = "rgba(232,71,57,0.8)";
                        break;
                    case "4"://褐色黒ボク土
                        rgba = "rgba(226,125,70,0.8)";
                        break;
                    case "5"://非アロフェン質黒ボク土
                        rgba = "rgba(137,101,97,0.8)";
                        break;
                    case "6"://アロフェン質黒ボク土
                        rgba = "rgba(156,67,54,0.8)";
                        //console.log(rgba);
                        break;
                }
                break;
                //var r = 168 + Number(cate2) * 10;
                //rgba = "rgba(" + r + ",56,0,0.8)";

                //rgba = "rgba(168,56,0,0.8)";
                //break;
            case "E"://暗赤色土
                switch (cate2){
                    case "1"://石灰性暗赤色土
                        rgba = "rgba(128,41,86,0.8)";
                        break;
                    case "2"://酸性暗赤色土
                        rgba = "rgba(194,30,139,0.8)";
                        break;
                    case "3"://塩基性暗赤色土
                        rgba = "rgba(235,52,149,0.8)";
                        break;
                }
                break;
                //var r = 115 + Number(cate2) * 10;
                //rgba = "rgba(" + r + ",0,0,0.8)";
                //break;
            case "F"://低地土
                switch (cate2){
                    case "1"://低地水田土
                        rgba = "rgba(26,115,186,0.8)";
                        break;
                    case "2"://グライ低地土
                        rgba = "rgba(82,62,153,0.8)";
                        break;
                    case "3"://灰色低地土
                        rgba = "rgba(48,41,104,0.8)";
                        break;
                    case "4"://褐色低地土
                        rgba = "rgba(0,138,172,0.8)";
                        break;
                    case "5"://未熟低地土
                        rgba = "rgba(0,172,228,0.8)";
                        break;
                }
                break;
                //var r = 0 + Number(cate2) * 10;
                //rgba = "rgba(" + r + ",112,255,0.8)";
                //break;
            case "G"://赤黄色土
                switch (cate2){
                    case "1"://粘土集積赤黄色土
                        rgba = "rgba(237,72,56,0.8)";
                        break;
                    case "2"://風化変質赤黄色土
                        rgba = "rgba(239,119,174,0.8)";
                        break;
                }
                break;
                //var r = 255 - Number(cate2) * 10;
                //rgba = "rgba(" + r + ",170,0,0.8)";
                //break;
            case "H"://停滞水成土
                switch (cate2){
                    case "1"://停滞水グライ土
                        rgba = "rgba(122,203,198,0.8)";
                        break;
                    case "2"://疑似グライ土
                        rgba = "rgba(164,209,134,0.8)";
                        break;
                }
                break;
                //var r = 0 + Number(cate2) * 10;
                //rgba = "rgba(" + r + ",255,197,0.8)";
                //break;
            case "I"://褐色森林土
                rgba = "rgba(0,149,83,0.8)";
                break;
            case "J"://未熟土
                switch (cate2){
                    case "1"://火山放出物未熟土
                        rgba = "rgba(217,172,139,0.8)";
                        break;
                    case "2"://砂質未熟土
                        rgba = "rgba(239,208,172,0.8)";
                        break;
                    case "3"://固結岩屑土
                        rgba = "rgba(204,202,63,0.8)";
                        break;
                    case "4"://陸成未熟土
                        rgba = "rgba(251,242,109,0.8)";
                        break;
                }
                break;
                //var r = 130 + Number(cate2) * 10;
                //rgba = "rgba(" + r + ",130,130,0.8)";
                //break;
        }

    }else{
        return;
    }
    if(resolution<125.87) {
        //console.log(rgba)
        var style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: rgba
            }),
            stroke: new ol.style.Stroke({
                color: "darkgray",
                width: 1
            })
        });
    }else{
        //if(val<0.2) return;
        var style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: rgba
            })
        });
    }
    return style;
}