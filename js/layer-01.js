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
var seki1 = new ol.layer.Tile({
    title:"宮崎県(九州)赤色立体地図",
    origin:"<a href='https://www.geospatial.jp/ckan/dataset/red45' target='_blank'>赤色立体地図</a><br><br>赤色立体地図©アジア航測株式会社",
    detail:"アジア航測株式会社が作成した立体地図です。<span style='color:red;'>アジア航測株式会社の許可を得て掲載しています。</span><br>赤色立体地図は、数値標高モデル（DEM:Digital Elevation Model)を、１枚の地図で３次元的に見せる、今までにない地形表現技法で作成された地図です。商用利用禁止です！" ,
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
    detail:"アジア航測株式会社が作成した立体地図です。<span style='color:red;'>アジア航測株式会社の許可を得て掲載しています。</span><br>赤色立体地図は、数値標高モデル（DEM:Digital Elevation Model)を、１枚の地図で３次元的に見せる、今までにない地形表現技法で作成された地図です。商用利用禁止です！" ,
    icon:"<i class='fa fa-map-o fa-fw' style='color:brown;'></i>",
    source: new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/red45' target='_blank'>赤色立体地図©アジア航測株式会社</a>"})],
        url:"https://mtile.pref.miyazaki.lg.jp/tile/sekisyoku/{z}/{x}/{-y}.png",
        //minZoom :1,
        maxZoom:16
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
    //extent:transformE([139.70417,34.892768,140.893444,36.113549]),
    source: new ol.source.XYZ({
        url:'./php/proxy-png.php?url=http://mapwarper.net/maps/tile/16142/{z}/{x}/{y}.png',
        crossOrigin:"anonymous",
        //maxZoom:19
    })
});