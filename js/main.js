'use strict';

const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');

const ESC_KEYCODE = 27;

const closeModal = function () {
  const modal = document.querySelector(`.modal--show`);
  modal.classList.remove('modal--show');
  document.removeEventListener('keydown', onEscKeyDown);
  overlay.removeEventListener('click', onOverlayclick);
  // closeBtn.removeEventListener('click', onCloseBtnClick);
  body.classList.remove('lock');
  overlay.classList.remove('shim');
};

const onEscKeyDown = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeModal();
  }
};

const onOverlayclick = function (evt) {
  if (evt.target !== overlay) {
    return;
  }
  closeModal();
};

const onDemoBtnClick = (evt) => {
  const modal = document.querySelector(`[data-modal="${evt.target.dataset.demos}"]`);
  evt.preventDefault();
  modal.classList.add('modal--show');
  body.classList.add('lock');
  overlay.classList.add('shim');
  document.addEventListener('keydown', onEscKeyDown);
  overlay.addEventListener('click', onOverlayclick);
  // closeBtn.addEventListener('click', onCloseBtnClick);
};


const demoBtns = document.querySelectorAll('.demos__btn');
demoBtns.forEach((btn) => {
  btn.addEventListener('click', onDemoBtnClick);
})
