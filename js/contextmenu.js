var myContextOverlay1 = null;
var myContextOverlay2 = null;
$(function(){

    //自作コンテキストメニュー（右クリックメニュー）

    $("#map1").append('<div id="myContextOverlay-div1">右クリック実験中1111</div>');
    $("#map2").append('<div id="myContextOverlay-div2">右クリック実験中2222</div>');

    myContextOverlay1 = new ol.Overlay({
        element:$("#myContextOverlay-div1")[0]
    });
    map1.addOverlay(myContextOverlay1);

    myContextOverlay2 = new ol.Overlay({
        element:$("#myContextOverlay-div2")[0]
    });
    map2.addOverlay(myContextOverlay2);

    $("#map1")[0].addEventListener('contextmenu',myContextmenu1,false);
    $("body").on("mouseenter",".dialog-content,.dialog-base",function(){//contentにマウスが当たったら通常の右クリックメニュー復活。
        $("#map1")[0].removeEventListener('contextmenu',myContextmenu1,false);
    }).on("mouseleave",".dialog-content,.dialog-base",function(){//contentからマウスが抜けたら通常の右クリックメニューを無効化。
        $("#map1")[0].addEventListener('contextmenu',myContextmenu1,false);
    });

    $("#map2")[0].addEventListener('contextmenu',myContextmenu2,false);
    $("body").on("mouseenter",".dialog-content,.dialog-base",function(){//contentにマウスが当たったら通常の右クリックメニュー復活。
        $("#map2")[0].removeEventListener('contextmenu',myContextmenu2,false);
    }).on("mouseleave",".dialog-content,.dialog-base",function(){//contentからマウスが抜けたら通常の右クリックメニューを無効化。
        $("#map2")[0].addEventListener('contextmenu',myContextmenu2,false);
    });
});

function myContextmenu1(evt){
    var myContextmenuTop = evt.clientY;
    var myContextmenuLeft = evt.clientX;
    var coord = map1.getCoordinateFromPixel([myContextmenuLeft,myContextmenuTop]);
    console.log(coord);
    evt.preventDefault();
    myContextOverlay1.setPosition(coord);
}
function myContextmenu2(evt){
    var myContextmenuTop = evt.clientY;
    var myContextmenuLeft = evt.clientX - $("body").width()/2;
    console.log(myContextmenuLeft)
    var coord = map2.getCoordinateFromPixel([myContextmenuLeft,myContextmenuTop]);
    console.log(coord);
    evt.preventDefault();
    myContextOverlay2.setPosition(coord);
}