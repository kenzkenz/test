//国土地理院淡色地図のレイヤー
var pale1 = new ol.layer.Tile({
    title:"国土地理院_淡色地図",
    origin:"国土地理院",
    detail:"国土地理院の淡色地図",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source:new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
        minZoom:2,
        maxZoom:18
    })
});
var pale2 = new ol.layer.Tile({
    title:"国土地理院_淡色地図",
    origin:"国土地理院",
    detail:"国土地理院の淡色地図",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source:new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
        minZoom:2,
        maxZoom:18
    })
});
//オープンストリートマップ
var osm1 = new ol.layer.Tile({
    title:"OpenStreetMap",
    origin:"OpenStreetMap Japan",
    detail:"OpenStreetMapは、道路地図などの地理情報データを誰でも利用できるよう、フリーの地理情報データを作成することを目的としたプロジェクトです。",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.OSM
});
var osm2 = new ol.layer.Tile({
    title:"OpenStreetMap",
    origin:"OpenStreetMap Japan",
    detail:"OpenStreetMapは、道路地図などの地理情報データを誰でも利用できるよう、フリーの地理情報データを作成することを目的としたプロジェクトです。",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.OSM
});
//ミエルネ地図
var mierune1 = new ol.layer.Tile({
    title:"ミエルネ地図",
    origin:"<a href='http://www.mierune.co.jp/tile.html' target='_blank'><label>MIERUNE,LLC.</label></a>",
    detail:"Maptiles by MIERUNE, under CC BY. Data by OpenStreetMap contributors, under ODbL.",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"Maptiles by <a href='http://www.mierune.co.jp/' target='_blank'><label>MIERUNE</label></a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'><label>OpenStreetMap</label></a> contributors, under ODbL."})],
        url:"https://tile.mierune.co.jp/mierune/{z}/{x}/{y}.png",
        maxZoom:15
    })
});
var mierune2 = new ol.layer.Tile({
    title:"ミエルネ地図",
    origin:"<a href='http://www.mierune.co.jp/tile.html' target='_blank'><label>MIERUNE,LLC.</label></a>",
    detail:"Maptiles by MIERUNE, under CC BY. Data by OpenStreetMap contributors, under ODbL.",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"Maptiles by <a href='http://www.mierune.co.jp/' target='_blank'><label>MIERUNE</label></a>, under CC BY. Data by OpenStreetMap contributors, under ODbL."})],
        url:"https://tile.mierune.co.jp/mierune/{z}/{x}/{y}.png",
        maxZoom:15
    })
});
var mieruneMono1 = new ol.layer.Tile({
    title:"ミエルネ地図モノクロ",
    origin:"<a href='http://www.mierune.co.jp/tile.html' target='_blank'><label>MIERUNE,LLC.</label></a>",
    detail:"Maptiles by MIERUNE, under CC BY. Data by OpenStreetMap contributors, under ODbL.",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    source: new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"Maptiles by <a href='http://www.mierune.co.jp/' target='_blank'><label>MIERUNE</label></a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'><label>OpenStreetMap</label></a> contributors, under ODbL."})],
        url:"https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png",
        maxZoom:18
    })
});
var mieruneMono2 = new ol.layer.Tile({
    title:"ミエルネ地図モノクロ",
    origin:"<a href='http://www.mierune.co.jp/tile.html' target='_blank'><label>MIERUNE,LLC.</label></a>",
    icon:"<i class='fa fa-map-o fa-fw' style='color:dimgrey;'></i>",
    detail:"Maptiles by MIERUNE, under CC BY. Data by OpenStreetMap contributors, under ODbL.",
    source: new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"Maptiles by <a href='http://www.mierune.co.jp/' target='_blank'><label>MIERUNE</label></a>, under CC BY. Data by OpenStreetMap contributors, under ODbL."})],
        url:"https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png",
        maxZoom:18
    })
});
//宮崎県オルソ
var ort1 = new ol.layer.Tile({
    title:"宮崎県航空写真",
    origin:"",
    detail:"",
    icon:"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
    extent:transformE([130.66371,31.34280,131.88045,32.87815]),
    source: new ol.source.XYZ({
        url:'https://mtile.pref.miyazaki.lg.jp/tile/ort/{z}/{x}/{-y}.png',
        minZoom :1,
        maxZoom:19
    })
});
var ort2 = new ol.layer.Tile({
    title:"宮崎県航空写真",
    origin:"",
    detail:"",
    icon:"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
    extent:transformE([130.66371,31.34280,131.88045,32.87815]),
    source: new ol.source.XYZ({
        url:'https://mtile.pref.miyazaki.lg.jp/tile/ort/{z}/{x}/{-y}.png',
        minZoom :1,
        maxZoom:19
    })
});
//空中写真のレイヤー
var seamlessphoto1 = new ol.layer.Tile({
    title:"国土地理院_空中写真",
    origin:"国土地理院",
    detail:"国土地理院の空中写真",
    icon:"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
    source:new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",
        minZoom:2,
        maxZoom:18
    })
});
var seamlessphoto2 = new ol.layer.Tile({
    title:"国土地理院_空中写真",
    origin:"国土地理院",
    detail:"国土地理院の空中写真",
    icon:"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
    source:new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",
        minZoom:2,
        maxZoom:18
    })
});
//40年前の写真
var gazo11 = new ol.layer.Tile({
    title:"国土地理院_40年前の写真",
    origin:"国土地理院",
    detail:"",
    icon:"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
    source: new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"https://cyberjapandata.gsi.go.jp/xyz/gazo1/{z}/{x}/{y}.jpg",
        minZoom :10,
        maxZoom:17
    })
});
var gazo12 = new ol.layer.Tile({
    title:"国土地理院_40年前の写真",
    origin:"国土地理院",
    detail:"",
    icon:"<i class='fa fa-picture-o fa-fw' style='color:green;'></i>",
    source: new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"https://cyberjapandata.gsi.go.jp/xyz/gazo1/{z}/{x}/{y}.jpg",
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
        //minZoom:12,
        maxZoom:21
    })
});
//ハザードマップ関係------------------------------------------------------------------------------------------------------------------------------------------------------
//津波
var tunami1 = new ol.layer.Tile({
    title:"津波浸水想定区域",
    origin:"",
    detail:"",
    icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:dimgrey;'></i>",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
		url:"./php/proxy-png.php?url=http://disaportal.gsi.go.jp/hazardmap_data/raster/tsunamishinsui/{z}/{x}/{y}.png",
		minZoom :1,
		maxZoom:17

	})
});
var tunami2 = new ol.layer.Tile({
    title:"津波浸水想定区域",
    origin:"",
    detail:"",
    icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:dimgrey;'></i>",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
		url:"./php/proxy-png.php?url=http://disaportal.gsi.go.jp/hazardmap_data/raster/tsunamishinsui/{z}/{x}/{y}.png",
		minZoom :1,
		maxZoom:17
	})
});
//浸水想定
var sinsuisoutei1 = new ol.layer.Tile({
    title:"洪水浸水想定",
    origin:"",
    detail:"",
    icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:dimgrey;'></i>",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
		url:"./php/proxy-png.php?url=http://disaportal.gsi.go.jp/hazardmap_data/raster/SHINSUI/{z}/{x}/{y}.png",
		minZoom :1,
		maxZoom:18
	})
});
var sinsuisoutei2 = new ol.layer.Tile({
    title:"洪水浸水想定区域",
    origin:"",
    detail:"",
    icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:dimgrey;'></i>",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
		url:"./php/proxy-png.php?url=http://disaportal.gsi.go.jp/hazardmap_data/raster/SHINSUI/{z}/{x}/{y}.png",
		minZoom :1,
		maxZoom:18
	})
});
//土石流危険渓流
var kikenkeiryuu1 = new ol.layer.Tile({
    title:"土石流危険渓流",
    origin:"",
    detail:"",
    icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:dimgrey;'></i>",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
		url:"./php/proxy-png.php?url=http://disaportal.gsi.go.jp/hazardmap_data/raster/dosekiryukikenkeiryu/{z}/{x}/{y}.png",
		minZoom :1,
		maxZoom:16
	})
});
var kikenkeiryuu2 = new ol.layer.Tile({
    title:"土石流危険渓流",
    origin:"",
    detail:"",
    icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:dimgrey;'></i>",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
		url:"./php/proxy-png.php?url=http://disaportal.gsi.go.jp/hazardmap_data/raster/dosekiryukikenkeiryu/{z}/{x}/{y}.png",
		minZoom :1,
		maxZoom:16
	})
});
//急傾斜地崩壊危険箇所
var kyuukeisyakikenkasyo1 = new ol.layer.Tile({
    title:"急傾斜地崩壊危険箇所",
    origin:"",
    detail:"",
    icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:dimgrey;'></i>",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
		url:"./php/proxy-png.php?url=http://disaportal.gsi.go.jp/hazardmap_data/raster/kyukeisyachihoukai/{z}/{x}/{y}.png",
		minZoom :1,
		maxZoom:16
	})
});
var kyuukeisyakikenkasyo2 = new ol.layer.Tile({
    title:"急傾斜地崩壊危険箇所",
    origin:"",
    detail:"",
    icon:"<i class='fa fa-exclamation-triangle fa-fw' style='color:dimgrey;'></i>",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
		url:"./php/proxy-png.php?url=http://disaportal.gsi.go.jp/hazardmap_data/raster/kyukeisyachihoukai/{z}/{x}/{y}.png",
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
		minZoom:4,
		maxZoom:14
	})
});
//エコリス植生図
var ecoris1 = new ol.layer.Tile({
    title:"エコリス植生図",
    origin:"<a href='http://map.ecoris.info/' target='_blank'>エコリス地図タイル</a>",
    detail:"第5回 自然環境保全基礎調査 植生調査結果を着色し、国土地理院 基盤地図情報 数値標高データ10mメッシュから作成した陰影起伏図に重ねたものです。",
    icon:"<i class='fa fa-map-o fa-fw' style='color:blue;'></i>",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://map.ecoris.info/' target='_blank'>エコリス地図タイル</a>"})],
		url:"https://map.ecoris.info/tiles/vegehill/{z}/{x}/{y}.png",
		minZoom:5,
		maxZoom:15
	})
});
var ecoris2 = new ol.layer.Tile({
    title:"エコリス植生図",
    origin:"<a href='http://map.ecoris.info/' target='_blank'>エコリス地図タイル</a>",
    detail:"第5回 自然環境保全基礎調査 植生調査結果を着色し、国土地理院 基盤地図情報 数値標高データ10mメッシュから作成した陰影起伏図に重ねたものです。",
    icon:"<i class='fa fa-map-o fa-fw' style='color:blue;'></i>",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://map.ecoris.info/' target='_blank'>エコリス地図タイル</a>"})],
		url:"https://map.ecoris.info/tiles/vegehill/{z}/{x}/{y}.png",
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
        url:"https://gbank.gsj.jp/seamless/tilemap/detailed/glfn/{z}/{y}/{x}.png",//ｘとｙを国土地理院流の反対にすること。
        attributions:[new ol.Attribution({html:"<a href='https://www.gsj.jp/HomePageJP.html' target='_blank'>産業技術総合研究所地質調査総合センター</a>"})],
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
        url:"https://gbank.gsj.jp/seamless/tilemap/detailed/glfn/{z}/{y}/{x}.png",//ｘとｙを国土地理院流の反対にすること。
        attributions:[new ol.Attribution({html:"<a href='https://www.gsj.jp/HomePageJP.html' target='_blank'>産業技術総合研究所地質調査総合センター</a>"})],
        minZoom:5,
        maxZoom:13
    })
});
//日本CS立体図
var nihonCs1 = new ol.layer.Tile({
    title:"日本CS立体図",
    origin:"<a href='./php/proxy-png.php?url=http://kouapp.main.jp/csmap/japan/csjapan.html' target='_blank'>日本CS立体図</a>",
    detail:"CS立体図（国土地理院承認番号　平29情使、 第77号）",
    icon:"<i class='fa fa-map-o fa-fw' style='color:brown;'></i>",
    source: new ol.source.XYZ({
        url:"./php/proxy-jpeg.php?url=http://kouapp.main.jp/csmap/tile/japan/{z}/{x}/{y}.jpg",
        maxZoom:15
    })
});
var nihonCs2 = new ol.layer.Tile({
    title:"日本CS立体図",
    origin:"<a href='./php/proxy-png.php?url=http://kouapp.main.jp/csmap/japan/csjapan.html' target='_blank'>日本CS立体図</a>",
    detail:"CS立体図（国土地理院承認番号　平29情使、 第77号）",
    icon:"<i class='fa fa-map-o fa-fw' style='color:brown;'></i>",
    source: new ol.source.XYZ({
        url:"./php/proxy-jpeg.php?url=http://kouapp.main.jp/csmap/tile/japan/{z}/{x}/{y}.jpg",
        maxZoom:15
    })
});