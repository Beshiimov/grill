/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
var swiper = new Swiper('.swiper', {
  speed: 2000,
  spaceBetween: 15,
  loop: true,
  loopFillGroupWithBlank: true,
  slidesPerView: "auto",
  longSwipesMs: 300,
  touchRatio: 0.5,
  autoHeight: true,
  centeredSlides: true // autoplay: {
  //   delay: 5000,
  //   pauseOnMouseEnter: true,
  // },

});

function scrollBlock() {
  var body = document.querySelector("body");
  body.classList.toggle("_scroll-block");
}

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
  var basketWindow = document.querySelector(".basket");
  basketWindow.classList.toggle("_active");
  scrollBlock();
});

(function () {
  var cartDOMElement = document.querySelector(".basket-products");
  var basketWindow = document.querySelector(".basket");
  var totalPriceDOMElement = basketWindow.querySelector(".total__title");
  var cartItemsCounterDOMElement = document.querySelector(".basket-quantity");
  var cartItemsCounterDOMElementWindow = document.querySelector(".total-quantity-products");
  var cart = JSON.parse(localStorage.getItem("cart")) || {};

  var renderCartItem = function renderCartItem(_ref) {
    var productName = _ref.productName,
        productPrice = _ref.productPrice,
        productAbout = _ref.productAbout,
        src = _ref.src,
        quantity = _ref.quantity;
    var cartItemDOMElement = document.createElement("div");
    var cartItemTemplate = "\n      <div class=\"product__img\">\n          <img src=\"".concat(src, "\" alt=\"\u0444\u043E\u0442\u043E \u0442\u043E\u0432\u0430\u0440\u0430\">\n      </div>\n      <div class=\"product__body\">\n          <div class=\"snacks__title product__title\">\n              ").concat(productName, "\n          </div>\n          <p class=\"product__about\">\n              ").concat(productAbout, "\n          </p>\n      </div>\n      <div class=\"product-edit\">\n          <button class=\"minus\">-</button>\n          <div class=\"quantity\">\n              ").concat(quantity, "\n          </div>\n          <button class=\"plus\">+</button>\n      </div>\n      <div class=\"product-price\">\n          <div class=\"snacks__price\">\n          ").concat(productPrice * quantity, "\n          </div>\n          <button class=\"product-delete\">X</button>\n      </div>\n    ");
    cartItemDOMElement.innerHTML = cartItemTemplate;
    cartItemDOMElement.classList.add("product");
    cartItemDOMElement.classList.add("".concat(productName));
    cartDOMElement.appendChild(cartItemDOMElement);
  };

  var saveCart = function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  var updateCartTotalPrice = function updateCartTotalPrice() {
    var totalPrice = Object.keys(cart).reduce(function (acc, id) {
      var _cart$id = cart[id],
          quantity = _cart$id.quantity,
          productPrice = _cart$id.productPrice;
      return acc + productPrice * quantity;
    }, 0);

    if (totalPriceDOMElement) {
      totalPriceDOMElement.textContent = totalPrice;
    }
  };

  var updateCartTotalItemsCounter = function updateCartTotalItemsCounter() {
    var totalQuantity = Object.keys(cart).reduce(function (acc, id) {
      var quantity = cart[id].quantity;
      return acc + quantity;
    }, 0);

    if (cartItemsCounterDOMElement) {
      cartItemsCounterDOMElement.textContent = totalQuantity;
      cartItemsCounterDOMElementWindow.textContent = totalQuantity;
    }
  };

  var updateCart = function updateCart() {
    updateCartTotalPrice();
    updateCartTotalItemsCounter();
    saveCart();
  };

  var productDelete = function productDelete(id) {
    delete cart[id];
    updateCart();
  };

  var addCartItem = function addCartItem(data) {
    var productName = data.productName;

    if (cart[productName]) {
      plusQuantity(productName);
      return;
    }

    cart[productName] = data;
    renderCartItem(data);
    updateCart();
  };

  var updateQuantity = function updateQuantity(id, quantity) {
    var cartItemDOMElement = cartDOMElement.querySelector(".".concat(id));
    var cartItemQuantityDOMElement = cartItemDOMElement.querySelector(".quantity");
    var cartItemPriceDOMElement = cartItemDOMElement.querySelector(".snacks__price");
    cart[id].quantity = quantity;
    cartItemQuantityDOMElement.textContent = quantity;
    cartItemPriceDOMElement.textContent = quantity * cart[id].productPrice;
    updateCart();
  };

  var minusQuantity = function minusQuantity(id) {
    var newQuantity = cart[id].quantity - 1;

    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  var plusQuantity = function plusQuantity(id) {
    var newQuantity = cart[id].quantity + 1;
    updateQuantity(id, newQuantity);
  };

  var getProductData = function getProductData(product) {
    var productName = product.querySelector(".snacks__title").textContent;
    var productAbout = product.querySelector(".snacks__about").textContent;
    var productPrice = +product.querySelector(".snacks__price").textContent;
    var src = product.querySelector('img').getAttribute('src');
    var quantity = 1;
    return {
      productName: productName,
      productPrice: productPrice,
      productAbout: productAbout,
      src: src,
      quantity: quantity
    };
  };

  var renderCart = function renderCart() {
    var ids = Object.keys(cart);
    ids.forEach(function (id) {
      return renderCartItem(cart[id]);
    });
  };

  var cartInit = function cartInit() {
    renderCart();
    updateCart();
    addEventListener("click", function (e) {
      var target = e.target;

      if (target.classList.contains("basketDefault")) {
        e.preventDefault();
        var product = target.closest(".snacks");
        var data = getProductData(product);
        addCartItem(data);
      }

      if (target.classList.contains("product-delete")) {
        e.preventDefault();
        var cartItemDOMElement = target.closest(".product");
        var productID = cartItemDOMElement.querySelector(".product__title").textContent.trim();
        cartItemDOMElement.parentNode.removeChild(cartItemDOMElement);
        productDelete(productID);
      }

      if (target.classList.contains("plus")) {
        e.preventDefault();

        var _cartItemDOMElement = target.closest(".product");

        var _productID = _cartItemDOMElement.querySelector(".product__title").textContent.trim();

        plusQuantity(_productID);
      }

      if (target.classList.contains("minus")) {
        e.preventDefault();

        var _cartItemDOMElement2 = target.closest(".product");

        var _productID2 = _cartItemDOMElement2.querySelector(".product__title").textContent.trim();

        minusQuantity(_productID2);
      }
    });
  };

  cartInit();
})(); // ymaps.ready(init);
// function init() {
//   var myMap = new ymaps.Map("map", {
//       center: [54.193616, 45.160650],
//       zoom: 17
//     }, {
//       searchControlProvider: 'yandex#search'
//     }),
//     myPlacemark = new ymaps.Placemark([54.193616, 45.160650], {
//       // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
//       balloonContentHeader: "#ГРИЛЛЬ экспресс",
//       balloonContentBody: "улица Титова, 10с1",
//       balloonContentFooter: "Мы здесь",
//       hintContent: "Посмотреть адресс",
//       size: 400,
//     });
//   myMap.geoObjects.add(myPlacemark);
// };
//   //вывод запросов
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