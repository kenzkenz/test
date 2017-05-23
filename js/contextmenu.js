var myContextOverlay = null;
$(function(){

    //自作コンテキストメニュー（右クリックメニュー）
    myContextOverlay = new ol.Overlay({
        element:$(".myContextOverlay-div")[0]
    });
    map1.addOverlay(myContextOverlay);

    $("#map1")[0].addEventListener('contextmenu',myContextmenu,false);
    $("body").on("mouseenter",".dialog-content,.dialog-base",function(){//contentにマウスが当たったら通常の右クリックメニュー復活。
        $("#map1")[0].removeEventListener('contextmenu',myContextmenu,false);
        $(".myContextOverlay-div").show();
    }).on("mouseleave",".dialog-content,.dialog-base",function(){//contentからマウスが抜けたら通常の右クリックメニューを無効化。
        $("#map1")[0].addEventListener('contextmenu',myContextmenu,false);
    })
});

function myContextmenu(evt){
    var myContextmenuTop = evt.clientY;
    var myContextmenuLeft = evt.clientX;
    var coord = map1.getCoordinateFromPixel([myContextmenuLeft,myContextmenuTop]);
    console.log(coord);
    evt.preventDefault();
    myContextOverlay.setPosition(coord);
}