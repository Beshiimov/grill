/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
var swiper = new Swiper('.swiper', {
  speed: 2000,
  spaceBetween: 15,
  // loopFillGroupWithBlank: true,
  slidesPerView: "auto",
  longSwipesMs: 300,
  touchRatio: 0.5,
  autoHeight: true,
  loop: true,
  centeredSlides: true // autoplay: {
  //   delay: 5000,
  //   pauseOnMouseEnter: true,
  // },

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
}

;
ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map("map", {
    center: [54.193686, 45.161103],
    zoom: 17
  }, {
    searchControlProvider: 'yandex#search'
  }),
      myPlacemark = new ymaps.Placemark([54.193686, 45.161103], {
    // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
    balloonContentHeader: "#ГРИЛЛЬ экспресс",
    balloonContentBody: "улица Титова, 10с1",
    balloonContentFooter: "Мы здесь",
    hintContent: "Посмотреть адресс",
    size: 400
  });
  myMap.geoObjects.add(myPlacemark); //вывод запросов

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
  });
}

;
var scrollUp = document.querySelectorAll(".scroll-up");
scrollUp.forEach(function (item) {
  item.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});

function basketCalc() {
  var basket = document.querySelectorAll("button.basket__default");
  basket.forEach(function (item) {
    var quantity = 1;
    var basketMain = item.closest(".snacks");
    var basketCenter = basketMain.querySelector(".basket__default");
    var minus = basketMain.querySelector(".minus");
    var plus = basketMain.querySelector(".plus");
    var price = basketMain.querySelector(".snacks__price");
    var snacksQuantity = basketMain.querySelector(".snacks-quantity");
    item.addEventListener("click", function () {
      priceNew = price.textContent;
      price.classList.add("_active");
      basketCenter.style.display = "none";
      minus.style.display = "block";
      plus.style.display = "block";
      snacksQuantity.style.display = "inline-block";
      snacksQuantity.classList.add("_active");
      snacksQuantity.textContent = quantity;
    });
    plus.addEventListener("click", function () {
      ++quantity;
      snacksQuantity.textContent = quantity;
      price.textContent = priceNew * quantity;
    });
    minus.addEventListener("click", function () {
      if (quantity > 1) {
        --quantity;
        snacksQuantity.textContent = quantity;
        price.textContent = priceNew * quantity;
      } else if (quantity <= 1) {
        price.classList.remove("_active");
        basketCenter.style.display = "inline-flex";
        minus.style.display = "none";
        plus.style.display = "none";
        snacksQuantity.style.display = "none";
        snacksQuantity.classList.remove("_active");
      }
    });
  });
}

;
basketCalc();
/******/ })()
;