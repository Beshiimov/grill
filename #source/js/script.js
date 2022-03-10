const swiper = new Swiper('.swiper', {
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
    pauseOnMouseEnter: true,
  }
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
}


// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init(){
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



    // Создание карты.
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
