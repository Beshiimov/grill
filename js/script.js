"use strict";

var swiper = new Swiper('.swiper', {
  speed: 2000,
  spaceBetween: 15,
  loop: true,
  loopFillGroupWithBlank: true,
  centeredSlides: true,
  slidesPerView: "auto",
  longSwipesMs: 3000,
  touchRatio: 0.5,
  autoHeight: true,
  autoplay: {
    delay: 5000,
    pauseOnMouseEnter: true
  }
});
var hamburger = document.querySelector(".hamb");
var popup = document.querySelector(".popup");
var menu = document.querySelector(".menu");
hamburger.addEventListener("click", hamburgerToggle);

function hamburgerToggle(e) {
  popup.classList.toggle("_active");
  hamburger.classList.toggle("_active");

  if (menu.textContent == "\u041C\u0415\u041D\u042E") {
    menu.textContent = "\u0417\u0410\u041A\u0420\u042B\u0422\u042C";
  } else {
    menu.textContent = "\u041C\u0415\u041D\u042E";
  }
} // Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.


ymaps.ready(init);

function init() {
  var suggestView1 = new ymaps.SuggestView('suggest');
  var arr = ["Саранск, улица"];

  var find = function find(arr, _find) {
    return arr.filter(function (value) {
      return (value + "").toLowerCase().indexOf(_find.toLowerCase()) != -1;
    });
  };

  var myProvider = {
    suggest: function suggest(request, options) {
      var res = find(arr, request),
          arrayResult = [],
          results = Math.min(options.results, res.length);

      for (var i = 0; i < results; i++) {
        arrayResult.push({
          displayName: res[i],
          value: res[i]
        });
      }

      return ymaps.vow.resolve(arrayResult);
    }
  };
  var suggestView = new ymaps.SuggestView('suggest', {
    provider: myProvider,
    results: 3
  }); // Создание карты.

  var myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [55.76, 37.64],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 7
  });
}