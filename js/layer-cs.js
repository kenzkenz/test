
var cs1k1 = new ol.layer.Tile({
    title:"CS立体地図実験中",
    origin:"",
    detail:"",
    extent:transformE([128.4,32.5,129.5306,34.7]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"http://mtile.pref.miyazaki.lg.jp/tile/cs/1/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs1k2 = new ol.layer.Tile({
    title:"CS立体地図実験中",
    origin:"",
    detail:"",
    extent:transformE([128.4,32.5,129.5306,34.7]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"http://mtile.pref.miyazaki.lg.jp/tile/cs/1/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs2k1 = new ol.layer.Tile({
	extent:transformE([129.02,30.2,132.9,34]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"http://mtile.pref.miyazaki.lg.jp/tile/cs/2/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs2k2 = new ol.layer.Tile({
	extent:transformE([129.02,30.2,132.9,34]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"http://mtile.pref.miyazaki.lg.jp/tile/cs/2/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs3k1 = new ol.layer.Tile({
	extent:transformE([129.99,33.33,133.7,36.6]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"http://mtile.pref.miyazaki.lg.jp/tile/cs/3/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs3k2 = new ol.layer.Tile({
	extent:transformE([129.99,33.33,133.7,36.6]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"http://mtile.pref.miyazaki.lg.jp/tile/cs/3/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs4k1 = new ol.layer.Tile({//
	extent:transformE([131.99,32.68,134.98,34.67]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"http://mtile.pref.miyazaki.lg.jp/tile/cs/4/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs4k2 = new ol.layer.Tile({//
	extent:transformE([131.99,32.68,134.98,34.67]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"http://mtile.pref.miyazaki.lg.jp/tile/cs/4/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs5k1 = new ol.layer.Tile({//
	extent:transformE([132.99,34.00,135.48,35.8]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"http://mtile.pref.miyazaki.lg.jp/tile/cs/5/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs5k2 = new ol.layer.Tile({//
	extent:transformE([132.99,34.00,135.48,35.8]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"http://mtile.pref.miyazaki.lg.jp/tile/cs/5/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs6k1 = new ol.layer.Tile({//
	extent:transformE([134.51,33.40,137.02,36.34]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"http://mtile.pref.miyazaki.lg.jp/tile/cs/6/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs6k2 = new ol.layer.Tile({//
	extent:transformE([134.51,33.40,137.02,36.34]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"http://mtile.pref.miyazaki.lg.jp/tile/cs/6/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs7k1 = new ol.layer.Tile({//
	extent:transformE([135.99,34.00,137.90,37.66]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"http://mtile.pref.miyazaki.lg.jp/tile/cs/7/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var cs7k2 = new ol.layer.Tile({//
	extent:transformE([135.99,34.00,137.90,37.66]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"http://mtile.pref.miyazaki.lg.jp/tile/cs/7/{z}/{x}/{-y}.png",
		maxZoom:15
	})
});
var csArr1 = [cs1k1,cs2k1,cs3k1,cs4k1,cs5k1,cs6k1,cs7k1];
var csArr2 = [cs1k2,cs2k2,cs3k2,cs4k2,cs5k2,cs6k2,cs7k2];
