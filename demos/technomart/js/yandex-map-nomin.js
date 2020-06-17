ymaps.ready(init);

function init() {
    var center = [59.938631, 30.323055];
    var myMap = new ymaps.Map("map", {
        center: center,
        controls: [],
        zoom: 16 
        // controls: ["smallMapDefaultSet"]
    }, {
        searchControlProvider: "yandex#search"
 
    });

    myMap.behaviors.disable("scrollZoom");
    myMap.geoObjects.removeAll();
    myMap.geoObjects.add(new ymaps.Placemark([59.938631, 30.323055], {
      balloonContent: "<strong>Техномарт, г. Санкт-Петербург, ул. Б. Конюшенная, д. 19/8</strong>",
      iconCaption: "Техномарт"
  }, {
      preset: "islands#dotIcon",
      iconColor: "#ff0000"
  }));
}