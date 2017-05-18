var cs1k1 = new ol.layer.Tile({
    title:"全国_CS立体図_10m",
    origin:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'>G空間情報センター</a>",
    detail:"長野県林業総合センター様が作成した立体地図です。全国_CS立体図10mのデータ「CS立体図」は、長野県林業総合センターが考案した地形表現図(c) Esri Japan発行 ArcGIS Geo Suite地形(基盤地形情報10mメッシュ）を基に作製",
    icon:"<i class='fa fa-map-o' style='color:brown;'></i>",
    extent:transformE([128.4,32.5,129.5306,34.7]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/1/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs1k2 = new ol.layer.Tile({
    title:"全国_CS立体図_10m",
    origin:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'>G空間情報センター</a>",
    detail:"長野県林業総合センター様が作成した立体地図です。全国_CS立体図10mのデータ「CS立体図」は、長野県林業総合センターが考案した地形表現図(c) Esri Japan発行 ArcGIS Geo Suite地形(基盤地形情報10mメッシュ）を基に作製",
    icon:"<i class='fa fa-map-o' style='color:brown;'></i>",
    extent:transformE([128.4,32.5,129.5306,34.7]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/1/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs2k1 = new ol.layer.Tile({
	extent:transformE([129.02,30.2,132.9,34]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/2/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs2k2 = new ol.layer.Tile({
	extent:transformE([129.02,30.2,132.9,34]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/2/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs3k1 = new ol.layer.Tile({
	extent:transformE([129.99,33.33,133.7,36.6]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/3/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs3k2 = new ol.layer.Tile({
	extent:transformE([129.99,33.33,133.7,36.6]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/3/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs4k1 = new ol.layer.Tile({
	extent:transformE([131.99,32.68,134.98,34.67]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/4/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs4k2 = new ol.layer.Tile({
	extent:transformE([131.99,32.68,134.98,34.67]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/4/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs5k1 = new ol.layer.Tile({
	extent:transformE([132.99,34.00,135.48,35.8]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/5/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs5k2 = new ol.layer.Tile({
	extent:transformE([132.99,34.00,135.48,35.8]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/5/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs6k1 = new ol.layer.Tile({
	extent:transformE([134.51,33.40,137.02,36.34]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/6/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs6k2 = new ol.layer.Tile({
	extent:transformE([134.51,33.40,137.02,36.34]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/6/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs7k1 = new ol.layer.Tile({
	extent:transformE([135.99,34.00,137.90,37.66]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/7/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs7k2 = new ol.layer.Tile({
	extent:transformE([135.99,34.00,137.90,37.66]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/7/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs8k1 = new ol.layer.Tile({
	extent:transformE([137.00,38.68,139.97,34.56]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/8/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs8k2 = new ol.layer.Tile({
	extent:transformE([137.00,38.68,139.97,34.56]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/8/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs9k1 = new ol.layer.Tile({
	extent:transformE([138.05,38.00,140.99,32.43]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/9/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs9k2 = new ol.layer.Tile({
	extent:transformE([138.05,38.00,140.99,32.43]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/9/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs10k1 = new ol.layer.Tile({
	extent:transformE([139.46,41.65,142.12,37.66]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/10/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs10k2 = new ol.layer.Tile({
	extent:transformE([139.46,41.65,142.12,37.66]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/10/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs11k1 = new ol.layer.Tile({
	extent:transformE([139.00,43.35,141.19,41.33]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/11/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs11k2 = new ol.layer.Tile({
	extent:transformE([139.00,43.35,141.19,41.33]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/11/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs12k1 = new ol.layer.Tile({
	extent:transformE([140.93,45.65,144.05,41.85]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/12/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs12k2 = new ol.layer.Tile({
	extent:transformE([140.93,45.65,144.05,41.85]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/12/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs13k1 = new ol.layer.Tile({
	extent:transformE([143.95,44.35,145.95,42.70]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/13/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs13k2 = new ol.layer.Tile({
	extent:transformE([143.95,44.35,145.95,42.70]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/13/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs15k1 = new ol.layer.Tile({
	extent:transformE([126.60,27.37,128.82,26.00]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/15/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs15k2 = new ol.layer.Tile({
	extent:transformE([126.60,27.37,128.82,26.00]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/15/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs16k1 = new ol.layer.Tile({
	extent:transformE([122.92,25.07,125.65,24.00]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/16/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs16k2 = new ol.layer.Tile({
	extent:transformE([122.92,25.07,125.65,24.00]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"https://mtile.pref.miyazaki.lg.jp/tile/cs/16/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var csArr1 = [cs1k1,cs2k1,cs3k1,cs4k1,cs5k1,cs6k1,cs7k1,cs8k1,cs9k1,cs10k1
                ,cs11k1,cs12k1,cs13k1,cs15k1,cs16k1];
var csArr2 = [cs1k2,cs2k2,cs3k2,cs4k2,cs5k2,cs6k2,cs7k2,cs8k2,cs9k2,cs10k2
                ,cs11k2,cs12k2,cs13k2,cs15k2,cs16k2];
