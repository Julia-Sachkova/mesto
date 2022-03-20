import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../utils/cards.js';
import { validationObj } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
    profileEditBtn,
    profileForm,
    nameInput,
    jobInput,
    cards,
    addBtn,
    popupEditProfile,
    popupAddCard,
    cardForm,
    popupPhoto,
    card,
    userSelectors
} from '../utils/constatnts.js';

const popupProfileValidator = new FormValidator(validationObj, profileForm);
popupProfileValidator.enableValidation();

const popupCardValidator = new FormValidator(validationObj, cardForm);
popupCardValidator.enableValidation();

const popupPhotoZoom = new PopupWithImage(popupPhoto);
popupPhotoZoom.setEventListeners();

const userInfo = new UserInfo({ userSelector: userSelectors });

function handleProfileSubmit(inputsData) {
    userInfo.setUserInfo(inputsData);

    popupProfile.close();
}

const popupProfile = new PopupWithForm(popupEditProfile, handleProfileSubmit);
popupProfile.setEventListeners();

function handleCardSubmit(cardData) {
    cardsList.addItem(createCard(cardData));

    popupCardValidator.resetValidation();

    popupCard.close();
}

const popupCard = new PopupWithForm(popupAddCard, handleCardSubmit);
popupCard.setEventListeners();

const handleOpenProfilePopup = () => {
    const { name, about } = userInfo.getUserInfo();

    nameInput.value = name;
    jobInput.value = about;

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
    return cardSelector.generateCard();
}

const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        cardsList.appendItem(createCard(item));
    }
}, cards);

cardsList.renderItems();

profileEditBtn.addEventListener('click', handleOpenProfilePopup);

addBtn.addEventListener('click', function () {
    popupCard.open();
    popupCardValidator.resetValidation();
});