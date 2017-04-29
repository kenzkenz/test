$(function(){
	//ダイアログをクリックしたときにそのダイアログを最前面にする。
	$("body").on("click",".dialog-base",function(){
		dialogbaseMaxzindex($(this))
	});
	//--------------------------------------------------------------------------
	//ダイアログを閉じる
	$("body").on("click",".mydialog .dialog-hidden",function(){
		$(this).parents(".dialog-base").hide(500);
	});
	//--------------------------------------------------------------------------
	//ダイアログを最小化する。
	$("body").on("click",".mydialog .dialog-minmax",function(){
		var thisErement = $(this);
		var targetErement = $(this).parents(".dialog-base").find(".minimize");
		targetErement.toggle(500,function(){
			if(targetErement.css("display")=="none") {
				thisErement.text("□");
			}else{
				thisErement.text("ー");
			}
		});
	});
});
//------------------------------------------------------------------------------
//z-indexを最大に
function dialogbaseMaxzindex(dialog){
	var maxzindex = 0;
	$(".dialog-base").each(function(){
		if(maxzindex < $(this).zIndex()){
			maxzindex = $(this).zIndex();
		};
	});
	dialog.zIndex(maxzindex+1);
};
//------------------------------------------------------------------------------
//ダイアログ生成
function mydialog(options){
	var opts = $.extend({},options);
	var id = opts.id;
	var map = opts.map;
	var title = opts.title;
	var headerMenu = opts.headerMenu;
	var content = opts.content;
	var top = opts.top;
	var left = opts.left;
	var right = opts.right;
	if(!right){
		$(".dialog-base:visible").each(function(){
			if(left==$(this).css("left")){
				left = (Number(left.replace(/px/gi,"")) + 0) + "px";
				top = (Number(top.replace(/px/gi,"")) + 0) + "px";
			};
		});
	}else{
		$(".dialog-base:not('.haikeiDialog'):visible").each(function(){
			if(right==$(this).css("right")){
				right = (Number(right.replace(/px/gi,"")) + 20) + "px";
				top = (Number(top.replace(/px/gi,"")) + 20) + "px";
			};
		});
	};
	if($("#mydialog-" + id).length!=0){
		var dialog = $("#mydialog-" + id);
		dialog.show();
		return;
	};
	var htmlStr = "";
	htmlStr += '<div id="mydialog-' + id + '" class="dialog-base mydialog">';
	htmlStr += 	'<div class="dialog-header">';
	htmlStr += 		'<p>' + title + '</p>';
	htmlStr += 		headerMenu?headerMenu:"";
	htmlStr += 		'<span class="dialog-hidden">×</span>';
	htmlStr += 	'</div>';
	htmlStr += 	'<div class="dialog-content">' + content + '</div>';
	htmlStr += '</div>';
	$("#" + map).append(htmlStr)
	var dialog = $("#mydialog-" + id);
	if(!right){
		dialog.css({
			top:top,
			left:left
		});
	}else{
		dialog.css({
			top:top,
			right:right
		});
	};
	dialog.draggable({
		handle:".dialog-header",
		stop:function(){
				$(this).css("height","");
				$(this).css("width","");
			}
	});
	var maxzindex = 0;
	$(".dialog-base").each(function(){
		if(maxzindex < $(this).zIndex()){
			maxzindex = $(this).zIndex();
		};
	});
	dialogbaseMaxzindex(dialog);
	dialog.show();
};