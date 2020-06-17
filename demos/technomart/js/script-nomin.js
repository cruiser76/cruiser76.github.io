

var mapLink = document.querySelector(".contacts-button-map");
var mapPopup = document.querySelector(".map");
var mapClose = document.querySelector(".map .form-close");

if (mapLink && mapPopup && mapClose) {
  mapLink.addEventListener("click", function (evt) {
    evt.preventDefault();
    mapPopup.classList.add("modal-show");
  });

  mapClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    mapPopup.classList.remove("modal-show");
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (mapPopup.classList.contains("modal-show")) {
        mapPopup.classList.remove("modal-show");
      }
    }
  });
}


var writeLink = document.querySelector(".write-us-button");
var writePopup = document.querySelector(".write-us");
var writeClose = document.querySelector(".write-us .form-close");

if (writeLink && writePopup && writeClose) {
  var login = writePopup.querySelector("[name='fullname']");
  var email = writePopup.querySelector("[name='email']");
  writeLink.addEventListener("click", function (evt) {
    evt.preventDefault();
    writePopup.classList.add("modal-show");
    
    login.focus();
  });

  writeClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    writePopup.classList.remove("modal-show");
  });
  writePopup.addEventListener("submit", function (evt) {
    if (!login.value || !email.value) {
      evt.preventDefault();
      writePopup.classList.remove("modal-error");
      writePopup.offsetWidth = writePopup.offsetWidth;
      writePopup.classList.add("modal-error");
    } 
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (writePopup.classList.contains("modal-show")) {
        writePopup.remove("modal-show");
        writePopup.classList.remove("modal-error");
      }
    }
  });
}
var buyLink = document.querySelectorAll(".goods-item .buy");
var bookmarksArray = document.querySelectorAll(".goods-item .bookmark")

var popupAppend = document.querySelector(".append-cart");
var closeAppend = document.querySelector(".append-cart .form-close");
var cartLink = document.querySelector(".cart");
var bookmarksLink = document.querySelector(".bookmarks");

if (buyLink && bookmarksArray && popupAppend && closeAppend && cartLink && bookmarksLink) {

  var changeColor = function (element) {
    if (parseInt(element.querySelector("span").innerHTML) > 0) {
      element.style.background = "#ee3643";
    }
  }


  var increaseCount = function (buttonArray, increasesElement) {
    Array.prototype.forEach.call(buttonArray, function (element) {
      element.addEventListener("click", function (evt) {
        evt.preventDefault();
        if (increasesElement.classList.contains("cart")) {
          popupAppend.classList.add("modal-show");
        }

        try {
          increasesElement.querySelector("span").innerHTML = parseInt(increasesElement.querySelector("span").innerHTML, 10) + 1;
        } catch (err) {
          increasesElement.querySelector("span").innerHTML = increasesElement.querySelector("span").innerHTML;
        }
        changeColor(increasesElement);
      });
    });
  }

  increaseCount(buyLink, cartLink);
  increaseCount(bookmarksArray, bookmarksLink);
  changeColor(bookmarksLink);
  changeColor(cartLink);

  closeAppend.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupAppend.classList.remove("modal-show");
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (popupAppend.classList.contains("modal-show")) {
        popupAppend.classList.remove("modal-show");
      }
    }
  });
}
var serviceBtnArray = document.querySelectorAll(".service-item");
var serviceSliderArray = document.querySelectorAll(".slider-item");
var sliderClass;
if (serviceBtnArray && serviceSliderArray) {
  Array.prototype.forEach.call(serviceBtnArray, function (btn) {
    btn.addEventListener("click", function (evt) {
      evt.preventDefault();

      if (!btn.classList.contains("service-active")) {
        btn.classList.add("service-active");

        Array.prototype.forEach.call(serviceBtnArray, function (element) {
          if ((element.classList !== btn.classList) && element.classList.contains("service-active")) {
            element.classList.remove("service-active");
          }
        });

        var currentClass = btn.classList;
        for (var index = 0; index < currentClass.length; index++) {
          if (currentClass[index].indexOf("button") > 0) {
            sliderClass = currentClass[index].slice(0, -7);
          }
        }
      }
      var currentSlider = document.querySelector("." + sliderClass);

      if (!currentSlider.classList.contains("slider-active")) {
        currentSlider.classList.add("slider-active");
      }

      Array.prototype.forEach.call(serviceSliderArray, function (element) {
        if ((element.classList !== currentSlider.classList) && element.classList.contains("slider-active")) {
          element.classList.remove("slider-active");
        }
      });

    });
  });
}
var leftBtnLink = document.querySelector(".left-btn");
var rightBtnLink = document.querySelector(".right-btn");
var drillsLink = document.querySelector(".drills");
var perforatorsLink = document.querySelector(".perforators");
var slidercontrols1 = document.querySelector(".slider-controls-1");
var slidercontrols2 = document.querySelector(".slider-controls-2");

if (drillsLink) {
  var switchSlider = function (btn) {
    btn.addEventListener("click", function (evt) {
      evt.preventDefault();
      if (drillsLink.classList.contains("features-slider-active")) {
        drillsLink.classList.remove("features-slider-active");
        perforatorsLink.classList.add("features-slider-active");
        slidercontrols2.classList.remove("slider-controls-active");
        slidercontrols1.classList.add("slider-controls-active");
      }
      else {
        drillsLink.classList.add("features-slider-active");
        perforatorsLink.classList.remove("features-slider-active");
        slidercontrols2.classList.add("slider-controls-active");
        slidercontrols1.classList.remove("slider-controls-active");
      }
    });
  }
  switchSlider(leftBtnLink);
  switchSlider(rightBtnLink);

  slidercontrols1.addEventListener("click", function (evt) {
    evt.preventDefault();
    if (!slidercontrols1.classList.contains("slider-controls-active")) {
      drillsLink.classList.remove("features-slider-active");
      perforatorsLink.classList.add("features-slider-active");
      slidercontrols2.classList.remove("slider-controls-active");
      slidercontrols1.classList.add("slider-controls-active");
    }
  })
  slidercontrols2.addEventListener("click", function (evt) {
    evt.preventDefault();
    if (!slidercontrols2.classList.contains("slider-controls-active")) {
      drillsLink.classList.add("features-slider-active");
      perforatorsLink.classList.remove("features-slider-active");
      slidercontrols2.classList.add("slider-controls-active");
      slidercontrols1.classList.remove("slider-controls-active");
    }
  });
}