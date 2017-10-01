(function(ol) {
  if (!ol && ol.hash) return;

  var encode = function(view) {
    var c = ol.proj.toLonLat(view.getCenter());
    var z = view.getZoom();
    var x = c[0].toFixed(6);
    var y = c[1].toFixed(6);
    return "#" + [z, y, x].join("/");
  };

  var decode = function(hash) {
    var view = null;
    if (hash.match(/^#([0-9]+)\/(.+)\/(.+)$/)) {
      var z = parseInt(RegExp.$1);
      var y = parseFloat(RegExp.$2);
      var x = parseFloat(RegExp.$3);
      if (!isNaN(y) && !isNaN(x)) {
        view = new ol.View({
          center: ol.proj.fromLonLat([x, y]),
          zoom: z
        });
      }
    }
    return view;
  };

  ol.hash = function(map) {
    var updateView = function() {
      if (location.hash === encode(map.getView())) return;
      var changedView = decode(location.hash);
      if (changedView !== null) map.setView(changedView);
    };
    map.on("moveend", function(event) {
      history.replaceState(null, null, encode(map.getView()));
    });
    updateView();
    window.addEventListener("hashchange", updateView);
  };
})(ol);
