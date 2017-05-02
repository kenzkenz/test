//国土地理院淡色地図のレイヤー
var pale1 = new ol.layer.Tile({
    title:"国土地理院_淡色地図",
    origin:"国土地理院",
    detail:"国土地理院の淡色地図",
    source:new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"http://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
        minZoom:2,
        maxZoom:18
    })
})
var pale2 = new ol.layer.Tile({
    title:"国土地理院_淡色地図",
    origin:"国土地理院",
    detail:"国土地理院の淡色地図",
    source:new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"http://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
        minZoom:2,
        maxZoom:18
    })
})
//空中写真のレイヤー
var seamlessphoto1 = new ol.layer.Tile({
    title:"国土地理院_空中写真",
    origin:"国土地理院",
    detail:"国土地理院の空中写真",
    source:new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"http://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",
        minZoom:2,
        maxZoom:18
    })
})
var seamlessphoto2 = new ol.layer.Tile({
    title:"国土地理院_空中写真",
    origin:"国土地理院",
    detail:"国土地理院の空中写真",
    source:new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"http://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",
        minZoom:2,
        maxZoom:18
    })
})
//オープンストリートマップ
var osm1 = new ol.layer.Tile({
    title:"OpenStreetMap",
    origin:"OpenStreetMap Japan",
    detail:"OpenStreetMapは、道路地図などの地理情報データを誰でも利用できるよう、フリーの地理情報データを作成することを目的としたプロジェクトです。",
	source: new ol.source.OSM
});
var osm2 = new ol.layer.Tile({
    title:"OpenStreetMap",
    origin:"OpenStreetMap Japan",
    detail:"OpenStreetMapは、道路地図などの地理情報データを誰でも利用できるよう、フリーの地理情報データを作成することを目的としたプロジェクトです。",
	source: new ol.source.OSM
});
//宮崎県オルソ
var ort1 = new ol.layer.Tile({
    title:"宮崎県航空写真",
    origin:"",
    detail:"",
	extent:transformE([130.66371,31.34280,131.88045,32.87815]),
	source: new ol.source.XYZ({
		url:'http://mtile.pref.miyazaki.lg.jp/tile/ort/{z}/{x}/{-y}.png',
		minZoom :1,
		maxZoom:19
	})
});
var ort2 = new ol.layer.Tile({
    title:"宮崎県航空写真",
    origin:"",
    detail:"",
	extent:transformE([130.66371,31.34280,131.88045,32.87815]),
	source: new ol.source.XYZ({
		url:'http://mtile.pref.miyazaki.lg.jp/tile/ort/{z}/{x}/{-y}.png',
		minZoom :1,
		maxZoom:19
	})
});
//ハザードマップ関係------------------------------------------------------------------------------------------------------------------------------------------------------
//津波
var tunami1 = new ol.layer.Tile({
    title:"津波浸水想定区域",
    origin:"",
    detail:"",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
		url:"http://disaportal.gsi.go.jp/hazardmap_data/raster/tsunamishinsui/{z}/{x}/{y}.png",
		minZoom :1,
		maxZoom:17

	})
});
var tunami2 = new ol.layer.Tile({
    title:"津波浸水想定区域",
    origin:"",
    detail:"",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
		url:"http://disaportal.gsi.go.jp/hazardmap_data/raster/tsunamishinsui/{z}/{x}/{y}.png",
		minZoom :1,
		maxZoom:17
	})
});
//浸水想定
var sinsuisoutei1 = new ol.layer.Tile({
    title:"洪水浸水想定",
    origin:"",
    detail:"",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
		url:"http://disaportal.gsi.go.jp/hazardmap_data/raster/SHINSUI/{z}/{x}/{y}.png",
		minZoom :1,
		maxZoom:18
	})
});
var sinsuisoutei2 = new ol.layer.Tile({
    title:"洪水浸水想定区域",
    origin:"",
    detail:"",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
		url:"http://disaportal.gsi.go.jp/hazardmap_data/raster/SHINSUI/{z}/{x}/{y}.png",
		minZoom :1,
		maxZoom:18
	})
});
//土石流危険渓流
var kikenkeiryuu1 = new ol.layer.Tile({
    title:"土石流危険渓流",
    origin:"",
    detail:"",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
		url:"http://disaportal.gsi.go.jp/hazardmap_data/raster/dosekiryukikenkeiryu/{z}/{x}/{y}.png",
		minZoom :1,
		maxZoom:16
	})
});
var kikenkeiryuu2 = new ol.layer.Tile({
    title:"土石流危険渓流",
    origin:"",
    detail:"",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
		url:"http://disaportal.gsi.go.jp/hazardmap_data/raster/dosekiryukikenkeiryu/{z}/{x}/{y}.png",
		minZoom :1,
		maxZoom:16
	})
});
//急傾斜地崩壊危険箇所
var kyuukeisyakikenkasyo1 = new ol.layer.Tile({
    title:"急傾斜地崩壊危険箇所",
    origin:"",
    detail:"",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
		url:"http://disaportal.gsi.go.jp/hazardmap_data/raster/kyukeisyachihoukai/{z}/{x}/{y}.png",
		minZoom :1,
		maxZoom:16
	})
});
var kyuukeisyakikenkasyo2 = new ol.layer.Tile({
    title:"急傾斜地崩壊危険箇所",
    origin:"",
    detail:"",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
		url:"http://disaportal.gsi.go.jp/hazardmap_data/raster/kyukeisyachihoukai/{z}/{x}/{y}.png",
		minZoom :1,
		maxZoom:16
	})
});
//シームレス地質図
var tisitu1 = new ol.layer.Tile({
    title:"シームレス地質図",
    origin:"<a href='https://gbank.gsj.jp/seamless/seamless2015/2d/' target='_blank'>日本シームレス地質図</a><br>" +
            "<a href='https://gbank.gsj.jp/geonavi/' target='_blank'>地質図Navi</a>",
    detail:"20万分の1日本シームレス地質図®は、これまで出版されてきた地質図幅の図郭における境界線の不連続を、日本全国統一の凡例を用いることによって解消した新しい地質図です。",
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
	source: new ol.source.XYZ({
		url:"https://gbank.gsj.jp/seamless/tilemap/detailed/glfn/{z}/{y}/{x}.png",//ｘとｙを国土地理院流の反対にすること。
		attributions:[new ol.Attribution({html:"<a href='https://www.gsj.jp/HomePageJP.html' target='_blank'>産業技術総合研究所地質調査総合センター</a>"})],
		minZoom:5,
		maxZoom:13
	})
});
//ミエルネ地図
var mierune1 = new ol.layer.Tile({
    title:"ミエルネ地図",
    origin:"",
    detail:"",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"Maptiles by <a href='http://www.mierune.co.jp/' target='_blank'><label>MIERUNE</label></a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'><label>OpenStreetMap</label></a> contributors, under ODbL."})],
		url:"https://tile.mierune.co.jp/mierune/{z}/{x}/{y}.png",
		maxZoom:15
	})
});
var mierune2 = new ol.layer.Tile({
    title:"ミエルネ地図",
    origin:"",
    detail:"",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"Maptiles by <a href='http://www.mierune.co.jp/' target='_blank'><label>MIERUNE</label></a>, under CC BY. Data by OpenStreetMap contributors, under ODbL."})],
		url:"https://tile.mierune.co.jp/mierune/{z}/{x}/{y}.png",
		maxZoom:15
	})
});
//川と流域地図
var ryuuiki1 = new ol.layer.Tile({
    title:"川と流域地図",
    origin:"",
    detail:"",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://tiles.dammaps.jp/ryuiki/' target='_blank'>川と流域地図</a>"})],
		//url:"./php/newproxy.php?url=http://tiles.dammaps.jp/ryuiki_t/1/{z}/{x}/{y}.png",
        url:"http://tiles.dammaps.jp/ryuiki_t/1/{z}/{x}/{y}.png",
		minZoom:4,
		maxZoom:14
	})
});
var ryuuiki2 = new ol.layer.Tile({
    title:"川と流域地図",
    origin:"",
    detail:"",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://tiles.dammaps.jp/ryuiki/' target='_blank'>川と流域地図</a>"})],
		url:"http://tiles.dammaps.jp/ryuiki_t/1/{z}/{x}/{y}.png",
		minZoom:4,
		maxZoom:14
	})
});
//エコリス植生図
var ecoris1 = new ol.layer.Tile({
    title:"エコリス植生図",
    origin:"<label><a href='http://map.ecoris.info/' target='_blank'>エコリス地図タイル</a></label>",
    detail:"第5回 自然環境保全基礎調査 植生調査結果を着色し、国土地理院 基盤地図情報 数値標高データ10mメッシュから作成した陰影起伏図に重ねたものです。",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://map.ecoris.info/' target='_blank'>エコリス地図タイル</a>"})],
		url:"http://map.ecoris.info/tiles/vegehill/{z}/{x}/{y}.png",
		minZoom:5,
		maxZoom:15
	})
});
var ecoris2 = new ol.layer.Tile({
    title:"エコリス植生図",
    origin:"<a href='http://map.ecoris.info/' target='_blank'><label>エコリス地図タイル</label></a>",
    detail:"第5回 自然環境保全基礎調査 植生調査結果を着色し、国土地理院 基盤地図情報 数値標高データ10mメッシュから作成した陰影起伏図に重ねたものです。",
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='http://map.ecoris.info/' target='_blank'>エコリス地図タイル</a>"})],
		url:"http://map.ecoris.info/tiles/vegehill/{z}/{x}/{y}.png",
		minZoom:5,
		maxZoom:15
	})
});
//室蘭市オルソ
var muro1 = new ol.layer.Tile({
    title:"室蘭市航空写真",
    origin:"",
    detail:"",
    coord:[140.973774,42.315226],
    zoom:14,
	//extent:transformE([130.66371,31.34280,131.88045,32.87815]),
	source: new ol.source.XYZ({
		url:'http://kenzkenz2.xsrv.jp/muroran/{z}/{x}/{-y}.png',
		minZoom :1,
		maxZoom:19
	})
});
var muro2 = new ol.layer.Tile({
    title:"室蘭市航空写真",
    origin:"",
    detail:"",
    coord:[140.973774,42.315226],
    zoom:14,
	//extent:transformE([130.66371,31.34280,131.88045,32.87815]),
	source: new ol.source.XYZ({
		url:'http://kenzkenz2.xsrv.jp/muroran/{z}/{x}/{-y}.png',
		minZoom :1,
		maxZoom:19
	})
});
