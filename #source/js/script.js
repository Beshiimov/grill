const swiper = new Swiper('.swiper', {
  speed: 1000,
  spaceBetween: 15,
  // loop: true,
  // loopFillGroupWithBlank: true,
  slidesPerView: "auto",
  longSwipesMs: 300,
  touchRatio: 0.5,
  autoHeight: true,
  centeredSlides: true,
  // autoplay: {
  //   delay: 5000,
  //   pauseOnMouseEnter: true,
  // },
});

function scrollBlock () {
  const body = document.querySelector(`body`);
  body.classList.toggle(`_scroll-block`);
}


const hamburger = document.querySelector(`.hamb`);
const popup = document.querySelector(`.popup`);
const menu = document.querySelector(`.menu`);

hamburger.addEventListener(`click`, () => {
  popup.classList.toggle(`_active`);
  hamburger.classList.toggle(`_active`);
  if (menu.textContent == `МЕНЮ`) {
    menu.textContent = `ЗАКРЫТЬ`;
  } else {
    menu.textContent = `МЕНЮ`;
  }
  scrollBlock();
});

const scrollUp = document.querySelectorAll(`.scroll-up`);

scrollUp.forEach(item => {
  item.addEventListener(`click`, () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});


const basketButton = document.querySelector(`.basket-button`);

basketButton.addEventListener(`click`, () => {
  const basketWindow = document.querySelector(`.basket`);
  basketWindow.classList.toggle(`_active`);
  scrollBlock();
});



(function () {
  const cartDOMElement = document.querySelector(`.basket-products`);
  const basketWindow = document.querySelector(`.basket`)
  const totalPriceDOMElement = basketWindow.querySelector(`.total__title`);
  const cartItemsCounterDOMElement = document.querySelector(`.basket-quantity`);
  const cartItemsCounterDOMElementWindow = document.querySelector(`.total-quantity-products`);

  const cart = JSON.parse(localStorage.getItem(`cart`)) || {};

  const renderCartItem = ({ productName, productPrice, productAbout, src, quantity }) => {
    const cartItemDOMElement = document.createElement(`div`);

    const cartItemTemplate = `
      <div class="product__img">
          <img src="${src}" alt="фото товара">
      </div>
      <div class="product__body">
          <div class="snacks__title product__title">
              ${productName}
          </div>
          <p class="product__about">
              ${productAbout}
          </p>
      </div>
      <div class="product-edit">
          <button class="minus">-</button>
          <div class="quantity">
              ${quantity}
          </div>
          <button class="plus">+</button>
      </div>
      <div class="product-price">
          <div class="snacks__price">
          ${productPrice * quantity}
          </div>
          <button class="product-delete">X</button>
      </div>
    `;

    cartItemDOMElement.innerHTML = cartItemTemplate;
    cartItemDOMElement.classList.add(`product`);
    cartItemDOMElement.classList.add(`${productName}`);
    cartDOMElement.appendChild(cartItemDOMElement);
  };


  const saveCart = () => {
    localStorage.setItem(`cart`, JSON.stringify(cart));
  };

  const updateCartTotalPrice = () => {
    const totalPrice = Object.keys(cart).reduce((acc, id) => {
      const { quantity,productPrice } = cart[id];
      return acc + productPrice * quantity;
    }, 0);


    if (totalPriceDOMElement) {
      totalPriceDOMElement.textContent = totalPrice;
      }
    minShippingPrice(totalPrice);
  };

  const minShippingPrice = (totalPrice) => {
    const totalEnough = basketWindow.querySelector(`.totalEnough`);
    const notEnoughPriceDOMElement = basketWindow.querySelector(`.total__need4free`);
    const notEnoughPriceDOMElementRubles = basketWindow.querySelector(`.total__need4free-rubles`);
    const minShippingDOMElement = basketWindow.querySelector(`.total__min`);
    let newQuantityNotEnough = 750;

    if (newQuantityNotEnough > 0){
      newQuantityNotEnough = minShippingDOMElement.textContent - totalPrice;
      notEnoughPriceDOMElement.textContent = newQuantityNotEnough;
      totalEnough.textContent = `До бесплатной доставки не хватет:`;
      notEnoughPriceDOMElement.style.display = "inline-block";
      notEnoughPriceDOMElementRubles.style.display = "inline-block";
    }
    if (newQuantityNotEnough <= 0) {
      totalEnough.textContent = `У вас доставка будет бесплатной`;
      notEnoughPriceDOMElement.style.display = "none";
      notEnoughPriceDOMElementRubles.style.display = "none";
    }
  }

  const updateCartTotalItemsCounter = () => {
    const totalQuantity = Object.keys(cart).reduce((acc, id) => {
      const { quantity } = cart[id];
      return acc + quantity;
    }, 0);

    if (cartItemsCounterDOMElement) {
      cartItemsCounterDOMElement.textContent = totalQuantity;
      cartItemsCounterDOMElementWindow.textContent = totalQuantity;
    }
  };

  const updateCart = () => {
    updateCartTotalPrice();
    updateCartTotalItemsCounter();
    saveCart();
  };

  const productDelete = (id, cartItemDOMElement) => {
    delete cart[id];
    cartItemDOMElement.parentNode.removeChild(cartItemDOMElement);

    updateCart();
  };


  const addCartItem = (data) => {
    const { productName } = data;

    if (cart[productName]) {
      plusQuantity(productName);
      return;
    }

    cart[productName] = data;
    renderCartItem(data);
    updateCart();
  };

  const updateQuantity = (id, quantity) => {
    const cartItemDOMElement = cartDOMElement.querySelector(`.${id}`);
    const cartItemQuantityDOMElement = cartItemDOMElement.querySelector(`.quantity`);
    const cartItemPriceDOMElement = cartItemDOMElement.querySelector(`.snacks__price`);


    cart[id].quantity = quantity;
    cartItemQuantityDOMElement.textContent = quantity;
    cartItemPriceDOMElement.textContent = quantity * cart[id].productPrice;

    updateCart();
  };

  //46.30
  const plusQuantity = (id) => {
    const newQuantity = cart[id].quantity + 1;
    updateQuantity(id, newQuantity);
  };

  const minusQuantity = (id) => {
    if (cart[id].quantity >= 1) {
      const newQuantity = cart[id].quantity - 1;
      updateQuantity(id, newQuantity);
    }
    if (cart[id].quantity === 0) {
      const cartItemDOMElement = cartDOMElement.querySelector(`.${id}`);
      productDelete(id, cartItemDOMElement);
      updateCart();
    }
  };

  const getProductData = (product) => {
    const productName = product.querySelector(`.snacks__title`).textContent;
    const productAbout = product.querySelector(`.snacks__about`).textContent;
    const productPrice = +product.querySelector(`.snacks__price`).textContent;
    const src = product.querySelector('img').getAttribute('src');
    const quantity = 1;
    return {
      productName,
      productPrice,
      productAbout,
      src,
      quantity
    }
  };

  const renderCart = () => {
    const ids = Object.keys(cart);
    ids.forEach((id) => renderCartItem(cart[id]));
  };


  const cartInit = () => {
    renderCart();
    updateCart();

    addEventListener(`click`, e => {
      const target = e.target;
      
      if (target.classList.contains(`basketDefault`)) {
        e.preventDefault();
        const product = target.closest(`.snacks`);
        const data = getProductData(product);
        addCartItem(data);
      }

      if (target.classList.contains(`product-delete`)) {
        e.preventDefault();
        const cartItemDOMElement = target.closest(`.product`);
        const productID = cartItemDOMElement.querySelector(`.product__title`).textContent.trim();
        productDelete(productID, cartItemDOMElement);
      }

      if (target.classList.contains(`plus`)) {
        e.preventDefault();
        const cartItemDOMElement = target.closest(`.product`);
        const productID = cartItemDOMElement.querySelector(`.product__title`).textContent.trim();
        plusQuantity(productID);
      }

      if (target.classList.contains(`minus`)) {
        e.preventDefault();
        const cartItemDOMElement = target.closest(`.product`);
        const productID = cartItemDOMElement.querySelector(`.product__title`).textContent.trim();
        minusQuantity(productID);
      }
    })
  };

  cartInit();

})();




  //
  // //вывод запросов
  // var suggestView1 = new ymaps.SuggestView('suggest');
  // var arr = [
  //   "Саранск, улица"
  // ];
  //
  // var find = function (arr, find) {
  //   return arr.filter(function (value) {
  //     return (value + "").toLowerCase().indexOf(find.toLowerCase()) != -1;
  //   });
  // };
  // var myProvider = {
  //   suggest: function (request, options) {
  //     var res = find(arr, request),
  //       arrayResult = [],
  //       results = Math.min(options.results, res.length);
  //     for (var i = 0; i < results; i++) {
  //       arrayResult.push({
  //         displayName: res[i],
  //         value: res[i]
  //       })
  //     }
  //     return ymaps.vow.resolve(arrayResult);
  //   }
  // }
  // var suggestView = new ymaps.SuggestView('suggest', {
  //   provider: myProvider,
  //   results: 3
  // });
  //
