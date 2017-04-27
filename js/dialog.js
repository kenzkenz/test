$(function(){
	//ダイアログをクリックしたときにそのダイアログを最前面にする。
	$("body").on("click",".dialog_base",function(){
		dialogbaseMaxzindex($(this))
	});
	//--------------------------------------------------------------------------
	//ダイアログを閉じる
	$("body").on("click",".myDialog .dialog_hidden",function(){
		$(this).parents(".dialog_base").hide(500);
	});
	//--------------------------------------------------------------------------
	//ダイアログを最小化する。
	$("body").on("click",".myDialog .dialog_minmax",function(){
		var thisErement = $(this);
		var targetErement = $(this).parents(".dialog_base").find(".minimize");
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
	$(".dialog_base").each(function(){
		if(maxzindex < $(this).zIndex()){
			maxzindex = $(this).zIndex();
		};
	});
	dialog.zIndex(maxzindex+1);
};
//------------------------------------------------------------------------------
//ダイアログ生成
function myDialog(options){
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
		$(".dialog_base:visible").each(function(){
			if(left==$(this).css("left")){
				left = (Number(left.replace(/px/gi,"")) + 0) + "px";
				top = (Number(top.replace(/px/gi,"")) + 0) + "px";
			};
		});
	}else{
		$(".dialog_base:not('.haikeiDialog'):visible").each(function(){
			if(right==$(this).css("right")){
				right = (Number(right.replace(/px/gi,"")) + 20) + "px";
				top = (Number(top.replace(/px/gi,"")) + 20) + "px";
			};
		});
	};
	if($("#myDialog_" + id).length!=0){
		var dialog = $("#myDialog_" + id);
		dialog.show();
		return;
	};
	var htmlStr = "";
	htmlStr += '<div id="myDialog_' + id + '" class="dialog_base myDialog">';
	htmlStr += 	'<div class="dialog_header">';
	htmlStr += 		'<p>' + title + '</p>';
	htmlStr += 		headerMenu?headerMenu:"";
	htmlStr += 		'<span class="dialog_hidden">×</span>';
	htmlStr += 	'</div>';
	htmlStr += 	'<div class="dialog_content">' + content + '</div>';
	htmlStr += '</div>';
	$("#" + map).append(htmlStr)
	var dialog = $("#myDialog_" + id);
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
		handle:".dialog_header",
		stop:function(){
				$(this).css("height","");
				$(this).css("width","");
			}
	});
	var maxzindex = 0;
	$(".dialog_base").each(function(){
		if(maxzindex < $(this).zIndex()){
			maxzindex = $(this).zIndex();
		};
	});
	dialogbaseMaxzindex(dialog);
	dialog.show();
};
