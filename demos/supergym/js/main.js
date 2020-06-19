'use strict';
var videoPreview = document.querySelector('.gym__video img');
// eslint-disable-next-line
var mySwiper = new Swiper ('.swiper1', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-prev1',
    prevEl: '.swiper-button-next1',
  },
});

var myTreners = {};

window.addEventListener('resize', function () {

  if (document.documentElement.clientWidth < 768 && myTreners.slidesPerView !== 1) {
    videoPreview.src = 'img/video-preview-mobile@1x.jpg';
    myTreners.destroy();
    // eslint-disable-next-line
    myTreners = new Swiper ('.swiper2', {
      direction: 'horizontal',
      loop: true,
      slidesPerView: 1,
      spaceBetween: 0,
      slidesPerGroup: 1,
      loopFillGroupWithBlank: true,
      navigation: {
        nextEl: '.swiper-button-prev2',
        prevEl: '.swiper-button-next2',
      },
    });

  } else if (document.documentElement.clientWidth > 767 && document.body.clientWidth < 1200 && myTreners.slidesPerView !== 2) {
    videoPreview.src = 'img/video-preview-desktop@1x.jpg';
    myTreners.destroy();
    // eslint-disable-next-line
    myTreners = new Swiper('.swiper2', {
      direction: 'horizontal',
      loop: true,
      slidesPerView: 2,
      spaceBetween: 30,
      slidesPerGroup: 2,
      loopFillGroupWithBlank: true,
      navigation: {
        nextEl: '.swiper-button-prev2',
        prevEl: '.swiper-button-next2',
      },
    });

  } else if (document.documentElement.clientWidth > 1199 && myTreners.slidesPerView !== 4) {
    myTreners.destroy();
    // eslint-disable-next-line
    myTreners = new Swiper('.swiper2', {
      direction: 'horizontal',
      loop: true,
      slidesPerView: 4,
      spaceBetween: 40,
      slidesPerGroup: 4,
      loopFillGroupWithBlank: true,
      navigation: {
        nextEl: '.swiper-button-prev2',
        prevEl: '.swiper-button-next2',
      },
    });
  }
});

if (document.body.clientWidth < 768) {
  videoPreview.src = 'img/video-preview-mobile@1x.jpg';
  // eslint-disable-next-line
  myTreners = new Swiper('.swiper2', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    slidesPerGroup: 1,
    loopFillGroupWithBlank: true,
    navigation: {
      nextEl: '.swiper-button-prev2',
      prevEl: '.swiper-button-next2',
    },
  });

} else if (document.body.clientWidth > 767 && document.body.clientWidth < 1024) {
  // eslint-disable-next-line
  myTreners = new Swiper('.swiper2', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 2,
    spaceBetween: 30,
    slidesPerGroup: 2,
    loopFillGroupWithBlank: true,
    navigation: {
      nextEl: '.swiper-button-prev2',
      prevEl: '.swiper-button-next2',
    },
  });
} else if (document.body.clientWidth > 1023) {
  // eslint-disable-next-line
  myTreners = new Swiper ('.swiper2', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 4,
    spaceBetween: 40,
    slidesPerGroup: 4,
    loopFillGroupWithBlank: true,
    navigation: {
      nextEl: '.swiper-button-prev2',
      prevEl: '.swiper-button-next2',
    },
  });
}

// плавный якорь
// выбираем все ссылки к якорю на странице
var linkNav = document.querySelectorAll('[href^="#anchor-"]');

// скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
var V = 0.5;
for (var p = 0; p < linkNav.length; p++) {
  linkNav[p].addEventListener('click', function (evt) { // по клику на ссылку
    evt.preventDefault();// отменяем стандартное поведение
    var w = window.pageYOffset;// производим прокрутка
    var hash = evt.currentTarget.href.replace(/[^#]*(.*)/, '$1');// к id элемента, к которому нужно перейти
    var t = document.querySelector(hash).getBoundingClientRect().top; // отступ от окна браузера до id
    var start = null;
    requestAnimationFrame(step);// подробнее про функцию анимации [developer.mozilla.org]
    function step(time) {
      if (start === null) {
        start = time;
      }
      var progress = time - start;
      var r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
      window.scrollTo(0, r);
      if (r !== w + t) {
        requestAnimationFrame(step);
      } else {
        location.hash = hash; // URL с хэшем
      }
    }
  }, false);
}

// обработчики формы
var userName = document.querySelector('#username');
var tel = document.querySelector('#phone');
var feedBackForm = document.querySelector('.form__container form');

var isStorageSupport = true;
var storage = {};

try {
  storage.userName = localStorage.getItem('userName');
  storage.tel = localStorage.getItem('tel');
  storage.question = localStorage.getItem('question');
} catch (error) {
  isStorageSupport = false;
}

var fillForm = function () {
  userName.value = storage.userName;
  tel.value = storage.tel;
  mask.updateValue();
};

if (feedBackForm) {
  // eslint-disable-next-line
  var mask = IMask(tel, {
    mask: '+7(000)000-00-00',
  });

  if (isStorageSupport) {
    fillForm();
  }

  feedBackForm.addEventListener('submit', function (evt) {
    if (!userName.value || !tel.value) {
      evt.preventDefault();
    } else if (tel.value.length < 16) {
      evt.preventDefault();
      var exch = tel.value;
      tel.value = 'Вы ввели не полный номер';
      setTimeout(function () {
        tel.value = exch;
      }, 1000);
    } else {
      if (isStorageSupport) {
        localStorage.setItem('userName', userName.value);
        localStorage.setItem('tel', tel.value);
      }
    }
  });
}

// абонементы
var passBtns = document.querySelectorAll('.pass__btn');
passBtns[0].classList.add('pass__btn--active');
var durationPass = document.querySelector('.pass__duration');
durationPass.addEventListener('click', function (evt) {
  passBtns = document.querySelectorAll('.pass__btn');
  if (evt.target.tagName !== 'BUTTON') {
    return;
  }
  for (var i = 0; i < passBtns.length; i++) {
    passBtns[i].classList.remove('pass__btn--active');
  }
  evt.target.classList.add('pass__btn--active');
});
