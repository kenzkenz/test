
var cs1k1 = new ol.layer.Tile({
    title:"CS立体地図実験中",
    origin:"",
    detail:"",
    extent:transformE([128.4,32.5,129.5306,34.7]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"http://mtile.pref.miyazaki.lg.jp/tile/cs/1/{z}/{x}/{-y}.png",
		//minZoom :1,
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
		//minZoom :1,
		maxZoom:15
	})
});
var cs2k1 = new ol.layer.Tile({
	extent:transformE([129.02,30.2,132.9,34]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"http://mtile.pref.miyazaki.lg.jp/tile/cs/2/{z}/{x}/{-y}.png",
		//minZoom :1,
		maxZoom:15
	})
});
var cs2k2 = new ol.layer.Tile({
	extent:transformE([129.02,30.2,132.9,34]),
	source: new ol.source.XYZ({
		attributions:[new ol.Attribution({html:"<a href='https://www.geospatial.jp/ckan/dataset/cs-10m-01' target='_blank'><label>G空間情報センター</label></a>"})],
		url:"http://mtile.pref.miyazaki.lg.jp/tile/cs/2/{z}/{x}/{-y}.png",
		//minZoom :1,
		maxZoom:15
	})
});
var csArr1 = [cs1k1,cs2k1];
var csArr2 = [cs1k2,cs2k2];
