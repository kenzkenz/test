var csvI = 0;
$(function(){
    var csvarr = [];
    $("#map1,#map2").on('dragenter',function(e){
        e.stopPropagation();
        e.preventDefault();
    });
    $("#map1,#map2").on('dragover',function(e){
        e.stopPropagation();
        e.preventDefault();
    });
    $("#map1,#map2").on('drop',function(e){
        console.log(3344455);
        var mapObj = funcMaps($(this));
        var mapName = mapObj["name"];
        csvI++;
        e.preventDefault();
        var file = e.originalEvent.dataTransfer.files[0];
        console.log(file);
        var file_reader = new FileReader();
        file_reader.readAsBinaryString(file);//ここ超重要。文字コード変換のために必要
        file_reader.onload = function(e) {
            //console.log(file_reader.result);
            var result = e.target.result;
            var sjisArray = str2Array(result);
            var uniArray = Encoding.convert(sjisArray, 'UNICODE', 'SJIS');
            var result = Encoding.codeToString(uniArray);
            //console.log(result); //csvデータ(string)
            // 選択したCSVファイルから２次元配列を生成
            var rows = result.split("\n");
            var max = 0;
            rangemin = 9999999999;
            $(rows).each(function () {
                var split = this.replace("\r", "").split(/,|\t/);//\rが余計についてしまうので取った上でsplit
                csvarr.push(split);
            });
            console.log(csvarr);
            //console.log(csvI.toString().substr(0,1))

            for (var i=0; i < csvarr.length-1; i++) {
                if(i==0) {
                    for (var j = 0; j < csvarr[0].length; j++) {
                        if (csvarr[0][j] == "経度") var lon = j;
                        if (csvarr[0][j] == "緯度") var lat = j;
                        if (csvarr[0][j] == "lon") var lon = j;
                        if (csvarr[0][j] == "lat") var lat = j;
                        if (csvarr[0][j] == "百分率") var hyaku = j;
                        if (csvarr[0][j] == "area") {
                            var area = j;
                            layerTypeFlg = "area";
                        }
                        if (csvarr[0][j] == "市町村コード") var code = j;
                    }
                    console.log(code)
                    console.log(csvarr[0][1]);
                }

            }
        }

    });
});