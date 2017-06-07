$(function(){
	//起動時
	var idandclass = "start-up";
	var ua = navigator.userAgent;
	var myurl = location.href;
	console.log(myurl);
	$.ajax({
		type:"GET",
		url:"php/log.php",
		data:{
			idandclass:idandclass,
			ua:ua,
			myurl:myurl
		}
	}).done(function(){
	}).fail(function(){
			console.log("ログ失敗!");
	});
	//対象要素クリック時
	//$("body").on("click","a,input,span,button,select,.td,label",function(){
	$("body").on("click","*:not(.maps)",function(){
		var idName = $(this).attr("id");
		var className = $(this).attr("class");
		//console.log(idName + "///" + className)
		var ua = navigator.userAgent;
		var idandclass = idName + "/" + className;
		var myurl = location.href;
		$.ajax({
			type:"GET",
			url:"./php/log.php",
			//dataType:"json",
			data:{
				idandclass:idandclass,
				ua:ua,
				myurl:myurl
			}
		}).done(function(){
		}).fail(function(){
				console.log("ログ失敗!");
		});
	});
});
