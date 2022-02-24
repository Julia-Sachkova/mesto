import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './cards.js';
import { validationObj } from './FormValidator.js';

const cardNameInput = document.querySelector('.popup__text_type_card-name');
const cardLinkInput = document.querySelector('.popup__text_type_card-link');
const profileEditBtn = document.querySelector('.profile__edit-button');
const popupList = Array.from(document.querySelectorAll('.popup'));
const popupOpened = 'popup_opened';
const formElement = document.querySelector('.popup__form');
const profileForm = document.querySelector('.popup__form-profile');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const cards = document.querySelector('.cards');
const addBtn = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const cardForm = document.querySelector('.popup__form-card');
const popupPhoto = document.querySelector('.popup_photo-zoom');
const popupImg = document.querySelector('.popup__image');
const popupPhotoName = document.querySelector('.popup__photo-name');
const card = '#card-template';

const popupProfileValidator = new FormValidator(validationObj, profileForm);
popupProfileValidator.enableValidation();

const popupCardValidator = new FormValidator(validationObj, cardForm);
popupCardValidator.enableValidation();

initialCards.forEach((cardItem) => {
    cards.append(createCard(cardItem));
});

function createCard(item) {
    const cardSelector = new Card(item, card, handleCardClick);
    const cardElement = cardSelector.generateCard();

    return cardElement;
}

function submitCard(evt) {
    evt.preventDefault();

    const cardItem = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    }

    cards.prepend(createCard(cardItem));

    cardForm.reset();

    popupCardValidator.resetValidation();

    closePopup(popupAddCard);
}

function openPopup(popup) {
    popup.classList.add(popupOpened);
    document.addEventListener('keydown', closeOnEscape);
}

function closePopup(popup) {
    popup.classList.remove(popupOpened);
    document.removeEventListener('keydown', closeOnEscape);
}

function closeOnEscape(evt) {
    if (evt.key === 'Escape') {
        const popupOpen = document.querySelector('.popup_opened');
        closePopup(popupOpen);
    }
}

function handleOpenProfilePopup(evt) {
    evt.preventDefault();

    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;

    openPopup(popupEditProfile);

    popupProfileValidator.resetValidation();
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;

    closePopup(popupEditProfile);
}

popupList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains(popupOpened)) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        }
    });
});

function handleCardClick(name, link) {
    popupImg.src = link;
    popupImg.alt = name;
    popupPhotoName.textContent = name;
    openPopup(popupPhoto);
}

cardForm.addEventListener('submit', submitCard);

profileEditBtn.addEventListener('click', handleOpenProfilePopup);

formElement.addEventListener('submit', handleProfileFormSubmit);

addBtn.addEventListener('click', function () {
    openPopup(popupAddCard);
    popupCardValidator.resetValidation();
});