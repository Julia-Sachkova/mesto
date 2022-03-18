import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../components/cards.js';
import { validationObj } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const profileEditBtn = document.querySelector('.profile__edit-button');
const profileForm = document.querySelector('.popup__form-profile');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const cards = '.cards';
const addBtn = document.querySelector('.profile__add-button');
const popupEditProfile = '.popup_edit-profile';
const popupAddCard = '.popup_add-card';
const cardForm = document.querySelector('.popup__form-card');
const popupPhoto = '.popup_photo-zoom';
const card = '#card-template';

const popupProfileValidator = new FormValidator(validationObj, profileForm);
popupProfileValidator.enableValidation();

const popupCardValidator = new FormValidator(validationObj, cardForm);
popupCardValidator.enableValidation();

const popupPhotoZoom = new PopupWithImage(popupPhoto);
popupPhotoZoom.setEventListeners();

const userInfo = new UserInfo({
    userName: profileName,
    userAbout: profileAbout
});

function handleProfileSubmit() {
    const profileInputs = popupProfile.returnInputs();
    userInfo.setUserInfo(profileInputs);

    popupProfile.close();
}

const popupProfile = new PopupWithForm(popupEditProfile, () => {
    handleProfileSubmit();
});
popupProfile.setEventListeners();

function handleCardSubmit() {
    const cardInputs = popupCard.returnInputs();

    const cardItem = {
        name: cardInputs.cardname,
        link: cardInputs.cardlink
    }

    cardsList.addItem(createCard(cardItem));

    popupCardValidator.resetValidation();

    popupCard.close();
}

const popupCard = new PopupWithForm(popupAddCard, () => {
    handleCardSubmit();
});
popupCard.setEventListeners();

const handleOpenProfilePopup = () => {
    const userData = userInfo.getUserInfo();

    nameInput.value = userData.username;
    jobInput.value = userData.userabout;

    popupProfile.open();

    popupProfileValidator.resetValidation();
}

const createCard = (item) => {
    const cardSelector = new Card({
        cardItem: item,
        handleCardClick: () => {
            popupPhotoZoom.open(item);
        }
    }, card);
    const cardElement = cardSelector.generateCard();

    return cardElement;
}

const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        cardsList.addItem(createCard(item));
    }
}, cards);

cardsList.renderItems();

profileEditBtn.addEventListener('click', handleOpenProfilePopup);

addBtn.addEventListener('click', function () {
    popupCard.open();
    popupCardValidator.resetValidation();
});