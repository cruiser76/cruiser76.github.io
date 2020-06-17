var modalButton = document.querySelector(".button-search");
var modalForm = document.querySelector(".modal-container");
modalForm.classList.add("modal-container-hidden")
modalButton.addEventListener("click", function (evt) {
        evt.preventDefault();
    });
modalButton.addEventListener("click", function (evt) {
        evt.preventDefault();
        modalForm.classList.toggle("modal-container-hidden");
}); 