//------------------------------------------------------------------------------------------
//国土地理院淡色地図のレイヤー
var pale = new ol.layer.Tile({
    title:"国土地理院_単色地図",
    type:"base",
    source:new ol.source.XYZ({
        attributions:[new ol.Attribution({html:"<a href='http://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"})],
        url:"http://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
        minZoom:2,
        maxZoom:18
    })
})
