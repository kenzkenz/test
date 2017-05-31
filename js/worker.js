onmessage=function(evt){
	var msg = evt.data;
	var prevMeshcode = msg.prevMeshcode;
	var extentRightTopMeshcode = msg.extentRightTopMeshcode;
	var end2 = msg.extentLeftDown;
	var target = msg.target;
	var lon = 0;
	var lat = 0;
	var lat2 = 999999999999;
	var ii =0;
	var jj = 0;

	var meshcodeAR = [];
	while (prevMeshcode!=extentRightTopMeshcode){
		lon = target[0] + 22.5/3600*ii;
		lat = target[1]
		target2 =[lon,lat];
		prevMeshcode = coord2meshcode(target2)
		while (lat2>end2[1]){
			lat2 = target[1] - 15/3600*jj;
			target2 =[lon,lat2];
			prevMeshcode2 = coord2meshcode(target2)
			meshcodeAR.push(prevMeshcode2)
			jj++;
		}
		jj=0;
		lat2 = 999999999999;
		ii++;
	};
	postMessage(meshcodeAR);
}
//--------------------------------------------------------------------------------------------------
//座標からメッシュコードを作る。
function coord2meshcode(coordinate){
	var target = coordinate;
	//var target = [139.71475,35.7007777]
	//var target = [131.20357990264893,31.664376636720988]
	//console.log(target);
	//------------------------------------------
	//一次メッシュ
	var z11 = Math.floor(target[1]*60/40);
	var z11a = (target[1]*60) % z11;
	var z12 = Math.floor(target[0]-100);
	var z12a = (target[0]-100) % z12;
	//------------------------------------------
	//二次メッシュ
	var z21 = Math.floor(z11a/5);
	//var z21a = z11a % z21;
	var z21a = z11a - (z21*5);
	var z22 = Math.floor(z12a*60/7.5);
	var z22a = (z12a*60) - (z22*7.5);
	//------------------------------------------
	//三次メッシュ
	var z31 = Math.floor(z21a*60/30);
	var z31a =(z21a*60) - (z31*30);
	var z32 = Math.floor(z22a*60/45);
	var z32a =(z22a*60) - (z32*45);
	//------------------------------------------
	//５００メートルメッシュ
	var z41 = Math.floor(z31a/15);
	var z42 = Math.floor(z32a/22.5);
	var z41plus42 = (z41*2) + (z42+1)
	//console.log("500メッシュ" + z41plus42)
	//------------------------------------------
	var meshCodeStr = String(z11) + String(z12) + String(z21) + String(z22) + String(z31) + String(z32) + String(z41plus42);
	//console.log(meshCodeStr)
	return meshCodeStr;
};