$(function(){

    //自作コンテキストメニュー（右クリックメニュー）
    var myContextOverlay = new ol.Overlay({
        element:$(".myContextOverlay-div")[0]
    });
    map1.addOverlay(myContextOverlay);


    $("#map1")[0].addEventListener('contextmenu',myContextmenu,false);
    $("body").on("mouseenter",".dialog-content,.dialog-base",function(){//contentにマウスが当たったら通常の右クリックメニュー復活。
        $("#map1")[0].removeEventListener('contextmenu',myContextmenu,false);
    }).on("mouseleave",".dialog-content,.dialog-base",function(){//contentからマウスが抜けたら通常の右クリックメニューを無効化。
        $("#map1")[0].addEventListener('contextmenu',myContextmenu,false);
    })
});

function myContextmenu(e){
    console.log(111);
    e.preventDefault();
}