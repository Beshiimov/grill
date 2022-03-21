/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
var swiper = new Swiper('.swiper', {
  speed: 2000,
  spaceBetween: 15,
  // loopFillGroupWithBlank: true,
  slidesPerView: "auto",
  longSwipesMs: 300,
  touchRatio: 0.5,
  autoHeight: true // loop: true,
  // centeredSlides: true,
  // autoplay: {
  //   delay: 5000,
  //   pauseOnMouseEnter: true,
  // },

});

function scrollBlock() {
  var body = document.querySelector("body");
  body.classList.toggle("_scroll-block");
}

;
var hamburger = document.querySelector(".hamb");
var popup = document.querySelector(".popup");
var menu = document.querySelector(".menu");
hamburger.addEventListener("click", function () {
  popup.classList.toggle("_active");
  hamburger.classList.toggle("_active");

  if (menu.textContent == "\u041C\u0415\u041D\u042E") {
    menu.textContent = "\u0417\u0410\u041A\u0420\u042B\u0422\u042C";
  } else {
    menu.textContent = "\u041C\u0415\u041D\u042E";
  }

  scrollBlock();
});
var scrollUp = document.querySelectorAll(".scroll-up");
scrollUp.forEach(function (item) {
  item.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
var basketButton = document.querySelector(".basket-button");
basketButton.addEventListener("click", function () {
  var basketWindow = document.querySelector(".basket"); // scrollBlock();

  basketWindow.classList.toggle("_active");
});

(function () {
  var cartDOMElement = document.querySelector(".basket-products");
  var cart = {};

  var renderCartItem = function renderCartItem(data) {
    var cartItemDOMElement = document.createElement("div");
    var cartItemTemplate = "\n      <div class=\"product\">\n        <div class=\"product__img\">\n            <img src=\"img/cold-snacks/cold-snacks-3.jpg\" alt=\"\u0444\u043E\u0442\u043E \u0442\u043E\u0432\u0430\u0440\u0430\">\n        </div>\n        <div class=\"product__body\">\n            <div class=\"snacks__title product__title\">\n                \u041F\u0418\u0426\u0426\u0410 \u0414\u0412\u041E\u0419\u041D\u0410\u042F \u041F\u0415\u041F\u041F\u0415\u0420\u041E\u041D\u0418\n            </div>\n            <p class=\"product__about\">\n                \u041A\u0430\u043B\u044C\u043C\u0430\u0440\u044B, \u043C\u0438\u0434\u0438\u0438, \u043A\u0440\u0435\u0432\u0435\u0442\u043A\u0438, \u0441\u044B\u0440 \u043C\u0430\u0430\u0441\u0434\u0430\u043C, \n                \u043A\u0440\u0430\u0441\u043D\u044B\u0439 \u043B\u0443\u043A, \u043C\u0438\u043A\u0441 \u043E\u043B\u0438\u0432\u043E\u043A, \u0431\u0430\u0437\u0438\u043B\u0438\u043A, \u0441\u043E\u0443\u0441 \u043F\u0435\u0441\u0442\u043E\n            </p>\n        </div>\n        <div class=\"product-edit\">\n            <button class=\"minus\">-</button>\n            <div class=\"quantity\">\n                1\n            </div>\n            <button class=\"plus\">+</button>\n        </div>\n        <div class=\"product-price\">\n            <div class=\"snacks__price\">162</div>\n            <button class=\"product-delete\">X</button>\n        </div>\n      </div>\n    ";
    cartItemDOMElement.innerHTML = cartItemTemplate;
    cartDOMElement.appendChild(cartItemDOMElement);
  };

  var addCartItem = function addCartItem(data) {
    var productName = data.productName;
    cart[productName] = data;
    renderCartItem(data);
  };

  var getProductData = function getProductData(product) {
    var productName = product.querySelector(".snacks__title").textContent;
    var productPrice = +product.querySelector(".snacks__price").textContent;
    var src = product.querySelector('img').getAttribute('src');
    var quantity = 1;
    return {
      productName: productName,
      productPrice: productPrice,
      src: src,
      quantity: quantity
    };
  };

  var cartInit = function cartInit() {
    addEventListener("click", function (e) {
      var target = e.target;

      if (target.classList.contains("basketDefault")) {
        e.preventDefault();
        var product = target.closest(".snacks");
        var data = getProductData(product);
        addCartItem(data);
      }

      ;
    });
  };

  cartInit();
})();

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
  myMap.geoObjects.add(myPlacemark);
}

; //   //вывод запросов
//   var suggestView1 = new ymaps.SuggestView('suggest');
//   var arr = [
//     "Саранск, улица"
//   ];
//   var find = function (arr, find) {
//     return arr.filter(function (value) {
//       return (value + "").toLowerCase().indexOf(find.toLowerCase()) != -1;
//     });
//   };
//   var myProvider = {
//     suggest: function (request, options) {
//       var res = find(arr, request),
//         arrayResult = [],
//         results = Math.min(options.results, res.length);
//       for (var i = 0; i < results; i++) {
//         arrayResult.push({
//           displayName: res[i],
//           value: res[i]
//         })
//       }
//       return ymaps.vow.resolve(arrayResult);
//     }
//   }
//   var suggestView = new ymaps.SuggestView('suggest', {
//     provider: myProvider,
//     results: 3
//   });
// };
/******/ })()
;
//# sourceMappingURL=script.js.map