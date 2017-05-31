var myContextOverlay1 = null;
var myContextOverlay2 = null;
$(function(){
    var coord1 = null;
    var coord2 = null;
    //自作コンテキストメニュー（右クリックメニュー）
    var content = "";
        content += "<button type='button' class='close myContextOverlay-close'>&times;</button>";
        content += "右クリック実験中<br>";
        content += "<input type='text' class='kmtext' value='5' size='2'>KM";
    /*
    function content(className){
        var content = "";
        content += "<button type='button' class='close myContextOverlay-close'>&times;</button>";
        content += "右クリック実験中<br>";
        content += "<input type='text' class='" + className + "' value='5' size='2'>KM"
        return content;
    }
    */
    $("#map1").append('<div id="myContextOverlay-div1" class="myContextOverlay-div">' + content + '</div>');
    $("#map2").append('<div id="myContextOverlay-div2" class="myContextOverlay-div">' + content + '</div>');

    myContextOverlay1 = new ol.Overlay({
        element:$("#myContextOverlay-div1")[0],
        autoPan:true
    });
    map1.addOverlay(myContextOverlay1);

    myContextOverlay2 = new ol.Overlay({
        element:$("#myContextOverlay-div2")[0],
        autoPan:true
    });
    map2.addOverlay(myContextOverlay2);

    $("#map1 .kmtext,#map2 .kmtext").spinner({
        max:50, min:5, step:1,
        spin:function(event,ui){
            console.log(ui.value)
        }
        
        var circleCenterX = coord[0]//15438034; //the X center of your circle
        var circleCenterY = coord[1]//4186771; //the Y center of your circle
        //var circleRadius = km*1000/1.609344;  //the radius of your circle
        var circleRadius = km*1179;  //the radius of your circle
       //var circleRadius2 = km2*1179;  //the radius of your circle
        var circleCoords1 = createCirclePointCoords(circleCenterX,circleCenterY,circleRadius,pointsToFind);

    });

    $(".myContextOverlay-close").click(function(){
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        if(mapName==="map1") {
            myContextOverlay1.setPosition(null);
        }else{
            myContextOverlay2.setPosition(null);
        }
    });

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

    function myContextmenu1(evt){
        var myContextmenuTop = evt.clientY;
        var myContextmenuLeft = evt.clientX;
        coord1 = map1.getCoordinateFromPixel([myContextmenuLeft,myContextmenuTop]);
        console.log(coord1);
        evt.preventDefault();
        myContextOverlay1.setPosition(coord1);
    }
    function myContextmenu2(evt){
        var myContextmenuTop = evt.clientY;
        var myContextmenuLeft = evt.clientX - $("body").width()/2;
        console.log(myContextmenuLeft)
        coord2 = map2.getCoordinateFromPixel([myContextmenuLeft,myContextmenuTop]);
        console.log(coord2);
        evt.preventDefault();
        myContextOverlay2.setPosition(coord2);
    }
});


//-----------------------------------------------------------------------------------------
//円の座標を作る。
function createCirclePointCoords(circleCenterX,circleCenterY,circleRadius,pointsToFind){
    var angleToAdd = 360/pointsToFind;
    var coords = [];
    var angle = 45;
    var firstCoord;
    for (var i=0;i<pointsToFind;i++){
        angle = angle+angleToAdd;
        //console.log(angle);
        var coordX = circleCenterX + circleRadius * Math.cos(angle*Math.PI/180);
        var coordY = circleCenterY + circleRadius * Math.sin(angle*Math.PI/180);
        coords.push([coordX,coordY]);
        //最初のポイントを足すことによって多角形をきれいにとじる。
        if(i==0) firstCoord = [coordX,coordY];
        if(i==pointsToFind-1) coords.push(firstCoord);
    }
    return coords;
}