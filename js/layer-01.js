//宮崎犬
var inu = new ol.layer.Tile({
    extent:transformE([131.423495,31.9105397,131.42432348,31.91107022]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/miyazakiken/{z}/{x}/{-y}.png",
        //minZoom :1,
        crossOrigin:"anonymous",
        maxZoom:21
    })
});
//国土地理院淡色地図のレイヤー
var pale1 = new ol.layer.Tile({
    title:"国土地理院_淡色地図",
    origin:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>",
    detail:"",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source:new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"./php/proxy-png.php?url=https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        minZoom:2,
        maxZoom:18
    })
});
var pale2 = new ol.layer.Tile({
    title:"国土地理院_淡色地図",
    origin:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>",
    detail:"",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source:new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        //url:"./php/proxy-png.php?url=https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
        urls:[
            "./php/proxy-png.php?url=https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
            "./php/proxy-png.php?url=https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png"
        ],
        crossOrigin:"anonymous",
        minZoom:2,
        maxZoom:18
    })
});
//国土地理院_白地図
var blank1 = new ol.layer.Tile({
    title:"国土地理院_白地図",
    origin:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>",
    detail:"",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png",
        crossOrigin:"anonymous"
    })
});
var blank2 = new ol.layer.Tile({
    title:"国土地理院_白地図",
    origin:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>",
    detail:"",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png",
        crossOrigin:"anonymous"
    })
});
//国土地理院_色別標高図
var relief1 = new ol.layer.Tile({
    title:"国土地理院_色別標高図",
    origin:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>",
    detail:"",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"https://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png",
        crossOrigin:"anonymous"
    })
});
var relief2 = new ol.layer.Tile({
    title:"国土地理院_色別標高図",
    origin:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>",
    detail:"",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"https://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png",
        crossOrigin:"anonymous"
    })
});
//オープンストリートマップ
var osm1 = new ol.layer.Tile({
    title:"OpenStreetMap",
    origin:"<a href='https://openstreetmap.jp' target='_blank'>OpenStreetMap</a>",
    detail:"OpenStreetMapは、道路地図などの地理情報データを誰でも利用できるよう、フリーの地理情報データを作成することを目的としたプロジェクトです。",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.OSM({
        crossOrigin:"anonymous"
    })
});
var osm2 = new ol.layer.Tile({
    title:"OpenStreetMap",
    origin:"<a href='https://openstreetmap.jp' target='_blank'>OpenStreetMap</a>",
    detail:"OpenStreetMapは、道路地図などの地理情報データを誰でも利用できるよう、フリーの地理情報データを作成することを目的としたプロジェクトです。",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.OSM({
        crossOrigin:"anonymous"
    })
});
//ミエルネ地図
var mierune1 = new ol.layer.Tile({
    title:"MIERUNE地図",
    origin:"<a href='http://www.mierune.co.jp/tile.html' target='_blank'><label>MIERUNE,LLC.</label></a>",
    detail:"Maptiles by MIERUNE, under CC BY. Data by OpenStreetMap contributors, under ODbL.",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"Maptiles by <a href='http://www.mierune.co.jp/' target='_blank'><label>MIERUNE</label></a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'><label>OpenStreetMap</label></a> contributors, under ODbL."})],
        //url:"https://tile.mierune.co.jp/mierune/{z}/{x}/{y}.png",
        urls:[
            "https://tile.mierune.co.jp/mierune/{z}/{x}/{y}.png",
            "https://tile.mierune.co.jp/mierune/{z}/{x}/{y}.png"
        ],
        crossOrigin:"anonymous",
        maxZoom:15
    })
});
var mierune2 = new ol.layer.Tile({
    title:"MIERUNE地図",
    origin:"<a href='http://www.mierune.co.jp/tile.html' target='_blank'><label>MIERUNE,LLC.</label></a>",
    detail:"Maptiles by MIERUNE, under CC BY. Data by OpenStreetMap contributors, under ODbL.",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"Maptiles by <a href='http://www.mierune.co.jp/' target='_blank'><label>MIERUNE</label></a>, under CC BY. Data by OpenStreetMap contributors, under ODbL."})],
        url:"https://tile.mierune.co.jp/mierune/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        maxZoom:15
    })
});
var mieruneMono1 = new ol.layer.Tile({
    title:"MIERUNE地図モノクロ",
    origin:"<a href='http://www.mierune.co.jp/tile.html' target='_blank'><label>MIERUNE,LLC.</label></a>",
    detail:"Maptiles by MIERUNE, under CC BY. Data by OpenStreetMap contributors, under ODbL.",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"Maptiles by <a href='http://www.mierune.co.jp/' target='_blank'><label>MIERUNE</label></a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'><label>OpenStreetMap</label></a> contributors, under ODbL."})],
        url:"https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        maxZoom:18
    })
});
var mieruneMono2 = new ol.layer.Tile({
    title:"MIERUNE地図モノクロ",
    origin:"<a href='http://www.mierune.co.jp/tile.html' target='_blank'><label>MIERUNE,LLC.</label></a>",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    detail:"Maptiles by MIERUNE, under CC BY. Data by OpenStreetMap contributors, under ODbL.",
    source: new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"Maptiles by <a href='http://www.mierune.co.jp/' target='_blank'><label>MIERUNE</label></a>, under CC BY. Data by OpenStreetMap contributors, under ODbL."})],
        url:"https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        maxZoom:18
    })
});
//toner
var toner1 = new ol.layer.Tile({
    title:"Stamen Toner",
    origin:"<a href='http://maps.stamen.com/#toner/5/35.661/139.380' target='_blank'>maps.stamen.com</a>",
    detail:"Map Tiles by Stamen Design, under CC BY 3.0, Date by OpenStreetMap, Under CC BY SA.",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        attributions:[new ol.Attribution({html:""})],
        url:"./php/proxy-png.php?url=http://a.tile.stamen.com/toner/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        maxZoom:20
    })
});
var toner2 = new ol.layer.Tile({
    title:"Stamen Toner",
    origin:"<a href='http://maps.stamen.com/#toner/5/35.661/139.380' target='_blank'>maps.stamen.com</a>",
    detail:"Map Tiles by Stamen Design, under CC BY 3.0, Date by OpenStreetMap, Under CC BY SA.",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        attributions:[new ol.Attribution({html:""})],
        url:"./php/proxy-png.php?url=http://a.tile.stamen.com/toner/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        maxZoom:20
    })
});
//宮崎県オルソ
var ort1 = new ol.layer.Tile({
    title:"宮崎県航空写真",
    origin:"宮崎県県土整備部砂防課",
    detail:"砂防課が平成25年度に撮影した航空写真をオルソ補正したもの",
    icon:"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
    message:"2013年",
    extent:transformE([130.66371,31.34280,131.88045,32.87815]),
    source: new ol.source.XYZ({
        url:'https://mtile.pref.miyazaki.lg.jp/tile/ort/{z}/{x}/{-y}.png',
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:19
    })
});
var ort2 = new ol.layer.Tile({
    title:"宮崎県航空写真",
    origin:"宮崎県県土整備部砂防課",
    detail:"砂防課が平成25年度に撮影した航空写真をオルソ補正したもの",
    icon:"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
    message:"2013年",
    extent:transformE([130.66371,31.34280,131.88045,32.87815]),
    source: new ol.source.XYZ({
        url:'https://mtile.pref.miyazaki.lg.jp/tile/ort/{z}/{x}/{-y}.png',
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:19
    })
});
//空中写真のレイヤー
var seamlessphoto1 = new ol.layer.Tile({
    title:"国土地理院_空中写真",
    origin:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>",
    detail:"",
    icon:"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
    source:new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",
        crossOrigin:"anonymous",
        minZoom:2,
        maxZoom:18
    })
});
var seamlessphoto2 = new ol.layer.Tile({
    title:"国土地理院_空中写真",
    origin:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>",
    detail:"国土画像情報（第一期1974～1978年撮影）",
    icon:"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
    source:new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",
        crossOrigin:"anonymous",
        minZoom:2,
        maxZoom:18
    })
});
//40年前の写真
var gazo11 = new ol.layer.Tile({
    title:"国土地理院_40年前の写真",
    origin:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>",
    detail:"国土画像情報（第一期1974～1978年撮影）",
    icon:"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
    message:"74～78年",
    source: new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"https://cyberjapandata.gsi.go.jp/xyz/gazo1/{z}/{x}/{y}.jpg",
        crossOrigin:"anonymous",
        minZoom :10,
        maxZoom:17
    })
});
var gazo12 = new ol.layer.Tile({
    title:"国土地理院_40年前の写真",
    origin:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>",
    detail:"",
    icon:"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
    message:"74～78年",
    source: new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"https://cyberjapandata.gsi.go.jp/xyz/gazo1/{z}/{x}/{y}.jpg",
        crossOrigin:"anonymous",
        minZoom :10,
        maxZoom:17
    })
});
//室蘭市オルソH28
var muro1 = new ol.layer.Tile({
    title:"H28室蘭市航空写真",
    origin:"<a href='http://www.city.muroran.lg.jp/main/org2260/odlib.php' target='_blank'>むろらんオープンデータライブラリ</a>",
    detail:"",
    coord:[140.973774,42.315226],
    zoom:14,
    icon:"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
    //extent:transformE([130.66371,31.34280,131.88045,32.87815]),
    source: new ol.source.XYZ({
        url:'https://kenzkenz2.xsrv.jp/muroran3/{z}/{x}/{-y}.png',
        crossOrigin:"anonymous",
        maxZoom:20
    })
});
var muro2;
muro2 = new ol.layer.Tile({
    title: "H28室蘭市航空写真",
    origin: "",
    detail: "",
    coord: [140.973774, 42.315226],
    zoom: 14,
    icon:"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
    //extent:transformE([130.66371,31.34280,131.88045,32.87815]),
    source: new ol.source.XYZ({
        url: 'https://kenzkenz2.xsrv.jp/muroran3/{z}/{x}/{-y}.png',
        crossOrigin:"anonymous",
        maxZoom: 20
    })
});
//室蘭市オルソH25
var muroQ1 = new ol.layer.Tile({
    title:"H25室蘭市航空写真",
    origin:"<a href='http://neogis.net/muroran/man/man_muroran_tile.pdf' target='_blank'>室蘭市オルソ画像航空写真のタイル配信に関しまして</a>",
    detail:"",
    coord:[140.973774,42.315226],
    zoom:14,
    icon:"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
    //extent:transformE([130.66371,31.34280,131.88045,32.87815]),
    source: new ol.source.XYZ({
        url:"./php/proxy-jpeg.php?url=https://neogis.net/muroran/TILE/1.0.0/H25/{z}/{x}/{-y}.jpg",
        crossOrigin:"anonymous",
        //minZoom:12,
        maxZoom:21
    })
});
var muroQ2 = new ol.layer.Tile({
    title: "H25室蘭市航空写真",
    origin:"<a href='http://neogis.net/muroran/man/man_muroran_tile.pdf' target='_blank'>室蘭市オルソ画像航空写真のタイル配信に関しまして</a>",
    detail: "",
    coord: [140.973774, 42.315226],
    zoom: 14,
    icon:"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
    //extent:transformE([130.66371,31.34280,131.88045,32.87815]),
    source: new ol.source.XYZ({
        url:"./php/proxy-jpeg.php?url=https://neogis.net/muroran/TILE/1.0.0/H25/{z}/{x}/{-y}.jpg",
        crossOrigin:"anonymous",
        //minZoom:12,
        maxZoom:21
    })
});
//室蘭市米軍地図
var murous1 = new ol.layer.Tile({
    title:"室蘭市戦後米軍地図",
    origin:"<a href='https://github.com/code4nara/jcp_maps/wiki' target='_blank' >テキサス大学図書館Japan City PlansのTMS化プロジェクト</a>",
    detail:"戦後の米軍作成地図をみんなで地図タイル化するプロジェクトです。面白くて大変ためになるプロジェクトなので是非参加しましょう！" ,
    coord:[140.973774,42.315226],
    zoom:14,
    icon:"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
    //extent:transformE([130.66371,31.34280,131.88045,32.87815]),
    source: new ol.source.XYZ({
        url:"./php/proxy-jpeg.php?url=http://t.tilemap.jp/jcp_maps/muroran/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom:12,
        //maxZoom:21
    })
});
var murous2 = new ol.layer.Tile({
    title:"室蘭市戦後米軍地図",
    origin:"<a href='https://github.com/code4nara/jcp_maps/wiki' target='_blank' >テキサス大学図書館Japan City PlansのTMS化プロジェクト</a>",
    detail:"戦後の米軍作成地図をみんなで地図タイル化するプロジェクトです。面白くて大変ためになるプロジェクトなので是非参加しましょう！",
    coord:[140.973774,42.315226],
    zoom:14,
    icon:"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
    //extent:transformE([130.66371,31.34280,131.88045,32.87815]),
    source: new ol.source.XYZ({
        url:"./php/proxy-jpeg.php?url=http://t.tilemap.jp/jcp_maps/muroran/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom:12,
        //maxZoom:21
    })
});

var murosenzen1 = new ol.layer.Tile({
    title:"室蘭市戦前地図",
    origin:"<a href='http://stanford.maps.arcgis.com/apps/SimpleViewer/index.html?appid=733446cc5a314ddf85c59ecc10321b41' target='_blank'>スタンフォード大学</a>",
    detail:"" ,
    coord:[140.973774,42.315226],
    zoom:14,
    icon:"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
    //extent:transformE([130.66371,31.34280,131.88045,32.87815]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/murorankotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom:12,
        maxZoom:18
    })
});
var murosenzen2 = new ol.layer.Tile({
    title:"室蘭市戦前地図",
    origin:"<a href='http://stanford.maps.arcgis.com/apps/SimpleViewer/index.html?appid=733446cc5a314ddf85c59ecc10321b41' target='_blank'>スタンフォード大学</a>",
    detail:"" ,
    coord:[140.973774,42.315226],
    zoom:14,
    icon:"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
    //extent:transformE([130.66371,31.34280,131.88045,32.87815]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/murorankotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom:12,
        maxZoom:18
    })
});




//ハザードマップ関係------------------------------------------------------------------------------------------------------------------------------------------------------
//津波
var tunami1 = new ol.layer.Tile({
    title:"津波浸水想定区域（宮崎県）",
    origin:"",
    detail:"",
    icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:dimgrey;'></i>",
    extent:transformE([131.161,31.36,131.921,32.892]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
		url:"./php/proxy-png.php?url=http://disaportal.gsi.go.jp/hazardmap_data/raster/tsunamishinsui/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
		minZoom :1,
		maxZoom:17
	})
});
var tunami2 = new ol.layer.Tile({
    title:"津波浸水想定区域（宮崎県）",
    origin:"",
    detail:"",
    icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:dimgrey;'></i>",
    extent:transformE([131.161,31.36,131.921,32.892]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
		url:"./php/proxy-png.php?url=http://disaportal.gsi.go.jp/hazardmap_data/raster/tsunamishinsui/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
		minZoom :1,
		maxZoom:17
	})
});
//浸水想定
var sinsuisoutei1 = new ol.layer.Tile({
    title:"洪水浸水想定（宮崎県）",
    origin:"",
    detail:"",
    icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:dimgrey;'></i>",
    extent:transformE([130.705,31.36,131.921,32.892]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
		url:"./php/proxy-png.php?url=http://disaportal.gsi.go.jp/hazardmap_data/raster/SHINSUI/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
		minZoom :1,
		maxZoom:18
	})
});
var sinsuisoutei2 = new ol.layer.Tile({
    title:"洪水浸水想定区域（宮崎県）",
    origin:"",
    detail:"",
    icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:dimgrey;'></i>",
    extent:transformE([130.705,31.36,131.921,32.892]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
		url:"./php/proxy-png.php?url=http://disaportal.gsi.go.jp/hazardmap_data/raster/SHINSUI/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
		minZoom :1,
		maxZoom:18
	})
});
//土石流危険渓流
var kikenkeiryuu1 = new ol.layer.Tile({
    title:"土石流危険渓流（宮崎県）",
    origin:"",
    detail:"",
    icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:dimgrey;'></i>",
    extent:transformE([130.705,31.36,131.921,32.892]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
		url:"./php/proxy-png.php?url=http://disaportal.gsi.go.jp/hazardmap_data/raster/dosekiryukikenkeiryu/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
		minZoom :1,
		maxZoom:16
	})
});
var kikenkeiryuu2 = new ol.layer.Tile({
    title:"土石流危険渓流（宮崎県）",
    origin:"",
    detail:"",
    icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:dimgrey;'></i>",
    extent:transformE([130.705,31.36,131.921,32.892]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
		url:"./php/proxy-png.php?url=http://disaportal.gsi.go.jp/hazardmap_data/raster/dosekiryukikenkeiryu/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
		minZoom :1,
		maxZoom:16
	})
});
//急傾斜地崩壊危険箇所
var kyuukeisyakikenkasyo1 = new ol.layer.Tile({
    title:"急傾斜地崩壊危険箇所（宮崎県）",
    origin:"",
    detail:"",
    icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:dimgrey;'></i>",
    extent:transformE([130.705,31.36,131.921,32.892]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
		url:"./php/proxy-png.php?url=http://disaportal.gsi.go.jp/hazardmap_data/raster/kyukeisyachihoukai/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
		minZoom :1,
		maxZoom:16
	})
});
var kyuukeisyakikenkasyo2 = new ol.layer.Tile({
    title:"急傾斜地崩壊危険箇所（宮崎県）",
    origin:"",
    detail:"",
    icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:dimgrey;'></i>",
    extent:transformE([130.705,31.36,131.921,32.892]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
		url:"./php/proxy-png.php?url=http://disaportal.gsi.go.jp/hazardmap_data/raster/kyukeisyachihoukai/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
		minZoom :1,
		maxZoom:16
	})
});
//-------------------------------------------------------------------------
//川だけ地形地図
var kawadake1 = new ol.layer.Tile({
    title:"川だけ地形地図",
    origin:"<a href='http://www.gridscapes.net/#AllRiversAllLakesTopography' target='_blank'>川だけ地形地図</a>",
    detail:"",
    icon:"<i class='fa fa-map-o fa-fw' style='color:blue;'></i>",
    source: new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://www.gridscapes.net/#AllRiversAllLakesTopography' target='_blank'>川だけ地形地図</a>"})],
        url:"./php/proxy-png.php?url=http://www.gridscapes.net/AllRivers/1.0.0/t/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom:5,
        maxZoom:14
    })
});
var kawadake2 = new ol.layer.Tile({
    title:"川だけ地形地図",
    origin:"<a href='http://www.gridscapes.net/#AllRiversAllLakesTopography' target='_blank'>川だけ地形地図</a>",
    detail:"",
    icon:"<i class='fa fa-map-o fa-fw' style='color:blue;'></i>",
    source: new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://www.gridscapes.net/#AllRiversAllLakesTopography' target='_blank'>川だけ地形地図</a>"})],
        url:"./php/proxy-png.php?url=http://www.gridscapes.net/AllRivers/1.0.0/t/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom:5,
        maxZoom:14
    })
});



//-------------------------------------------------------------------------
//川と流域地図
var ryuuiki1 = new ol.layer.Tile({
    title:"川と流域地図",
    origin:"<a href='http://tiles.dammaps.jp/ryuiki/' target='_blank'>川と流域地図</a>",
    detail:"<small>本図は国土交通省 国土数値情報「河川」「流域メッシュ」「湖沼」（第2.1版）および国土地理院 地球地図日本「行政界」（第２版）をもとに高根たかね様が作成したものです。国土数値情報は国土計画関連業務のために作成されたデータが副次的に公開されたものであり、国土計画関連業務に差しさわりがない範囲で時間的、位置的精度において現況と誤差が含まれています。本地図を利用される場合はその点に十分ご留意の上ご利用ください。また、国土数値情報 利用約款を遵守しご利用ください。</small>",
    icon:"<i class='fa fa-map-o fa-fw' style='color:blue;'></i>",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://tiles.dammaps.jp/ryuiki/' target='_blank'>川と流域地図</a>"})],
        url:"./php/proxy-png.php?url=http://tiles.dammaps.jp/ryuiki_t/1/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
		minZoom:4,
		maxZoom:14
	})
});
var ryuuiki2 = new ol.layer.Tile({
    title:"川と流域地図",
    origin:"<a href='http://tiles.dammaps.jp/ryuiki/' target='_blank'>川と流域地図</a>",
    detail:"<small>本図は国土交通省 国土数値情報「河川」「流域メッシュ」「湖沼」（第2.1版）および国土地理院 地球地図日本「行政界」（第２版）をもとに高根たかね様が作成したものです。国土数値情報は国土計画関連業務のために作成されたデータが副次的に公開されたものであり、国土計画関連業務に差しさわりがない範囲で時間的、位置的精度において現況と誤差が含まれています。本地図を利用される場合はその点に十分ご留意の上ご利用ください。また、国土数値情報 利用約款を遵守しご利用ください。</small>",
    icon:"<i class='fa fa-map-o fa-fw' style='color:blue;'></i>",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://tiles.dammaps.jp/ryuiki/' target='_blank'>川と流域地図</a>"})],
        url:"./php/proxy-png.php?url=http://tiles.dammaps.jp/ryuiki_t/1/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
		minZoom:4,
		maxZoom:14
	})
});
//エコリス植生図
var ecoris1 = new ol.layer.Tile({
    title:"エコリス植生図",
    origin:"<a href='http://map.ecoris.info/' target='_blank'><img src='icon/ecorischan.png' title='エコリスちゃん'><br>エコリス地図タイル</a>",
    detail:"第5回 自然環境保全基礎調査 植生調査結果を着色し、国土地理院 基盤地図情報 数値標高データ10mメッシュから作成した陰影起伏図に重ねたものです。",
    icon:"<i class='fa fa-map-o fa-fw' style='color:blue;'></i>",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://map.ecoris.info/' target='_blank'>エコリス地図タイル</a>"})],
		url:"https://map.ecoris.info/tiles/vegehill/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
		minZoom:5,
		maxZoom:15
	})
});
var ecoris2 = new ol.layer.Tile({
    title:"エコリス植生図",
    origin:"<a href='http://map.ecoris.info/' target='_blank'><img src='icon/ecorischan.png' title='エコリスちゃん'><br>エコリス地図タイル</a>",
    detail:"第5回 自然環境保全基礎調査 植生調査結果を着色し、国土地理院 基盤地図情報 数値標高データ10mメッシュから作成した陰影起伏図に重ねたものです。",
    icon:"<i class='fa fa-map-o fa-fw' style='color:blue;'></i>",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://map.ecoris.info/' target='_blank'>エコリス地図タイル</a>"})],
		url:"https://map.ecoris.info/tiles/vegehill/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
		minZoom:5,
		maxZoom:15
	})
});

//------------------------------------------------------------------------------
//飫肥城
var obi1 = new ol.layer.Tile({
    title:"飫肥歴史まちあるきマップ",
    origin:"",
    detail:"",
    coord:[131.3502,31.6289],
    zoom:16,
    icon:"<i class='fa fa-file-image-o fa-fw' style='color:dimgrey;'></i>",
	extent:transformE([131.33600171544876,31.61837899707213,131.37244226230908,31.63995077971333]),
	source: new ol.source.XYZ({
		url:"https://mtile.pref.miyazaki.lg.jp/tile/obi/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
		maxZoom:19
	})
});
var obi2 = new ol.layer.Tile({
    title:"飫肥歴史まちあるきマップ",
    origin:"",
    detail:"",
    coord:[131.3502,31.6289],
    zoom:16,
    icon:"<i class='fa fa-file-image-o fa-fw' style='color:dimgrey;'></i>",
	extent:transformE([131.33600171544876,31.61837899707213,131.37244226230908,31.63995077971333]),
	source: new ol.source.XYZ({
		url:"https://mtile.pref.miyazaki.lg.jp/tile/obi/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
		maxZoom:19
	})
});
//飫肥城古地図
var obikoyizu1 = new ol.layer.Tile({
    title:"飫肥城（古地図）",
    origin:"承応年間飫肥城下図",
    detail:"",
    coord:[131.3502,31.6289],
    zoom:16,
    icon:"<i class='fa fa-file-image-o fa-fw' style='color:dimgrey;'></i>",
    message:"1654年",
    extent:transformE([131.33600171544876,31.61837899707213,131.377,31.63995077971333]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/obikotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        maxZoom:19
    })
});
var obikoyizu2 = new ol.layer.Tile({
    title:"飫肥城（古地図）",
    origin:"承応年間飫肥城下図",
    detail:"",
    coord:[131.3502,31.6289],
    zoom:16,
    icon:"<i class='fa fa-file-image-o fa-fw' style='color:dimgrey;'></i>",
    message:"1654年",
    extent:transformE([131.33600171544876,31.61837899707213,131.377,31.63995077971333]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/obikotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        maxZoom:19
    })
});

//------------------------------------------------------------------------------
//シームレス地質図
var tisitu1 = new ol.layer.Tile({
    title:"シームレス地質図",
    origin:"<a href='https://gbank.gsj.jp/seamless/seamless2015/2d/' target='_blank'>日本シームレス地質図</a><br>" +
    "<a href='https://gbank.gsj.jp/geonavi/' target='_blank'>地質図Navi</a>",
    detail:"20万分の1日本シームレス地質図®は、これまで出版されてきた地質図幅の図郭における境界線の不連続を、日本全国統一の凡例を用いることによって解消した新しい地質図です。",
    icon:"<i class='fa fa-map-o fa-fw' style='color:brown;'></i>",
    source: new ol.source.XYZ({
        //url:"https://gbank.gsj.jp/seamless/tilemap/detailed/glfn/{z}/{y}/{x}.png",//ｘとｙを国土地理院流の反対にすること。
        url:"./php/proxy-png.php?url=https://gbank.gsj.jp/seamless/v2full/tiles/g/{z}/{y}/{x}.png",//ｘとｙを国土地理院流の反対にすること。
        attributions:[new ol.Attribution({html:"<a href='https://www.gsj.jp/HomePageJP.html' target='_blank'>産業技術総合研究所地質調査総合センター</a>"})],
        //crossOrigin:"anonymous",
        minZoom:5,
        maxZoom:13
    })
});
var tisitu2 = new ol.layer.Tile({
    title:"シームレス地質図",
    origin:"<a href='https://gbank.gsj.jp/seamless/seamless2015/2d/' target='_blank'>日本シームレス地質図</a><br>" +
    "<a href='https://gbank.gsj.jp/geonavi/' target='_blank'>地質図Navi</a>",
    detail:"20万分の1日本シームレス地質図®は、これまで出版されてきた地質図幅の図郭における境界線の不連続を、日本全国統一の凡例を用いることによって解消した新しい地質図です。",
    icon:"<i class='fa fa-map-o fa-fw' style='color:brown;'></i>",
    source: new ol.source.XYZ({
        //url:"https://gbank.gsj.jp/seamless/tilemap/detailed/glfn/{z}/{y}/{x}.png",//ｘとｙを国土地理院流の反対にすること。
        url:"./php/proxy-png.php?url=https://gbank.gsj.jp/seamless/v2full/tiles/g/{z}/{y}/{x}.png",//ｘとｙを国土地理院流の反対にすること。
        attributions:[new ol.Attribution({html:"<a href='https://www.gsj.jp/HomePageJP.html' target='_blank'>産業技術総合研究所地質調査総合センター</a>"})],
        //crossOrigin:"anonymous",
        minZoom:5,
        maxZoom:13
    })
});
//日本CS立体図
var nihonCs1 = new ol.layer.Tile({
    title:"日本CS立体図",
    origin:"<a href='http://kouapp.main.jp/csmap/japan/csjapan.html' target='_blank'>日本CS立体図</a>",
    detail:"CS立体図（国土地理院承認番号　平29情使、 第77号）",
    icon:"<i class='fa fa-map-o fa-fw' style='color:brown;'></i>",
    source: new ol.source.XYZ({
        url:"./php/proxy-jpeg.php?url=http://kouapp.main.jp/csmap/tile/japan/{z}/{x}/{y}.jpg",
        crossOrigin:"anonymous",
        minZoom:9,
        maxZoom:15
    })
});
var nihonCs2 = new ol.layer.Tile({
    title:"日本CS立体図",
    origin:"<a href='http://kouapp.main.jp/csmap/japan/csjapan.html' target='_blank'>日本CS立体図</a>",
    detail:"CS立体図（国土地理院承認番号　平29情使、 第77号）",
    icon:"<i class='fa fa-map-o fa-fw' style='color:brown;'></i>",
    source: new ol.source.XYZ({
        url:"./php/proxy-jpeg.php?url=http://kouapp.main.jp/csmap/tile/japan/{z}/{x}/{y}.jpg",
        crossOrigin:"anonymous",
        minZoom:9,
        maxZoom:15
    })
});
//宮崎市戦後米軍地図
var sengomiya1 = new ol.layer.Tile({
    title:"宮崎市戦後米軍地図",
    origin:"<a href='https://github.com/code4nara/jcp_maps/wiki' target='_blank' >テキサス大学図書館Japan City PlansのTMS化プロジェクト</a>",
    detail:"戦後の米軍作成地図をみんなで地図タイル化するプロジェクトです。面白くて大変ためになるプロジェクトなので是非参加しましょう！" ,
    coord:[131.423860,31.911069],
    zoom:14,
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.66371,31.34280,131.88045,32.87815]),
    source: new ol.source.XYZ({
        url:'https://kenzkenz2.xsrv.jp/usarmy/miyazaki/{z}/{x}/{-y}.png',
        crossOrigin:"anonymous",
        maxZoom:19
    })
});
var sengomiya2 = new ol.layer.Tile({
    title:"宮崎市戦後米軍地図",
    origin:"<a href='https://github.com/code4nara/jcp_maps/wiki' target='_blank' >テキサス大学図書館Japan City PlansのTMS化プロジェクト</a>",
    detail:"戦後の米軍作成地図をみんなで地図タイル化するプロジェクトです。面白くて大変ためになるプロジェクトなので是非参加しましょう！" ,
    coord:[131.423860,31.911069],
    zoom:14,
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.66371,31.34280,131.88045,32.87815]),
    source: new ol.source.XYZ({
        url:'https://kenzkenz2.xsrv.jp/usarmy/miyazaki/{z}/{x}/{-y}.png',
        crossOrigin:"anonymous",
        maxZoom:19
    })
});
//延岡市戦後米軍地図
var sengonobe1 = new ol.layer.Tile({
    title:"延岡市戦後米軍地図",
    origin:"<a href='https://github.com/code4nara/jcp_maps/wiki' target='_blank' >テキサス大学図書館Japan City PlansのTMS化プロジェクト</a>",
    detail:"戦後の米軍作成地図をみんなで地図タイル化するプロジェクトです。面白くて大変ためになるプロジェクトなので是非参加しましょう！" ,
    coord:[131.664854,32.582407],
    zoom:14,
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.66371,31.34280,131.88045,32.87815]),
    source: new ol.source.XYZ({
        url:'https://kenzkenz2.xsrv.jp/usarmy/nobeoka/{z}/{x}/{-y}.png',
        crossOrigin:"anonymous",
        maxZoom:19
    })
});
var sengonobe2 = new ol.layer.Tile({
    title:"延岡市戦後米軍地図",
    origin:"<a href='https://github.com/code4nara/jcp_maps/wiki' target='_blank' >テキサス大学図書館Japan City PlansのTMS化プロジェクト</a>",
    detail:"戦後の米軍作成地図をみんなで地図タイル化するプロジェクトです。面白くて大変ためになるプロジェクトなので是非参加しましょう！" ,
    coord:[131.664854,32.582407],
    zoom:14,
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.66371,31.34280,131.88045,32.87815]),
    source: new ol.source.XYZ({
        url:'https://kenzkenz2.xsrv.jp/usarmy/nobeoka/{z}/{x}/{-y}.png',
        crossOrigin:"anonymous",
        maxZoom:19
    })
});
//都城市市米軍地図
var sengomiyako1 = new ol.layer.Tile({
    title:"都城市戦後米軍地図",
    origin:"<a href='https://github.com/code4nara/jcp_maps/wiki' target='_blank' >テキサス大学図書館Japan City PlansのTMS化プロジェクト</a>",
    detail:"戦後の米軍作成地図をみんなで地図タイル化するプロジェクトです。面白くて大変ためになるプロジェクトなので是非参加しましょう！" ,
    coord:[131.061498,31.719552],
    zoom:14,
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.66371,31.34280,131.88045,32.87815]),
    source: new ol.source.XYZ({
        url:"./php/proxy-jpeg.php?url=http://t.tilemap.jp/jcp_maps/miyakonojo/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom:12,
        //maxZoom:21
    })
});
var sengomiyako2 = new ol.layer.Tile({
    title:"都城市戦後米軍地図",
    origin:"<a href='https://github.com/code4nara/jcp_maps/wiki' target='_blank' >テキサス大学図書館Japan City PlansのTMS化プロジェクト</a>",
    detail:"戦後の米軍作成地図をみんなで地図タイル化するプロジェクトです。面白くて大変ためになるプロジェクトなので是非参加しましょう！" ,
    coord:[131.061498,31.719552],
    zoom:14,
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.66371,31.34280,131.88045,32.87815]),
    source: new ol.source.XYZ({
        url:"./php/proxy-jpeg.php?url=http://t.tilemap.jp/jcp_maps/miyakonojo/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom:12,
        //maxZoom:21
    })
});
//綾ユネスコエコパーク
var aya1 = new ol.layer.Tile({
    title:"綾ユネスコエコパーク",
    origin:"<a href='http://www.town.aya.miyazaki.jp/ayatown/index.html' target='_blank'>綾町役場</a> 綾ユネスコエコパーク推進室",
    detail:"<a href='http://ayahpm.miyazaki-nw.or.jp/tempimg/150623164126201506231657430f.pdf' target='_blank'>パンフレット</a>",
    coord:[131.222659,32.0078758],
    zoom:14,
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    extent:transformE([131.16240,31.9749595,131.2840757,32.046935]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/ayaeco2/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom:12,
        maxZoom:19
    })
});
var aya2 = new ol.layer.Tile({
    title:"綾ユネスコエコパーク",
    origin:"<a href='http://www.town.aya.miyazaki.jp/ayatown/index.html' target='_blank'>綾町役場</a> 綾ユネスコエコパーク推進室",
    detail:"<a href='http://ayahpm.miyazaki-nw.or.jp/tempimg/150623164126201506231657430f.pdf' target='_blank'>パンフレット</a>",
    coord:[131.222659,32.0078758],
    zoom:14,
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    extent:transformE([131.16240,31.9749595,131.2840757,32.046935]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/ayaeco2/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom:12,
        maxZoom:19
    })
});
//宮崎県赤色立体地図
/*
var seki1 = new ol.layer.Tile({
    title:"宮崎県(九州)赤色立体地図",
    origin:"<a href='https://www.geospatial.jp/ckan/dataset/red45' target='_blank'>赤色立体地図</a><br><br>赤色立体地図©アジア航測株式会社",
    detail:"アジア航測株式会社が作成した立体地図です。<span style='color:red;'>アジア航測株式会社の許可を得て掲載しています。</span><br>赤色立体地図は、数値標高モデル（DEM:Digital Elevation Model)を、１枚の地図で３次元的に見せる、今までにない地形表現技法で作成された地図です。商用利用禁止です！外部システムから地図タイルURLのアクセスはできません。" ,
    icon:"<i class='fa fa-map-o fa-fw' style='color:brown;'></i>",
    source: new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/red45' target='_blank'>赤色立体地図©アジア航測株式会社</a>"})],
        url:"https://mtile.pref.miyazaki.lg.jp/tile/sekisyoku/{z}/{x}/{-y}.png",
        //minZoom :1,
        maxZoom:16
    })
});
var seki2 = new ol.layer.Tile({
    title:"宮崎県(九州)赤色立体地図",
    origin:"<a href='https://www.geospatial.jp/ckan/dataset/red45' target='_blank'>赤色立体地図<br><br>赤色立体地図©アジア航測株式会社</a>",
    detail:"アジア航測株式会社が作成した立体地図です。<span style='color:red;'>アジア航測株式会社の許可を得て掲載しています。</span><br>赤色立体地図は、数値標高モデル（DEM:Digital Elevation Model)を、１枚の地図で３次元的に見せる、今までにない地形表現技法で作成された地図です。商用利用禁止です！外部システムから地図タイルURLのアクセスはできません。外部システムから地図タイルURLのアクセスはできません。" ,
    icon:"<i class='fa fa-map-o fa-fw' style='color:brown;'></i>",
    source: new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/red45' target='_blank'>赤色立体地図©アジア航測株式会社</a>"})],
        url:"https://mtile.pref.miyazaki.lg.jp/tile/sekisyoku/{z}/{x}/{-y}.png",
        //minZoom :1,
        maxZoom:16
    })
});
*/
var sekiz1 = new ol.layer.Tile({
    //secret:true,
    title:"全国赤色立体地図",
    origin:"<a href='https://www.geospatial.jp/ckan/dataset/red45' target='_blank'>赤色立体地図<br><br>赤色立体地図©アジア航測株式会社</a>",
    detail:"アジア航測株式会社が作成した立体地図です。<span style='color:red;'>アジア航測株式会社の許可を得て掲載しています。</span>" +
            "<br>赤色立体地図は、数値標高モデル（DEM:Digital Elevation Model)を、１枚の地図で３次元的に見せる、今までにない地形表現技法で作成された地図です。" +
            "商用利用禁止です。外部システムから地図タイルURLのアクセスは禁止です。" +
            "" ,
    icon:"<i class='fa fa-map fa-fw' style='color:darkred;'></i>",
    source: new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/red45' target='_blank'>赤色立体地図©アジア航測株式会社</a>"})],
        url:"https://mtile.pref.miyazaki.lg.jp/tile/sekisyokuzenkoku/{z}/{x}/{-y}.png",
        //minZoom :1,
        maxZoom:15
    })
});
var sekiz2 = new ol.layer.Tile({
    //secret:true,
    title:"全国赤色立体地図",
    origin:"<a href='https://www.geospatial.jp/ckan/dataset/red45' target='_blank'>赤色立体地図<br><br>赤色立体地図©アジア航測株式会社</a>",
    detail:"アジア航測株式会社が作成した立体地図です。<span style='color:red;'>アジア航測株式会社の許可を得て掲載しています。</span>" +
            "<br>赤色立体地図は、数値標高モデル（DEM:Digital Elevation Model)を、１枚の地図で３次元的に見せる、今までにない地形表現技法で作成された地図です。" +
            "商用利用禁止です。外部システムから地図タイルURLのアクセスは禁止です。" +
            "" ,
    icon:"<i class='fa fa-map fa-fw' style='color:darkred;'></i>",
    source: new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/red45' target='_blank'>赤色立体地図©アジア航測株式会社</a>"})],
        url:"https://mtile.pref.miyazaki.lg.jp/tile/sekisyokuzenkoku/{z}/{x}/{-y}.png",
        //minZoom :1,
        maxZoom:15
    })
});

//鹿児島市オルソ
var kago1 = new ol.layer.Tile({
    title:"鹿児島市航空写真",
    //origin:"<a href='https://kagolug.org/kagoshima-city-opendata/mapdata/tile/airphoto/' target='_blank'>地図タイル配信サイト</a>",
    //detail:"鹿児島市よりクリエィティブ・コモンズ表示4.0国際ライセンスの下に提供されているデータを元にmatoken氏が作成された地図タイルです。",
    coord:[130.557143,31.596715],
    zoom:14,
    icon:"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
    extent:transformE([130.370675,31.2819,130.732,31.767]),
    source: new ol.source.XYZ({
        //url:'./php/proxy-png.php?url=https://kagolug.org/kagoshima-city-opendata/mapdata/tile/airphoto/{z}/{x}/{-y}.png',
        url:'https://kenzkenz2.xsrv.jp/kagosima2/{z}/{x}/{-y}.png',
        crossOrigin:"anonymous",
        maxZoom:19
    })
});
var kago2 = new ol.layer.Tile({
    title:"鹿児島市航空写真",
    //origin:"<a href='https://kagolug.org/kagoshima-city-opendata/mapdata/tile/airphoto/' target='_blank'>地図タイル配信サイト</a>",
    //detail:"鹿児島市よりクリエィティブ・コモンズ表示4.0国際ライセンスの下に提供されているデータを元にmatoken氏が作成された地図タイルです。",
    coord:[130.557143,31.596715],
    zoom:14,
    icon:"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
    extent:transformE([130.370675,31.2819,130.732,31.767]),
    source: new ol.source.XYZ({
        //url:'./php/proxy-png.php?url=https://kagolug.org/kagoshima-city-opendata/mapdata/tile/airphoto/{z}/{x}/{-y}.png',
        url:'https://kenzkenz2.xsrv.jp/kagosima2/{z}/{x}/{-y}.png',
        crossOrigin:"anonymous",
        maxZoom:19
    })
});
//鹿児島市オルソ
var kago91 = new ol.layer.Tile({
    title:"鹿児島市航空写真２",
    origin:"<a href='https://kagolug.org/kagoshima-city-opendata/mapdata/tile/airphoto/' target='_blank'>地図タイル配信サイト</a>",
    detail:"鹿児島市よりクリエィティブ・コモンズ表示4.0国際ライセンスの下に提供されているデータを元にmatoken氏が作成された地図タイルです。",
    coord:[130.557143,31.596715],
    zoom:14,
    icon:"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
    extent:transformE([130.370675,31.2819,130.732,31.767]),
    source: new ol.source.XYZ({
        url:'./php/proxy-png.php?url=https://kagolug.org/kagoshima-city-opendata/mapdata/tile/airphoto/{z}/{x}/{-y}.png',
        //url:'https://kenzkenz2.xsrv.jp/kagosima2/{z}/{x}/{-y}.png',
        crossOrigin:"anonymous",
        maxZoom:18
    })
});
var kago92 = new ol.layer.Tile({
    title:"鹿児島市航空写真２",
    origin:"<a href='https://kagolug.org/kagoshima-city-opendata/mapdata/tile/airphoto/' target='_blank'>地図タイル配信サイト</a>",
    detail:"鹿児島市よりクリエィティブ・コモンズ表示4.0国際ライセンスの下に提供されているデータを元にmatoken氏が作成された地図タイルです。",
    coord:[130.557143,31.596715],
    zoom:14,
    icon:"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
    extent:transformE([130.370675,31.2819,130.732,31.767]),
    source: new ol.source.XYZ({
        url:'./php/proxy-png.php?url=https://kagolug.org/kagoshima-city-opendata/mapdata/tile/airphoto/{z}/{x}/{-y}.png',
        //url:'https://kenzkenz2.xsrv.jp/kagosima2/{z}/{x}/{-y}.png',
        crossOrigin:"anonymous",
        maxZoom:18
    })
});
//鹿児島市 戦後米軍地図
var sengokago1 = new ol.layer.Tile({
    title:"鹿児島市戦後米軍地図",
    origin:"<a href='https://github.com/code4nara/jcp_maps/wiki' target='_blank' >テキサス大学図書館Japan City PlansのTMS化プロジェクト</a>",
    detail:"戦後の米軍作成地図をみんなで地図タイル化するプロジェクトです。面白くて大変ためになるプロジェクトなので是非参加しましょう！" ,
    coord:[130.557143,31.596715],
    zoom:14,
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.66371,31.34280,131.88045,32.87815]),
    source: new ol.source.XYZ({
        url:'https://kenzkenz2.xsrv.jp/usarmy/kagosima/{z}/{x}/{-y}.png',
        crossOrigin:"anonymous",
        maxZoom:19
    })
});
var sengokago2 = new ol.layer.Tile({
    title:"鹿児島市戦後米軍地図",
    origin:"<a href='https://github.com/code4nara/jcp_maps/wiki' target='_blank' >テキサス大学図書館Japan City PlansのTMS化プロジェクト</a>",
    detail:"戦後の米軍作成地図をみんなで地図タイル化するプロジェクトです。面白くて大変ためになるプロジェクトなので是非参加しましょう！" ,
    coord:[130.557143,31.596715],
    zoom:14,
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.66371,31.34280,131.88045,32.87815]),
    source: new ol.source.XYZ({
        url:'https://kenzkenz2.xsrv.jp/usarmy/kagosima/{z}/{x}/{-y}.png',
        crossOrigin:"anonymous",
        maxZoom:19
    })
});
//千葉県管内全図(大正14年)
var mrtiba1 = new ol.layer.Tile({
    title:"千葉県管内全図(大正14年)",
    origin:"<a href='http://mapwarper.net/maps/20822' target='_blank' >Map Warper</a>",
    detail:"sHigashiさんがNDLデジコレにあったパブリックドメインな大正末期頃の千葉県地図を地図タイル化したものです。" ,
    coord:[140.28233,35.55577],
    zoom:9,
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    extent:transformE([139.70417,34.892768,140.893444,36.113549]),
    source: new ol.source.XYZ({
        url:'./php/proxy-png.php?url=http://mapwarper.net/maps/tile/20822/{z}/{x}/{y}.png',
        crossOrigin:"anonymous",
        //maxZoom:19
    })
});
var mrtiba2 = new ol.layer.Tile({
    title:"千葉県管内全図(大正14年)",
    origin:"<a href='http://mapwarper.net/maps/20822' target='_blank' >Map Warper</a>",
    detail:"sHigashiさんがNDLデジコレにあったパブリックドメインな大正末期頃の千葉県地図を地図タイル化したものです。" ,
    coord:[140.28233,35.55577],
    zoom:9,
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    extent:transformE([139.70417,34.892768,140.893444,36.113549]),
    source: new ol.source.XYZ({
        url:'./php/proxy-png.php?url=http://mapwarper.net/maps/tile/20822/{z}/{x}/{y}.png',
        crossOrigin:"anonymous",
        //maxZoom:19
    })
});
//安政改正御江戸大絵図
var mransei1 = new ol.layer.Tile({
    title:"安政改正御江戸大絵図",
    origin:"<a href='http://mapwarper.net/maps/16142' target='_blank' >Map Warper</a>",
    detail:"" ,
    coord:[139.7515142,35.68605197],
    zoom:14,
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    message:"1858年",
    //extent:transformE([139.70417,34.892768,140.893444,36.113549]),
    source: new ol.source.XYZ({
        url:'./php/proxy-png.php?url=http://mapwarper.net/maps/tile/16142/{z}/{x}/{y}.png',
        crossOrigin:"anonymous",
        //maxZoom:19
    })
});
var mransei2 = new ol.layer.Tile({
    title:"安政改正御江戸大絵図",
    origin:"<a href='http://mapwarper.net/maps/16142' target='_blank' >Map Warper</a>",
    detail:"" ,
    coord:[139.7515142,35.68605197],
    zoom:14,
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    message:"1858年",
    //extent:transformE([139.70417,34.892768,140.893444,36.113549]),
    source: new ol.source.XYZ({
        url:'./php/proxy-png.php?url=http://mapwarper.net/maps/tile/16142/{z}/{x}/{y}.png',
        crossOrigin:"anonymous",
        //maxZoom:19
    })
});
//九州１Kメッシュ人口
var mesh1000z1 = new ol.layer.Tile({
    title:"九州１Kメッシュ人口",
    origin:"",
    detail:"",
    icon:"<i class='fa fa-map-o fa-fw' style='color:red;'></i>",
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/9syuuzinkoured2/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
var mesh1000z2 = new ol.layer.Tile({
    title:"九州１Kメッシュ人口",
    origin:"",
    detail:"",
    icon:"<i class='fa fa-map-o fa-fw' style='color:red;'></i>",
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/9syuuzinkoured2/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
//九州高速道路
var kousoku9syu1 = new ol.layer.Tile({
    title:"九州高速道路",
    origin:"",
    detail:"",
    icon:"<i class='fa fa-car fa-fw' style='color:red;'></i>",
    extent:transformE([129.578874,31.011182,132.034319,34.055661]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/9syuukousoku/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
var kousoku9syu2 = new ol.layer.Tile({
    title:"九州高速道路",
    origin:"",
    detail:"",
    icon:"<i class='fa fa-car fa-fw' style='color:red;'></i>",
    extent:transformE([129.578874,31.011182,132.034319,34.055661]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/9syuukousoku/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});

//祖母エコパーク
var sobo1 = new ol.layer.Tile({
    name:"sobo",
    title:"祖母･傾･大崩ﾕﾈｽｺｴｺﾊﾟｰｸ",
    origin:"<a href='http://sobokatamuki-br-council.org/' target='_blank'>祖母･傾･大崩ユネスコエコパーク</a>",
    detail:"",
    coord:[131.5110089111254, 32.83581733593961],
    zoom:10,
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/sobo/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
var sobo2 = new ol.layer.Tile({
    name:"sobo",
    title:"祖母･傾･大崩ﾕﾈｽｺｴｺﾊﾟｰｸ",
    origin:"<a href='http://sobokatamuki-br-council.org/' target='_blank'>祖母･傾･大崩ユネスコエコパーク</a>",
    detail:"",
    coord:[131.5110089111254, 32.83581733593961],
    zoom:10,
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/sobo/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});

//宮崎県古地図
var kotizu1 = new ol.layer.Tile({
    name:"kotizu",
    title:"<span class='label label-default label-danger'>New</span>45宮崎県古地図(大正14年)",
    origin:"<a href='http://dl.ndl.go.jp/' target='_blank'>国立国会図書館デジタルコレクション</a>より",
    detail:"<a href='oldmap/miyazakiKen.jpg' target='_blank'>jpg</a>",
    //message:"1925年",
    //coord:[131.5110089111254, 32.83581733593961],
    //zoom:10,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/miyazakikenkotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
var kotizu2 = new ol.layer.Tile({
    name:"kotizu",
    title:"<span class='label label-default label-danger'>New</span>45宮崎県古地図(大正14年)",
    origin:"<a href='http://dl.ndl.go.jp/' target='_blank'>国立国会図書館デジタルコレクション</a>より",
    detail:"<a href='oldmap/miyazakiKen.jpg' target='_blank'>jpg</a>",
    //message:"1925年",
    //coord:[131.5110089111254, 32.83581733593961],
    //zoom:10,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/miyazakikenkotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
//高知県古地図
var koutikotizu1 = new ol.layer.Tile({
    name:"koutikotizu1",
    title:"<span class='label label-default label-danger'>New</span>39高知県古地図(大正14年)",
    origin:"<a href='http://dl.ndl.go.jp/' target='_blank'>国立国会図書館デジタルコレクション</a>より",
    detail:"<a type='button' class='btn btn-xs btn-primary btn-block' href='oldmap/koutiken.jpg' target='_blank'>jpg取得</a>" +
            "<a type='button' class='crop-btn btn btn-xs btn-primary btn-block'>実験中</a>",
    //message:"1925年",
    //coord:[131.5110089111254, 32.83581733593961],
    //zoom:10,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/koutikenkotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
var koutikotizu2 = new ol.layer.Tile({
    name:"koutikotizu2",
    title:"<span class='label label-default label-danger'>New</span>39高知県古地図(大正14年)",
    origin:"<a href='http://dl.ndl.go.jp/' target='_blank'>国立国会図書館デジタルコレクション</a>より",
    detail:"<a href='oldmap/koutiken.jpg' target='_blank'>jpg</a>",
    //message:"1925年",
    //coord:[131.5110089111254, 32.83581733593961],
    //zoom:10,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/koutikenkotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
//熊本県古地図
var kumamotokotizu1 = new ol.layer.Tile({
    name:"kotizu",
    title:"<span class='label label-default label-danger'>New</span>43熊本県古地図(大正14年)",
    origin:"<a href='http://dl.ndl.go.jp/' target='_blank'>国立国会図書館デジタルコレクション</a>より",
    detail:"<a href='oldmap/kumamotoken.jpg' target='_blank'>jpg</a>",
    //message:"1925年",
    //coord:[131.5110089111254, 32.83581733593961],
    //zoom:10,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/kumamotokenkotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
var kumamotokotizu2 = new ol.layer.Tile({
    name:"kotizu",
    title:"<span class='label label-default label-danger'>New</span>43熊本県古地図(大正14年)",
    origin:"<a href='http://dl.ndl.go.jp/' target='_blank'>国立国会図書館デジタルコレクション</a>より",
    detail:"<a href='oldmap/kumamotoken.jpg' target='_blank'>jpg</a>",
    //message:"1925年",
    //coord:[131.5110089111254, 32.83581733593961],
    //zoom:10,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/kumamotokenkotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
//佐賀県古地図
var sagakotizu1 = new ol.layer.Tile({
    name:"kotizu",
    title:"<span class='label label-default label-danger'>New</span>41佐賀県古地図(大正14年)",
    origin:"<a href='http://dl.ndl.go.jp/' target='_blank'>国立国会図書館デジタルコレクション</a>より",
    detail:"<a href='oldmap/sagaken.jpg' target='_blank'>jpg</a>",
    //message:"1925年",
    //coord:[131.5110089111254, 32.83581733593961],
    //zoom:10,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/sagakenkotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
var sagakotizu2 = new ol.layer.Tile({
    name:"kotizu",
    title:"<span class='label label-default label-danger'>New</span>41佐賀県古地図(大正14年)",
    origin:"<a href='http://dl.ndl.go.jp/' target='_blank'>国立国会図書館デジタルコレクション</a>より",
    detail:"<a href='oldmap/sagaken.jpg' target='_blank'>jpg</a>",
    //message:"1925年",
    //coord:[131.5110089111254, 32.83581733593961],
    //zoom:10,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/sagakenkotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
//福岡県古地図
var hukuokakotizu1 = new ol.layer.Tile({
    name:"kotizu",
    title:"<span class='label label-default label-danger'>New</span>40福岡県古地図(大正14年)",
    origin:"<a href='http://dl.ndl.go.jp/' target='_blank'>国立国会図書館デジタルコレクション</a>より",
    detail:"",
    //message:"1925年",
    //coord:[131.5110089111254, 32.83581733593961],
    //zoom:10,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/hukuokakenkotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
var hukuokakotizu2 = new ol.layer.Tile({
    name:"kotizu",
    title:"<span class='label label-default label-danger'>New</span>40福岡県古地図(大正14年)",
    origin:"<a href='http://dl.ndl.go.jp/' target='_blank'>国立国会図書館デジタルコレクション</a>より",
    detail:"",
    //message:"1925年",
    //coord:[131.5110089111254, 32.83581733593961],
    //zoom:10,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/hukuokakenkotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
//大分県古地図
var ooitakotizu1 = new ol.layer.Tile({
    name:"kotizu",
    title:"<span class='label label-default label-danger'>New</span>44大分県古地図(大正14年)",
    origin:"<a href='http://dl.ndl.go.jp/' target='_blank'>国立国会図書館デジタルコレクション</a>より",
    detail:"",
    //message:"1925年",
    //coord:[131.5110089111254, 32.83581733593961],
    //zoom:10,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/ooitakenkotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
var ooitakotizu2 = new ol.layer.Tile({
    name:"kotizu",
    title:"<span class='label label-default label-danger'>New</span>44大分県古地図(大正14年)",
    origin:"<a href='http://dl.ndl.go.jp/' target='_blank'>国立国会図書館デジタルコレクション</a>より",
    detail:"",
    //message:"1925年",
    //coord:[131.5110089111254, 32.83581733593961],
    //zoom:10,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/ooitakenkotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
//長崎県古地図
var nagasakikotizu1 = new ol.layer.Tile({
    name:"kotizu",
    title:"<span class='label label-default label-danger'>New</span>42長崎県古地図(大正14年)",
    origin:"<a href='http://dl.ndl.go.jp/' target='_blank'>国立国会図書館デジタルコレクション</a>より",
    detail:"",
    //message:"1925年",
    //coord:[131.5110089111254, 32.83581733593961],
    //zoom:10,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/nagasakikenkotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
var nagasakikotizu2 = new ol.layer.Tile({
    name:"kotizu",
    title:"<span class='label label-default label-danger'>New</span>42長崎県古地図(大正14年)",
    origin:"<a href='http://dl.ndl.go.jp/' target='_blank'>国立国会図書館デジタルコレクション</a>より",
    detail:"",
    //message:"1925年",
    //coord:[131.5110089111254, 32.83581733593961],
    //zoom:10,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/nagasakikenkotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
//鹿児島県古地図
var kagosimakotizu1 = new ol.layer.Tile({
    name:"kotizu",
    title:"<span class='label label-default label-danger'>New</span>46鹿児島県古地図(大正14年)",
    origin:"<a href='http://dl.ndl.go.jp/' target='_blank'>国立国会図書館デジタルコレクション</a>より",
    detail:"",
    //message:"1925年",
    //coord:[131.5110089111254, 32.83581733593961],
    //zoom:10,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/kagosimakenkotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
var kagosimakotizu2 = new ol.layer.Tile({
    name:"kotizu",
    title:"<span class='label label-default label-danger'>New</span>46鹿児島県古地図(大正14年)",
    origin:"<a href='http://dl.ndl.go.jp/' target='_blank'>国立国会図書館デジタルコレクション</a>より",
    detail:"",
    //message:"1925年",
    //coord:[131.5110089111254, 32.83581733593961],
    //zoom:10,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/kagosimakenkotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
//宮城県古地図
var miyagikotizu1 = new ol.layer.Tile({
    name:"kotizu",
    title:"<span class='label label-default label-danger'>New</span>04宮城県古地図(大正14年)",
    origin:"<a href='http://dl.ndl.go.jp/' target='_blank'>国立国会図書館デジタルコレクション</a>より",
    detail:"<a href='oldmap/miyagiken.jpg' target='_blank'>jpg</a>",
    //message:"1925年",
    //coord:[131.5110089111254, 32.83581733593961],
    //zoom:10,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/miyagikenkotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
var miyagikotizu2 = new ol.layer.Tile({
    name:"kotizu",
    title:"<span class='label label-default label-danger'>New</span>04宮城県古地図(大正14年)",
    origin:"<a href='http://dl.ndl.go.jp/' target='_blank'>国立国会図書館デジタルコレクション</a>より",
    detail:"<a href='oldmap/miyagiken.jpg' target='_blank'>jpg</a>",
    //message:"1925年",
    //coord:[131.5110089111254, 32.83581733593961],
    //zoom:10,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/miyagikenkotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});

//山口県古地図
var yamagutikotizu1 = new ol.layer.Tile({
    name:"kotizu",
    title:"<span class='label label-default label-danger'>New</span>35山口県古地図(大正14年)",
    origin:"<a href='http://dl.ndl.go.jp/' target='_blank'>国立国会図書館デジタルコレクション</a>より",
    detail:"<a href='oldmap/yamagutiken.jpg' target='_blank'>jpg</a>",
    //message:"1925年",
    //coord:[131.5110089111254, 32.83581733593961],
    //zoom:10,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/yamagutikenkotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
var yamagutikotizu2 = new ol.layer.Tile({
    name:"kotizu",
    title:"<span class='label label-default label-danger'>New</span>35山口県古地図(大正14年)",
    origin:"<a href='http://dl.ndl.go.jp/' target='_blank'>国立国会図書館デジタルコレクション</a>より",
    detail:"<a href='oldmap/yamagutiken.jpg' target='_blank'>jpg</a>",
    //message:"1925年",
    //coord:[131.5110089111254, 32.83581733593961],
    //zoom:10,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/yamagutikenkotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
//東京都古地図
var toukyoukotizu1 = new ol.layer.Tile({
    name:"kotizu",
    title:"<span class='label label-default label-danger'>New</span>13東京都古地図(大正14年)",
    origin:"<a href='http://dl.ndl.go.jp/' target='_blank'>国立国会図書館デジタルコレクション</a>より",
    detail:"<a href='oldmap/toukyou.jpg' target='_blank'>jpg</a>",
    //message:"1925年",
    //coord:[131.5110089111254, 32.83581733593961],
    //zoom:10,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/toukyoutokotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
var toukyoukotizu2 = new ol.layer.Tile({
    name:"kotizu",
    title:"<span class='label label-default label-danger'>New</span>13東京都古地図(大正14年)",
    origin:"<a href='http://dl.ndl.go.jp/' target='_blank'>国立国会図書館デジタルコレクション</a>より",
    detail:"<a href='oldmap/toukyou.jpg' target='_blank'>jpg</a>",
    //message:"1925年",
    //coord:[131.5110089111254, 32.83581733593961],
    //zoom:10,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/toukyoutokotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
//島根県古地図
var simanekotizu1 = new ol.layer.Tile({
    name:"kotizu",
    title:"<span class='label label-default label-danger'>New</span>32島根県古地図(大正14年)",
    origin:"<a href='http://dl.ndl.go.jp/' target='_blank'>国立国会図書館デジタルコレクション</a>より",
    detail:"<a href='oldmap/toukyou.jpg' target='_blank'>jpg</a>",
    //message:"1925年",
    //coord:[131.5110089111254, 32.83581733593961],
    //zoom:10,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/simanekenkotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
var simanekotizu2 = new ol.layer.Tile({
    name:"kotizu",
    title:"<span class='label label-default label-danger'>New</span>32島根県古地図(大正14年)",
    origin:"<a href='http://dl.ndl.go.jp/' target='_blank'>国立国会図書館デジタルコレクション</a>より",
    detail:"<a href='oldmap/toukyou.jpg' target='_blank'>jpg</a>",
    //message:"1925年",
    //coord:[131.5110089111254, 32.83581733593961],
    //zoom:10,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/simanekenkotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
//福井県古地図
var hukuikotizu1 = new ol.layer.Tile({
    name:"kotizu",
    title:"<span class='label label-default label-danger'>New</span>18福井県古地図(大正14年)",
    origin:"<a href='http://dl.ndl.go.jp/' target='_blank'>国立国会図書館デジタルコレクション</a>より",
    detail:"<a href='oldmap/hukuiken.jpg' target='_blank'>jpg</a>",
    //message:"1925年",
    //coord:[131.5110089111254, 32.83581733593961],
    //zoom:10,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/hukuikenkotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});
var hukuikotizu2 = new ol.layer.Tile({
    name:"kotizu",
    title:"<span class='label label-default label-danger'>New</span>18福井県古地図(大正14年)",
    origin:"<a href='http://dl.ndl.go.jp/' target='_blank'>国立国会図書館デジタルコレクション</a>より",
    detail:"<a href='oldmap/hukuiken.jpg' target='_blank'>jpg</a>",
    //message:"1925年",
    //coord:[131.5110089111254, 32.83581733593961],
    //zoom:10,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.940796,32.48553,132.110,33.16926]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/hukuikenkotizu/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:13
    })
});












var bingroad1 = new ol.layer.Tile({
    secret:true,
    name:"bingroad",
    title:"★MS-bing実験中",
    origin:"",
    detail:"",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.BingMaps({
        key:"Aq19sLpEft2flnbhBLVikhnuROsQb4VKtrbooDXFk0zlWS_sVxHWVN2sZ4B3y89Z",
        culture:'ja-jp',
        imagerySet:['Road'],
        maxZoom:19
    })
});

var bingroad2 = new ol.layer.Tile({
    secret:true,
    name:"bingroad",
    title:"★MS-bing実験中",
    origin:"",
    detail:"",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.BingMaps({
        key:"Aq19sLpEft2flnbhBLVikhnuROsQb4VKtrbooDXFk0zlWS_sVxHWVN2sZ4B3y89Z",
        culture:'ja-jp',
        imagerySet:['Road'],
        maxZoom:19
    })
});
//九州北部大雨７月７日作成
//大雨被害（日田市）
var t0707dol1 =  new ol.layer.Tile({
    //secret:true,
    name:"ooame",
    title:"大雨被害<span style='font-size:8px;'>(朝倉市桂川、日田市鶴河内鶴城・小野付近7/7ﾍﾘ撮影)</span>",
    origin:"国土地理院",
    detail:"平成29年梅雨前線及び台風3号 正射画像（ヘリ撮影画像から作成（2017年7月7日撮影））<br>この正射画像は7月7日に九州地方整備局ヘリ（はるかぜ号）で撮影した画像を用いています。画像から自動処理したものなので、構造物等の歪み、不連続等が発生している箇所があります。",
    coord:[130.9400738912126, 33.39190849746305],
    zoom:12,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        url:"https://maps.gsi.go.jp/xyz/20170705typhoon3_0707dol/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        //maxZoom:13
    })
});
var t0707dol2 =  new ol.layer.Tile({
    //secret:true,
    name:"ooame",
    title:"大雨被害<span style='font-size:8px;'>(朝倉市桂川、日田市鶴河内鶴城・小野付近7/7ﾍﾘ撮影)</span>",
    origin:"国土地理院",
    detail:"平成29年梅雨前線及び台風3号 正射画像（ヘリ撮影画像から作成（2017年7月7日撮影））<br>この正射画像は7月7日に九州地方整備局ヘリ（はるかぜ号）で撮影した画像を用いています。画像から自動処理したものなので、構造物等の歪み、不連続等が発生している箇所があります。",
    coord:[130.9400738912126, 33.39190849746305],
    zoom:12,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        url:"https://maps.gsi.go.jp/xyz/20170705typhoon3_0707dol/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        //maxZoom:13
    })
});
//九州北部大雨７月７日作成UAV(ドローン)
var t0707dol31 =  new ol.layer.Tile({
    //secret:true,
    name:"ooame",
    title:"大雨被害(朝倉市山田奈良ヶ谷付近7/7ﾄﾞﾛｰﾝ撮影)",
    origin:"国土地理院",
    detail:"平成29年梅雨前線及び台風3号 正射画像（UAV撮影画像から作成（2017年7月7日撮影））<br>この正射画像は7月7日に国土地理院ランドバードが撮影したUAV画像を用いています。画像から自動処理したものなので、構造物等の歪み、不連続等が発生している箇所があります。",
    coord:[130.76838501142805, 33.384325449185894],
    zoom:12,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        url:"https://cyberjapandata.gsi.go.jp/xyz/20170705typhoon3_0707dol3/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        //maxZoom:13
    })
});
var t0707dol32 =  new ol.layer.Tile({
    //secret:true,
    name:"ooame",
    title:"大雨被害(朝倉市山田奈良ヶ谷付近7/7ﾄﾞﾛｰﾝ撮影)",
    origin:"国土地理院",
    detail:"平成29年梅雨前線及び台風3号 正射画像（UAV撮影画像から作成（2017年7月7日撮影））<br>この正射画像は7月7日に国土地理院ランドバードが撮影したUAV画像を用いています。画像から自動処理したものなので、構造物等の歪み、不連続等が発生している箇所があります。",
    coord:[130.76838501142805, 33.384325449185894],
    zoom:12,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        url:"https://cyberjapandata.gsi.go.jp/xyz/20170705typhoon3_0707dol3/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        //maxZoom:13
    })
});

/*
//大雨被害（日田市2）
var ooamehita3 =  new ol.layer.Tile({
    //secret:true,
    name:"ooame",
    title:"大雨被害（大分県日田市2 7/7撮影）",
    origin:"国土地理院",
    detail:"ヘリ撮影画像から作成（7/7撮影）<br>この正射画像は7月7日に九州地方整備局ヘリ（はるかぜ号）で撮影した画像を用いています。画像から自動処理したものなので、構造物等の歪み、不連続等が発生している箇所があります。",
    coord:[130.900921, 33.4084018825],
    zoom:12,
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        url:"https://maps.gsi.go.jp/xyz/20170705typhoon3_0707dol2/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        //maxZoom:13
    })
});
var ooamehita4 =  new ol.layer.Tile({
    //secret:true,
    name:"ooame",
    title:"大雨被害（大分県日田市2 7/7撮影）",
    origin:"国土地理院",
    detail:"ヘリ撮影画像から作成（7/7撮影）<br>この正射画像は7月7日に九州地方整備局ヘリ（はるかぜ号）で撮影した画像を用いています。画像から自動処理したものなので、構造物等の歪み、不連続等が発生している箇所があります。",
    coord:[130.900921, 33.4084018825],
    zoom:12,
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        url:"https://maps.gsi.go.jp/xyz/20170705typhoon3_0707dol2/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        //maxZoom:13
    })
});
//大雨被害（福岡県朝倉市須川）
var ooamehukuokasugawa1 =  new ol.layer.Tile({
    //secret:true,
    name:"ooame",
    title:"大雨被害（福岡県朝倉市須川7/7撮影）",
    origin:"国土地理院",
    detail:"ヘリ撮影画像から作成（7/7撮影）<br>この正射画像は7月7日に九州地方整備局ヘリ（はるかぜ号）で撮影した画像を用いています。画像から自動処理したものなので、構造物等の歪み、不連続等が発生している箇所があります。",
    coord:[130.732841,33.393469],
    zoom:12,
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        url:"https://maps.gsi.go.jp/xyz/20170705typhoon3_0707dol4/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        //maxZoom:13
    })
});
var ooamehukuokasugawa2 =  new ol.layer.Tile({
    //secret:true,
    name:"ooame",
    title:"大雨被害（福岡県朝倉市須川7/7撮影）",
    origin:"国土地理院",
    detail:"ヘリ撮影画像から作成（7/7撮影）<br>この正射画像は7月7日に九州地方整備局ヘリ（はるかぜ号）で撮影した画像を用いています。画像から自動処理したものなので、構造物等の歪み、不連続等が発生している箇所があります。",
    coord:[130.732841,33.393469],
    zoom:12,
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        url:"https://maps.gsi.go.jp/xyz/20170705typhoon3_0707dol4/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        //maxZoom:13
    })
});
*/



//大雨被害（福岡県1）
var t0708dol11 =  new ol.layer.Tile({
    //secret:true,
    name:"ooame",
    title:"大雨被害(朝倉市、日田市の複数地域7/8ﾍﾘ撮影)",
    origin:"国土地理院",
    detail:"平成29年梅雨前線及び台風3号 正射画像（ヘリ撮影画像から作成（2017年7月8日撮影））<br>この正射画像は7月8日に地方整備局ヘリ（はるかぜ号、愛らんど号）が撮影した画像を用いています。画像から自動処理したものなので、構造物等の歪み、不連続等が発生している箇所があります。",
    coord:[130.814417,33.39267],
    zoom:12,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        url:"https://maps.gsi.go.jp/xyz/20170705typhoon3_0708dol1/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        //maxZoom:13
    })
});
var t0708dol12 =  new ol.layer.Tile({
    //secret:true,
    name:"ooame",
    title:"大雨被害(朝倉市、日田市の複数地域7/8ﾍﾘ撮影)",
    origin:"国土地理院",
    detail:"平成29年梅雨前線及び台風3号 正射画像（ヘリ撮影画像から作成（2017年7月8日撮影））<br>この正射画像は7月8日に地方整備局ヘリ（はるかぜ号、愛らんど号）が撮影した画像を用いています。画像から自動処理したものなので、構造物等の歪み、不連続等が発生している箇所があります。",
    coord:[130.814417,33.39267],
    zoom:12,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        url:"https://maps.gsi.go.jp/xyz/20170705typhoon3_0708dol1/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        //maxZoom:13
    })
});

//大雨被害（大分県日田市7/10撮影）
var t0710dol1 =  new ol.layer.Tile({
    //secret:true,
    name:"ooame",
    title:"大雨被害(日田市小野川周辺7/10ﾍﾘ撮影)",
    origin:"国土地理院",
    detail:"平成29年梅雨前線及び台風3号 正射画像（ヘリ撮影画像から作成（2017年7月10日撮影））<br>この正射画像は7月10日に地方整備局ヘリ（愛らんど号）が撮影した画像を用いています。画像から自動処理したものなので、構造物等の歪み、不連続等が発生している箇所があります。",
    coord:[130.9422618,33.3786231],
    zoom:12,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        url:"https://maps.gsi.go.jp/xyz/20170705typhoon3_0710dol/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        //maxZoom:13
    })
});
var t0710dol2 =  new ol.layer.Tile({
    //secret:true,
    name:"ooame",
    title:"大雨被害(日田市小野川周辺7/10ﾍﾘ撮影)",
    origin:"国土地理院",
    detail:"平成29年梅雨前線及び台風3号 正射画像（ヘリ撮影画像から作成（2017年7月10日撮影））<br>この正射画像は7月10日に地方整備局ヘリ（愛らんど号）が撮影した画像を用いています。画像から自動処理したものなので、構造物等の歪み、不連続等が発生している箇所があります。",
    coord:[130.9422618,33.3786231],
    zoom:12,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        url:"https://maps.gsi.go.jp/xyz/20170705typhoon3_0710dol/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        //maxZoom:13
    })
})
//大雨被害（朝倉地区7/13撮影）
var t0713dol11 =  new ol.layer.Tile({
    //secret:true,
    name:"ooame",
    title:"大雨被害(朝倉地区7/13空中写真)",
    origin:"国土地理院",
    detail:"平成29年梅雨前線及び台風3号 正射画像（空中写真（朝倉地区）（2017年7月13日撮影））<br>この正射画像は7月10日に地方整備局ヘリ（愛らんど号）が撮影した画像を用いています。画像から自動処理したものなので、構造物等の歪み、不連続等が発生している箇所があります。",
    coord:[130.696381,33.389445],
    zoom:12,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        url:"https://maps.gsi.go.jp/xyz/20170705typhoon3_0713dol1/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        //maxZoom:13
    })
});
var t0713dol12 =  new ol.layer.Tile({
    //secret:true,
    name:"ooame",
    title:"大雨被害(朝倉地区7/13空中写真)",
    origin:"国土地理院",
    detail:"平成29年梅雨前線及び台風3号 正射画像（空中写真（朝倉地区）（2017年7月13日撮影））<br>この正射画像は7月10日に地方整備局ヘリ（愛らんど号）が撮影した画像を用いています。画像から自動処理したものなので、構造物等の歪み、不連続等が発生している箇所があります。",
    coord:[130.696381,33.389445],
    zoom:12,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        url:"https://maps.gsi.go.jp/xyz/20170705typhoon3_0713dol1/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        //maxZoom:13
    })
});
//大雨被害（東峰地区7/13撮影）
var t0713dol21 =  new ol.layer.Tile({
    //secret:true,
    name:"ooame",
    title:"大雨被害(東峰地区7/13空中写真)",
    origin:"国土地理院",
    detail:"平成29年梅雨前線及び台風3号 正射画像（空中写真（東峰地区）（2017年7月13日撮影））<br>この正射画像は7月13日に撮影した空中写真を用いています。写真から自動処理したものなので、構造物等の歪み、不連続等が発生している箇所があります。",
    coord:[130.870227,33.4412187],
    zoom:12,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        url:"https://maps.gsi.go.jp/xyz/20170705typhoon3_0713dol2/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        //maxZoom:13
    })
});
var t0713dol22 =  new ol.layer.Tile({
    //secret:true,
    name:"ooame",
    title:"大雨被害(東峰地区7/13空中写真)",
    origin:"国土地理院",
    detail:"平成29年梅雨前線及び台風3号 正射画像（空中写真（東峰地区）（2017年7月13日撮影））<br>この正射画像は7月13日に撮影した空中写真を用いています。写真から自動処理したものなので、構造物等の歪み、不連続等が発生している箇所があります。",
    coord:[130.870227,33.4412187],
    zoom:12,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        url:"https://maps.gsi.go.jp/xyz/20170705typhoon3_0713dol2/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        //maxZoom:13
    })
});
//大雨被害（東峰地区7/30,31撮影）
var t0802dol1 =  new ol.layer.Tile({
    //secret:true,
    name:"ooame",
    title:"<span class='label label-default label-danger'>New</span>大雨被害(東峰地区7/30,31撮影)",
    origin:"国土地理院",
    detail:"平成29年梅雨前線及び台風3号 正射画像（空中写真（東峰地区）（2017年7月30,31日撮影））<br>この正射画像は7月30日、31日に撮影した空中写真を用いています。写真から自動処理したものなので、構造物等の歪み、不連続等が発生している箇所があります。",
    coord:[130.87434,33.42259],
    zoom:12,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        url:"https://maps.gsi.go.jp/xyz/20170705typhoon3_0802dol/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        //maxZoom:13
    })
});
var t0802dol2 =  new ol.layer.Tile({
    //secret:true,
    name:"ooame",
    title:"<span class='label label-default label-danger'>New</span>大雨被害(東峰地区7/30,31撮影)",
    origin:"国土地理院",
    detail:"平成29年梅雨前線及び台風3号 正射画像（空中写真（東峰地区）（2017年7月30,31日撮影））<br>この正射画像は7月30日、31日に撮影した空中写真を用いています。写真から自動処理したものなので、構造物等の歪み、不連続等が発生している箇所があります。",
    coord:[130.87434,33.42259],
    zoom:12,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        url:"https://maps.gsi.go.jp/xyz/20170705typhoon3_0802dol/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        //maxZoom:13
    })
});





//大雨被害（アジア航測）
var ooameasia1 =  new ol.layer.Tile({
    secret:true,
    name:"ooame",
    title:"★大雨被害",
    origin:"",
    detail:"",
    coord:[130.80993,33.37331],
    zoom:12,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    extent:transformE([130.7430,33.33812,130.8691,33.41900]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/ooame2/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        maxZoom:18
    })
});
var ooameasia2 =  new ol.layer.Tile({
    //secret:true,
    name:"ooame",
    title:"★大雨被害",
    origin:"",
    detail:"",
    coord:[130.80993,33.37331],
    zoom:12,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    extent:transformE([130.7430,33.33812,130.8691,33.41900]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/ooame2/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        maxZoom:18
    })
});




var ooameasia07181 =  new ol.layer.Tile({
    //secret:true,
    name:"ooame",
    title:"大雨被害(アジア航測7/8撮影)",
    origin:"<a href='https://www.geospatial.jp/ckan/dataset/aas-disaster-20170708' target='_blank'>平成29年7月九州北部豪雨災害画像データ（7月8日撮影）</a>",
    detail:"撮影：アジア航測株式会社",
    coord:[130.80993,33.37331],
    zoom:12,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    extent:transformE([130.7430,33.33812,130.8691,33.41900]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/ooame0719/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        maxZoom:18
    })
});
var ooameasia07182 =  new ol.layer.Tile({
    //secret:true,
    name:"ooame",
    title:"大雨被害(アジア航測7/8撮影)",
    origin:"<a href='https://www.geospatial.jp/ckan/dataset/aas-disaster-20170708' target='_blank'>平成29年7月九州北部豪雨災害画像データ（7月8日撮影）</a>",
    detail:"撮影：アジア航測株式会社",
    coord:[130.80993,33.37331],
    zoom:12,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    extent:transformE([130.7430,33.33812,130.8691,33.41900]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/ooame0719/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        maxZoom:18
    })
});


var ooameasia07201 =  new ol.layer.Tile({
    //secret:true,
    name:"ooame",
    title:"大雨被害(アジア航測7/9撮影)",
    origin:"<a href='https://www.geospatial.jp/gp_front/content/1b7345a0-41a1-414d-94e8-378b69d5c4c1' target='_blank'>平成29年7月九州北部豪雨災害画像データ（7月9日撮影）</a>",
    detail:"撮影：アジア航測株式会社",
    coord:[130.80993,33.37331],
    zoom:12,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.7430,33.33812,130.8691,33.41900]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/ooame0720/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        maxZoom:18
    })
});

var ooameasia07202 =  new ol.layer.Tile({
    //secret:true,
    name:"ooame",
    title:"大雨被害(アジア航測7/9撮影)",
    origin:"<a href='https://www.geospatial.jp/gp_front/content/1b7345a0-41a1-414d-94e8-378b69d5c4c1' target='_blank'>平成29年7月九州北部豪雨災害画像データ（7月9日撮影）</a>",
    detail:"撮影：アジア航測株式会社",
    coord:[130.80993,33.37331],
    zoom:12,
    //icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.7430,33.33812,130.8691,33.41900]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/ooame0720/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        maxZoom:18
    })
});















//土石流危険渓流
var kikenkeiryuuAll1 = new ol.layer.Tile({
    secret:true,
    title:"★土石流危険渓流",
    origin:"",
    detail:"土石流の発生の危険性があり、人家等に被害を与えるおそれがある渓流",
    icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.705,31.36,131.921,32.892]),
    source: new ol.source.XYZ({
        url:"./php/proxy-png.php?url=http://disaportal.gsi.go.jp/hazardmap_data/raster/dosekiryukikenkeiryu/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var kikenkeiryuuAll2 = new ol.layer.Tile({
    secret:true,
    title:"★土石流危険渓流",
    origin:"",
    detail:"土石流の発生の危険性があり、人家等に被害を与えるおそれがある渓流",
    icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.705,31.36,131.921,32.892]),
    source: new ol.source.XYZ({
        url:"./php/proxy-png.php?url=http://disaportal.gsi.go.jp/hazardmap_data/raster/dosekiryukikenkeiryu/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
//急傾斜地崩壊危険箇所
var kyuukeisyakikenkasyoAll1 = new ol.layer.Tile({
    secret:true,
    title:"★急傾斜地崩壊危険箇所",
    origin:"",
    detail:"傾斜度30°かつ高さ5m以上の急傾斜地で人家等に被害を与えるおそれのある箇所",
    icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.705,31.36,131.921,32.892]),
    source: new ol.source.XYZ({
        url:"./php/proxy-png.php?url=http://disaportal.gsi.go.jp/hazardmap_data/raster/kyukeisyachihoukai/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var kyuukeisyakikenkasyoAll2 = new ol.layer.Tile({
    secret:true,
    title:"★急傾斜地崩壊危険箇所",
    origin:"",
    detail:"傾斜度30°かつ高さ5m以上の急傾斜地で人家等に被害を与えるおそれのある箇所",
    icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.705,31.36,131.921,32.892]),
    source: new ol.source.XYZ({
        url:"./php/proxy-png.php?url=http://disaportal.gsi.go.jp/hazardmap_data/raster/kyukeisyachihoukai/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:16
    })
});
var vtMaxColor = "indigo";
var vtColor = d3.interpolateLab("white",vtMaxColor);
var syoutiiki1 = new ol.layer.VectorTile({
    title:"<span class='label label-default label-danger'>New</span>全国小地域人口等(MVT)",
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
    style: syoutiikiStyleFunction
});
var syoutiiki2 = new ol.layer.VectorTile({
    title:"<span class='label label-default label-danger'>New</span>全国小地域人口等(MVT)",
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
        //url: "https://hfu.github.io/chome-vt/{z}/{x}/{y}.mvt"
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


//祖母ゾーニングのレイヤー
var soboZ1 = new ol.layer.Vector({
    title:"祖母･傾･大崩ﾕﾈｽｺｴｺﾊﾟｰｸｿﾞｰﾆﾝｸﾞ",
    origin:"",
    detail:"赤：核心地域<br>黄：緩衝地域<br>青：移行地域",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source:new ol.source.Vector({
        url:"geojson/sobo.geojson",
        format: new ol.format.GeoJSON()
    }),
    style:commonstyleFunction
});
var soboZ2 = new ol.layer.Vector({
    title:"祖母･傾･大崩ﾕﾈｽｺｴｺﾊﾟｰｸｿﾞｰﾆﾝｸﾞ",
    origin:"",
    detail:"赤：核心地域<br>黄：緩衝地域<br>青：移行地域",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source:new ol.source.Vector({
        url:"geojson/sobo.geojson",
        format: new ol.format.GeoJSON()
    }),
    style:commonstyleFunction
});

var douro1 = new ol.layer.VectorTile({
    title:"<span class='label label-default label-danger'>New</span>全国道路中心線(MVT)",
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
    title:"<span class='label label-default label-danger'>New</span>全国道路中心線(MVT)",
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
        }),
        //zIndex:zindex
    });
    return style;
}

var test1 = new ol.layer.VectorTile({
    title:"test",
    name:"chome",
    origin:"",
    detail:"",
    source: new ol.source.VectorTile({
        cacheSize:10000,
        format: new ol.format.MVT(),
        //tileGrid: ol.tilegrid.createXYZ({maxZoom:12}),
        tileGrid: new ol.tilegrid.createXYZ({
            //minZoom:10,
            //maxZoom:12
        }),
        tilePixelRatio:16,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/yakuba/{z}/{x}/{y}.mvt"
    }),
    crossOrigin:"anonymous",
    maxResolution:1222.99,
    //style: createMapboxStreetsV6Style()
    style: commonstyleFunction
});
var tunamimvt1 = new ol.layer.VectorTile({
    title:"津波浸水test(3D不可)",
    name:"tunamimvt",
    origin:"",
    detail:"",
    source: new ol.source.VectorTile({
        cacheSize:10000,
        format: new ol.format.MVT(),
        //tileGrid: ol.tilegrid.createXYZ({maxZoom:12}),
        tileGrid: new ol.tilegrid.createXYZ({
            //minZoom:10,
            //maxZoom:12
        }),
        tilePixelRatio:16,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/tunami/{z}/{x}/{y}.mvt"
    }),
    crossOrigin:"anonymous",
    //maxResolution:1222.99,
    //style: createMapboxStreetsV6Style()
    style: tunamiStyleFunction
});
var tunamimvt2 = new ol.layer.VectorTile({
    title:"津波浸水test(3D不可)",
    name:"tunamimvt",
    origin:"",
    detail:"",
    source: new ol.source.VectorTile({
        cacheSize:10000,
        format: new ol.format.MVT(),
        //tileGrid: ol.tilegrid.createXYZ({maxZoom:12}),
        tileGrid: new ol.tilegrid.createXYZ({
            //minZoom:10,
            //maxZoom:12
        }),
        tilePixelRatio:16,
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


//浪江町ドローン撮影
var namie1 = new ol.layer.Tile({
    //secret:true,
    title:"浪江町ドローン撮影",
    origin:"<a href='https://github.com/dronebird/oam_fukushima20170602namie' target='_blank'>github</a>",
    detail:"",
    //icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:dimgrey;'></i>",
    coord:[140.99481, 37.49348],
    zoom:15,
    source: new ol.source.XYZ({
        url:"./php/proxy-png.php?url=https://dronebird.github.io/oam_fukushima20170602namie/xyztiles/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:19
    })
});

var namie2 = new ol.layer.Tile({
    //secret:true,
    title:"浪江町ドローン撮影",
    origin:"<a href='https://github.com/dronebird/oam_fukushima20170602namie' target='_blank'>github</a>",
    detail:"",
    //icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:dimgrey;'></i>",
    coord:[140.99481, 37.49348],
    zoom:15,
    source: new ol.source.XYZ({
        url:"./php/proxy-png.php?url=https://dronebird.github.io/oam_fukushima20170602namie/xyztiles/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        minZoom :1,
        maxZoom:19
    })
});


var suiro1 = new ol.layer.VectorTile({
    title:"<span class='label label-default label-danger'>New</span>全国河川中心線(MVT)",
    name:"suiro",
    origin:"<a href='https://github.com/hfu/rvrcl-vt' target='_blank'>rvrcl-vt</a>",
    detail:"",
    source: new ol.source.VectorTile({
        cacheSize:10000,
        format: new ol.format.MVT(),
        tileGrid: new ol.tilegrid.createXYZ({
            //minZoom:8,
            maxZoom:14
        }),
        tilePixelRatio:16,
        url: "https://hfu.github.io/rvrcl-vt/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:1222.99,
    style: suiroStyleFunction
});
//var projection = ol.proj.get('EPSG:3857');
//map2.getProjection()
var suiro2 = new ol.layer.VectorTile({
    title:"<span class='label label-default label-danger'>New</span>全国河川中心線(MVT)",
    name:"suiro",
    origin:"<a href='https://github.com/hfu/rvrcl-vt' target='_blank'>rvrcl-vt</a>",
    detail:"",
    source: new ol.source.VectorTile({
        cacheSize:10000,
        format: new ol.format.MVT(),
        tileGrid: new ol.tilegrid.createXYZ({
            //extent:projection.getExtent(),
            //minZoom:8,
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
        /*
        fill: new ol.style.Fill({
            color:fillColor
        }),
        */
        stroke: new ol.style.Stroke({
            color: strokeColor,
            width: strokeWidth,
            lineDash:lineDash
         }),

        //zIndex:zindex
    });
    return style;
}

var tondabayasik1 = new ol.layer.Tile({
    title:"<span class='label label-default label-danger'>New</span>富田林市航空写真",
    origin:"<a href='https://www.city.tondabayashi.osaka.jp/map/1050/download.html' target='_blank'>公開データの利用について（地図等）</a>",
    detail:"",
    coord:[135.60006642031433, 34.50010582072453],
    zoom:14,
    icon:"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
    source:new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='https://www.city.tondabayashi.osaka.jp/map/1050/download.html' target='_blank'>富田林市</a>"})],
        url:"./php/proxy-png.php?url=https://www.city.tondabayashi.osaka.jp/map/tile/1017/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        minZoom:12,
        maxZoom:19
    })
});
var tondabayasik2 = new ol.layer.Tile({
    title:"<span class='label label-default label-danger'>New</span>富田林市航空写真",
    origin:"<a href='https://www.city.tondabayashi.osaka.jp/map/1050/download.html' target='_blank'>公開データの利用について（地図等）</a>",
    detail:"",
    coord:[135.60006642031433, 34.50010582072453],
    zoom:14,
    icon:"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
    source:new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='https://www.city.tondabayashi.osaka.jp/map/1050/download.html' target='_blank'>富田林市</a>"})],
        url:"./php/proxy-png.php?url=https://www.city.tondabayashi.osaka.jp/map/tile/1017/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        minZoom:12,
        maxZoom:19
    })
});
var tondabayasit1 = new ol.layer.Tile({
    title:"<span class='label label-default label-danger'>New</span>富田林市地形図",
    origin:"<a href='https://www.city.tondabayashi.osaka.jp/map/1050/download.html' target='_blank'>公開データの利用について（地図等）</a>",
    detail:"",
    coord:[135.60006642031433, 34.50010582072453],
    zoom:14,
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source:new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='https://www.city.tondabayashi.osaka.jp/map/1050/download.html' target='_blank'>富田林市</a>"})],
        url:"./php/proxy-png.php?url=https://www.city.tondabayashi.osaka.jp/map/tile/1050/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        minZoom:12,
        maxZoom:19
    })
});
var tondabayasit2 = new ol.layer.Tile({
    title:"<span class='label label-default label-danger'>New</span>富田林市地形図",
    origin:"<a href='https://www.city.tondabayashi.osaka.jp/map/1050/download.html' target='_blank'>公開データの利用について（地図等）</a>",
    detail:"",
    coord:[135.60006642031433, 34.50010582072453],
    zoom:14,
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source:new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='https://www.city.tondabayashi.osaka.jp/map/1050/download.html' target='_blank'>富田林市</a>"})],
        url:"./php/proxy-png.php?url=https://www.city.tondabayashi.osaka.jp/map/tile/1050/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        minZoom:12,
        maxZoom:19
    })
});


//人口集中地区
var did1 = new ol.layer.Tile({
    //secret:true,
    title:"人口集中地区(DID地区)",
    origin:"総務省統計局",
    detail:"平成２７年",
    icon:"<i class='fa fa-user fa-fw' style='color:red;'></i>",
    extent:transformE([130.705,31.36,131.921,32.892]),
    source: new ol.source.XYZ({
        url:"https://maps.gsi.go.jp/xyz/did2015/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:18
    })
});
var did2 = new ol.layer.Tile({
    //secret:true,
    title:"人口集中地区(DID地区)",
    origin:"総務省統計局",
    detail:"平成２７年",
    icon:"<i class='fa fa-user fa-fw' style='color:red;'></i>",
    extent:transformE([130.705,31.36,131.921,32.892]),
    source: new ol.source.XYZ({
        url:"https://maps.gsi.go.jp/xyz/did2015/{z}/{x}/{y}.png",
        crossOrigin:"anonymous",
        //minZoom :1,
        maxZoom:18
    })
});
var test = new ol.layer.VectorTile({
    title:"経済センサスtest",
    name:"keizai-census",
    origin:"",
    detail2:"対象列<select class='target-select'></select>" +
    "<div style=''>リミット：<input type='text' class='kslimittext' value='500' size='5'>" +
    "　色："+
    "<select class='syoutiiki-color-select'>" +
    "<option value='indigo' selected>紫</option>" +
    "<option value='red'>赤</option>" +
    "<option value='green'>緑</option>" +
    "<option value='blue'>青</option>" +
    "<option value='black'>黒</option>" +
    "</select></div>",
    source: new ol.source.VectorTile({
        cacheSize:10000,
        format: new ol.format.MVT(),
        //tileGrid: ol.tilegrid.createXYZ({maxZoom:12}),
        tileGrid: new ol.tilegrid.createXYZ({
            minZoom:10,
            maxZoom:14
        }),
        tilePixelRatio:16,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/miyazakiken/{z}/{x}/{y}.mvt"
    }),
    maxResolution:1222.99,
    //style: createMapboxStreetsV6Style()
    style: keizaiCensusStyleFunction

});
//var keizaiCensusTarget = "A〜S 全産業事業所数";
//var keizaiCensusTarget = "JUGYOSHA";
var keizaiCensusTarget = "ks_T000843001";

var ksLimit = 500;
function keizaiCensusStyleFunction(feature, resolution) {

    var prop = feature.getProperties();
    //console.log(prop)
    var val = prop[keizaiCensusTarget];
    //console.log(val)
    if(val==="-") val = 0;
    val = val/ksLimit;
    if(val>1) val = 1;

    //val = 0.5;

    var rgb = d3.rgb(vtColor(val));
    var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + val + ")";
    //console.log(rgba);

    var style = new ol.style.Style({
        fill: new ol.style.Fill({
            //color:"rgba(" + val + ",0,0,0.9)"
            //color:vtColor(val)
            color:rgba
        }),
        stroke: new ol.style.Stroke({
            color: "grey",
            width: 1
        }),
        //zIndex:zindex
    });
    return style;
}

var anno1 = new ol.layer.VectorTile({
    title:"annoTest",
    name:"anno",
    origin:"",
    source: new ol.source.VectorTile({
        cacheSize:10000,
        format: new ol.format.MVT(),
        //tileGrid: ol.tilegrid.createXYZ({maxZoom:12}),
        tileGrid: new ol.tilegrid.createXYZ({
            minZoom:0,
            maxZoom:12
        }),
        tilePixelRatio:16,
        url: "https://hfu.github.io/anno-vt/{z}/{x}/{y}.mvt"
    }),
    //maxResolution:1222.99,
    //style: createMapboxStreetsV6Style()
    style: annoStyleFunction

});
//var keizaiCensusTarget = "A〜S 全産業事業所数";
//var keizaiCensusTarget = "JUGYOSHA";
//var keizaiCensusTarget = "ks_T000843001";

var ksLimit = 500;
function annoStyleFunction(feature, resolution) {

    var prop = feature.getProperties();
    ///console.log(feature)
    var val = prop[keizaiCensusTarget];
    //console.log(val)
    if(val==="-") val = 0;
    val = val/ksLimit;
    if(val>1) val = 1;

    //val = 0.5;

    var rgb = d3.rgb(vtColor(val));
    var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + val + ")";
    //console.log(rgba);
    /*
    var style = new ol.style.Style({
        fill: new ol.style.Fill({
            //color:"rgba(" + val + ",0,0,0.9)"
            //color:vtColor(val)
            color:rgba
        }),
        stroke: new ol.style.Stroke({
            color: "grey",
            width: 1
        }),
        //zIndex:zindex
    });
    */
    var text = prop["knj"];
    var textColor = "red";
    var style = new ol.style.Style({
            /*
        image: new ol.style.Circle({
            radius:6,
            fill: new ol.style.Fill({
                color:"red"
            }),
            stroke: new ol.style.Stroke({
                color: "white",
                width: 1
            })
        }),
        */
        text: new ol.style.Text({
            font: "8px helvetica,sans-serif",
            text: text,
            rotation: prop["arrngAgl"],
            fill: new ol.style.Fill({
                color:textColor
            })
        })

    });

    return style;
}var syoutiikitest = new ol.layer.VectorTile({
    title:"<span class='label label-default label-danger'>New</span>test(MVT)",
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
        cacheSize:10000,
        format: new ol.format.MVT(),
        tileGrid: new ol.tilegrid.createXYZ({
            minZoom:10,
            maxZoom:15
        }),
        tilePixelRatio:16,
        url: "https://mtile.pref.miyazaki.lg.jp/tile/mvt/zenkokukokusei3/{z}/{x}/{y}.mvt"
    }),
    maxResolution:1222.99,
    style: testFunction
});
var d3testColor = d3.scale.category20();
function testFunction(feature, resolution) {



    var prop = feature.getProperties();
    var val = Math.floor(prop["JINKO"]/(prop["AREA"]/200000));
    val = val/kyoudo;
    if(val>1) val = 1;
    var rgb = d3.rgb(vtColor(val));
    var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + val*0.5 + ")";
    var text = prop["MOJI"];

    var i = Number(String(prop["JINKO"]).slice(-1));

    //console.log(d3CategoryColor(Number(String(prop["JINKO"]).slice(-1))))

    var style = new ol.style.Style({
        fill: new ol.style.Fill({
            //color:rgba
            color:d3testColor(Number(String(prop["JINKO"]).slice(-1)))
        }),
        stroke: new ol.style.Stroke({
            color: "grey",
            width: 1
        }),


        /*
        text: new ol.style.Text({
            font: "8px helvetica,sans-serif",
            text: text,
            //rotation: prop["arrngAgl"],
            fill: new ol.style.Fill({
                color:"red"
            })
        })
        */
    });
    return style;
}

//延岡市１９５２
var nobeoka19521 = new ol.layer.Tile({
    title:"延岡市1952年古地図test",
    origin:"",
    detail:"" ,
    coord:[131.664854,32.582407],
    zoom:14,
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    //extent:transformE([130.66371,31.34280,131.88045,32.87815]),
    source: new ol.source.XYZ({
        url:"https://mtile.pref.miyazaki.lg.jp/tile/hoka/nobeoka1952/{z}/{x}/{-y}.png",
        crossOrigin:"anonymous",
        maxZoom:19
    })
});