
let profileEditBtn = document.querySelector('.profile__edit-button');
let closeBtn = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let popupOpened = 'popup_opened';
let submitBtn = document.querySelector('.popup__submit-button');
let formElement = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__text_type_name');
let jobInput = popup.querySelector('.popup__text_type_about');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

function openPopup() {
    popup.classList.add(popupOpened);
}

function closePopup() {
    popup.classList.remove(popupOpened);
}

function formValue() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;

    openPopup();
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;

    profileAbout.textContent = jobInput.value;

    closePopup();
}

profileEditBtn.addEventListener('click', openPopup);

closeBtn.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);