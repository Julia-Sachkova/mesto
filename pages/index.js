
let ProfileEditBtn = document.querySelector('.profile__edit-button');
let CloseBtn = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let popupOpened = 'popup_opened';
let submitBtn = document.querySelector('.popup__submit-button');

ProfileEditBtn.addEventListener('click', function () {
    popup.classList.add(popupOpened);
});

CloseBtn.addEventListener('click', function () {
    popup.classList.remove(popupOpened);
});

submitBtn.addEventListener('click', function () {
    popup.classList.remove(popupOpened);
});


let formElement = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__text_type_name');
let jobInput = popup.querySelector('.popup__text_type_about');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

nameInput.value = profileName.textContent;
jobInput.value = profileAbout.textContent;

function formSubmitHandler(evt) {
    evt.preventDefault();

    if (nameInput.value.trim() !== "") {
        profileName.textContent = nameInput.value;
    }

    if (jobInput.value.trim() !== "") {
        profileAbout.textContent = jobInput.value;
    }
}

formElement.addEventListener('submit', formSubmitHandler);


