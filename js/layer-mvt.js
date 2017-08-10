
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


    //if(youtoFeaturesFlg) youtoFeatures.push(prop);


    //console.log(cate);
    /*
    "A29_004" =
        1=第一種低層住居専用地域 #33CC99 rgba(51,204,153,0.7);
        2=第二種低層住居専用地域 #009966 rgba(0,153,102,0.7);
        3=第一種中高層住居専用地域 #66CC66 rgba(102,204,102,0.7);
        4=第二種中高層住居専用地域 #CCFF99 rgba(204,255,153,0.7);
        5=第一種住居地域 #FFFF99 rgba(255,255,153,0.7);
        6=第二種住居地域 #FFCC99 rgba(255,204,153,0.7);
        7=準住居地域 #FFCC66 rgba(255,204,102,0.7);
        8=近隣商業地域 #FF99CC rgba(255,153,204,0.7);
        9=商業地域 #FF6699 rgba(255,102,153,0.7);
        10=準工業地域 #CC99FF rgba(204,153,255,0.7);
        11=工業地域 #CCFFFF rgba(204,255,255,0.7);
        12=工業専用地域 #66CCFF rgba(102,204,255,0.7);
        99=不明
    */
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