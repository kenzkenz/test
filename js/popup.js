$(function(){
    var popup1 = new ol.Overlay.Popup();
    map1.addOverlay(popup1);
    //-----------------------------------------------
    map1.on("singleclick", function(evt) {
        var content = "作成中";
        funcPopupShow(evt.coordinate,content)
    });
    //-----------------------------------------------
    function funcPopupShow(coord,content){
        popup1.show(coord,content);
    }
});