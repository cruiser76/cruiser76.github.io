'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var feedbackBtn = document.querySelector('.header__feedback-item--btn');
  var modalForm = document.querySelector('.modal');
  var closeBtn = document.querySelector('.modal__close button');
  var footerAddresses = document.querySelectorAll('.footer__address-item');
  var footerAddressBtn = document.querySelector('.footer__address-btn');
  var footerNavigationBtn = document.querySelector('.footer__navigation-btn');
  var navList = document.querySelector('.footer__navigation-list');
  var body = document.querySelector('body');
  var overlay = document.querySelector('.overlay');
  var feedbackTel = document.querySelector('.feedback__contacts [name=phone]');

  var isStorageSupport = true;
  var storage = {};

  try {
    storage.userName = localStorage.getItem('userName');
    storage.tel = localStorage.getItem('tel');
    storage.question = localStorage.getItem('question');
  } catch (error) {
    isStorageSupport = false;
  }

  var closeModal = function () {
    modalForm.classList.add('modal--hidden');
    document.removeEventListener('keydown', onEscKeyDown);
    overlay.removeEventListener('click', onOverlayclick);
    closeBtn.removeEventListener('click', onCloseBtnClick);
    body.classList.remove('lock');
    overlay.classList.remove('shim');
  };

  var onCloseBtnClick = function (evt) {
    closeModal();
    evt.preventDefault();
  };

  var onEscKeyDown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeModal();
    }
  };

  var onOverlayclick = function (evt) {
    if (evt.target !== overlay) {
      return;
    }
    closeModal();
  };

  if (feedbackTel) {
    IMask(feedbackTel, {
      mask: '+{0}(000)000-00-00',
    });
  }

  if (feedbackBtn && modalForm) {
    var userName = modalForm.querySelector('[name=modal-username]');
    var tel = modalForm.querySelector('[name=modal-phone]');
    var question = modalForm.querySelector('[name=modal-question]');

    IMask(tel, {
      mask: '+{0}(000)000-00-00',
    });
    feedbackBtn.addEventListener('click', function (evt) {
      evt.preventDefault();
      modalForm.classList.remove('modal--hidden');
      body.classList.add('lock');
      overlay.classList.add('shim');
      document.addEventListener('keydown', onEscKeyDown);
      overlay.addEventListener('click', onOverlayclick);
      closeBtn.addEventListener('click', onCloseBtnClick);
      if (isStorageSupport) {
        userName.value = storage.userName;
        tel.value = storage.tel;
        question.value = storage.question ? storage.question : "";
      }
      userName.focus();
    });

    modalForm.addEventListener('submit', function (evt) {
      if (!userName.value || !tel.value || !question.value) {
        evt.preventDefault();
      } else {
        if (isStorageSupport) {
          localStorage.setItem('userName', userName.value);
          localStorage.setItem('tel', tel.value);
          localStorage.setItem('question', question.value);
        }
      }
    });
  }

  if (footerAddresses) {
    footerAddressBtn.classList.remove('footer__address-btn--nojs');
    for (var i = 0; i < footerAddresses.length; ++i) {
      footerAddresses[i].classList.remove('footer__address-item--nojs');
    }

    footerAddressBtn.addEventListener('click', function (evt) {
      evt.preventDefault();
      var imgBtnAdr = footerAddressBtn.querySelectorAll('.footer__address-img');
      for (var j = 0; j < imgBtnAdr.length; ++j) {
        imgBtnAdr[j].classList.toggle('footer__address-img--hidden');
      }
      for (var k = 0; k < footerAddresses.length; ++k) {
        footerAddresses[k].classList.toggle('footer__address-item--hidden');
      }
    });
  }

  if (navList) {
    footerNavigationBtn.classList.remove('footer__navigation-btn--nojs');
    navList.classList.remove('footer__navigation-list--nojs');

    footerNavigationBtn.addEventListener('click', function (evt) {
      evt.preventDefault();
      var imgBtnNav = footerNavigationBtn.querySelectorAll('.footer__navigation-img');
      for (var m = 0; m < imgBtnNav.length; ++m) {
        imgBtnNav[m].classList.toggle('footer__navigation-img--hidden');
      }
      navList.classList.toggle('footer__navigation-list--hidden');
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

})();
