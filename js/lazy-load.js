const lazyImages = document.querySelectorAll(`img[data-srcset], img[data-src], source[data-srcset]`);
const lazyMap = document.querySelector(`._preload-section`);
const windowHeight = document.documentElement.clientHeight;


let lazyImagesPosition = [];
if (lazyImages.length > 0) {
  lazyImages.forEach(img => {
    if (img.dataset.src || img.dataset.src) {
      lazyImagesPosition.push(img.getBoundingClientRect().top + pageYOffset - 100);
      lazyScrollCheck();
    }
  });
}

window.addEventListener(`scroll`, lazyScroll);

function lazyScroll () {
  if (document.querySelectorAll(`img[data-srcsrc], img[data-src], source[data-srcset]`).length > 0) {
    lazyScrollCheck();

  }
  if (lazyMap.classList.contains(`_preload-section`)) {
    lazyMapCheck();
  }
}

function lazyScrollCheck () {
  let imgIndex = lazyImagesPosition.findIndex(
    item => pageYOffset > item - windowHeight
  );
  if (imgIndex >= 0) {
    if (lazyImages[imgIndex].dataset.src) {
      lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
      lazyImages[imgIndex].removeAttribute(`data-src`);
      lazyImages[imgIndex].classList.remove(`_preloading`);
    } else if (lazyImages[imgIndex].dataset.srcset) {
      lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcset;
      lazyImages[imgIndex].removeAttribute(`data-srcset`);
      lazyImages[imgIndex].classList.remove(`_preloading`);
    } else if (lazyImages[imgIndex].dataset.srcset) {
      lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcset;
      lazyImages[imgIndex].removeAttribute(`data-srcset`);
      // lazyImages[imgIndex].classList.remove(`_preloading`);
    }

    delete lazyImagesPosition[imgIndex];
  }
}

function lazyMapCheck () {
  const lazyMapPos = lazyMap.getBoundingClientRect().top + pageYOffset - 200;
  if (pageYOffset > lazyMapPos - windowHeight) {
    lazyMap.innerHTML = `<div id="map"></div>`;
    lazyMap.classList.remove(`_preload-section`);
    mapInit();
  }
}


function mapInit () {
  ymaps.ready(init);
  function init() {
    var myMap = new ymaps.Map("map", {
        center: [54.193616, 45.160650],
        zoom: 17
      }, {
        searchControlProvider: 'yandex#search'
      }),
      myPlacemark = new ymaps.Placemark([54.193616, 45.160650], {
        // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
        balloonContentHeader: "#ГРИЛЛЬ экспресс",
        balloonContentBody: "улица Титова, 10с1",
        balloonContentFooter: "Мы здесь",
        hintContent: "Посмотреть адресс",
        size: 800,
      });
    myMap.geoObjects.add(myPlacemark);
  }
}