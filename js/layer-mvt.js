//全国河川中心線----------------------------------------------------------------------------------------------------------
var suiro1 = new ol.layer.VectorTile({
    folder:"child",
    category:"ToshiDouroKasen",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"全国河川中心線(MVT)",
    name:"suiro",
    origin:"<a href='https://github.com/hfu/rvrcl-vt' target='_blank'>rvrcl-vt</a>",
    detail:"",
    source: new ol.source.VectorTile({
        cacheSize:10000,
        format: new ol.format.MVT(),
        maxZoom:14,
        url: "https://hfu.github.io/rvrcl-vt/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:1222.99,
    style: suiroStyleFunction
});
var suiro2 = new ol.layer.VectorTile({
    folder:"child",
    category:"ToshiDouroKasen",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"全国河川中心線(MVT)",
    name:"suiro",
    origin:"<a href='https://github.com/hfu/rvrcl-vt' target='_blank'>rvrcl-vt</a>",
    detail:"",
    source: new ol.source.VectorTile({
        cacheSize:10000,
        format: new ol.format.MVT(),
        maxZoom:14,
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
    folder:"child",
    category:"ToshiDouroKasen",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"全国道路中心線(MVT)",
    name:"douro",
    origin:"<a href='https://github.com/hfu/chome-vt' target='_blank'>chome-vt</a>",
    detail:"ズーム率14以上で全て描画します。<br>高速道路＝赤、国道＝緑、都道府県道＝黒、幅3m未満＝赤破線",
    source: new ol.source.VectorTile({
        cacheSize:10000,
        format: new ol.format.MVT(),
        maxZoom:14,
        url: "https://hfu.github.io/rdcl-vt/{z}/{x}/{y}.mvt"
    }),
    maxResolution:1222.99,
    style: douroStyleFunction
});
var douro2 = new ol.layer.VectorTile({
    folder:"child",
    category:"ToshiDouroKasen",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"全国道路中心線(MVT)",
    name:"douro",
    origin:"<a href='https://github.com/hfu/chome-vt' target='_blank'>chome-vt</a>",
    detail:"ズーム率14以上で全て描画します。<br>高速道路＝赤、国道＝緑、都道府県道＝黒、幅3m未満＝赤破線",
    source: new ol.source.VectorTile({
        cacheSize:10000,
        format: new ol.format.MVT(),
        maxZoom:14,
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
    folder:"child",
    category:"ToshiDouroKasen",
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
        maxZoom:15,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/youtotiiki/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:1222.99,
    //renderMode:"vector",
    style: youtotiikiStyleFunction
});
var youtotiikiCateTarget = 0;
var youtotiiki2 = new ol.layer.VectorTile({
    folder:"child",
    category:"ToshiDouroKasen",
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
        maxZoom:15,
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
    folder:"child",
    category:"test",
    title:"500Mメッシュ(MVT)test",
    name:"500mesh",
    origin:"",
    detail:"",
    detail2:"",
    source: new ol.source.VectorTile({
        format: new ol.format.MVT(),
        maxZoom:15,
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
    folder:"child",
    category:"tisitutikei",
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
        maxZoom:15,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/dozyouzu/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:1222.99,
    style: dozyouzuStyleFunction,
    //renderMode:"vector"
    renderMode:"image"
});
var dozyouzu2 = new ol.layer.VectorTile({
    folder:"child",
    category:"tisitutikei",
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
        maxZoom:15,
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
    folder:"child",
    category:"tisitutikei",
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
        maxZoom:15,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/ecoris/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:1222.99,
    style: syokuseizuStyleFunction
});
var syokusei2 = new ol.layer.VectorTile({
    folder:"child",
    category:"tisitutikei",
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
        maxZoom:15,
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
                exceedLength:true
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
//全国文化財-------------------------------------------------------------------------------------------------------------
var bunkazai1 = new ol.layer.VectorTile({
    folder:"child",
    category:"isekibunkazai",
    icon:"<i class='fa fa-leaf fa-fw' style='color:darkgreen;'></i>",
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
        maxZoom:15,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/bunkazai2/{z}/{x}/{y}.mvt"
    }),
    maxResolution:1222.99,
    style: bunkazaiStyleFunction,
    renderMode:"vector"
    //renderMode:"image"
});
var bunkazai2 = new ol.layer.VectorTile({
    folder:"child",
    category:"isekibunkazai",
    icon:"<i class='fa fa-leaf fa-fw' style='color:darkgreen;'></i>",
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
        maxZoom:15,
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
//全国文化財ここまで------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
var totiriyoul1 = new ol.layer.Tile({
    folder:"child",
    category:"test",
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
    folder:"child",
    category:"test",
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
    folder:"child",
    category:"test",
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
    folder:"child",
    category:"test",
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
    folder:"child",
    category:"test",
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
    folder:"child",
    category:"isekibunkazai",
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
        maxZoom:17,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/iseki/kumamotoken/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:152.87,
    style: kumamotoStyleFunction
});
var kumamotoIseki2 = new ol.layer.VectorTile({
    folder:"child",
    category:"isekibunkazai",
    icon:"<i class='fa fa-leaf fa-fw' style='color:darkgreen;'></i>",
    title:"熊本県遺跡(MVT)",
    name:"kumamoto",
    origin:"",
    detail:"",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:17,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/iseki/kumamotoken/{z}/{x}/{y}.mvt"
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
        maxZoom:16,
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
    var text = "";
    if(resolution<4.78) {
        if(prop["m_cont2"]) {
            text = prop["m_cont2"];
        }else{
            text = prop["ITM02_VAL"];
        }
    }
    switch (geoType){
        case "MultiLineString":
        case "LineString":
            var style = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color:"red",
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
                }),
                text: new ol.style.Text({
                    font: "8px sans-serif",
                    text: text,
                    offsetY:10,
                    stroke: new ol.style.Stroke({
                        color: "white",
                        width: 3
                    })
                })
            });
            break;
        case "Polygon":
        case "MultiPolygon":
            if(resolution<76) {
                var style = new ol.style.Style({
                    fill: new ol.style.Fill({
                        color:"rgba(0,128,0,0.8)"
                    }),
                    stroke: new ol.style.Stroke({
                        color: "gray",
                        width: 1
                    }),
                    text: new ol.style.Text({
                        font: "8px sans-serif",
                        text: text,
                        stroke: new ol.style.Stroke({
                            color: "white",
                            width: 3
                        })
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
}
//全国小地域人口等--------------------------------------------------------------------------------------------------------
//h17
var syoutiikiH17_1 = new ol.layer.VectorTile({
    folder:"child",
    category:"ZinkouKeizai",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"H17全国小地域人口等(MVT)",
    name:"chome",
    origin:"<a href='https://github.com/hfu/chome-vt' target='_blank'>chome-vt</a>",
    detail:"",
    detail2:"<div class='detail2-div'>強度：<input type='text' class='syoutiikitext' value='1000' size='5'>" +
        "　色："+
        "<select class='syoutiiki-color-select'>" +
            "<option value='indigo' selected>紫</option>" +
            "<option value='red'>赤</option>" +
            "<option value='green'>緑</option>" +
            "<option value='blue'>青</option>" +
            "<option value='black'>黒</option>" +
        "</select></div>",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:15,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/kokucyou/h17/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:1222.99,
    style: syoutiikiCommonStyleFunction("indigo",1000)
    //renderMode:"vector"
});
var syoutiikiH17_2 = new ol.layer.VectorTile({
    folder:"child",
    category:"ZinkouKeizai",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"H17全国小地域人口等(MVT)",
    name:"chome",
    origin:"<a href='https://github.com/hfu/chome-vt' target='_blank'>chome-vt</a>",
    detail:"",
    detail2:"<div class='detail2-div'>強度：<input type='text' class='syoutiikitext' value='1000' size='5'>" +
        "　色："+
        "<select class='syoutiiki-color-select'>" +
            "<option value='indigo' selected>紫</option>" +
            "<option value='red'>赤</option>" +
            "<option value='green'>緑</option>" +
            "<option value='blue'>青</option>" +
            "<option value='black'>黒</option>" +
        "</select></div>",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:15,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/kokucyou/h17/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:1222.99,
    style: syoutiikiCommonStyleFunction("indigo",1000)
    //renderMode:"vector"
});
function syoutiikiCommonStyleFunction(maxColor,limit) {
    //var maxColor = "red";
    var d3Color = d3.interpolateLab("white",maxColor);
    return function (feature, resolution) {
        var prop = feature.getProperties();
        var val = Math.floor(prop["JINKO"] / (prop["AREA"] / 200000));
        val = val / limit;
        if (val > 1) val = 1;
        var rgb = d3.rgb(d3Color(val));
        var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + val * 0.9 + ")";
        if (resolution < 125.87) {
            var style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: rgba
                }),
                stroke: new ol.style.Stroke({
                    color: "darkgray",
                    width: 1
                })
            });
        } else {
            if (val < 0.2) return;
            var style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: rgba
                })
            });
        }
        return style;
    }
}
//-------------------
//H22
var syoutiikiH22_1 = new ol.layer.VectorTile({
    folder:"child",
    category:"ZinkouKeizai",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"H22全国小地域人口等(MVT)",
    name:"chome",
    origin:"<a href='https://github.com/hfu/chome-vt' target='_blank'>chome-vt</a>",
    detail:"",
    detail2:"<div class='detail2-div'>強度：<input type='text' class='syoutiikitext' value='1000' size='5'>" +
    "　色："+
    "<select class='syoutiiki-color-select'>" +
        "<option value='indigo' selected>紫</option>" +
        "<option value='red'>赤</option>" +
        "<option value='green'>緑</option>" +
        "<option value='blue'>青</option>" +
        "<option value='black'>黒</option>" +
    "</select></div>",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:15,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/kokucyou/h22/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:1222.99,
    style: syoutiikiCommonStyleFunction("indigo",1000)
    //renderMode:"vector"
});
var syoutiikiH22_2 = new ol.layer.VectorTile({
    folder:"child",
    category:"ZinkouKeizai",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"H22全国小地域人口等(MVT)",
    name:"chome",
    origin:"<a href='https://github.com/hfu/chome-vt' target='_blank'>chome-vt</a>",
    detail:"",
    detail2:"<div class='detail2-div'>強度：<input type='text' class='hsyoutiikitext' value='1000' size='5'>" +
    "　色："+
    "<select class='syoutiiki-color-select'>" +
        "<option value='indigo' selected>紫</option>" +
        "<option value='red'>赤</option>" +
        "<option value='green'>緑</option>" +
        "<option value='blue'>青</option>" +
        "<option value='black'>黒</option>" +
    "</select></div>",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:15,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/kokucyou/h22/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:1222.99,
    style: syoutiikiCommonStyleFunction("indigo",1000)
    //renderMode:"vector"
});
function syoutiikiCommonStyleFunction(maxColor,limit) {
    //var maxColor = "red";
    var d3Color = d3.interpolateLab("white",maxColor);
    return function (feature, resolution) {
        var prop = feature.getProperties();
        var val = Math.floor(prop["JINKO"] / (prop["AREA"] / 200000));
        val = val / limit;
        if (val > 1) val = 1;
        var rgb = d3.rgb(d3Color(val));
        var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + val * 0.9 + ")";
        if (resolution < 125.87) {
            var style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: rgba
                }),
                stroke: new ol.style.Stroke({
                    color: "darkgray",
                    width: 1
                })
            });
        } else {
            if (val < 0.2) return;
            var style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: rgba
                })
            });
        }
        return style;
    }
}
//-------------------
//H27
var vtMaxColor = "indigo";
var vtColor = d3.interpolateLab("white",vtMaxColor);
var syoutiiki1 = new ol.layer.VectorTile({
    folder:"child",
    category:"ZinkouKeizai",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"H27全国小地域人口等(MVT)",
    name:"chome",
    origin:"<a href='https://github.com/hfu/chome-vt' target='_blank'>chome-vt</a>",
    detail:"",
    detail2:"<div class='detail2-div'>強度：<input type='text' class='syoutiikitext' value='1000' size='5'>" +
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
        maxZoom:15,
        url: "https://kenzkenz.github.io/h27syouchiiki_mvt/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:1222.99,
    style: syoutiikiCommonStyleFunction("indigo",1000),
    //renderMode:"vector"
});
var syoutiiki2 = new ol.layer.VectorTile({
    folder:"child",
    category:"ZinkouKeizai",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"H27全国小地域人口等(MVT)",
    name:"chome",
    origin:"<a href='https://github.com/hfu/chome-vt' target='_blank'>chome-vt</a>",
    detail:"<div class='detail2-div'>強度：<input type='text' class='syoutiikitext' value='1000' size='5'>" +
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
        maxZoom:15,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/zenkokukokusei4/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:1222.99,
    style: syoutiikiCommonStyleFunction("indigo",1000)
});
//全国小地域人口等ここまで--------------------------------------------------------------------------------------------------
//経済センサス------------------------------------------------------------------------------------------------------------
var test = new ol.layer.VectorTile({
    folder:"child",
    category:"test",
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
        maxZoom:15,
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
    folder:"child",
    category:"ToshiDouroKasen",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"全国都市地域(MVT)",
    name:"tositiiki",
    origin:"",
    detail:"",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:15,
        url:'https://kenzkenz2.xsrv.jp/to/{z}/{x}/{y}.mvt'
    }),
    style: tositiikiStyleFunction
});
var tositiiki2 = new ol.layer.VectorTile({
    folder:"child",
    category:"ToshiDouroKasen",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"全国都市地域(MVT)",
    name:"tositiiki",
    origin:"",
    detail:"",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:15,
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
//宮崎県津波浸水----------------------------------------------------------------------------------------------------------
var tunamiDetail2 =
    "<div class='detail2-div'>" +
    "　塗り分け選択："+
    "<select class='tunami-select'>" +
        "<option value='normal' selected>普通</option>" +
        "<option value='ao'>青色で無段階</option>" +
        "<option value='aka'>赤色で無段階</option>" +
    "</select>" +
    "</div>";
var tunamimiyazakimvt1 = new ol.layer.VectorTile({
    folder:"child",
    category:"test",
    title:"test(MVT)",
    name:"tunamimiyazaki",
    origin:"",
    detail:"",
    detail2:tunamiDetail2,
    icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:red;'></i>",
    source: new ol.source.VectorTile({
        //cacheSize:10000,
        overlaps:false,
        format: new ol.format.MVT(),
        maxZoom:19,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/tunamimiyazaki/{z}/{x}/{y}.mvt"
    }),
    crossOrigin:"anonymous",
    style: tunamiMiyazakiStyleFunction("normal")
});
/*
tunamimiyazakimvt1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'color'
});
*/
function tunamiMiyazakiStyleFunction(target) {
    return function (feature, resolution) {
        if(target==="ao") {
            var sinsuiColor = d3.interpolateLab("white", "navy");
        }else{
            var sinsuiColor = d3.interpolateLab("white", "darkred");
        }
        var prop = feature.getProperties();
        if (prop["H_M"]) {
            var level = prop["H_M"];
            if(target==="normal") {
                if (level < 0.3) {
                    fillColor = "rgba(0,255,0,0.7)";
                } else if (level < 1) {
                    fillColor = "rgba(255,230,0,0.7)";
                } else if (level < 2) {
                    fillColor = "rgba(255,153,0,0.7)";
                } else if (level < 5) {
                    fillColor = "rgba(239,117,152,0.7)";
                } else if (level < 10) {
                    fillColor = "rgba(255,40,0,0.7)";
                } else if (level < 20) {
                    fillColor = "rgba(180,0,104,0.7)";
                } else {
                    fillColor = "rgba(128,0,255,0.7)";
                }
            }else {
                fillColor = sinsuiColor(level / 10);
            }
        } else {
            var level = prop["level"];
            if(target==="normal") {
                switch (level) {
                    case 1://0.3
                        fillColor = "rgba(0,255,0,0.7)";
                        break;
                    case 2://1
                        fillColor = "rgba(255,230,0,0.7)";
                        break;
                    case 3://2
                        fillColor = "rgba(255,153,0,0.7)";
                        break;
                    case 4://2〜5
                        fillColor = "rgba(239,117,152,0.7)";
                        break;
                    case 5://10
                        fillColor = "rgba(255,40,0,0.7)";
                        break;
                    case 6://20
                        fillColor = "rgba(180,0,104,0.7)";
                        break;
                    case 7:
                        fillColor = "rgba(128,0,255,0.7)";
                        break;
                }
            }else {
                switch (level) {
                    case 1://0.3
                        level = 0.3;
                        break;
                    case 2://1
                        level = 1;
                        break;
                    case 3://2
                        level = 2;
                        break;
                    case 4://2〜5
                        level = 5;
                        break;
                    case 5://10
                        level = 10;
                        break;
                    case 6://20
                        level = 20;
                        break;
                    case 7:
                        level = 30;
                        break;
                }
                fillColor = sinsuiColor(level / 10);
            }
        }
         var text = "";
         if(resolution<0.30) {
            text = String(prop["H_M"]) + "M";
            //console.log(text)
         }
        var style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: fillColor
            }),
            text: new ol.style.Text({
                 font: "8px sans-serif",
                 text: text,
                 offsetY:10,
                 stroke: new ol.style.Stroke({
                     color: "white",
                     width: 3
                 }),
                exceedLength:true,
                /*
                placement:new ol.style.TextPlacement{
                     "line"
                }
                */
            })
            /*
             stroke: new ol.style.Stroke({
             color: "grey",
             width: 1
             }),
             */
            //zIndex:zindex
        });
        return style;
    }
}

var tunamimvt1 = new ol.layer.VectorTile({
    folder:"child",
    category:"hazard",
    title:"津波浸水想定区域(宮崎県)(MVT)",
    name:"tunamimvt",
    origin:"",
    detail:"",
    icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:red;'></i>",
    source: new ol.source.VectorTile({
        cacheSize:10000,
        format: new ol.format.MVT(),
        maxZoom:18,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/tunami/{z}/{x}/{y}.mvt"
    }),
    crossOrigin:"anonymous",
    //maxResolution:1222.99,
    //style: createMapboxStreetsV6Style()
    style: tunamiStyleFunction
});
var tunamimvt2 = new ol.layer.VectorTile({
    folder:"child",
    category:"hazard",
    title:"津波浸水想定区域(宮崎県)(MVT)",
    name:"tunamimvt",
    origin:"",
    detail:"",
    icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:red;'></i>",
    source: new ol.source.VectorTile({
        cacheSize:10000,
        format: new ol.format.MVT(),
        maxZoom:18,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/tunami/{z}/{x}/{y}.mvt"
    }),
    crossOrigin:"anonymous",
    //maxResolution:1222.99,
    //style: createMapboxStreetsV6Style()
    style: tunamiStyleFunction
});
function tunamiStyleFunction(feature, resolution) {
    var prop = feature.getProperties();
    var level = prop["level"];
    var fillColor = "black";
    switch (level) {
        case 1:
            fillColor = "rgba(0,255,0,0.7)";
            break;
        case 2:
            fillColor = "rgba(255,230,0,0.7)";
            break;
        case 3:
            fillColor = "rgba(255,153,0,0.7)";
            break;
        case 4:
            fillColor = "rgba(239,117,152,0.7)";
            break;
        case 5:
            fillColor = "rgba(255,40,0,0.7)";
            break;
        case 6:
            fillColor = "rgba(180,0,104,0.7)";
            break;
        case 7:
            fillColor = "rgba(128,0,255,0.7)";
            break;
    }

    var style = new ol.style.Style({
        fill: new ol.style.Fill({
            color:fillColor
        }),
        /*
         stroke: new ol.style.Stroke({
         color: "grey",
         width: 1
         }),
         */
        //zIndex:zindex
    });
    return style;
}
//宮崎県津波浸水ここまで---------------------------------------------------------------------------------------------------
//全国博物館-------------------------------------------------------------------------------------------------------------
var zenkokuHakubutukan1 = new ol.layer.VectorTile({
    folder:"child",
    category:"isekibunkazai",
    icon:"<i class='fa fa-leaf fa-fw' style='color:darkgreen;'></i>",
    title:"全国博物館等(MVT)test",
    name:"zenkokuiseki",
    origin:"<a href='https://savemlak.jp' target='_blank'>saveMLAK Community</a>",
    detail:"博物館・美術館、図書館、文書館、公民館の情報です。",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:17,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/iseki/hakubutukan/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:152.87,
    style: zenkokuhakubutukanStyleFunction
});
var zenkokuHakubutukan2 = new ol.layer.VectorTile({
    folder:"child",
    category:"isekibunkazai",
    icon:"<i class='fa fa-leaf fa-fw' style='color:darkgreen;'></i>",
    title:"全国博物館等(MVT)test",
    name:"zenkokuiseki",
    origin:"<a href='https://savemlak.jp' target='_blank'>saveMLAK Community</a>",
    detail:"博物館・美術館、図書館、文書館、公民館の情報です。",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:17,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/iseki/hakubutukan/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:152.87,
    style: zenkokuhakubutukanStyleFunction
});
function zenkokuhakubutukanStyleFunction(feature, resolution) {
    if(resolution>1222) return;
    var prop = feature.getProperties();

    if(resolution>305) {
        var pointRadius = 2;
    }else if(resolution>152) {
        var pointRadius = 4;
    }else if(resolution>76) {
        var pointRadius = 4;
    }else if(resolution>38) {
        var pointRadius = 4;
    }else{
        var pointRadius = 6;
    }
    var text = "";
    if(resolution<19.11) {
        text = prop["name"];
    }
    var fillColor = "blue";

    var name = prop["name"];
    if(name.indexOf("博物館")!==-1) {
        fillColor = "red";
    }else if(name.indexOf("美術館")!==-1){
        fillColor = "red";
    }else if(name.indexOf("図書館")!==-1){
        fillColor = "green";
    }
    var style = new ol.style.Style({
        image: new ol.style.Circle({
            radius:pointRadius,
            fill: new ol.style.Fill({
                color:fillColor
            }),
            /*
             stroke: new ol.style.Stroke({
             color: "white",
             width: 1
             })
             */
        }),
        text: new ol.style.Text({
            font: "8px sans-serif",
            text: text,
            offsetY:10,
            stroke: new ol.style.Stroke({
                color: "white",
                width: 3
            })
        })
    });
    return style;
}
//旧石器遺跡---------------------------------------------------------------------------------------------------------------
var zenkokuIseki1 = new ol.layer.VectorTile({
    folder:"child",
    category:"isekibunkazai",
    icon:"<i class='fa fa-leaf fa-fw' style='color:darkgreen;'></i>",
    title:"全国旧石器時代遺跡(MVT)",
    name:"zenkokuiseki",
    origin:"<a href='http://palaeolithic.jp/data/index.htm' target='_blank'>データベース『日本列島の旧石器時代遺跡』</a>の全国版遺跡データ(csv)",
    detail:"日本旧石器学会 ",
    detail2:"<div style=''>" +
        "石器種類:" +
        "<select class='kyuusekki-cate-select'>" +
            "<option value='99' selected>選択してください。</option>" +
            "<option value='0'>全て表示</option>" +
            "<option value='ナイフ形石器'>ナイフ形石器</option>" +
            "<option value='台形（様）石器'>台形（様）石器</option>" +
            "<option value='斧形石器'>斧形石器</option>" +
            "<option value='剥片尖頭器'>剥片尖頭器</option>" +
            "<option value='角錐状石器・三稜尖頭器'>角錐状石器・三稜尖頭器</option>" +
            "<option value='槍先形尖頭器'>槍先形尖頭器</option>" +
            "<option value='両面調整石器'>両面調整石器</option>" +
            "<option value='細石刃・細石核等'>細石刃・細石核等</option>" +
            "<option value='神子柴型石斧'>神子柴型石斧</option>" +
            "<option value='有茎（舌）尖頭器'>有茎（舌）尖頭器</option>" +
            "<option value='掻器・削器'>掻器・削器</option>" +
            "<option value='彫器'>彫器</option>" +
            "<option value='砥石'>砥石</option>" +
            "<option value='叩石'>叩石</option>" +
            "<option value='台石'>台石</option>" +
            "<option value='礫器'>礫器</option>" +
            "<option value='その他の石器'>その他の石器</option>" +
            "<option value='草創期土器'>草創期土器</option>" +
            "<option value='ブロック･ユニット'>ブロック･ユニット</option>" +
            "<option value='礫群・配石'>礫群・配石</option>" +
            "<option value='炭化物集中'>炭化物集中</option>" +
            "<option value='その他の遺構'>その他の遺構</option>" +
        "</select></div>",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:17,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/iseki/zenkoku/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:152.87,
    style: zenkokuisekiStyleFunction
});
var zenkokuIseki2 = new ol.layer.VectorTile({
    folder:"child",
    category:"isekibunkazai",
    icon:"<i class='fa fa-leaf fa-fw' style='color:darkgreen;'></i>",
    title:"全国旧石器時代遺跡(MVT)",
    name:"zenkokuiseki",
    origin:"<a href='http://palaeolithic.jp/data/index.htm' target='_blank'>データベース『日本列島の旧石器時代遺跡』</a>の全国版遺跡データ(csv)",
    detail:"日本旧石器学会 ",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:17,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/iseki/zenkoku/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:152.87,
    style: zenkokuisekiStyleFunction
});
var kyuusekkiTarget = "0";
function zenkokuisekiStyleFunction(feature, resolution) {
    //console.log(feature);
    var prop = feature.getProperties();
    //var fillColor = prop["_fillColor"];
    if(resolution>305) {
        var pointRadius = 2;
    }else if(resolution>152) {
        var pointRadius = 4;
    }else if(resolution>76) {
        var pointRadius = 4;
    }else if(resolution>38) {
        var pointRadius = 4;
    }else{
        var pointRadius = 6;
    }
    var text = "";
    if(resolution<19.11) {
        text = prop["遺跡名"];
    }
    var fillColor = "red";
    if(kyuusekkiTarget === "0") {
        if (resolution > 1222) return;
    }else{
        if(prop[kyuusekkiTarget]) {
            fillColor = "blue";
        }else{
            return;
        }
    }
    var style = new ol.style.Style({
        image: new ol.style.Circle({
            radius:pointRadius,
            fill: new ol.style.Fill({
                color:fillColor
            }),
            /*
            stroke: new ol.style.Stroke({
                color: "white",
                width: 1
            })
            */
        }),
        text: new ol.style.Text({
            font: "8px sans-serif",
            text: text,
            offsetY:10,
            stroke: new ol.style.Stroke({
                color: "white",
                width: 3
            })
        })
    });
    return style;
}

//縄文弥生遺跡------------------------------------------------------------------------------------------------------------
var yayoi1 = new ol.layer.VectorTile({
    folder:"child",
    category:"isekibunkazai",
    icon:"<i class='fa fa-leaf fa-fw' style='color:darkgreen;'></i>",
    title:"全国縄文・弥生集落遺跡(MVT)",
    name:"zenkokuiseki",
    origin:"<a href='https://www.rekihaku.ac.jp/doc/gaiyou/jomo.html' target='_blank'>縄文・弥生集落遺跡データベース</a>",
    detail:"",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:15,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/iseki/yoyoi/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:152.87,
    style: yayoiStyleFunction
});
var yayoi2 = new ol.layer.VectorTile({
    folder:"child",
    category:"isekibunkazai",
    icon:"<i class='fa fa-leaf fa-fw' style='color:darkgreen;'></i>",
    title:"全国縄文・弥生集落遺跡(MVT)",
    name:"zenkokuiseki",
    origin:"<a href='https://www.rekihaku.ac.jp/doc/gaiyou/jomo.html' target='_blank'>縄文・弥生集落遺跡データベース</a>",
    detail:"",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:15,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/iseki/yoyoi/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:152.87,
    style: yayoiStyleFunction
});
var yayoiTarget = "0";
function yayoiStyleFunction(feature, resolution) {
    //console.log(feature);
    var prop = feature.getProperties();
    //var fillColor = prop["_fillColor"];
    if(resolution>305) {
        var pointRadius = 2;
    }else if(resolution>152) {
        var pointRadius = 4;
    }else if(resolution>76) {
        var pointRadius = 4;
    }else if(resolution>38) {
        var pointRadius = 4;
    }else{
        var pointRadius = 6;
    }
    var text = "";
    if(resolution<19.11) {
        text = prop["遺跡名"].split(" ")[0];
    }
    var fillColor = "darkgreen";

    if(yayoiTarget === "0") {
        if (resolution > 1222) return;
    }else{
        if(prop[yayoiTarget]) {
            fillColor = "blue";
        }else{
            return;
        }
    }
    var style = new ol.style.Style({
        image: new ol.style.Circle({
            radius:pointRadius,
            fill: new ol.style.Fill({
                color:fillColor
            }),
            /*
             stroke: new ol.style.Stroke({
             color: "white",
             width: 1
             })
             */
        }),
        text: new ol.style.Text({
            font: "8px sans-serif",
            text: text,
            offsetY:10,
            stroke: new ol.style.Stroke({
                color: "white",
                width: 3
            })
        })
    });
    return style;
}

//群馬遺跡---------------------------------------------------------------------------------------------------------------
var gunmaIseki1 = new ol.layer.VectorTile({
    folder:"child",
    category:"isekibunkazai",
    icon:"<i class='fa fa-leaf fa-fw' style='color:darkgreen;'></i>",
    title:"群馬県遺跡(MVT)test",
    name:"gunma",
    origin:"",
    detail:"",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:17,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/iseki/gunmaken/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:152.87,
    style: kumamotoStyleFunction
});
//全国博物館-------------------------------------------------------------------------------------------------------------
var bunkatyoudb1 = new ol.layer.VectorTile({
    folder:"child",
    category:"isekibunkazai",
    icon:"<i class='fa fa-leaf fa-fw' style='color:darkgreen;'></i>",
    title:"国指定文化財等データベース(MVT)",
    name:"bunkatyoudb",
    origin:"<a href='http://kunishitei.bunka.go.jp/bsys' target='_blank'>国指定文化財等データベース</a>",
    detail:"文化庁のデータベースからcsvを取得しました。",
    source: new ol.source.VectorTile({
        format: new ol.format.MVT(),
        maxZoom:17,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/bunkatyoudb/{z}/{x}/{y}.mvt"
    }),
    style: bunkatyoudbStyleFunction
});
var bunkatyoudb2 = new ol.layer.VectorTile({
    folder:"child",
    category:"isekibunkazai",
    icon:"<i class='fa fa-leaf fa-fw' style='color:darkgreen;'></i>",
    title:"国指定文化財等データベース(MVT)",
    name:"bunkatyoudb",
    origin:"<a href='http://kunishitei.bunka.go.jp/bsys' target='_blank'>国指定文化財等データベース</a>",
    detail:"文化庁のデータベースからcsvを取得しました。",
    source: new ol.source.VectorTile({
        format: new ol.format.MVT(),
        maxZoom:17,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/bunkatyoudb/{z}/{x}/{y}.mvt"
    }),
    style: bunkatyoudbStyleFunction
});
function bunkatyoudbStyleFunction(feature, resolution) {
    if(resolution>611.5) return;
    var prop = feature.getProperties();

    if(resolution>305) {
        var pointRadius = 2;
    }else if(resolution>152) {
        var pointRadius = 4;
    }else if(resolution>76) {
        var pointRadius = 4;
    }else if(resolution>38) {
        var pointRadius = 4;
    }else{
        var pointRadius = 6;
    }
    var text = "";
    if(resolution<9.55) {
        text = prop["名称"];
    }
    var fillColor = "blue";

    var category = prop["文化財種類"];

    switch (category) {
        case "国宝・重要文化財(建造物)":
            fillColor = "magenta";
            break;
    }
    var style = new ol.style.Style({
        image: new ol.style.Circle({
            radius:pointRadius,
            fill: new ol.style.Fill({
                color:fillColor
            }),
            /*
             stroke: new ol.style.Stroke({
             color: "white",
             width: 1
             })
             */
        }),
        text: new ol.style.Text({
            font: "8px sans-serif",
            text: text,
            offsetY:10,
            stroke: new ol.style.Stroke({
                color: "white",
                width: 3
            })
        })
    });
    return style;
}
//福井県林道---------------------------------------------------------------------------------------------------------------
var fukuiRindou1 = new ol.layer.VectorTile({
    folder:"child",
    category:"test",
    icon:"<i class='fa fa-leaf fa-fw' style='color:darkgreen;'></i>",
    title:"福井県林道(MVT)",
    name:"zenkokuiseki",
    origin:"",
    detail:"",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:15,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/fukuiken/rindou/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:152.87,
    style: fukuiRindouStyleFunction
});
function fukuiRindouStyleFunction(feature, resolution) {
    var prop = feature.getProperties();
    var fillColor = "black";
    if(prop["type"]==="r") {
        fillColor = "red"
    }else{
        fillColor = "blue"
    }
    var style = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color:fillColor,
            width: 2
        })
    });
    return style;
}
//小学校区---------------------------------------------------------------------------------------------------------------
var syougakkouku1 = new ol.layer.VectorTile({
    folder:"child",
    category:"KosodateFukushi",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"全国小学校区(MVT)",
    name:"syougakkouku",
    origin:"<a href='http://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A27-v2_1.html' target='_blank'>国土数値情報　小学校区データ</a>",
    detail:"",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:15,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/syougakkouku2/{z}/{x}/{y}.mvt"
    }),
    style: syougakkoukuStyleFunction
});
/*
syougakkouku1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'color'
});
*/
var syougakkouku2 = new ol.layer.VectorTile({
    folder:"child",
    category:"KosodateFukushi",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"全国小学校区(MVT)",
    name:"syougakkouku",
    origin:"<a href='http://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A27-v2_1.html' target='_blank'>国土数値情報　小学校区データ</a>",
    detail:"",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:15,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/syougakkouku2/{z}/{x}/{y}.mvt"
    }),
    style: syougakkoukuStyleFunction
});
var d3syougakkoukuColor = d3.scale.category20();
var d3tyuugakkoukuColor = d3.scale.category20c();
function syougakkoukuStyleFunction(feature, resolution) {
    var prop = feature.getProperties();
    var geoType = feature.getGeometry().getType();
    //var rgb = d3.rgb(d3syougakkoukuColor(Number(prop["id"])));
    //var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0.7)";
    var text = "";
    if(resolution<38.22){
        if(prop["A27_003"]) {
            text = prop["A27_003"];
        }else{
            text = prop["A32_003"];
        }
    }

    if(prop["A27_005"]) {
        var rgb = d3.rgb(d3syougakkoukuColor(Number(prop["id"])));
        var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0.7)";
    }else{
        var rgb = d3.rgb(d3tyuugakkoukuColor(Number(prop["id"])));
        var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0.7)";
    }

    switch (geoType){
        case "MultiPoint":
        case "Point":
            if(resolution>305) break;
            var style = new ol.style.Style({
                image: new ol.style.Circle({
                    radius:3,
                    fill: new ol.style.Fill({
                        color:"black"
                    }),
                    stroke: new ol.style.Stroke({
                        color: "white",
                        width: 1
                    })
                }),
                text: new ol.style.Text({
                    font: "8px sans-serif",
                    text: text,
                    offsetY:10,
                    stroke: new ol.style.Stroke({
                        color: "white",
                        width: 3
                    })
                })
            });
            break;
        case "Polygon":
        case "MultiPolygon":
            if(resolution<76) {
                var style = new ol.style.Style({
                    fill: new ol.style.Fill({
                        color:rgba
                    }),
                    stroke: new ol.style.Stroke({
                        color: "gray",
                        width: 1
                    }),
                    text: new ol.style.Text({
                        font: "8px sans-serif",
                        text: text,
                        stroke: new ol.style.Stroke({
                            color: "white",
                            width: 3
                        })
                    }),
                    zIndex: 0
                });
            }else{
                var style = new ol.style.Style({
                    fill: new ol.style.Fill({
                        color:rgba
                    }),
                    zIndex: 0
                });
            }
            break;
        default:
    }
    return style;
}
//中学校区---------------------------------------------------------------------------------------------------------------
var tyuugakkouku1 = new ol.layer.VectorTile({
    folder:"child",
    category:"KosodateFukushi",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"全国中学校区(MVT)",
    name:"tyuugakkouku",
    origin:"<a href='http://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A32-v2_0.html' target='_blank'>国土数値情報　中学校区データ</a>",
    detail:"",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:15,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/tyuugakkouku/{z}/{x}/{y}.mvt"
    }),
    style: syougakkoukuStyleFunction
});
/*
tyuugakkouku1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'color'
});
*/
var tyuugakkouku2 = new ol.layer.VectorTile({
    folder:"child",
    category:"KosodateFukushi",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"全国中学校区(MVT)",
    name:"tyuugakkouku",
    origin:"<a href='http://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A32-v2_0.html' target='_blank'>国土数値情報　中学校区データ</a>",
    detail:"",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:15,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/tyuugakkouku/{z}/{x}/{y}.mvt"
    }),
    style: syougakkoukuStyleFunction
});
//医療圏---------------------------------------------------------------------------------------------------------------
var iryouken1 = new ol.layer.VectorTile({
    folder:"child",
    category:"KosodateFukushi",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"二次医療圏(MVT)",
    name:"iryouken",
    origin:"<a href='http://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A38.html' target='_blank'>国土数値情報　医療圏データ</a>",
    detail:"",
    detail2:"<div style=''>" +
            "　色："+
            "<select class='iryouken-color-select'>" +
                "<option value='0' selected>ランダム</option>" +
                "<option value='1'>老年人口率</option>" +
                "<option value='2'>生産年齢人口率</option>" +
                "<option value='3'>年少人口率</option>" +
            "</select></div>",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:15,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/iryouken/{z}/{x}/{y}.mvt"
    }),
    //style: syougakkoukuStyleFunction
    style: d3StyleFunction("A38b_003")
});
/*
iryouken1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'color'
});
*/
var iryouken2 = new ol.layer.VectorTile({
    folder:"child",
    category:"KosodateFukushi",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"二次医療圏(MVT)",
    name:"iryouken",
    origin:"<a href='http://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A38.html' target='_blank'>国土数値情報　医療圏データ</a>",
    detail:"",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:15,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/iryouken/{z}/{x}/{y}.mvt"
    }),
    //style: syougakkoukuStyleFunction
    style: d3StyleFunction("A38b_003")
});
var iryoukenTarget = "0";
function d3StyleFunction(colotTarget) {
    var d3Color = d3.scale.category20();
    var d3Color2 = d3.interpolateLab("white","red");
    var d3Color3 = d3.interpolateLab("white","blue");
    var d3Color4 = d3.interpolateLab("white","green");
    return function(feature, resolution) {
        var prop = feature.getProperties();
        var geoType = feature.getGeometry().getType();
        //var rgb = d3.rgb(d3syougakkoukuColor(Number(prop["id"])));
        //var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0.7)";
        var text = "";
        if (resolution < 38.22) {
            //text = prop["A38b_004"];
        }
        switch (iryoukenTarget) {
            case "0":
                var rgb = d3.rgb(d3Color(Number(prop[colotTarget])));
                var bbb = Number(prop[colotTarget].substr(0, 2));
                var ccc = Number(prop[colotTarget].substr(2, 2)) * 5;
                //console.log(rgb.b-bbb);
                if (rgb.b - bbb) {
                    var blue = rgb.b - bbb
                } else {
                    var blue = 0
                }
                if (rgb.r - ccc) {
                    var red = rgb.r - ccc
                } else {
                    var red = 0
                }
                var rgba = "rgba(" + red + "," + rgb.g + "," + blue + ",0.7)";
                break;
            case "1":
                var souzinkou = Number(prop["A38b_008"]);
                var rounen = Number(prop["A38b_011"]);
                var ritu = rounen / souzinkou;
                ritu = (ritu - 0.15) * 5
                //console.log(rounen,souzinkou);
                //console.log(ritu);
                var rgb = d3.rgb(d3Color2(ritu));
                var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0.7)";
                break;
            case "2":
                var souzinkou = Number(prop["A38b_008"]);
                var seisan = Number(prop["A38b_010"]);
                var ritu = seisan / souzinkou;
                ritu = (ritu - 0.4) * 4
                //console.log(rounen,souzinkou);
                //console.log(ritu);
                var rgb = d3.rgb(d3Color3(ritu));
                var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0.7)";
                break;
            case "3":
                var souzinkou = Number(prop["A38b_008"]);
                var nensyou = Number(prop["A38b_009"]);
                var ritu = nensyou / souzinkou;
                ritu = (ritu - 0.1) * 20
                //console.log(nensyou,souzinkou);
                //console.log(ritu);
                var rgb = d3.rgb(d3Color4(ritu));
                var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0.7)";
                break;
        }
        switch (geoType) {
            case "MultiPoint":
            case "Point":
                if (resolution > 305) break;
                var style = new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 3,
                        fill: new ol.style.Fill({
                            color: "black"
                        }),
                        stroke: new ol.style.Stroke({
                            color: "white",
                            width: 1
                        })
                    }),
                    text: new ol.style.Text({
                        font: "8px sans-serif",
                        text: text,
                        offsetY: 10,
                        stroke: new ol.style.Stroke({
                            color: "white",
                            width: 3
                        })
                    })
                });
                break;
            case "Polygon":
            case "MultiPolygon":
                if (resolution < 2445.98) {
                    var style = new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: rgba
                        }),
                        stroke: new ol.style.Stroke({
                            color: "gray",
                            width: 1
                        }),
                        text: new ol.style.Text({
                            font: "8px sans-serif",
                            text: text,
                            stroke: new ol.style.Stroke({
                                color: "white",
                                width: 3
                            })
                        }),
                        zIndex: 0
                    });
                } else {
                    var style = new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: rgba
                        }),
                        zIndex: 0
                    });
                }
                break;
            default:
        }
        return style;
    };
}
//-----------------------------------------------------------------------------------
//選挙区
var senkyoku1 = new ol.layer.VectorTile({
    //folder:"child",
    //category:"test",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"H29選挙区(MVT)test",
    name:"senkyoku",
    origin:"<a href='http://www.csis.u-tokyo.ac.jp/~nishizawa/senkyoku/' target='_blank'>衆議院議員選挙の小選挙区に関するデータを提供するページ</a>",
    detail:"",
    detail2:"<div style=''>" +
            "　色："+
            "<select class='senkyoku-color-select'>" +
                "<option value='0' selected>ランダム</option>" +
                "<option value='1'>老年人口率(赤いほど老年率高し)</option>" +
                "<option value='2'>生産年齢人口率(青いほど生産年齢率高し)</option>" +
                "<option value='3'>年少人口率(緑ほど年少人口率高し)</option>" +
            "</select></div>",
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:15,
        //url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/senkyoku/{z}/{x}/{y}.mvt"
        url: "https://kenzkenz.github.io/h29senkyoku/{z}/{x}/{y}.mvt"
    }),
    //style: syougakkoukuStyleFunction
    style: senkyokuStyleFunction("kucode")
});
var senkyokuTarget = "0";
function senkyokuStyleFunction(colotTarget) {
    var d3Color = d3.scale.category20();
    var d3Color2 = d3.interpolateLab("white","red");
    var d3Color3 = d3.interpolateLab("white","blue");
    var d3Color4 = d3.interpolateLab("white","green");
    return function(feature, resolution) {
        var prop = feature.getProperties();
        var geoType = feature.getGeometry().getType();
        //var rgb = d3.rgb(d3syougakkoukuColor(Number(prop["id"])));
        //var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0.7)";
        //console.log(prop);
        var text = "";
        if (resolution < 38.22) {
            //text = prop["A38b_004"];
        }
        switch (senkyokuTarget) {
            case "0":
                var rgb = d3.rgb(d3Color(Number(prop[colotTarget])));
                var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0.7)";
                break;
            case "1":
                var souzinkou = Number(prop["総数_総数（年齢）"]);
                var rounen = Number(prop["総数_（再掲）65歳以上"]);
                var ritu = rounen / souzinkou;
                ritu = (ritu - 0.15) * 5
                //console.log(rounen,souzinkou);
                //console.log(ritu);
                var rgb = d3.rgb(d3Color2(ritu));
                var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0.7)";
                break;
            case "2":
                var souzinkou = Number(prop["総数_総数（年齢）"]);
                var seisan = Number(prop["総数_（再掲）15〜64歳"]);
                var ritu = seisan / souzinkou;
                ritu = (ritu - 0.4) * 4
                //console.log(rounen,souzinkou);
                //console.log(ritu);
                var rgb = d3.rgb(d3Color3(ritu));
                var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0.7)";
                break;
            case "3":
                var souzinkou = Number(prop["総数_総数（年齢）"]);
                var nensyou = Number(prop["総数_（再掲）15歳未満"]);
                var ritu = nensyou / souzinkou;
                ritu = (ritu - 0.1) * 20
                //console.log(nensyou,souzinkou);
                //console.log(ritu);
                var rgb = d3.rgb(d3Color4(ritu));
                var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0.7)";
                break;
        }

        switch (geoType) {
            case "MultiPoint":
            case "Point":
                if (resolution > 305) break;
                var style = new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 3,
                        fill: new ol.style.Fill({
                            color: "black"
                        }),
                        stroke: new ol.style.Stroke({
                            color: "white",
                            width: 1
                        })
                    }),
                    text: new ol.style.Text({
                        font: "8px sans-serif",
                        text: text,
                        offsetY: 10,
                        stroke: new ol.style.Stroke({
                            color: "white",
                            width: 3
                        })
                    })
                });
                break;
            case "Polygon":
            case "MultiPolygon":
                if (resolution < 2445.98) {
                    var style = new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: rgba
                        }),
                        stroke: new ol.style.Stroke({
                            color: "gray",
                            width: 1
                        }),
                        text: new ol.style.Text({
                            font: "8px sans-serif",
                            text: text,
                            stroke: new ol.style.Stroke({
                                color: "white",
                                width: 3
                            })
                        }),
                        zIndex: 0
                    });
                } else {
                    var style = new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: rgba
                        }),
                        zIndex: 0
                    });
                }
                break;
            default:
        }
        return style;
    };
}
//----------------------------------------------------------------------------------------------------------------------
//市町村＋財政力指数
var cityZaiseiDetail = "財政力指数＝<br>基準財政収入額を基準財政需要学で除した数値<br>" +
    "<div style='background:blue;color:white;'>・青＝1.0以上　余裕あり</div>" +
    "<div style='background:green;color:white;'>・緑＝0.8以上</div>" +
    "<div style='background:yellow;color:black;'>・黄＝0.6以上</div>" +
    "<div style='background:orange;color:black;'>・橙＝0.4以上</div>" +
    "<div style='background:red;color:white;'>・赤＝0.3以上</div>" +
    "<div style='background:darkred;color:white;'>・赤＝0.3未満</div>";
var cityZaiseiDetail2 =
    "<div class='detail2-div'>" +
    "<div style='float: left;'>" +
    " 年：" +
    "<select class='cityZaisei-year-select' style='margin-bottom:10px'>" +
        "<option value='1977_1'>1977</option>" +
        "<option value='1978_1'>1978</option>" +
        "<option value='1979_1'>1979</option>" +
        "<option value='1980_1'>1980</option>" +
        "<option value='1981_1'>1981</option>" +
        "<option value='1982_1'>1982</option>" +
        "<option value='1983_1'>1983</option>" +
        "<option value='1984_1'>1984</option>" +
        "<option value='1985_1'>1985</option>" +
        "<option value='1986_1'>1986</option>" +
        "<option value='1987_1'>1987</option>" +
        "<option value='1988_1'>1988</option>" +
        "<option value='1989_1'>1989</option>" +
        "<option value='1990_1'>1990</option>" +
        "<option value='1991_1'>1991</option>" +
        "<option value='1992_1'>1992</option>" +
        "<option value='1993_1'>1993</option>" +
        "<option value='1994_1'>1994</option>" +
        "<option value='1995_1'>1995</option>" +
        "<option value='1996_1'>1996</option>" +
        "<option value='1997_1'>1997</option>" +
        "<option value='1998_1'>1998</option>" +
        "<option value='1999_1'>1999</option>" +
        "<option value='2000_1'>2000</option>" +
        "<option value='2001_1'>2001</option>" +
        "<option value='2002_1'>2002</option>" +
        "<option value='2003_1'>2003</option>" +
        "<option value='2004_1'>2004</option>" +
        "<option value='2005_1'>2005</option>" +
        "<option value='2006_1'>2006</option>" +
        "<option value='2007_1'>2007</option>" +
        "<option value='2008_1'>2008</option>" +
        "<option value='2009_1'>2009</option>" +
        "<option value='2010_1'>2010</option>" +
        "<option value='2011_1'>2011</option>" +
        "<option value='2012_1'>2012</option>" +
        "<option value='2013_1'>2013</option>" +
        "<option value='2014_1'>2014</option>" +
        "<option value='2015_1' selected>2015</option>" +
    "</select>" +
    "</div>" +
    "<div class='cityZaisei-year-slider' style='float: left;width:90px;margin:5px 0 0 10px;'></div>" +
    "<div class='' style='float: left;margin:0 0 0 10px;'>" +
    "<select class='cityZaisei-colorchart-select' style='margin-bottom:10px'>" +
        "<option value='normal' selected>ノーマル</option>" +
        "<option value='mudankai'>無段階</option>" +
    "</select>" +
    "</div>" +
    "</div>";
var cityZaisei_1 = new ol.layer.VectorTile({
    folder:"child",
    category:"ZinkouKeizai",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"市町村財政力指数(MVT)",
    name:"zaiseiryoku",
    origin:"<a href='http://www5.cao.go.jp/keizai-shimon/kaigi/special/reform/mieruka/db_top/index.html' target='_blank'>経済・財政と暮らしの指標「見える化」データベース</a>",
    detail:cityZaiseiDetail,
    detail2:cityZaiseiDetail2,
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:15,
        url: "https://kenzkenz.github.io/zaiseisuii_mvt/{z}/{x}/{y}.mvt"
    }),
    style: cityZaiseiCommonStyleFunction("2015_1","normal")
});
var cityZaisei_2 = new ol.layer.VectorTile({
    folder:"child",
    category:"ZinkouKeizai",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"市町村財政力指数(MVT)",
    name:"zaiseiryoku",
    origin:"<a href='http://www5.cao.go.jp/keizai-shimon/kaigi/special/reform/mieruka/db_top/index.html' target='_blank'>経済・財政と暮らしの指標「見える化」データベース</a>",    detail:cityZaiseiDetail,
    detail2:cityZaiseiDetail2,
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:15,
        url: "https://kenzkenz.github.io/zaiseisuii_mvt/{z}/{x}/{y}.mvt"
    }),
    style: cityZaiseiCommonStyleFunction("2015_1","normal")
});
function cityZaiseiCommonStyleFunction(year,colorChart) {
    var d3Color = d3.interpolateLab("white","navy");
    return function (feature, resolution) {
        var prop = feature.getProperties();
        var target = year;
        var ritu = Number(prop[target]);
        if(colorChart==="normal"){
            if(isNaN(ritu)) return;
            if(ritu>=1.0) {
                var rgba = "rgba(0,0,250,0.8)"//ブルー
            }else if(ritu>=0.8) {
                var rgba = "rgba(0,128,0,0.8)"//グリーン
            }else if(ritu>=0.6) {
                var rgba = "rgba(255,255,0,0.8)"//イエロー
            }else if(ritu>=0.4) {
                var rgba = "rgba(255,165,0,0.8)"//オレンジ
            }else if(ritu>=0.3) {
                var rgba = "rgba(255,0,0,0.8)"//レッド
            }else{
                var rgba = "rgba(139,0,0,0.8)"//ダークレッド
            }

        }else{//無段階
            //rgba = d3Color(ritu)
            if(isNaN(ritu)) return;
            var rgb = d3.rgb(d3Color(ritu));
            //if(val>1) val = 1;
            var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ", 0.8 )";
        }
        if (resolution < 2445.98) {
            //if (!val) return;
            var style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: rgba
                }),
                stroke: new ol.style.Stroke({
                    color: "darkgray",
                    width: 1
                })
            });
        } else {
            //if (!val) return;
            //if(val<0.05) return;
            var style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: rgba
                })
            });
        }
        return style;
    }
}
//----------------------------------------------------------------------------------------------------------------------
//市町村＋現役世代率
var cityGenekiDetail = "現役世代負担率＝<br>20〜64歳に対する65歳以上人口の割合<br>" +
    "<div style='background:darkred;color:white;'>・赤＝1.0以上　高負担</div>" +
    "<div style='background:red;color:white;'>・赤＝0.8以上</div>" +
    "<div style='background:orange;color:white;'>・橙＝0.6以上</div>" +
    "<div style='background:yellow;color:black;'>・黄＝0.4以上</div>" +
    "<div style='background:green;color:white;'>・緑＝0.3以上</div>" +
    "<div style='background:blue;color:white;'>・青＝0.3未満　低負担</div>";
var cityGenekiDetail2 =
    "<div class='detail2-div'>" +
    "<div style='float: left;'>" +
        " 年：" +
        "<select class='cityGeneki-year-select' style='margin-bottom:10px'>" +
            "<option value='2040'>2040</option>" +
            "<option value='2035'>2035</option>" +
            "<option value='2030'>2030</option>" +
            "<option value='2025'>2025</option>" +
            "<option value='2020'>2020</option>" +
            "<option value='2015' selected>2015</option>" +
            "<option value='2010'>2010</option>" +
            "<option value='2005'>2005</option>" +
            "<option value='2000'>2000</option>" +
            "<option value='1995'>1995</option>" +
            "<option value='1990'>1990</option>" +
            "<option value='1985'>1985</option>" +
            "<option value='1980'>1980</option>" +
        "</select>" +
    "</div>" +
    "<div class='cityGeneki-year-slider' style='float: left;width:90px;margin:5px 0 0 10px;'></div>" +
    "<div class='' style='float: left;margin:0 0 0 10px;'>" +
        "<select class='cityGeneki-colorchart-select' style='margin-bottom:10px'>" +
            "<option value='normal' selected>ノーマル</option>" +
            "<option value='mudankai'>無段階</option>" +
        "</select>" +
    "</div>" +
    "</div>";
var cityGeneki_1 = new ol.layer.VectorTile({
    folder:"child",
    category:"ZinkouKeizai",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"市町村現役世代率(MVT)",
    name:"genekiritu",
    origin:"resas",
    detail:cityGenekiDetail,
    detail2:cityGenekiDetail2,
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:15,
        url: "https://kenzkenz.github.io/shicyouson_mvt/{z}/{x}/{y}.mvt"
    }),
    style: cityGenekiCommonStyleFunction("2015","normal")
});
var cityGeneki_2 = new ol.layer.VectorTile({
    folder:"child",
    category:"ZinkouKeizai",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"市町村現役世代率(MVT)",
    name:"genekiritu",
    origin:"resas",
    detail:cityGenekiDetail,
    detail2:cityGenekiDetail2,
    source: new ol.source.VectorTile({
        format: new ol.format.MVT(),
        maxZoom:15,
        url: "https://kenzkenz.github.io/shicyouson_mvt/{z}/{x}/{y}.mvt"
    }),
    style: cityGenekiCommonStyleFunction("2015","normal")
});
function cityGenekiCommonStyleFunction(year,colorChart) {
    var d3Color = d3.interpolateLab("white","red");
    return function (feature, resolution) {
        var prop = feature.getProperties();
        var target = "genekiritu" + year;
        var ritu = Number(prop[target]);
        if(colorChart==="normal"){
            if(isNaN(ritu)) return;
            if(ritu>=1.0) {
                var rgba = "rgba(139,0,0,0.8)"
            }else if(ritu>=0.8) {
                var rgba = "rgba(255,0,0,0.8)"
            }else if(ritu>=0.6) {
                var rgba = "rgba(255,165,0,0.8)"
            }else if(ritu>=0.4) {
                var rgba = "rgba(255,255,0,0.8)"
            }else if(ritu>=0.3) {
                var rgba = "rgba(0,128,0,0.8)"
            }else{
                var rgba = "rgba(0,0,250,0.8)"
            }
        }else{//無段階
            //rgba = d3Color(ritu)
            if(isNaN(ritu)) return;
            var rgb = d3.rgb(d3Color(ritu));
            //if(val>1) val = 1;
            var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ", 0.8 )";
        }
        if (resolution < 2445.98) {
            //if (!val) return;
            var style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: rgba
                }),
                stroke: new ol.style.Stroke({
                    color: "darkgray",
                    width: 1
                })
            });
        } else {
            //if (!val) return;
            //if(val<0.05) return;
            var style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: rgba
                })
            });
        }
        return style;
    }
}
//----------------------------------------------------------------------------------------------------------------------
//推計1kメッシュ
var suikei1000mOrigin = "<a href='http://nlftp.mlit.go.jp/ksj/gmlold/index.html' target='_blank'>・国土数値情報</a>";
    suikei1000mOrigin += "<br><a href='http://www.mlit.go.jp/common/001046872.pdf' target='_blank'>・人口関係参考資料</a>";
    suikei1000mOrigin += "<br><a href='http://nlftp.mlit.go.jp/ksj/old/meta/mesh/mesh.pdf' target='_blank'>・試算方法について</a>";

var suikei1000mDetail1 =
    "2050年の人口増減状況（2010年との比較）<br>" +
    "<div style='background:blue;color:white;'>・青＝非居住地化</div>" +
    "<div style='background:green;color:white;'>・緑＝50％以上100％未満減少</div>" +
    "<div style='background:yellow;color:black;'>・黄＝0％以上50％未満減少</div>" +
    "<div style='background:red;color:white;'>・赤＝増加</div>";

var suikei1000mDetail2 = "";
/*
    "<div class='detail2-div'>" +
    "<select class='syougyouMesh-year-select syougyouMesh-select' style='margin-bottom:10px'>" +
        "<option value='2050zougen' selected>2050年の人口増減状況</option>" +
        "<option value='2010' selected>2010年の人口</option>" +
        "<option value='2050' selected>2050年の人口</option>" +
    "</select>" +
    "<br>" +
    "実数÷<input type='text' class='syougyouMeshtext' value='1' size='5'>" +
    "　色："+
    "<select class='syougyouMesh-color-select syougyouMesh-select'>" +
        "<option value='indigo' selected>紫</option>" +
        "<option value='red'>赤</option>" +
        "<option value='green'>緑</option>" +
        "<option value='blue'>青</option>" +
        "<option value='black'>黒</option>" +
    "</select>" +
    "</div>";
*/
var suikei1000m_1 = new ol.layer.VectorTile({
    folder:"child",
    category:"ZinkouKeizai",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"将来推計人口1kmメッシュ(MVT)",
    name:"suikei1000m",
    origin:suikei1000mOrigin,
    detail:suikei1000mDetail1,
    detail2:suikei1000mDetail2,
    source: new ol.source.VectorTile({
        format: new ol.format.MVT(),
        maxZoom:13,
        url: "https://kenzkenz.github.io/suikei1km_mvt/{z}/{x}/{y}.mvt"
    }),
    maxResolution:4891.97,//ズーム5
    style: suikeiMeshCommonStyleFunction("2050zougen")
});
var suikei1000m_2 = new ol.layer.VectorTile({
    folder:"child",
    category:"ZinkouKeizai",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"将来推計人口1kmメッシュ(MVT)",
    name:"suikei1000m",
    origin:suikei1000mOrigin,
    detail:suikei1000mDetail1,
    detail2:suikei1000mDetail2,
    source: new ol.source.VectorTile({
        format: new ol.format.MVT(),
        maxZoom:13,
        url: "https://kenzkenz.github.io/suikei1km_mvt/{z}/{x}/{y}.mvt"
    }),
    maxResolution:4891.97,//ズーム5
    style: suikeiMeshCommonStyleFunction("2050zougen")
});
function suikeiMeshCommonStyleFunction(target) {
    var d3Color = d3.interpolateLab("white","navy");
    return function (feature, resolution) {
        var prop = feature.getProperties();

        //console.log(prop)

        //INDEXHOSEI

        var ritu = prop["INDEXHOSEI"]/100;//補正有りの方で　国の資料も補正有りで作っているようだったので
        //console.log(ritu);
        var rgba = "rgba(0,0,250,0.8)"//ブルー
/*
        if(colorChart==="normal"){
            if(isNaN(ritu)) return;
            if(ritu>=1.0) {
                var rgba = "rgba(0,0,250,0.8)"//ブルー
            }else if(ritu>=0.8) {
                var rgba = "rgba(0,128,0,0.8)"//グリーン
            }else if(ritu>=0.6) {
                var rgba = "rgba(255,255,0,0.8)"//イエロー
            }else if(ritu>=0.4) {
                var rgba = "rgba(255,165,0,0.8)"//オレンジ
            }else if(ritu>=0.3) {
                var rgba = "rgba(255,0,0,0.8)"//レッド
            }else{
                var rgba = "rgba(139,0,0,0.8)"//ダークレッド
            }

        }else{//無段階
            //rgba = d3Color(ritu)
            if(isNaN(ritu)) return;
            var rgb = d3.rgb(d3Color(ritu));
            //if(val>1) val = 1;
            var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ", 0.8 )";
        }
        */

        switch (target) {
            case "2050zougen":
                var ritu2 = 1 - ritu;
                if(ritu2===1) {
                    var rgba = "rgba(0,0,250,0.8)"//ブルー
                }else if(ritu2>=0.5){
                    var rgba = "rgba(0,128,0,0.8)"//グリーン
                }else if(ritu2>=0) {
                    var rgba = "rgba(255,255,0,0.8)"//イエロー
                }else{
                    var rgba = "rgba(255,0,0,0.8)"//レッド
                }
                /*
                var rgb = d3.rgb(d3Color(ritu));
                var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ", 0.8 )";
                */
                break;
            default :
        }
        if (resolution < 152.87) {//ズーム10
            //if (!val) return;
            var style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: rgba
                }),
                stroke: new ol.style.Stroke({
                    color: "darkgray",
                    width: 1
                })
            });
        } else {
            //if (!val) return;
            //if(val<0.05) return;
            var style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: rgba
                })
            });
        }
        return style;
    }
}

//----------------------------------------------------------------------------------------------------------------------
//商業1kメッシュ 規模別
var syougyou1000m_k_Origin = "<a href='http://www.meti.go.jp/statistics/tyo/syougyo/mesh/download.html' target='_blank'>平成26年商業統計メッシュデータ 1kmメッシュデータ 規模別</a>";
syougyou1000m_k_Origin += "<br><br><a href='http://www.meti.go.jp/statistics/tyo/syougyo/mesh/2014/kibo.pdf' target='_blank'>規模別ファイル フォーマット情報</a>";
var syougyou1000m_k_Detail2 =
    "<div class='detail2-div'>" +
    "<select class='syougyouMesh-year-select syougyouMesh-select' style='margin-bottom:10px'>" +
        syougyou1kKiboOption +
    "</select>" +
    "<br>" +
    "実数÷<input type='text' class='syougyouMeshtext' value='1' size='5'>" +
    "　色："+
    "<select class='syougyouMesh-color-select syougyouMesh-select'>" +
        "<option value='indigo' selected>紫</option>" +
        "<option value='red'>赤</option>" +
        "<option value='green'>緑</option>" +
        "<option value='blue'>青</option>" +
        "<option value='black'>黒</option>" +
    "</select>" +
    "</div>";
var syougyou1000m_k_1 = new ol.layer.VectorTile({
    folder:"child",
    category:"ZinkouKeizai",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"H26商業統計_1kmメッシュ_規模別(MVT)",
    name:"syougyou1000mKibo",
    origin:syougyou1000m_k_Origin,
    detail:"",
    detail2:syougyou1000m_k_Detail2,
    source: new ol.source.VectorTile({
        format: new ol.format.MVT(),
        maxZoom:13,
        url: "https://kenzkenz.github.io/syougyou1km_kibo_mvt/{z}/{x}/{y}.mvt"
    }),
    maxResolution:2445.98,//ズーム6
    style: syougyouMeshCommonStyleFunction("indigo",1,"k22")
});
var syougyou1000m_k_2 = new ol.layer.VectorTile({
    folder:"child",
    category:"ZinkouKeizai",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"H26商業統計_1kmメッシュ_規模別(MVT)",
    name:"syougyou1000mKibo",
    origin:syougyou1000m_k_Origin,
    detail:"",
    detail2:syougyou1000m_k_Detail2,
    source: new ol.source.VectorTile({
        format: new ol.format.MVT(),
        maxZoom:13,
        url: "https://kenzkenz.github.io/syougyou1km_kibo_mvt/{z}/{x}/{y}.mvt"
    }),
    maxResolution:2445.98,//ズーム6
    style: syougyouMeshCommonStyleFunction("indigo",1,"k22")
});
//----------------------------------------------------------------------------------------------------------------------
//商業1kメッシュ 業態別
var syougyou1000m_g_Origin = "<a href='http://www.meti.go.jp/statistics/tyo/syougyo/mesh/download.html' target='_blank'>平成26年商業統計メッシュデータ 1kmメッシュデータ 業態別</a>";
syougyou1000m_g_Origin += "<br><br><a href='http://www.meti.go.jp/statistics/tyo/syougyo/mesh/2014/gyoutai.pdf' target='_blank'>業態別ファイル フォーマット情報</a>";
var syougyou1000m_g_Detail2 =
    "<div class='detail2-div'>" +
    "<select class='syougyouMesh-year-select syougyouMesh-select' style='margin-bottom:10px'>" +
        syougyou1kGyoutaiOption +
    "</select>" +
    "<br>" +
    "実数÷<input type='text' class='syougyouMeshtext' value='1' size='5'>" +
    "　色："+
    "<select class='syougyouMesh-color-select syougyouMesh-select'>" +
        "<option value='indigo' selected>紫</option>" +
        "<option value='red'>赤</option>" +
        "<option value='green'>緑</option>" +
        "<option value='blue'>青</option>" +
        "<option value='black'>黒</option>" +
    "</select>" +
    "</div>";
var syougyou1000m_g_1 = new ol.layer.VectorTile({
    folder:"child",
    category:"ZinkouKeizai",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"H26商業統計_1kmメッシュ_業態別(MVT)",
    name:"syougyou1000mGyoutai",
    origin:syougyou1000m_g_Origin,
    detail:"",
    detail2:syougyou1000m_g_Detail2,
    source: new ol.source.VectorTile({
        format: new ol.format.MVT(),
        maxZoom:13,
        url: "https://kenzkenz.github.io/syougyou1km_gyoutai_mvt/{z}/{x}/{y}.mvt"
    }),
    maxResolution:2445.98,//ズーム6
    style: syougyouMeshCommonStyleFunction("indigo",1,"g22")
});
var syougyou1000m_g_2 = new ol.layer.VectorTile({
    folder:"child",
    category:"ZinkouKeizai",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"H26商業統計_1kmメッシュ_業態別(MVT)",
    name:"syougyou1000mGyoutai",
    origin:syougyou1000m_g_Origin,
    detail:"",
    detail2:syougyou1000m_g_Detail2,
    source: new ol.source.VectorTile({
        format: new ol.format.MVT(),
        maxZoom:13,
        url: "https://kenzkenz.github.io/syougyou1km_gyoutai_mvt/{z}/{x}/{y}.mvt"
    }),
    maxResolution:2445.98,//ズーム6
    style: syougyouMeshCommonStyleFunction("indigo",1,"g22")
});
//----------------------------------------------------------------------------------------------------------------------
//商業1kメッシュ 産業別
var syougyou1000m_s_Origin = "<a href='http://www.meti.go.jp/statistics/tyo/syougyo/mesh/download.html' target='_blank'>平成26年商業統計メッシュデータ 1kmメッシュデータ 産業別</a>";
    syougyou1000m_s_Origin += "<br><br><a href='http://www.meti.go.jp/statistics/tyo/syougyo/mesh/2014/sangyo.pdf' target='_blank'>産業分類別ファイル フォーマット情報</a>";
var syougyou1000m_s_Detail2 =
    "<div class='detail2-div'>" +
    "<select class='syougyouMesh-year-select syougyouMesh-select' style='margin-bottom:10px'>" +
        syougyou1kOption +
    "</select>" +
    "<br>" +
    "実数÷<input type='text' class='syougyouMeshtext' value='1' size='5'>" +
    "　色："+
    "<select class='syougyouMesh-color-select syougyouMesh-select'>" +
        "<option value='indigo' selected>紫</option>" +
        "<option value='red'>赤</option>" +
        "<option value='green'>緑</option>" +
        "<option value='blue'>青</option>" +
        "<option value='black'>黒</option>" +
    "</select>" +
    "</div>";
var syougyou1000m_s_1 = new ol.layer.VectorTile({
    folder:"child",
    category:"ZinkouKeizai",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"H26商業統計_1kmメッシュ_産業別(MVT)",
    name:"syougyou1000m",
    origin:syougyou1000m_s_Origin,
    detail:"",
    detail2:syougyou1000m_s_Detail2,
    source: new ol.source.VectorTile({
        format: new ol.format.MVT(),
        maxZoom:13,
        url: "https://kenzkenz.github.io/syougyou1km_sangyou_mvt/{z}/{x}/{y}.mvt"
    }),
    maxResolution:2445.98,//ズーム6
    style: syougyouMeshCommonStyleFunction("indigo",1,"s22")
});
var syougyou1000m_s_2 = new ol.layer.VectorTile({
    folder:"child",
    category:"ZinkouKeizai",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"H26商業統計_1kmメッシュ_産業別(MVT)",
    name:"syougyou1000m",
    origin:syougyou1000m_s_Origin,
    detail:"",
    detail2:syougyou1000m_s_Detail2,
    source: new ol.source.VectorTile({
        format: new ol.format.MVT(),
        maxZoom:13,
        url: "https://kenzkenz.github.io/syougyou1km_sangyou_mvt/{z}/{x}/{y}.mvt"
    }),
    maxResolution:2445.98,//ズーム6
    style: syougyouMeshCommonStyleFunction("indigo",1,"s22")
});
//----------------------------------------------------------------------------------------------------------------------
//商業500メッシュ
var syougyou500mOrigin = "<a href='http://www.meti.go.jp/statistics/tyo/syougyo/mesh/download.html' target='_blank'>平成26年商業統計メッシュデータ 500mメッシュデータ</a>";
    syougyou500mOrigin += "<br><br><a href='http://www.meti.go.jp/statistics/tyo/syougyo/mesh/2014/500m.pdf' target='_blank'>500mメッシュファイル フォーマット情報</a>";
var syougyou500mDetail2 =
    "<div class='detail2-div'>" +
    "<select class='syougyouMesh-year-select syougyouMesh-select' style='margin-bottom:10px'>" +
        "<option value='s22' >小売業計 従業所数</option>" +
        "<option value='s23' selected>小売業計 従業者数</option>" +
        "<option value='s24' >小売業計 年間販売額（千万円）</option>" +

        "<option value='s25' >小売業計 売場面積（千㎡）</option>" +
        "<option value='s26' >各種商品小売業 従業所数</option>" +
        "<option value='s27' >各種商品小売業 年間販売額（千万円）</option>" +
        "<option value='s28' >織物・衣服・身の回り品小売業 従業所数</option>" +
        "<option value='s29' >織物・衣服・身の回り品小売業 年間販売額（千万円）</option>" +
        "<option value='s30' >飲食料品小売業 従業所数</option>" +
        "<option value='s31' >飲食料品小売業 年間販売額（千万円）</option>" +
        "<option value='s32' >機械器具小売業 従業所数</option>" +
        "<option value='s33' >機械器具小売業 年間販売額（千万円）</option>" +
        "<option value='s34' >その他の小売業 従業所数</option>" +
        "<option value='s35' >その他の小売業 年間販売額（千万円）</option>" +
        "<option value='s36' >無店舗小売業 従業所数</option>" +
        "<option value='s37' >無店舗小売業 年間販売額（千万円）</option>" +

        "<option value='s38' >従業者規模別 ４人以下</option>" +
        "<option value='s39' >従業者規模別 ５～２９人以下</option>" +
        "<option value='s40' >従業者規模別 ３０～４９人以下</option>" +
        "<option value='s41' >従業者規模別 ５０人以上</option>" +

        "<option value='s42' >年間販売額階級別 ２００万円未満</option>" +
        "<option value='s43' >年間販売額階級別 ２００～２０００万円未満</option>" +
        "<option value='s44' >年間販売額階級別 ２，０００～１億円未満</option>" +
        "<option value='s45' >年間販売額階級別 １億円以上</option>" +

        "<option value='s46' >売場面積規模別 ２０㎡未満</option>" +
        "<option value='s47' >売場面積規模別 ２０～５０㎡未満</option>" +
        "<option value='s48' >売場面積規模別 ５０～５００㎡未満</option>" +
        "<option value='s49' >売場面積規模別 ５００～１５００㎡未満</option>" +
        "<option value='s50' >売場面積規模別 １５００～３０００㎡未満</option>" +
        "<option value='s51' >売場面積規模別 ３０００㎡以上</option>" +

        "<option value='s52' >買回品業種 従業者数</option>" +
        "<option value='s53' >買回品業種 年間販売額（千万円）</option>" +
        "<option value='s54' >買回品業種 売場面積（千㎡）</option>" +

        "<option value='s55' >最寄品業種 従業者数</option>" +
        "<option value='s56' >最寄品業種 年間販売額（千万円）</option>" +
        "<option value='s57' >最寄品業種 売場面積（千㎡）</option>" +

        "<option value='s58' >各種商品小売業 従業者数</option>" +
        //"<option value='s59' >各種商品小売業 年間販売額（千万円）</option>" +
        //"<option value='s60' >各種商品小売業 売場面積（千㎡）</option>" +

        "<option value='s61' >その他の業種 従業者数</option>" +
        //"<option value='s62' >その他の業種 年間販売額（千万円）</option>" +
        //"<option value='s63' >その他の業種 売場面積（千㎡）</option>" +

        "<option value='s64' >百貨店 従業者数</option>" +
        //"<option value='s65' >百貨店 年間販売額（千万円）</option>" +
        //"<option value='s66' >百貨店 売場面積（千㎡）</option>" +

        "<option value='s67' >総合スーパー 従業者数</option>" +
        //"<option value='s68' >総合スーパー 年間販売額（千万円）</option>" +
        //"<option value='s69' >総合スーパー 売場面積（千㎡）</option>" +

        "<option value='s70' >専門スーパー 従業者数</option>" +
        "<option value='s71' >専門スーパー 年間販売額（千万円）</option>" +
        "<option value='s72' >専門スーパー 売場面積（千㎡）</option>" +

        "<option value='s73' >コンビニエンス・ストア 従業者数</option>" +
        "<option value='s74' >コンビニエンス・ストア 年間販売額（千万円）</option>" +
        "<option value='s75' >コンビニエンス・ストア 売場面積（千㎡）</option>" +

        "<option value='s76' >広義ドラッグストア 従業者数</option>" +
        //"<option value='s77' >広義ドラッグストア 年間販売額（千万円）</option>" +
        //"<option value='s78' >広義ドラッグストア 売場面積（千㎡）</option>" +

        "<option value='s79' >その他のスーパー 従業者数</option>" +
        "<option value='s80' >その他のスーパー 年間販売額（千万円）</option>" +
        "<option value='s81' >その他のスーパー 売場面積（千㎡）</option>" +

        "<option value='s82' >専門店 従業者数</option>" +
        "<option value='s83' >専門店 年間販売額（千万円）</option>" +
        "<option value='s84' >専門店 売場面積（千㎡）</option>" +

        "<option value='s85' >家電大型専門店 従業者数</option>" +
        //"<option value='s86' >家電大型専門店 年間販売額（千万円）</option>" +
        //"<option value='s87' >家電大型専門店 売場面積（千㎡）</option>" +

        "<option value='s88' >中心店 従業者数</option>" +
        "<option value='s89' >中心店 年間販売額（千万円）</option>" +
        "<option value='s90' >中心店 売場面積（千㎡）</option>" +

        "<option value='s91' >その他の小売店 従業者数</option>" +
        //"<option value='s92' >その他の小売店 年間販売額（千万円）</option>" +
        //"<option value='s93' >その他の小売店 売場面積（千㎡）</option>" +

        "<option value='s94' >無店舗販売 従業者数</option>" +
        "<option value='s95' >無店舗販売 年間販売額（千万円）</option>" +
        "<option value='s96' >無店舗販売 売場面積（千㎡）</option>" +
    "</select>" +
    "<br>" +
    "実数÷<input type='text' class='syougyouMeshtext' value='1' size='5'>" +
    "　色："+
    "<select class='syougyouMesh-color-select syougyouMesh-select'>" +
        "<option value='indigo' selected>紫</option>" +
        "<option value='red'>赤</option>" +
        "<option value='green'>緑</option>" +
        "<option value='blue'>青</option>" +
        "<option value='black'>黒</option>" +
    "</select>" +
    "</div>";
var syougyou500m_1 = new ol.layer.VectorTile({
    folder:"child",
    category:"ZinkouKeizai",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"H26商業統計_500Mメッシュ(MVT)",
    name:"syougyou500m",
    origin:syougyou500mOrigin,
    detail:"",
    detail2:syougyou500mDetail2,
    source: new ol.source.VectorTile({
        format: new ol.format.MVT(),
        maxZoom:13,
        url: "https://kenzkenz.github.io/syougyou500m_mvt/{z}/{x}/{y}.mvt"
    }),
    maxResolution:1222.99,//ズーム7
    style: syougyouMeshCommonStyleFunction("indigo",1,"s23")
});
var syougyou500m_2 = new ol.layer.VectorTile({
    folder:"child",
    category:"ZinkouKeizai",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"H26_500Mメッシュ商業統計(MVT)",
    name:"syougyou500m",
    origin:syougyou500mOrigin,
    detail:"",
    detail2:syougyou500mDetail2,
    source: new ol.source.VectorTile({
        format: new ol.format.MVT(),
        maxZoom:13,
        url: "https://kenzkenz.github.io/syougyou500m_mvt/{z}/{x}/{y}.mvt"
    }),
    maxResolution:1222.99,//ズーム7
    style: syougyouMeshCommonStyleFunction("indigo",1,"s23")
});
function syougyouMeshCommonStyleFunction(maxColor,limit,column) {
    var d3Color = d3.interpolateLab("white",maxColor);
    return function (feature, resolution) {
        var prop = feature.getProperties();
        if(column==="h99") {//比較

        }else{//通常
            var val = prop[column];
            if(!val) return;
            if(val==="X") return;
            if(val==="-") return;
            val = val / limit;
            //if(val<0.05) return;
            if (val > 1) val = 1;
            var rgb = d3.rgb(d3Color(val));
            var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + val * 0.9 + ")";
        }
        //var text = prop[year];
        if (resolution < 19.11) {
            //if (!val) return;
            var style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: rgba
                }),
                stroke: new ol.style.Stroke({
                    color: "darkgray",
                    width: 1
                })
            });
        } else {
            //if (!val) return;
            if(val<0.05) return;
            var style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: rgba
                })
            });
        }
        return style;
    }
}
//----------------------------------------------------------------------------------------------------------------------
//500メッシュ
var mesh500Detail = "現役世代負担率＝<br>20〜64歳に対する65歳以上人口の割合<br>" +
    "<div style='background:darkred;color:white;'>・赤＝1.0以上　高負担</div>" +
    "<div style='background:red;color:white;'>・赤＝0.8以上</div>" +
    "<div style='background:orange;color:white;'>・橙＝0.6以上</div>" +
    "<div style='background:yellow;color:black;'>・黄＝0.4以上</div>" +
    "<div style='background:green;color:white;'>・緑＝0.3以上</div>" +
    "<div style='background:blue;color:white;'>・青＝0.3未満　低負担</div>";
var mesh500Detail2 =
    "<div class='detail2-div'>" +
    "<select class='mesh500-year-select mesh500-select' style='margin-bottom:10px'>" +
        "<option value='h27' selected>平成27年</option>" +
        "<option value='h22'>平成22年</option>" +
        "<option value='h17'>平成17年</option>" +
        "<option value='h12'>平成12年</option>" +
        "<option value='h07'>平成7年</option>" +
        "<option value='h99'>H7〜H27比較</option>" +
        "<option value='nensyou'>H27年少</option>" +
        "<option value='seisan'>H27生産年齢</option>" +
        "<option value='rounen'>H27老年</option>" +
        "<option value='hutanritu'>H27現役世代負担率</option>" +
    "</select>" +
    "<br>" +
    "強度：<input type='text' class='mesh500text' value='1000' size='5'>" +
    "　色："+
    "<select class='mesh500-color-select mesh500-select'>" +
        "<option value='indigo' selected>紫</option>" +
        "<option value='red'>赤</option>" +
        "<option value='green'>緑</option>" +
        "<option value='blue'>青</option>" +
        "<option value='black'>黒</option>" +
    "</select>" +
    "</div>";
var mesh500_1 = new ol.layer.VectorTile({
    folder:"child",
    category:"ZinkouKeizai",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"500Mメッシュ人口(MVT)",
    name:"mesh500",
    origin:"<a href='http://e-stat.go.jp/SG2/eStatGIS/page/download.html' target='_blank'>e-Stat</a>",
    detail:"",
    detail2:mesh500Detail2,
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:15,
        //url: "https://hfu.github.io/chome-vt/{z}/{x}/{y}.mvt"
        url: "https://kenzkenz.github.io/500mesh_plus/{z}/{x}/{y}.mvt"
    }),
    maxResolution:1222.99,//ズーム7
    style: mesh500CommonStyleFunction("indigo",1000,"h27")
    //renderMode:"vector"
});
var mesh500_2 = new ol.layer.VectorTile({
    folder:"child",
    category:"ZinkouKeizai",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"500Mメッシュ人口(MVT)",
    name:"mesh500",
    origin:"<a href='http://e-stat.go.jp/SG2/eStatGIS/page/download.html' target='_blank'>e-Stat</a>",
    detail:"",
    detail2:mesh500Detail2,
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:15,
        //url: "https://hfu.github.io/chome-vt/{z}/{x}/{y}.mvt"
        url: "https://kenzkenz.github.io/500mesh_plus/{z}/{x}/{y}.mvt"
    }),
    maxResolution:1222.99,//ズーム7
    style: mesh500CommonStyleFunction("indigo",1000,"h27")
    //renderMode:"vector"
});
function mesh500CommonStyleFunction(maxColor,limit,year) {
    var d3Color = d3.interpolateLab("white",maxColor);
    return function (feature, resolution) {
        var prop = feature.getProperties();
        if(year==="h99") {//比較
            var h07 = prop["h07"];
            if (!h07) h07 = 0;
            var h27 = prop["h27"];
            if (!h27) h27 = 0;
            var val = h27 / h07;
            if (isNaN(val)) return;//0割る0のとき
            if (!isFinite(val)) val = 999;
            //if (val > 2) val = 2;
            val = val - 1;
            if (val <= 0) {
                if (h27 === 0) {
                    d3Color = d3.interpolateLab("white", "black");
                } else {
                    d3Color = d3.interpolateLab("white", "red");
                    val = val *2;
                    //console.log(val)
                }
                val = Math.abs(val);
            } else {
                d3Color = d3.interpolateLab("white", "blue");
            }
            var rgb = d3.rgb(d3Color(val));
            if(val>1) val = 1;
            var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + val * 0.6 + ")";
        }else if(year==="nensyou"){
            if(prop["HTKSYORI"]) return;
            var souzinkou = Number(prop["h27"]);
            var nensyou = Number(prop["T000847006"]);
            var ritu = nensyou / souzinkou;
            if(isNaN(ritu)) return;
            //ritu = (ritu - 0.1) * 20
            ritu = ritu * 4;
            if(ritu>2) ritu = 2;
            //console.log(ritu);
            d3Color = d3.interpolateLab("white","green");
            var rgb = d3.rgb(d3Color(ritu));
            if(ritu>0.8) ritu = 0.8;
            var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + ritu + ")";
        }else if(year==="seisan"){
            if(prop["HTKSYORI"]) return;
            var souzinkou = Number(prop["h27"]);
            var seisan = Number(prop["T000847012"]);
            var ritu = seisan / souzinkou;
            if(isNaN(ritu)) return;
            //ritu = (ritu - 0.4) * 4;
            ritu = (ritu-0.1) * 1.5;
            //if(ritu>2) ritu = 2;
            //console.log(ritu);
            d3Color = d3.interpolateLab("white","blue");
            var rgb = d3.rgb(d3Color(ritu));
            if(ritu>0.8) ritu = 0.8;
            var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + ritu + ")";
        }else if(year==="rounen"){
            if(prop["HTKSYORI"]) return;
            var souzinkou = Number(prop["h27"]);
            var rounen = Number(prop["T000847018"]);
            var ritu = rounen / souzinkou;
            if(isNaN(ritu)) return;
            ritu = (ritu-0.15) * 4;
            d3Color = d3.interpolateLab("white","red");
            var rgb = d3.rgb(d3Color(ritu));
            if(ritu>0.8) ritu = 0.8;
            var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + ritu + ")";
        }else if(year==="hutanritu"){
            if(prop["HTKSYORI"]) return;
            var geneki = Number(prop["T000847015"]) - Number(prop["T000847009"]) + Number(prop["T000847012"]);
            var rounen = Number(prop["T000847018"]);
            var ritu = rounen / geneki;
            if(isNaN(ritu)) return;
            if(ritu>=1.0) {
                var rgba = "rgba(139,0,0,0.8)"
            }else if(ritu>=0.8) {
                var rgba = "rgba(255,0,0,0.8)"
            }else if(ritu>=0.6) {
                var rgba = "rgba(255,165,0,0.8)"
            }else if(ritu>=0.4) {
                var rgba = "rgba(255,255,0,0.8)"
            }else if(ritu>=0.3) {
                var rgba = "rgba(0,128,0,0.8)"
            }else{
                var rgba = "rgba(0,0,250,0.8)"
            }
        }else{//通常
            var val = prop[year];
            if(!val) return;
            val = val / limit;
            //if(val<0.05) return;
            if (val > 1) val = 1;
            var rgb = d3.rgb(d3Color(val));
            var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + val * 0.9 + ")";
        }
        //var text = prop[year];
        if (resolution < 19.11) {
            //if (!val) return;
            var style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: rgba
                }),
                stroke: new ol.style.Stroke({
                    color: "darkgray",
                    width: 1
                }),
                /*
                text: new ol.style.Text({
                    font: "8px sans-serif",
                    text: text,
                    stroke: new ol.style.Stroke({
                        color: "white",
                        width: 3
                    })
                }),
                */
            });
        } else {
            //if (!val) return;
            if(val<0.05) return;
            var style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: rgba
                })
            });
        }
        return style;
    }
}
//----------------------------------------------------------------------------------------------------------------------
//経済センサス
var keizaiCensusDetail1 ="事業所数、従業員数を小地域の面積で割って色を塗っています。強度をあげると色を塗る基準の上限が上がります。";
var keizaiCensusDetail2 =
    "<div class='detail2-div'>" +
    "事業所：<select class='keizaicensus-column-select keizaicensus-select' style='margin-bottom:10px;'>" +
        "<option value='99'>選択してください</option>" +
        "<option value='T000843001' selected>総数（Ａ〜Ｓ全産業）</option>" +
        "<option value='T000843002'>Ａ〜Ｒ全産業（Ｓ公務を除く）</option>" +
        "<option value='T000843003'>Ａ〜Ｂ農林漁業</option>" +
        "<option value='T000843004'>Ｃ〜Ｓ非農林漁業</option>" +
        "<option value='T000843005'>Ｃ〜Ｒ非農林漁業（Ｓ公務を除く）</option>" +
        "<option value='T000843006'>Ｃ鉱業、採石業、砂利採取業</option>" +
        "<option value='T000843007'>Ｄ建設業</option>" +
        "<option value='T000843008'>Ｅ製造業</option>" +
        "<option value='T000843009'>Ｆ電気・ガス・熱供給・水道業</option>" +
        "<option value='T000843010'>Ｇ情報通信業</option>" +
        "<option value='T000843011'>Ｈ運輸業、郵便業</option>" +
        "<option value='T000843012'>Ｉ卸売業、小売業</option>" +
        "<option value='T000843013'>Ｊ金融業、保険業</option>" +
        "<option value='T000843014'>Ｋ不動産業、物品賃貸業</option>" +
        "<option value='T000843015'>Ｌ学術研究、専門・技術サービス業</option>" +
        "<option value='T000843016'>Ｍ宿泊業、飲食サービス業</option>" +
        "<option value='T000843017'>Ｎ生活関連サービス業、娯楽業</option>" +
        "<option value='T000843018'>Ο教育、学習支援業</option>" +
        "<option value='T000843019'>Ｐ医療、福祉</option>" +
        "<option value='T000843020'>Ｑ複合サービス事業</option>" +
        "<option value='T000843021'>Ｒサービス業（他に分類されないもの）</option>" +
        "<option value='T000843022'>Ｓ公務（他に分類されるものを除く）</option>" +
        "<option value='T000843023'>１〜４人</option>" +
        "<option value='T000843024'>５〜９人</option>" +
        "<option value='T000843025'>１０〜１９人</option>" +
        "<option value='T000843026'>２０〜２９人</option>" +
        "<option value='T000843027'>３０人以上</option>" +
        "<option value='T000843028'>出向・派遣従業者のみ</option>" +
    "</select>" +
    "<br>" +
    "事業者：<select class='keizaicensus-column2-select keizaicensus-select' style='margin-bottom:10px;'>" +
        "<option value='99' selected>選択してください</option>" +
        "<option value='T000843029'>総数（Ａ〜Ｓ全産業）</option>" +
        "<option value='T000843030'>男総数（Ａ〜Ｓ全産業）</option>" +
        "<option value='T000843031'>女総数（Ａ〜Ｓ全産業）</option>" +
        "<option value='T000843032'>Ａ〜Ｒ全産業（Ｓ公務を除く）</option>" +
        "<option value='T000843033'>男Ａ〜Ｒ全産業（Ｓ公務を除く）</option>" +
        "<option value='T000843034'>女Ａ〜Ｒ全産業（Ｓ公務を除く）</option>" +
        "<option value='T000843035'>Ａ〜Ｂ農林漁業</option>" +
        "<option value='T000843036'>Ｃ〜Ｓ非農林漁業</option>" +
        "<option value='T000843037'>Ｃ〜Ｒ非農林漁業（Ｓ公務を除く）</option>" +
        "<option value='T000843038'>Ｃ鉱業、採石業、砂利採取業</option>" +
        "<option value='T000843039'>Ｄ建設業</option>" +
        "<option value='T000843040'>Ｅ製造業</option>" +
        "<option value='T000843041'>Ｆ電気・ガス・熱供給・水道業</option>" +
        "<option value='T000843042'>Ｇ情報通信業</option>" +
        "<option value='T000843043'>Ｈ運輸業、郵便業</option>" +
        "<option value='T000843044'>Ｉ卸売業、小売業</option>" +
        "<option value='T000843045'>Ｊ金融業、保険業</option>" +
        "<option value='T000843046'>Ｋ不動産業、物品賃貸業</option>" +
        "<option value='T000843047'>Ｌ学術研究、専門・技術サービス業</option>" +
        "<option value='T000843048'>Ｍ宿泊業、飲食サービス業</option>" +
        "<option value='T000843049'>Ｎ生活関連サービス業、娯楽業</option>" +
        "<option value='T000843050'>Ο教育、学習支援業</option>" +
        "<option value='T000843051'>Ｐ医療、福祉</option>" +
        "<option value='T000843052'>Ｑ複合サービス事業</option>" +
        "<option value='T000843053'>Ｒサービス業（他に分類されないもの）</option>" +
        "<option value='T000843054'>Ｓ公務（他に分類されるものを除く）</option>" +
        "<option value='T000843055'>１〜４人</option>" +
        "<option value='T000843056'>５〜９人</option>" +
        "<option value='T000843057'>１０〜１９人</option>" +
        "<option value='T000843058'>２０〜２９人</option>" +
        "<option value='T000843059'>３０人以上</option>" +
    "</select>" +
    "<br>" +
    "　強度：<input type='text' class='keizaicensustext' value='1000' size='5'>" +
    "　色："+
    "<select class='keizaicensus-color-select keizaicensus-select'>" +
        "<option value='indigo' selected>紫</option>" +
        "<option value='red'>赤</option>" +
        "<option value='green'>緑</option>" +
        "<option value='blue'>青</option>" +
        "<option value='black'>黒</option>" +
    "</select>" +
    "</div>";

var keizaiCensus_1 = new ol.layer.VectorTile({
    folder:"child",
    category:"ZinkouKeizai",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"H26経済センサス(MVT)",
    name:"keizaicensus",
    origin:"<a href='http://e-stat.go.jp/SG2/eStatGIS/page/download.html' target='_blank'>e-Stat</a>",
    detail:keizaiCensusDetail1,
    detail2:keizaiCensusDetail2,
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:15,
        url: "https://kenzkenz.github.io/h26keizai_census_sangyoubetu_mvt/{z}/{x}/{y}.mvt"
    }),
    maxResolution:1222.99,//ズーム7
    style: keizaiCensusStyleFunction("indigo",1000,"T000843001")
});
var keizaiCensus_2 = new ol.layer.VectorTile({
    folder:"child",
    category:"ZinkouKeizai",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"H26経済センサス(MVT)",
    name:"keizaicensus",
    origin:"<a href='http://e-stat.go.jp/SG2/eStatGIS/page/download.html' target='_blank'>e-Stat</a>",
    detail:keizaiCensusDetail1,
    detail2:keizaiCensusDetail2,
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:15,
        url: "https://kenzkenz.github.io/h26keizai_census_sangyoubetu_mvt/{z}/{x}/{y}.mvt"
    }),
    maxResolution:1222.99,//ズーム7
    style: keizaiCensusStyleFunction("indigo",1000,"T000843001")
});
function keizaiCensusStyleFunction(maxColor,limit,column) {
    var d3Color = d3.interpolateLab("white",maxColor);
    return function (feature, resolution) {
        var prop = feature.getProperties();
        var val = prop[column];
        if(val==="-" || !val) return;
        //if(prop["JIGYOSHO"]===0) return;
        val = val / (prop["AREA"]/1000000) / limit;
        //if(val<0.05) return;
        if (val > 1) val = 1;
        var rgb = d3.rgb(d3Color(val));
        var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + val * 0.9 + ")";

        if(prop["JIGYOSHO"]===0) {
            rgba = "rgba(255,255,255,0.05)";
        }

        if (resolution < 125.87) {
            var style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: rgba
                }),
                stroke: new ol.style.Stroke({
                    color: "darkgray",
                    width: 1
                })
            });
        } else {
            if(val<0.05) return;
            var style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: rgba
                })
            });
        }
        return style;
    }
}
//----------------------------------------------------------------------------------------------------------------------
//福祉施設
var fukusiDetail2 =
    "<div class='detail2-div'>" +
    "　施設選択："+
    "<select class='fukushi-select'>" +
        "<option value='all' selected> 全て</option>" +
        "<option value='kosodate'>子育て</option>" +
        "<option value='rouzin'>老人</option>" +
    "</select>" +
    "</div>";

var fukushi_1 = new ol.layer.VectorTile({
    folder:"child",
    category:"KosodateFukushi",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"全国福祉施設(MVT)",
    name:"fukushi",
    origin:"",
    detail:"",
    detail2:fukusiDetail2,
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:15,
        url: "https://kenzkenz.github.io/h27fukushi_mvt/{z}/{x}/{y}.mvt"
    }),
    maxResolution:305.75,
    style: fukushiStyleFunction("all")
    //renderMode:"vector"
});
var fukushi_2 = new ol.layer.VectorTile({
    folder:"child",
    category:"KosodateFukushi",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"全国福祉施設(MVT)",
    name:"fukushi",
    origin:"",
    detail:"",
    detail2:fukusiDetail2,
    source: new ol.source.VectorTile({
        //cacheSize:100000,
        format: new ol.format.MVT(),
        maxZoom:15,
        url: "https://kenzkenz.github.io/h27fukushi_mvt/{z}/{x}/{y}.mvt"
    }),
    maxResolution:305.75,
    style: fukushiStyleFunction("all")
    //renderMode:"vector"
});
function fukushiStyleFunction(target) {
    return function (feature, resolution) {
        //console.log(feature);
        var prop = feature.getProperties();
        //var fillColor = prop["_fillColor"];
        if (resolution > 305) {
            var pointRadius = 2;
        } else if (resolution > 152) {
            var pointRadius = 4;
        } else if (resolution > 76) {
            var pointRadius = 4;
        } else if (resolution > 38) {
            var pointRadius = 4;
        } else {
            var pointRadius = 6;
        }
        var text = "";
        if (resolution < 4.78) {
            text = prop["P14_007"];
        }
        var fillColor = "black";

        var syoubunrui = prop["P14_005"];

        switch (syoubunrui) {
            case "19013":
            case "19014":
            case "19015":
            case "19016":
            case "19017":
            case "19018":
            case "19019":
            case "19020":
            case "19021":
            case "19022":
            case "19023":
            case "16011"://幼稚園
                fillColor = "green";
                if(target!=="all") {
                    if(target!=="kosodate") return;
                }
                break;
            case "19001":
            case "19002":
            case "19003":
            case "19004":
                fillColor = "red";
                if(target!=="all") {
                    if(target!=="rouzin") return;
                }

                break;
            default:
                if(target!=="all") return;
                break;

        }
        var style = new ol.style.Style({
            image: new ol.style.Circle({
                radius: pointRadius,
                fill: new ol.style.Fill({
                    color: fillColor
                }),
                stroke: new ol.style.Stroke({
                    color: "white",
                    width: 1
                })
            }),
            text: new ol.style.Text({
                font: "8px sans-serif",
                text: text,
                offsetY: 10,
                stroke: new ol.style.Stroke({
                    color: "white",
                    width: 3
                })
            })
        });
        return style;
    }
}

//北海道津波浸水----------------------------------------------------------------------------------------------------------
var hokkaidoutunamiDetail2 =
    "<div class='detail2-div'>" +
    "　塗り分け選択："+
    "<select class='tunamihokkaidou-select'>" +
    "<option value='normal' selected>普通</option>" +
    "<option value='ao'>青色で無段階</option>" +
    "<option value='aka'>赤色で無段階</option>" +
    "</select>" +
    "</div>";

var tunamiWakkanaimvt1 = new ol.layer.VectorTile({
    folder:"child",
    category:"test",
    title:"稚内市〜石狩市　津波水位(MVT)",
    name:"tunamihokkaidou",
    origin:"",
    detail:"",
    detail2:hokkaidoutunamiDetail2,
    icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:red;'></i>",
    source: new ol.source.VectorTile({
        //cacheSize:128,
        overlaps:false,
        transition:0,
        format: new ol.format.MVT(),
        maxZoom:19,
        url: "https://kenzkenz.github.io/01wakkanai_mvt/{z}/{x}/{y}.mvt"
    }),
    crossOrigin:"anonymous",
    style: tunamiHokkaidouStyleFunction("normal"),
    renderMode:"vector"
});
function tunamiHokkaidouStyleFunction(target) {
    return function (feature, resolution) {
        if(target==="ao") {
            var sinsuiColor = d3.interpolateLab("white", "navy");
        }else{
            var sinsuiColor = d3.interpolateLab("white", "darkred");
        }

        var prop = feature.getProperties();
        if (prop["MAX_SIN"]) {
            var level = prop["MAX_SIN"];
            if(target==="normal") {
                if (level < 0.3) {
                    fillColor = "rgba(0,255,0,0.7)";
                } else if (level < 1) {
                    fillColor = "rgba(255,230,0,0.7)";
                } else if (level < 2) {
                    fillColor = "rgba(255,153,0,0.7)";
                } else if (level < 5) {
                    fillColor = "rgba(239,117,152,0.7)";
                } else if (level < 10) {
                    fillColor = "rgba(255,40,0,0.7)";
                } else if (level < 20) {
                    fillColor = "rgba(180,0,104,0.7)";
                } else {
                    fillColor = "rgba(128,0,255,0.7)";
                }
            }else {
                fillColor = sinsuiColor(level / 10);
            }

        } else {
            var level = prop["level"];
            if(target==="normal") {
                switch (level) {
                    case 1://0.3
                        fillColor = "rgba(0,255,0,0.7)";
                        break;
                    case 2://1
                        fillColor = "rgba(255,230,0,0.7)";
                        break;
                    case 3://2
                        fillColor = "rgba(255,153,0,0.7)";
                        break;
                    case 4://2〜5
                        fillColor = "rgba(239,117,152,0.7)";
                        break;
                    case 5://10
                        fillColor = "rgba(255,40,0,0.7)";
                        break;
                    case 6://20
                        fillColor = "rgba(180,0,104,0.7)";
                        break;
                    case 7:
                        fillColor = "rgba(128,0,255,0.7)";
                        break;
                }
            }else {
                switch (level) {
                    case 1://0.3
                        level = 0.3;
                        break;
                    case 2://1
                        level = 1;
                        break;
                    case 3://2
                        level = 2;
                        break;
                    case 4://2〜5
                        level = 5;
                        break;
                    case 5://10
                        level = 10;
                        break;
                    case 6://20
                        level = 20;
                        break;
                    case 7:
                        level = 30;
                        break;
                }
                fillColor = sinsuiColor(level / 10);
            }
        }
        /*
         var text = "";
         if(resolution<0.30) {
         text = String(prop["H_M"]) + "M";
         }
         */
        var style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: fillColor
            }),
            /*
             text: new ol.style.Text({
             font: "8px sans-serif",
             text: text,
             offsetY:10,
             stroke: new ol.style.Stroke({
             color: "white",
             width: 3
             })
             })
             */
            /*
             stroke: new ol.style.Stroke({
             color: "grey",
             width: 1
             }),
             */
            //zIndex:zindex
        });
        return style;
    }
}
//景観地区----------------------------------------------------------------------------------------------------------
var keikan1 = new ol.layer.VectorTile({
    folder:"child",
    category:"ToshiDouroKasen",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"テスト中全国景観地区(MVT)",
    name:"keikanchiku",
    origin:"",
    detail:"",
    source: new ol.source.VectorTile({
        //cacheSize:10000,
        format: new ol.format.MVT(),
        maxZoom:14,
        url: "https://kenzkenz.github.io/keikanchiku_mvt/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:1222.99,
    style: keikanStyleFunction()
});
function keikanStyleFunction() {
    return function(feature, resolution) {
        var prop = feature.getProperties();
        var geoType = feature.getGeometry().getType();
        //var rgb = d3.rgb(d3syougakkoukuColor(Number(prop["id"])));
        //var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0.7)";
        //console.log(prop);
        var text = "";
        if (resolution < 38.22) {
            //text = prop["A38b_004"];
        }

        var rgba = "blue";

        switch (geoType) {
            case "MultiPoint":
            case "Point":
                //if (resolution > 305) break;
                var style = new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 10,
                        fill: new ol.style.Fill({
                            color: "black"
                        }),
                        stroke: new ol.style.Stroke({
                            color: "white",
                            width: 1
                        })
                    }),
                    text: new ol.style.Text({
                        font: "8px sans-serif",
                        text: text,
                        offsetY: 10,
                        stroke: new ol.style.Stroke({
                            color: "white",
                            width: 3
                        })
                    })
                });
                break;
            case "Polygon":
            case "MultiPolygon":
                if (resolution < 2445.98) {
                    var style = new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: rgba
                        }),
                        stroke: new ol.style.Stroke({
                            color: "gray",
                            width: 1
                        }),
                        text: new ol.style.Text({
                            font: "8px sans-serif",
                            text: text,
                            stroke: new ol.style.Stroke({
                                color: "white",
                                width: 3
                            })
                        }),
                        zIndex: 0
                    });
                } else {
                    var style = new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: rgba
                        }),
                        zIndex: 0
                    });
                }
                break;
            default:
        }
        return style;
    };
}

//避難場所----------------------------------------------------------------------------------------------------------
var keikan_1 = new ol.layer.VectorTile({
    folder:"child",
    category:"hazard",
    icon:"<i class='fa fa-th fa-fw' style='color:red;'></i>",
    title:"テスト避難所(MVT)",
    name:"keikanchiku",
    origin:"",
    detail:"",
    source: new ol.source.VectorTile({
        //cacheSize:10000,
        format: new ol.format.MVT(),
        maxZoom:15,
        url: "https://kenzkenz.github.io/hinanzyo_mvt/{z}/{x}/{y}.mvt"
    }),
    maxResolution: 305.75,
    style: commonstyleFunction
});
function hinanzyoStyleFunction() {
    return function(feature, resolution) {
        //var prop = feature.getProperties();
        //var geoType = feature.getGeometry().getType();
        //switch (geoType) {
        //    case "MultiPoint":
        //    case "Point":
                //if (resolution > 305) break;
                var style = new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 10,
                        fill: new ol.style.Fill({
                            color: "red"
                        }),
                        stroke: new ol.style.Stroke({
                            color: "white",
                            width: 1
                        })
                    })
                });
        //        break;
        //    default:
        //}
        return style;
    };
}