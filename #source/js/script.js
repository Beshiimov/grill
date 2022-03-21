const swiper = new Swiper('.swiper', {
  speed: 2000,
  spaceBetween: 15,
  // loopFillGroupWithBlank: true,
  slidesPerView: "auto",
  longSwipesMs: 300,
  touchRatio: 0.5,
  autoHeight: true,
  // loop: true,
  // centeredSlides: true,
  // autoplay: {
  //   delay: 5000,
  //   pauseOnMouseEnter: true,
  // },
});

function scrollBlock () {
  const body = document.querySelector(`body`);
  body.classList.toggle(`_scroll-block`);
};


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
  // scrollBlock();
  basketWindow.classList.toggle(`_active`);
});


(function () {
  const cartDOMElement = document.querySelector(`.basket-products`)
  const cart = {};

  const renderCartItem = (data) => {
    const cartItemDOMElement = document.createElement(`div`);
    const cartItemTemplate = `
      <div class="product">
        <div class="product__img">
            <img src="img/cold-snacks/cold-snacks-3.jpg" alt="фото товара">
        </div>
        <div class="product__body">
            <div class="snacks__title product__title">
                ПИЦЦА ДВОЙНАЯ ПЕППЕРОНИ
            </div>
            <p class="product__about">
                Кальмары, мидии, креветки, сыр маасдам, 
                красный лук, микс оливок, базилик, соус песто
            </p>
        </div>
        <div class="product-edit">
            <button class="minus">-</button>
            <div class="quantity">
                1
            </div>
            <button class="plus">+</button>
        </div>
        <div class="product-price">
            <div class="snacks__price">162</div>
            <button class="product-delete">X</button>
        </div>
      </div>
    `;
    cartItemDOMElement.innerHTML = cartItemTemplate;

    cartDOMElement.appendChild(cartItemDOMElement);
  };

  const addCartItem = (data) => {
    const {
      productName
    } = data;
    cart[productName] = data;
    renderCartItem(data);
  };

  const getProductData = (product) => {
    const productName = product.querySelector(`.snacks__title`).textContent;
    const productPrice = +product.querySelector(`.snacks__price`).textContent;
    const src = product.querySelector('img').getAttribute('src');
    const quantity = 1;
    return {
      productName,
      productPrice,
      src,
      quantity
    };
  };

  const cartInit = () => {
    addEventListener(`click`, e => {
      const target = e.target;

      if (target.classList.contains(`basketDefault`)) {
        e.preventDefault();
        const product = target.closest(`.snacks`);
        const data = getProductData(product);
        addCartItem(data);
      };
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
      size: 400,
    });
  myMap.geoObjects.add(myPlacemark);

  };


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