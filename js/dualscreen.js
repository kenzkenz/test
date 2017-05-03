$(function(){
    $("body").on("click",".dualscreen-btn",function(){
        if($(this).text()==="2画面"){//起動時はこっち
            if($(window).width()>1000){//横幅が大きいときは横に分割
                $("#map1").animate({"width":"50%"},500,function(){map1.updateSize();});
                $("#map2").show().animate({"width":"50%","height":$(window).height()+"px"},0,function(){
                    map2.updateSize();
                });
                //ダイアログも移動-----------------------------------------------
                for(var i = 0; i < $(".mydialog").length; i++){
                    var left = $(".mydialog").eq(i).css("left").replace("px","")/2 - $(".mydialog").eq(i).width()/2;
                    $(".mydialog").eq(i).animate({"left":left+"px"},500);
                }
            }else{//横幅が狭いときは縦に分割
                $("#map1").animate({"height":$(window).height()/2+"px"},500,function(){map1.updateSize();});
                $("#map2").show().animate({"width":"100%","height":$(window).height()/2+"px"},0,function(){
                    map2.updateSize();
                });
            }
            //同期非同期ボタン
            $("#sync-btn").show();
            $(".dualscreen-btn").text("1画面");
        }else{
            if($(window).width()>1000){//横幅が大きいときは横に分割
                $("#map1").animate({"width":"100%"},500,function(){map1.updateSize();});
                $("#map2").animate({"height":"10px"},0,function(){
                    map2.updateSize();
                }).hide();
                //ダイアログも移動-----------------------------------------------
                for(var i = 0; i < $(".mydialog").length; i++){
                    var left = $(".mydialog").eq(i).css("left").replace("px","")*2 + $(".mydialog").eq(i).width();
                    $(".mydialog").eq(i).animate({"left":left+"px"},500);
                }
            }else{//横幅が狭いときは縦に分割
                $("#map1").animate({"width":"100%","height":$(window).height()+"px"},500,function(){map1.updateSize();});
                $("#map2").animate({"width":"100%","height":"10px"},0,function(){
                    map2.updateSize();
                }).hide();
            }
            //同期非同期ボタン
            $("#sync-btn").hide(500);
            $(".dualscreen-btn").text("2画面");
        }
        funcHaikeiTblDivHeight();//common.jsにある関数
    });
    //------------------------------------------------------------------------
    //同期非同期ボタン
    $("#sync-btn").click(function(){
        if($(this).html()=="非同期"){
            var map1Center = map1.getView().getCenter();
            var map1Zoom = map1.getView().getZoom();
            var map2View = map2.getView();
            var view2 = new ol.View({
                center:map1Center,
                zoom:map1Zoom
            });
            map2.setView(view2);
            $(this).html("同期");
        }else{
            var map1View = map1.getView();
            map2.setView(map1View);
            $(this).html("非同期");
        }
    });
});
