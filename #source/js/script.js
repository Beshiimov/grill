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


ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
          center: [54.187088, 45.183903],
          zoom: 14
      }, {
          searchControlProvider: 'yandex#search'
      }),

      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #000; font-weight: bold;">$[properties.iconContent]</div>'
      ),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: 'map-icon',
          balloonContent: ''
      }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#image',
          // Своё изображение иконки метки.
          iconImageHref: 'images/icon/map-icon.svg',
          // Размеры метки.
          iconImageSize: [30, 42],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-5, -38]
      });

  myMap.geoObjects
      .add(myPlacemark)
});