const swiper = new Swiper('.swiper', {
  speed: 2000,
  spaceBetween: 15,
  // loop: true,
  loopFillGroupWithBlank: true,
  centeredSlides: true,
  slidesPerView: "auto",
  longSwipesMs: 3000,
  touchRatio: 0.5,
  autoHeight: true,
  // autoplay: {
  //   delay: 5000,
  //   pauseOnMouseEnter: true,
  // },
});


const hamburger = document.querySelector(`.hamb`);
const popup = document.querySelector(`.popup`);
const menu = document.querySelector(`.menu`);

hamburger.addEventListener(`click`, hamburgerToggle);

function hamburgerToggle(e) {
  popup.classList.toggle(`_active`);
  hamburger.classList.toggle(`_active`);
  if (menu.textContent == `МЕНЮ`) {
    menu.textContent = `ЗАКРЫТЬ`;
  } else {
    menu.textContent = `МЕНЮ`;
  }
};


ymaps.ready(init);
function init(){
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
  }); myMap.geoObjects.add(myPlacemark);




//вывод запросов
  var suggestView1 = new ymaps.SuggestView('suggest');
  var arr = [
    "Саранск, улица"
  ];
      
  var find = function (arr, find) {
    return arr.filter(function (value) {
      return (value + "").toLowerCase().indexOf(find.toLowerCase()) != -1;
    });
  };
  var myProvider = {
    suggest: function (request, options) {
      var res = find(arr, request),
        arrayResult = [],
        results = Math.min(options.results, res.length);
      for (var i = 0; i < results; i++) {
        arrayResult.push({displayName: res[i], value: res[i]})
      }
      return ymaps.vow.resolve(arrayResult);
    }
  }
  var suggestView = new ymaps.SuggestView('suggest', {provider: myProvider, results: 3});
};


const scrollUp = document.querySelectorAll(`.scroll-up`);

scrollUp.forEach(item => {
  item.addEventListener(`click`, () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});



function basketCalc () {
  const basket = document.querySelectorAll(`button.basket__default`);
  let quantity = 0;
  
  basket.forEach(item => {
    item.addEventListener(`click`, () => {
      if (quantity == 0 || ``) {
        const basketMain = item.closest(`.snacks`);
        const minus = basketMain.querySelector(`.minus`);
        const plus = basketMain.querySelector(`.plus`);
        const price = basketMain.querySelector(`.snacks__price`);
        const snacksQuantity = basketMain.querySelector(`.snacks-quantity`);


        snacksQuantity.classList.add(`_active`);
        price.classList.add(`_active`);
        item.style.display = `none`;
        minus.style.display = `block`;
        plus.style.display = `block`;
      } else if (quantity > 0) {
        
      }
      // else item.style.display = `inline-block`;
    });
  });
};

basketCalc();