//全国河川中心線----------------------------------------------------------------------------------------------------------
var suiro1 = new ol.layer.VectorTile({
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"全国河川中心線(MVT)",
    name:"suiro",
    origin:"<a href='https://github.com/hfu/rvrcl-vt' target='_blank'>rvrcl-vt</a>",
    detail:"",
    source: new ol.source.VectorTile({
        cacheSize:10000,
        format: new ol.format.MVT(),
        tileGrid: new ol.tilegrid.createXYZ({
            maxZoom:14
        }),
        tilePixelRatio:16,
        url: "https://hfu.github.io/rvrcl-vt/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:1222.99,
    style: suiroStyleFunction
});
var suiro2 = new ol.layer.VectorTile({
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"全国河川中心線(MVT)",
    name:"suiro",
    origin:"<a href='https://github.com/hfu/rvrcl-vt' target='_blank'>rvrcl-vt</a>",
    detail:"",
    source: new ol.source.VectorTile({
        cacheSize:10000,
        format: new ol.format.MVT(),
        tileGrid: new ol.tilegrid.createXYZ({
            maxZoom:14
        }),
        tilePixelRatio:16,
        url: "https://hfu.github.io/rvrcl-vt/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:1222.99,
    style: suiroStyleFunction
});
function suiroStyleFunction(feature, resolution) {
    var prop = feature.getProperties();
    var rivCtg = prop["rivCtg"];
    var type = prop["type"];
    var level = prop["level"];
    var strokeColor = "dodgerblue";
    var strokeWidth = 1;
    var lineDash = [];
    switch (rivCtg) {
        case "一級河川":
            strokeColor = "mediumblue";
            strokeWidth = 2;
            lineDash = [1];
            break;
        case "二級河川":
            strokeColor = "blue";
            strokeWidth = 2;
            lineDash = [1];
            break;
        default:
    }
    switch (type) {
        case "人工水路（地下）":
            strokeColor = "red";
            strokeWidth = 2;
            lineDash = [2,4];
            break;
        case "人工水路（空間）":
            strokeColor = "red";
            strokeWidth = 2;
            lineDash = [1];
            break;
        default:
    }
    if(resolution>611.50) strokeWidth = 1;
    var style = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: strokeColor,
            width: strokeWidth,
            lineDash:lineDash
        })
    });
    return style;
}
//全国河川中心線ここまで---------------------------------------------------------------------------------------------------
//全国道路中心線----------------------------------------------------------------------------------------------------------
var douro1 = new ol.layer.VectorTile({
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"全国道路中心線(MVT)",
    name:"douro",
    origin:"<a href='https://github.com/hfu/chome-vt' target='_blank'>chome-vt</a>",
    detail:"ズーム率14以上で全て描画します。<br>高速道路＝赤、国道＝緑、都道府県道＝黒、幅3m未満＝赤破線",
    source: new ol.source.VectorTile({
        cacheSize:10000,
        format: new ol.format.MVT(),
        tileGrid: new ol.tilegrid.createXYZ({
            minZoom:8,
            maxZoom:14
        }),
        tilePixelRatio:16,
        url: "https://hfu.github.io/rdcl-vt/{z}/{x}/{y}.mvt"
    }),
    maxResolution:1222.99,
    style: douroStyleFunction
});
var douro2 = new ol.layer.VectorTile({
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"全国道路中心線(MVT)",
    name:"douro",
    origin:"<a href='https://github.com/hfu/chome-vt' target='_blank'>chome-vt</a>",
    detail:"ズーム率14以上で全て描画します。<br>高速道路＝赤、国道＝緑、都道府県道＝黒、幅3m未満＝赤破線",
    source: new ol.source.VectorTile({
        cacheSize:10000,
        format: new ol.format.MVT(),
        tileGrid: new ol.tilegrid.createXYZ({
            minZoom:8,
            maxZoom:14
        }),
        tilePixelRatio:16,
        url: "https://hfu.github.io/rdcl-vt/{z}/{x}/{y}.mvt"
    }),
    maxResolution:1222.99,
    style: douroStyleFunction
});
function douroStyleFunction(feature, resolution) {
    var prop = feature.getProperties();
    var syurui = prop["rdCtg"];
    var haba = prop["rnkWidth"];
    var strokeColor = null;
    var strokeWidth = null;
    var lineDash = [];
    switch (syurui) {
        case "高速自動車国道等":
            strokeColor = "red";
            strokeWidth = 4;
            strokeColor = "red";
            lineDash = [1];
            break;
        case "国道":
            strokeColor = "green";
            strokeWidth = 4;
            lineDash = [1];
            break;
        case "都道府県道":
            strokeColor = "black";
            strokeWidth = 2;
            break;
        default:
            if(haba!="3m未満") {
                strokeColor = "blue";
                strokeWidth = 1;
                lineDash = [1];
            }else{
                strokeColor = "red";
                strokeWidth = 1;
                lineDash = [1,2];
            }
    }
    var style = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color:strokeColor,
            width: strokeWidth,
            lineDash:lineDash
        })
    });
    return style;
}
//全国道路中心線ここまで---------------------------------------------------------------------------------------------------
//全国用途地域-----------------------------------------------------------------------------------------------------------
var youtotiiki1 = new ol.layer.VectorTile({
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"全国用途地域(MVT)",
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
var youtotiikiCateTarget = 0;
var youtotiiki2 = new ol.layer.VectorTile({
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"全国用途地域(MVT)",
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
    style: youtotiikiStyleFunction
});
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
        var style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: rgba
            })
        });
    }
    return style;
}
//全国用途地域ここまで-----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
var m500mesh1 = new ol.layer.VectorTile({
    title:"500Mメッシュ(MVT)test",
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
//全国土壌図-------------------------------------------------------------------------------------------------------------
var dozyouzu1 = new ol.layer.VectorTile({
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"全国土壌図(MVT)",
    name:"dozyouzu",
    origin:"<a href='http://www.naro.affrc.go.jp/publicity_report/press/laboratory/niaes/074982.html' target='_blank'>農研機構</a>",
    detail:"",
    detail2:"<div style=''>" +
        "土壌分類選択:" +
        "<select class='dozyouzu-cate-select'>" +
        "<option value='99' selected>選択してください。</option>" +
        "<option value='0'>全て表示</option>" +
        //"<option value='A'>A造成土</option>" +
        "<option value='B'>B有機質土</option>" +
        "<option value='C'>Cポドゾル</option>" +
        "<option value='D'>D黒ボク土</option>" +
        "<option value='E'>E暗赤色土</option>" +
        "<option value='F'>F低地土</option>" +
        "<option value='G'>G赤黄色土</option>" +
        "<option value='H'>H停滞水成土</option>" +
        "<option value='I'>I褐色森林土</option>" +
        "<option value='J'>J未熟土</option>" +
        "<option value='Z'>Z市街地・水域・岩石等</option>" +
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
    style: dozyouzuStyleFunction,
    //renderMode:"vector"
    renderMode:"image"
});
var dozyouzu2 = new ol.layer.VectorTile({
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"全国土壌図(MVT)",
    name:"dozyouzu",
    origin:"<a href='http://www.naro.affrc.go.jp/publicity_report/press/laboratory/niaes/074982.html' target='_blank'>農研機構</a>",
    detail:"",
    detail2:"<div style=''>" +
        "土壌分類選択:" +
        "<select class='dozyouzu-cate-select'>" +
        "<option value='99' selected>選択してください。</option>" +
        "<option value='0'>全て表示</option>" +
        //"<option value='A'>A造成土</option>" +
        "<option value='B'>B有機質土</option>" +
        "<option value='C'>Cポドゾル</option>" +
        "<option value='D'>D黒ボク土</option>" +
        "<option value='E'>E暗赤色土</option>" +
        "<option value='F'>F低地土</option>" +
        "<option value='G'>G赤黄色土</option>" +
        "<option value='H'>H停滞水成土</option>" +
        "<option value='I'>I褐色森林土</option>" +
        "<option value='J'>J未熟土</option>" +
        "<option value='Z'>Z市街地・水域・岩石等</option>" +
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
            case "Z"://市街地／水域など
                switch (cate2){
                    case "1"://岩石地
                        rgba = "rgba(116,121,132,0.8)";
                        break;
                    case "2"://？？？
                        rgba = "red";
                        break;
                    case "3"://市街地／水域など
                        rgba = "rgba(255,255,255,0.8)";
                        break;
                }
                break;
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
//全国土壌図ここまで-------------------------------------------------------------------------------------------------------
//エコリス植生図----------------------------------------------------------------------------------------------------------
var syokusei1 = new ol.layer.VectorTile({
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"エコリス植生図(MVT)",
    name:"syokusei",
    origin:"<a href='http://map.ecoris.info/' target='_blank'><img src='icon/ecorischan.png' title='エコリスちゃん'>エコリス地図タイル</a>",
    detail:"第5回 自然環境保全基礎調査 植生調査結果を着色したものです。バイナリベクトルタイルの実験です。エコリス植生図(ラスタ)も参照してください。",
    detail2:"<div style=''>" +
        "植生で選択 " +
        "<select class='syokusei-cate-select'>" +
        "<option value='99' selected>選択してください。</option>" +
        "<option value='0'>全て表示</option>" +
        "<option value='1'>高山帯自然域植生</option>" +
        "<option value='2'>コケモモ-トウヒクラス域自然植生</option>" +
        "<option value='3'>コケモモ-トウヒクラス域代償植生</option>" +
        "<option value='4'>ブナクラス域自然植生</option>" +
        "<option value='5'>ブナクラス域代償植生</option>" +
        "<option value='6'>ヤブツバキクラス域自然植生</option>" +
        "<option value='7'>ヤブツバキクラス域代償植生</option>" +
        "<option value='8'>河辺・湿原・沼沢地・砂丘植生</option>" +
        "<option value='9'>植林地・耕作地植生</option>" +
        "<option value='10'>市街地等</option>" +
        "</select>" +
        "<br>植林で選択 " +
        "<select class='syokurin-cate-select'>" +
        "<option value='99' selected>選択してください。</option>" +
        "<option value='0'>全て表示</option>" +
        "<option value='b-常緑針葉樹植林'>常緑針葉樹植林</option>" +
        "<option value='b-スギ・ヒノキ・サワラ植林'>スギ・ヒノキ・サワラ植林</option>" +
        "<option value='b-スギ植林'>スギ植林</option>" +
        "<option value='b-スギ・ヒノキ植林'>スギ・ヒノキ植林</option>" +
        "<option value='b-開放水域'>開放水域</option>" +
        "</select></div>",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        tileGrid: new ol.tilegrid.createXYZ({
            //minZoom:10,
            maxZoom:15
        }),
        tilePixelRatio:16,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/ecoris/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:1222.99,
    style: syokuseizuStyleFunction
});
var syokusei2 = new ol.layer.VectorTile({
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"エコリス植生図(MVT)",
    name:"syokusei",
    origin:"<a href='http://map.ecoris.info/' target='_blank'><img src='icon/ecorischan.png' title='エコリスちゃん'>エコリス地図タイル</a>",
    detail:"第5回 自然環境保全基礎調査 植生調査結果を着色したものです。バイナリベクトルタイルの実験です。エコリス植生図(ラスタ)も参照してください。",
    detail2:"<div style=''>" +
    "植生で選択 " +
    "<select class='syokusei-cate-select'>" +
    "<option value='99' selected>選択してください。</option>" +
    "<option value='0'>全て表示</option>" +
    "<option value='1'>高山帯自然域植生</option>" +
    "<option value='2'>コケモモ-トウヒクラス域自然植生</option>" +
    "<option value='3'>コケモモ-トウヒクラス域代償植生</option>" +
    "<option value='4'>ブナクラス域自然植生</option>" +
    "<option value='5'>ブナクラス域代償植生</option>" +
    "<option value='6'>ヤブツバキクラス域自然植生</option>" +
    "<option value='7'>ヤブツバキクラス域代償植生</option>" +
    "<option value='8'>河辺・湿原・沼沢地・砂丘植生</option>" +
    "<option value='9'>植林地・耕作地植生</option>" +
    "<option value='10'>市街地等</option>" +
    "</select>" +
    "<br>植林で選択 " +
    "<select class='syokurin-cate-select'>" +
    "<option value='99' selected>選択してください。</option>" +
    "<option value='0'>全て表示</option>" +
    "<option value='b-常緑針葉樹植林'>常緑針葉樹植林</option>" +
    "<option value='b-スギ・ヒノキ・サワラ植林'>スギ・ヒノキ・サワラ植林</option>" +
    "<option value='b-スギ植林'>スギ植林</option>" +
    "<option value='b-スギ・ヒノキ植林'>スギ・ヒノキ植林</option>" +
    "<option value='b-開放水域'>開放水域</option>" +
    "</select></div>",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        tileGrid: new ol.tilegrid.createXYZ({
            //minZoom:10,
            maxZoom:15
        }),
        tilePixelRatio:16,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/ecoris/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:1222.99,
    style: syokuseizuStyleFunction
});
var syokuseiTarget = "0";
function syokuseizuStyleFunction(feature, resolution) {
    var prop = feature.getProperties();
    var SYOKU = prop["SYOKU_C"];
    //console.log(cate);
    var rgba = "rgba(0,0,0,0.5)";

    if(syokuseiTarget.substr(0,1)!=="b") {
        if (syokuseiTarget == SYOKU || syokuseiTarget == 0) {
            switch (SYOKU) {
                case 1://
                    rgba = "#fdf1ce";
                    break;
                case 2://
                    rgba = "#997f60";
                    break;
                case 3://
                    rgba = "#a58f74";
                    break;
                case 4://
                    rgba = "#178017";
                    break;
                case 5://
                    rgba = "#5b9700";
                    break;
                case 6://
                    rgba = "#003300";
                    break;
                case 7://
                    rgba = "#004a00";
                    break;
                case 8://
                    rgba = "#ffff00";
                    break;
                case 9://
                    rgba = "#8cd27d";
                    break;
                case 10://
                    //return;
                    rgba = "#868585";
                    break;
            }
            var DAI = prop["DAI_N"];
            switch (DAI) {
                case "植林地":
                    rgba = "#697720";
                    break;
                case "竹林":
                    rgba = "#cccc20";
                    break;
                case "牧草地・ゴルフ場・芝地":
                    rgba = "#69ff00";
                    break;
                case "耕作地":
                    rgba = "#999662";
                    break;
            }

            var HANREI = prop["HANREI_N"];
            switch (HANREI) {
                case "水田雑草群落":
                    rgba = "#8cd27d";
                    break;
                case "開放水域":
                    rgba = "#99ffff";
                    break;
                //-----------------------
                /*
                 case "常緑針葉樹植林":
                 rgba = "#fd4202";
                 break;
                 case "スギ・ヒノキ・サワラ植林":
                 rgba = "#fd4202";
                 break;
                 case "スギ植林":
                 rgba = "#fd4202";
                 break;
                 case "スギ・ヒノキ植林":
                 rgba = "#fd4202";
                 break;
                 */
            }
        } else {
            return;
        }
    }else{
        var HANREI = prop["HANREI_N"];

        if (syokuseiTarget.split("-")[1] == HANREI || syokuseiTarget == 0) {
            switch (HANREI) {
                case "常緑針葉樹植林":
                    rgba = "#fd4202";
                    break;
                case "スギ・ヒノキ・サワラ植林":
                    rgba = "#fd4202";
                    break;
                case "スギ植林":
                    rgba = "#fd4202";
                    break;
                case "スギ・ヒノキ植林":
                    rgba = "#fd4202";
                    break;
                case "開放水域":
                    rgba = "#99ffff";
                    break;
                //-----------------------
                /*
                 case "常緑針葉樹植林":
                 rgba = "#fd4202";
                 break;
                 case "スギ・ヒノキ・サワラ植林":
                 rgba = "#fd4202";
                 break;
                 case "スギ植林":
                 rgba = "#fd4202";
                 break;
                 case "スギ・ヒノキ植林":
                 rgba = "#fd4202";
                 break;
                 */
            }
        }else{
            return;
        }
        /*
        "<option value='b-常緑針葉樹植林'>常緑針葉樹植林</option>" +
        "<option value='b-スギ・ヒノキ・サワラ植林'>スギ・ヒノキ・サワラ植林</option>" +
        "<option value='b-スギ植林'>スギ植林</option>" +
        "<option value='b-スギ・ヒノキ植林'>スギ・ヒノキ植林</option>" +
        "<option value='b-開放水域'>開放水域</option>" +
        */

    }
    if(resolution<4.78) {//14は9.55
    //if(resolution<19.11) {//13
        //console.log(rgba)
        var text = prop["HANREI_N"];
        var textColor = "white";
        var style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: rgba
            }),
            stroke: new ol.style.Stroke({
                color: "darkgray",
                width: 1
            }),
            text: new ol.style.Text({
                font: "8px sans-serif",
                text: text,
                //rotation: prop["arrngAgl"],
                fill: new ol.style.Fill({
                    color:textColor
                }),
                /*
                stroke: new ol.style.Stroke({
                    color: "white",
                    width: 1
                })
                */
            })
        });
    }else{
        var style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: rgba
            })
        });
    }
    return style;
}
//エコリス植生図ここまで---------------------------------------------------------------------------------------------------
var bunkazai1 = new ol.layer.VectorTile({
    title:"全国文化財(MVT)test",
    name:"bunkazai",
    origin:"",
    detail:"",
    detail2:"<div style=''>" +
        "種類小区分選択:" +
        "<select class='syoukubun-cate-select'>" +
        "<option value='99' selected>選択してください。</option>" +
        "<option value='0'>全て表示</option>" +
        "<option value='11'>有形文化財</option>" +
        "<option value='21'>無形文化財</option>" +
        "<option value='31'>有形民俗文化財</option>" +
        "<option value='32'>無形民俗文化財</option>" +
        "<option value='41'>史跡（旧跡を含む）</option>" +
        "<option value='42'>名勝</option>" +
        "<option value='43'>天然記念物</option>" +
        "<option value='51'>重要文化的景観</option>" +
        "<option value='61'>伝統的建造物群保存地区</option>" +
        "<option value='71'>選定保存技術</option>" +
        "</select></div>",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        tileGrid: new ol.tilegrid.createXYZ({
            //minZoom:10,
            maxZoom:15
        }),
        tilePixelRatio:16,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/bunkazai2/{z}/{x}/{y}.mvt"
    }),
    maxResolution:1222.99,
    style: bunkazaiStyleFunction,
    renderMode:"vector"
    //renderMode:"image"
});
var syoukubunTarget = "0";
function bunkazaiStyleFunction(feature, resolution) {
    var prop = feature.getProperties();
    //var SYOKU = prop["SYOKU_C"];
    var targetId005 = prop["P32_005"];
    //console.log(targetId005);
    var syoukubunArFilter = syoukubunAr.filter(function (item,index) {
        if(item.id==targetId005) return true;
    });
    //console.log(syoukubunArFilter[0]);

    if(syoukubunTarget=="0" || syoukubunTarget==targetId005) {

    }else{
        return;
    }

    var fillColor = syoukubunArFilter[0]["color"];
    var style = new ol.style.Style({
        image: new ol.style.Circle({
            //radius:pointRadius,
            radius:8,
            fill: new ol.style.Fill({
                //color:fillColor ? fillColor : "orange"
                color: fillColor
            }),
            stroke: new ol.style.Stroke({color: "white", width: 1})
        })
    });
    return style;

}
//----------------------------------------------------------------------------------------------------------------------
var totiriyoul1 = new ol.layer.Tile({
    //secret:true,
    title:"全国土地利用細分メッシュtest",
    name:"totiriyou",
    origin:"",
    detail:"1",
    detail2:"<div style=''>" +
        "土地利用種選択:" +
        "<select class='totiriyou-cate-select'>" +
        "<option value='99' selected>選択してください。</option>" +
        "<option value='0'>全て表示</option>" +
        "<option value='0100'>田</option>" +
        "<option value='0200'>その他の農用地</option>" +
        "<option value='0500'>森林</option>" +
        "<option value='0600'>荒地</option>" +
        "<option value='0700'>建物用地</option>" +
        "<option value='0901'>道路</option>" +
        "<option value='0902'>鉄道</option>" +
        "<option value='1000'>その他の用地</option>" +
        "<option value='1100'>河川地及び湖沼</option>" +
        "<option value='1400'>海浜</option>" +
        "<option value='1500'>海水域</option>" +
        "<option value='1600'>ゴルフ場</option>" +
        "</select></div>",
    //icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.705,31.36,131.921,32.892]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/mvt/totiriyoul/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:11
    }),
    minResolution:38.22
});
//全国土地利用図
var totiriyou30001 = new ol.layer.VectorTile({
    title:"",
    name:"totiriyou",
    origin:"",
    detail:"",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        tileGrid: new ol.tilegrid.createXYZ({
            minZoom:12,
            maxZoom:15
        }),
        tilePixelRatio:16,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/totiriyou3000/{z}/{x}/{y}.mvt"
    }),
    maxResolution:38.22,
    style:totiriyouStyleFunction,
    //renderMode:"vector"
    //renderMode:"image"
});
var totiriyou40001 = new ol.layer.VectorTile({
    title:"",
    name:"totiriyou",
    origin:"",
    detail:"",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        tileGrid: new ol.tilegrid.createXYZ({
            minZoom:12,
            maxZoom:15
        }),
        tilePixelRatio:16,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/totiriyou4000/{z}/{x}/{y}.mvt"
    }),
    maxResolution:38.22,
    style:totiriyouStyleFunction,
    //renderMode:"vector"
    //renderMode:"image"
});
var totiriyou50001 = new ol.layer.VectorTile({
    title:"",
    name:"totiriyou",
    origin:"",
    detail:"",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        tileGrid: new ol.tilegrid.createXYZ({
            minZoom:12,
            maxZoom:15
        }),
        tilePixelRatio:16,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/totiriyou5000/{z}/{x}/{y}.mvt"
    }),
    maxResolution:38.22,
    style:totiriyouStyleFunction,
    //renderMode:"vector"
    renderMode:"image"
});
var totiriyou60001 = new ol.layer.VectorTile({
    title:"",
    name:"totiriyou",
    origin:"",
    detail:"",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        tileGrid: new ol.tilegrid.createXYZ({
            minZoom:12,
            maxZoom:15
        }),
        tilePixelRatio:16,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/totiriyou6000/{z}/{x}/{y}.mvt"
    }),
    maxResolution:38.22,
    style:totiriyouStyleFunction,
    //renderMode:"vector"
    renderMode:"image"
});
var totiriyou1 = [totiriyoul1,totiriyou30001,totiriyou40001,totiriyou50001,totiriyou60001];


var totiriyouTarget = "0";
function totiriyouStyleFunction(feature, resolution) {
    var prop = feature.getProperties();
    var fillColor = "black";
    var targetId = prop["土地利用種"];
    if(totiriyouTarget=="0" || totiriyouTarget==targetId) {
        var totiriyouArFilter = totiriyouAr.filter(function (item,index) {
            if(item.id==targetId) return true;
        });
        if(totiriyouArFilter[0]) fillColor = totiriyouArFilter[0]["color"];

        var style = new ol.style.Style({
            fill: new ol.style.Fill({
                color:fillColor
            })
        });
    }else{
        return;
    }
    return style;
}
//-----------------------------------------------------------------------------------------------------------------------
var kumamotoIseki1 = new ol.layer.VectorTile({
    icon:"<i class='fa fa-leaf fa-fw' style='color:darkgreen;'></i>",
    title:"熊本県遺跡(MVT)",
    name:"kumamoto",
    origin:"",
    detail:"",
    /*
     detail2:"<div style=''>" +
     "選択:" +
     "<select class='kumamoto-cate-select'>" +
     "<option value='99' selected>選択してください。</option>" +
     "<option value='0'>全て表示</option>" +
     "<option value='遺跡地図（富合町指定物件）'>遺跡地図（富合町指定物件）</option>" +
     "<option value='遺跡地図_その他（建造物、墓地など）'>遺跡地図_その他（建造物、墓地など）</option>" +
     "<option value='遺跡地図_その他（建造物、墓地など）（指定物件）'>遺跡地図_その他（建造物、墓地など）（指定物件）</option>" +
     "<option value='遺跡地図_横穴'>遺跡地図_横穴</option>" +
     "<option value='遺跡地図_横穴（指定物件）'>遺跡地図_横穴（指定物件）</option>" +
     "<option value='遺跡地図_古墳'>遺跡地図_古墳</option>" +
     "<option value='遺跡地図_古墳（指定物件）'>遺跡地図_古墳（指定物件）</option>" +
     "<option value='遺跡地図_寺院'>遺跡地図_寺院</option>" +
     "<option value='遺跡地図_寺院（指定物件）'>遺跡地図_寺院（指定物件）</option>" +
     "<option value='遺跡地図_寺院跡'>遺跡地図_寺院跡</option>" +
     "<option value='遺跡地図_寺院跡（指定物件）'>遺跡地図_寺院跡（指定物件）</option>" +
     "<option value='遺跡地図_城跡'>遺跡地図_城跡</option>" +
     "<option value='遺跡地図_城跡（指定物件）'>遺跡地図_城跡（指定物件）</option>" +
     "<option value='遺跡地図_神社（指定物件）'>遺跡地図_神社（指定物件）</option>" +
     "<option value='遺跡地図_神社跡'>遺跡地図_神社跡</option>" +
     "<option value='遺跡地図_石塔・石碑（指定物件）'>遺跡地図_石塔・石碑（指定物件）</option>" +
     "<option value='遺跡地図_大樹・老樹（指定物件）'>遺跡地図_大樹・老樹（指定物件）</option>" +
     "<option value='遺跡地図_窯跡'>遺跡地図_窯跡</option>" +
     "<option value='遺跡地図（富合町遺跡）'>遺跡地図（富合町遺跡）</option>" +
     "<option value='遺跡地図（城南町遺跡（点））'>遺跡地図（城南町遺跡（点））</option>" +
     "<option value='遺跡地図(富合町遺跡群）'>遺跡地図(富合町遺跡群）</option>" +
     "<option value='遺跡地図_遺跡群'></option>" +
     "<option value='遺跡地図_遺跡群（指定物件）'>遺跡地図_遺跡群（指定物件）</option>" +
     "<option value='遺跡地図（登録物件）'>遺跡地図（登録物件）</option>" +
     "<option value='遺跡地図（城南町遺跡）'></option>" +
     "</select></div>",
     */
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        tileGrid: new ol.tilegrid.createXYZ({
            maxZoom:16
        }),
        tilePixelRatio:16,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/kumamotoiseki3/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:152.87,
    style: kumamotoStyleFunction
});
var kumamotoIseki2 = new ol.layer.VectorTile({
    icon:"<i class='fa fa-leaf fa-fw' style='color:darkgreen;'></i>",
    title:"熊本県遺跡(MVT)",
    name:"kumamoto",
    origin:"",
    detail:"",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        tileGrid: new ol.tilegrid.createXYZ({
            maxZoom:16
        }),
        tilePixelRatio:16,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/kumamotoiseki3/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:152.87,
    style: kumamotoStyleFunction
});
var kumamotoIsekiTest2 = new ol.layer.VectorTile({
    title:"testtest",
    name:"kumamoto",
    origin:"",
    detail:"",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        tileGrid: new ol.tilegrid.createXYZ({
            maxZoom:16
        }),
        tilePixelRatio:16,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/kumamotoisekiline/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:152.87,
    //style: suiroStyleFunction
    style: kumamotoStyleFunction
});
var kumamotoTarget = "0";
function kumamotoStyleFunction(feature, resolution) {
    //console.log(feature);
    var prop = feature.getProperties();
    var geoType = feature.getGeometry().getType();
    //var fillColor = prop["_fillColor"];
    var zindex = prop["_zindex"];
    if(resolution>2445) {//ズーム６
        var pointRadius = 2;
    }else if(resolution>1222) {//ズーム７
        var pointRadius = 2;
    }else if(resolution>611){
        var pointRadius = 2;
    }else if(resolution>305) {
        var pointRadius = 2;
    }else if(resolution>152) {
        var pointRadius = 2;
    }else if(resolution>76) {
        var pointRadius = 2;
    }else if(resolution>38) {
        var pointRadius = 4;
    }else{
        var pointRadius = 6;
    }
    //console.log(geoType);
    switch (geoType){
        case "MultiLineString":
        case "LineString":
            //var lineDash = eval(prop["_lineDash"]);
            var style = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color:"red",
                    //lineDash:lineDash,
                    width:1
                })
            });
            break;
        case "MultiPoint":
        case "Point":
            if(resolution>305) break;
                var style = new ol.style.Style({
                image: new ol.style.Circle({
                    radius:pointRadius,
                    fill: new ol.style.Fill({
                        color:"orange"
                    }),
                    stroke: new ol.style.Stroke({
                        color: "white",
                        width: 1
                    })
                })
            });
            break;
        case "Polygon":
        case "MultiPolygon":
            /*
            if(fillColor==""){
                fillColor = d3CategoryColor(d3CategoryColorI);
                d3CategoryColorI++;
                //console.log(d3CategoryColorI)
                feature["I"]["_fillColor"] = fillColor;
            }
            */

            if(resolution<305) {
                var style = new ol.style.Style({
                    fill: new ol.style.Fill({
                        color:"rgba(0,128,0,0.8)"
                    }),
                    stroke: new ol.style.Stroke({
                        color: "gray",
                        width: 1
                    }),
                    zIndex: 0
                });
            }else{
                var style = new ol.style.Style({
                    fill: new ol.style.Fill({
                        color:"rgba(0,128,0,1.0)"
                    }),
                    zIndex: 0
                });
            }
            break;
        default:
    }
    return style;


    /*
    var prop = feature.getProperties();
    var fillColor = "black";
    var layerAr =
        [
            {"name":"遺跡地図（富合町指定物件）","color":"red"},
            {"name":"遺跡地図_その他（建造物、墓地など）","color":"green"},
            {"name":"遺跡地図_その他（建造物、墓地など）（指定物件）","color":"blue"},
            {"name":"遺跡地図_横穴","color":"gold"},
            {"name":"遺跡地図_横穴（指定物件）","color":"magenta"},//??
            {"name":"遺跡地図_古墳","color":"peru"},
            {"name":"遺跡地図_古墳（指定物件）","color":"mediumseagreen"},
            {"name":"遺跡地図_寺院","color":"springgreen"},
            {"name":"遺跡地図_寺院（指定物件）","color":"darkolivegreen"},
            {"name":"遺跡地図_寺院跡","color":"purple"},
            {"name":"遺跡地図_寺院跡（指定物件）","color":"navy"},
            {"name":"遺跡地図_城跡","color":"firebrick"},
            {"name":"遺跡地図_城跡（指定物件）","color":"lightseagreen"},
            {"name":"遺跡地図_神社（指定物件）","color":"chocolate"},
            {"name":"遺跡地図_神社跡","color":"rosybrown"},
            {"name":"遺跡地図_石塔・石碑（指定物件）","color":"deepskyblue"},
            {"name":"遺跡地図_大樹・老樹（指定物件）","color":"pink"},
            {"name":"遺跡地図_窯跡","color":"orange"},
            {"name":"遺跡地図（富合町遺跡）","color":"darkcyan"},
            {"name":"遺跡地図（城南町遺跡（点））","color":"maroon"},
            {"name":"遺跡地図(富合町遺跡群）","color":"darkslateblue"},
            {"name":"遺跡地図_遺跡群","color":"turquoise"},
            {"name":"遺跡地図_遺跡群（指定物件）","color":"chartreuse"},
            {"name":"遺跡地図（登録物件）","color":"olive"},
            {"name":"遺跡地図（城南町遺跡）","color":"crimson"},

        ];
    var targetName = prop["LAYER_NAME"];
    //console.log(targetName);
    var layerArFilter = layerAr.filter(function (item,index) {
        if(item.name==targetName) return true;
    });
    //console.log(layerArFilter[0]);

    if(layerArFilter[0]) fillColor = layerArFilter[0]["color"];

    var geoType = feature.getGeometry().getType();
    //console.log(geoType)
    switch (geoType) {
        case "LineString":
            var lineDash = eval(prop["_lineDash"]);
            var style = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: fillColor ? fillColor : "red",
                    lineDash: lineDash,
                    width: 6
                })
            });
            break;
        case "Point":
            var style = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 6,
                    fill: new ol.style.Fill({
                        color: fillColor ? fillColor : "orange"
                    }),
                    stroke: new ol.style.Stroke({color: "white", width: 1})
                }),
                Index:1
            });
            break;
        case "Polygon":
        case "MultiPolygon":
            if(fillColor==""){
                fillColor = d3CategoryColor(d3CategoryColorI);
                d3CategoryColorI++;
                //console.log(d3CategoryColorI)
                feature["I"]["_fillColor"] = fillColor;
            }
            var style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color:fillColor ? fillColor : "rgba(200,100,100,0.4)"
                }),
                stroke: new ol.style.Stroke({
                    color: "gray",
                    width: 1
                }),
                zIndex:0
            });
            break;
    }
    return style;
    */

}
//全国小地域人口等--------------------------------------------------------------------------------------------------------
var vtMaxColor = "indigo";
var vtColor = d3.interpolateLab("white",vtMaxColor);
var syoutiiki1 = new ol.layer.VectorTile({
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"全国小地域人口等(MVT)",
    name:"chome",
    origin:"<a href='https://github.com/hfu/chome-vt' target='_blank'>chome-vt</a>",
    detail:"",
    detail2:"<div style=''>強度：<input type='text' class='syoutiikitext' value='1000' size='5'>" +
    "　色："+
    "<select class='syoutiiki-color-select'>" +
    "<option value='indigo' selected>紫</option>" +
    "<option value='red'>赤</option>" +
    "<option value='green'>緑</option>" +
    "<option value='blue'>青</option>" +
    "<option value='black'>黒</option>" +
    "</select></div>",
    source: new ol.source.VectorTile({
        cacheSize:100000,
        format: new ol.format.MVT(),
        tileGrid: new ol.tilegrid.createXYZ({
            //minZoom:10,
            maxZoom:15
        }),
        tilePixelRatio:16,
        //url: "https://hfu.github.io/chome-vt/{z}/{x}/{y}.mvt"
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/zenkokukokusei4/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:1222.99,
    style: syoutiikiStyleFunction,
    //renderMode:"vector"
});
var syoutiiki2 = new ol.layer.VectorTile({
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"全国小地域人口等(MVT)",
    name:"chome",
    origin:"<a href='https://github.com/hfu/chome-vt' target='_blank'>chome-vt</a>",
    detail:"<div style=''>強度：<input type='text' class='syoutiikitext' value='1000' size='5'>" +
    "　色："+
    "<select class='syoutiiki-color-select'>" +
    "<option value='indigo' selected>紫</option>" +
    "<option value='red'>赤</option>" +
    "<option value='green'>緑</option>" +
    "<option value='blue'>青</option>" +
    "<option value='black'>黒</option>" +
    "</select></div>",
    source: new ol.source.VectorTile({
        cacheSize:100000,
        format: new ol.format.MVT(),
        //tileGrid: ol.tilegrid.createXYZ({maxZoom:12}),
        tileGrid: new ol.tilegrid.createXYZ({
            //minZoom:10,
            maxZoom:15
        }),
        tilePixelRatio:16,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/zenkokukokusei4/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:1222.99,
    style: syoutiikiStyleFunction
});
var kyoudo = 1000;
function syoutiikiStyleFunction(feature, resolution) {
    var prop = feature.getProperties();
    var val = Math.floor(prop["JINKO"]/(prop["AREA"]/200000));
    val = val/kyoudo;
    if(val>1) val = 1;
    var rgb = d3.rgb(vtColor(val));
    var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + val*0.9 + ")";
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
        if(val<0.2) return;
        var style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: rgba
            })
        });
    }
    return style;
}
//全国小地域人口等ここまで--------------------------------------------------------------------------------------------------
//経済センサス------------------------------------------------------------------------------------------------------------
var test = new ol.layer.VectorTile({
    title:"経済センサスtest(MVT)",
    name:"keizai-census",
    origin:"",
    detail:"",
    detail2:"<div style=''>強度：<input type='text' class='keizaitext' value='1000' size='5'>" +
        "　色："+
        "<select class='keizaicensus-color-select'>" +
        "<option value='indigo'>紫</option>" +
        "<option value='red' selected>赤</option>" +
        "<option value='green'>緑</option>" +
        "<option value='blue'>青</option>" +
        "<option value='black'>黒</option>" +
        "</select></div>",
    source: new ol.source.VectorTile({
        cacheSize:100000,
        format: new ol.format.MVT(),
        tileGrid: new ol.tilegrid.createXYZ({
            minZoom:10,
            maxZoom:15
        }),
        tilePixelRatio:16,
        //url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/keizaisensas/{z}/{x}/{y}.mvt"
        url: "https://kenzkenz.github.io/keizaicensus/mvt/{z}/{x}/{y}.mvt"

    }),
    //maxResolution:1222.99,
    style: keizaiCensasStyleFunction,
    //renderMode:"vector"
});
var keizaiMaxColor = "red";
var keizaiColor = d3.interpolateLab("white",keizaiMaxColor);
var kyoudoKeizai = 1000;
function keizaiCensasStyleFunction(feature, resolution) {
    var prop = feature.getProperties();
    var val = Math.floor(prop["JUGYOSHA"]/(prop["AREA"]/400000));
    val = val/kyoudoKeizai;
    if(val>1) val = 1;
    var rgb = d3.rgb(keizaiColor(val));
    var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + val*0.9 + ")";
    var text = prop["MOJI"] + "\n" + prop["JIGYOSHO"] + "事業所" + "\n" + prop["JUGYOSHA"] + "人";
    if(resolution<4.78) {
        var style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: rgba
            }),
            stroke: new ol.style.Stroke({
                color: "black",
                width: 1
            }),
            text: new ol.style.Text({
                font: "8px helvetica,sans-serif",
                text: text,
                fill: new ol.style.Fill({
                    color: "black"
                }),
                stroke: new ol.style.Stroke({
                    color: "white",
                    width: 3
                })
            })
        });
    }else if(resolution<125.87) {
        var style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: rgba
            }),
            stroke: new ol.style.Stroke({
                color: "black",
                width: 1
            })
        });
    }else{
        if(val<0.2) return;
        var style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: rgba
            })
        });
    }
    return style;
}
//経済センサスここまで-----------------------------------------------------------------------------------------------------
//全国都市地域------------------------------------------------------------------------------------------------------------
var tositiiki1 = new ol.layer.VectorTile({
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"全国都市地域(MVT)試行中",
    name:"tositiiki",
    origin:"",
    detail:"",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        tileGrid: new ol.tilegrid.createXYZ({
            //maxZoom:15
        }),
        tilePixelRatio:16,
        //url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/tositiiki2/{z}/{x}/{y}.mvt"
        //url: "https://kenzkenz.github.io/toshichiiki/{z}/{x}/{y}.mvt"
        url:'https://kenzkenz2.xsrv.jp/to/{z}/{x}/{y}.mvt'
    }),
    style: tositiikiStyleFunction

});
var tositiiki2 = new ol.layer.VectorTile({
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"全国都市地域(MVT)試行中",
    name:"tositiiki",
    origin:"",
    detail:"",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        tileGrid: new ol.tilegrid.createXYZ({
            maxZoom:10
        }),
        tilePixelRatio:16,
        //url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/tositiiki2/{z}/{x}/{y}.mvt"
        //url: "https://kenzkenz.github.io/keizaicensus/mvt/{z}/{x}/{y}.mvt"
        url:'https://kenzkenz2.xsrv.jp/to/{z}/{x}/{y}.mvt'
    }),
    style: tositiikiStyleFunction
});
function tositiikiStyleFunction(feature, resolution) {
    var prop = feature.getProperties();
    var layerNo = prop["layer_no"];
    //console.log(layerNo);
    var rgba = "black";
    var zindex = 0;
    switch (layerNo) {
        case 1://都市地域
            rgba = "rgba(40,152,53,0.7)";
            break;
        case 2://市街化区域
            rgba = "rgba(239,255,3,0.7)";
            zindex = 1;
            break;
        case 3://市街化調整区域
            rgba = "rgba(126,219,109,0.7)";
            break;
        case 4://その他用途地域
            rgba = "rgba(253,191,111,0.7)";
            break;
    }
    if(resolution<125.87) {
        var style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: rgba
            }),
            stroke: new ol.style.Stroke({
                color: "darkgray",
                width: 1
            }),
            zIndex:zindex
        });
    }else{
        var style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: rgba
            }),
            zIndex:zindex
        });
    }
    return style;
}


//全国都市地域ここまで-----------------------------------------------------------------------------------------------------