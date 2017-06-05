$(document).ajaxStart(function (){
    $("#loading-fa").show(500);
});
$(document).ajaxStop(function (){
    $("#loading-fa").hide(500);
});
//↓産業技術総合研究所の西岡さんから頂きました。自分流に体裁をちょっと変えました。
// ********************************************************************************
// getElev, タイル座標とズームレベルを指定して標高値を取得する関数
//	rx, ry: タイル座標(実数表現）z:　ズームレベル
//	thenは終了時に呼ばれるコールバック関数
//	成功時には標高(単位m)，無効値の場合は'e'を返す
// ********************************************************************************
//function getElev(rx,ry,z,then){
var prevImgSrc = "";
function getElev(coordinate,mapName,then){
    var elevServer = 'https://gsj-seamless.jp/labs/elev2/elev/';
    var z = Math.floor(eval(mapName).getView().getZoom());
    if(z>13) z=13;
    var R = 6378137;// 地球の半径(m);
    var rx = (0.5 + coordinate[0]/(2*R*Math.PI))*Math.pow(2,z);
    var ry = (0.5 - coordinate[1]/(2*R*Math.PI))*Math.pow(2,z);

    var x = Math.floor(rx);// タイルX座標
    var y = Math.floor(ry);// タイルY座標
    var i = (rx - x) * 256;// タイル内i座標
    var j = (ry - y) * 256;// タイル内j座標
    var img = new Image();
    img.crossOrigin = 'anonymouse';
    img.onload = function(){
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var h = "e";
        var data = null;
        canvas.width = 1;
        canvas.height = 1;
        context.drawImage(img,i,j,1,1,0,0,1,1);
        data = context.getImageData(0,0,1,1).data;
        if(data[3] === 255){
            h = (data[0] * 256 * 256 + data[1] * 256 + data[2]) / 100;
        }
        then(h);
    };
    img.src = elevServer + z + '/' + y + '/' + x + '.png?res=cm';
}
//-----------------------------------------------------------------------------
//バックグラウンドで色を判断する。
function funcTextColor(R,G,B){
    var cY = 0.3*R + 0.6*G + 0.1*B;
    if(cY > 100) {//最高値は255。今回は100で判断させる。
        return "black";
    }else{
        return "white";
    }
}
//-----------------------------------------------------------------------------
function funcColor100(valueAr) {
    var max = Math.max.apply(null,valueAr);
    var min = Math.min.apply(null,valueAr);
    var minM = 0;
    if (min < 0) {//最小値がマイナスだったとき
        max = max;
        minM = min;
        min = 0;
    }
    //console.log(max);
	//console.log(min);
    //var d3Color = d3.interpolateLab("white", "red");
    var plus100 = (max - min) / 100;//最大値と最小値の差を1としたとき0.01あたりの差
    //var d3ColorM = d3.interpolateLab("white", "blue");
    var minus100 = (0 - minM) / 100;
    return [plus100,minus100,min];
}
//-----------------------------------------------------------------------------
function funcMaps(element){
	var mapName = element.parents(".maps").attr("id");
	var mapElement = element.parents(".maps");
	if(mapName=="map1"){
		var ol3d = "ol3d1";
		var layers = useLayersArr1;
	}else{
		var ol3d = "ol3d2";
		var layers = useLayersArr2;
	}
	return {"name":mapName,"element":mapElement,"ol3d":ol3d,"layers":layers};
}
//------------------------------------------------------------------------------
//ダイアログの高さを設定する。
function funcHaikeiTblDivHeight(){
	if($(window).width()>1000){
		var height = $(window).height()-150;
	}else{
		if($(".dualscreen-btn").eq(0).text()=="1画面"){
			var height = $(window).height()/2-150;
		}else{
			var height = $(window).height()-150;
		}
	}
	$(".haikei-tbl-div").css("max-height",height + "px");
    $(".estat-tbl-div").css("max-height",height-65 + "px");
    $(".resas-tbl-div").css("max-height",height-50 + "px");
    $(".csv-tbl-div").css("max-height",height-50 + "px");
}
//------------------------------------------------------------------------------
//エクステントの座標系を変換する
function transformE(extent) {
	return ol.proj.transformExtent(extent,'EPSG:4326','EPSG:3857');
}
//-----------------------------------------------------------------------------------------
// 文字列から，Unicodeコードポイントの配列を作る
function str_to_unicode_array( str ){
    var arr = [];
    for( var i = 0; i < str.length; i ++ ){
        arr.push( str.charCodeAt( i ) );
    }
    return arr;
};
function str2Array(str) {
    var array = [],i,il=str.length;
    for(i=0;i<il;i++) array.push(str.charCodeAt(i));
    return array;
};
//------------------------------------------------------------------------------
//2015年10月1日　国勢調査人口
var prefAr =
	[
		{"id":"01000","name":"北海道","zinkou":5381733},
		{"id":"02000","name":"青森県","zinkou":1308265},
		{"id":"03000","name":"岩手県","zinkou":1279594},
		{"id":"04000","name":"宮城県","zinkou":2333899},
		{"id":"05000","name":"秋田県","zinkou":1023119},
		{"id":"06000","name":"山形県","zinkou":1123891},
		{"id":"07000","name":"福島県","zinkou":1914039},
		{"id":"08000","name":"茨城県","zinkou":2916976},
		{"id":"09000","name":"栃木県","zinkou":1974255},
		{"id":"10000","name":"群馬県","zinkou":1973115},
		{"id":"11000","name":"埼玉県","zinkou":7266534},
		{"id":"12000","name":"千葉県","zinkou":6222666},
		{"id":"13000","name":"東京都","zinkou":13515271},
		{"id":"14000","name":"神奈川県","zinkou":9126214},
		{"id":"15000","name":"新潟県","zinkou":2304264},
		{"id":"16000","name":"富山県","zinkou":1066328},
		{"id":"17000","name":"石川県","zinkou":1154008},
		{"id":"18000","name":"福井県","zinkou":786740},
		{"id":"19000","name":"山梨県","zinkou":834930},
		{"id":"21000","name":"岐阜県","zinkou":2031903},
		{"id":"20000","name":"長野県","zinkou":2098804},
		{"id":"22000","name":"静岡県","zinkou":3700305},
		{"id":"23000","name":"愛知県","zinkou":7483128},
		{"id":"24000","name":"三重県","zinkou":1815865},
		{"id":"25000","name":"滋賀県","zinkou":1412916},
		{"id":"26000","name":"京都府","zinkou":2610353},
		{"id":"27000","name":"大阪府","zinkou":8839469},
		{"id":"28000","name":"兵庫県","zinkou":5534800},
		{"id":"29000","name":"奈良県","zinkou":1364316},
		{"id":"30000","name":"和歌山県","zinkou":963579},
		{"id":"31000","name":"鳥取県","zinkou":573441},
		{"id":"32000","name":"島根県","zinkou":694352},
		{"id":"33000","name":"岡山県","zinkou":1921525},
		{"id":"34000","name":"広島県","zinkou":2843990},
		{"id":"35000","name":"山口県","zinkou":1404729},
		{"id":"36000","name":"徳島県","zinkou":755733},
		{"id":"37000","name":"香川県","zinkou":976263},
		{"id":"38000","name":"愛媛県","zinkou":1385262},
		{"id":"39000","name":"高知県","zinkou":728276},
        {"id":"40000","name":"福岡県","zinkou":5101556},
		{"id":"41000","name":"佐賀県","zinkou":832832},
		{"id":"42000","name":"長崎県","zinkou":1377187},
		{"id":"43000","name":"熊本県","zinkou":1786170},
		{"id":"44000","name":"大分県","zinkou":1166338},
		{"id":"45000","name":"宮崎県","zinkou":1104069},
		{"id":"46000","name":"鹿児島県","zinkou":1648177},
		{"id":"47000","name":"沖縄県","zinkou":1433566}
	]
