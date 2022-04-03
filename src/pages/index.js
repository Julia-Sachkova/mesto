import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { validationObj } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithDelete from '../components/PopupWithDelete';
import {
    profileEditBtn,
    profileForm,
    cards,
    addBtn,
    popupEditProfile,
    popupAddCard,
    cardForm,
    popupPhoto,
    card,
    userSelectors,
    avatarForm,
    popupAvatar,
    avatarEditBtn,
    popupDelete
} from '../utils/constatnts.js';

const popupProfileValidator = new FormValidator(validationObj, profileForm);
popupProfileValidator.enableValidation();

const popupCardValidator = new FormValidator(validationObj, cardForm);
popupCardValidator.enableValidation();

const popupAvatarValidator = new FormValidator(validationObj, avatarForm);
popupAvatarValidator.enableValidation();

const popupPhotoZoom = new PopupWithImage(popupPhoto);
popupPhotoZoom.setEventListeners();

const userInfo = new UserInfo({ userSelector: userSelectors });

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-38',
    headers: {
        authorization: 'ca176a48-de50-4eb0-b4bb-20280a3cbb6f',
        'Content-Type': 'application/json'
    }
});

Promise.all([api.getUserInfoApi(), api.getCards()])
    .then(([userData, cardData]) => {
        userInfo.setAllInfo(userData);
        cardsList.renderItems(cardData);
    })
    .catch((err) => {
        console.log(err);
    });

const handleSubmitProfile = (data) => {
    popupProfile.renderLoading(true);
    api.editUserInfo(data)
        .then((userData) => {
            userInfo.setAllInfo(userData);
            popupProfile.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupProfile.renderLoading(false);
        });
};

const popupProfile = new PopupWithForm(popupEditProfile, handleSubmitProfile);
popupProfile.setEventListeners();

const handleOpenProfilePopup = () => {
    const userData = userInfo.getUserInfo();

    popupProfile.setInputValues(userData);

    popupProfile.open();

    popupProfileValidator.resetValidation();
}

function like(idCard, likeCard) {
    return api.cardLike(idCard)
        .then((likeData) => {
            likeCard(likeData.likes);
        })
        .catch((err) => {
            console.log(err);
        })
}

function dislike(idCard, likeCard) {
    return api.cardDislike(idCard)
        .then((likeData) => {
            likeCard(likeData.likes);
        })
        .catch((err) => {
            console.log(err);
        })
}

function handleCardClick(cardName, cardLink) {
    popupPhotoZoom.open(cardName, cardLink);
}

function deleteCard(idCard) {
    popupDeleteConfirm.renderLoadingDelete(true);
    api.deleteUserCard(idCard)
        .then(() => {
            const cardItem = popupDeleteConfirm.getCard();
            cardItem.deleteCard();
            popupDeleteConfirm.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupDeleteConfirm.renderLoadingDelete(false);
        });
}

const popupDeleteConfirm = new PopupWithDelete(popupDelete, deleteCard);
popupDeleteConfirm.setEventListeners();

function deletePopupOpen(cardItem) {
    popupDeleteConfirm.setCard(cardItem)
    popupDeleteConfirm.open();
}

const cardsList = new Section({
    renderer: (item) => {
        const cardItem = {
            name: item.name,
            link: item.link,
            likes: item.likes,
            _id: item._id,
            owner: item.owner,
            like: like,
            dislike: dislike,
            handleCardClick: handleCardClick,
            deleteCardClick: deletePopupOpen
        }

        return new Card(cardItem, card, userInfo.getId()).generateCard();
    }
}, cards);

const popupCard = new PopupWithForm(popupAddCard, (cardData) => {
    const cardItem = {
        name: cardData.name,
        link: cardData.link,
        like: like,
        dislike: dislike,
        handleCardClick: handleCardClick
    }

    popupCard.renderLoading(true);
    api.createUserCard(cardItem)
        .then((cardItem) => {
            cardsList.addItem(cardItem);
            popupCardValidator.resetValidation();
            popupCard.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupCard.renderLoading(false);
        });
});
popupCard.setEventListeners();

const handleChangeAvatar = (data) => {
    popupEditAvatar.renderLoading(true);
    api.editAvatar(data)
        .then((dataAvatar) => {
            userInfo.setAllInfo(dataAvatar)
            popupAvatarValidator.resetValidation();
            popupEditAvatar.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupEditAvatar.renderLoading(false);
        });
}

const popupEditAvatar = new PopupWithForm(popupAvatar, handleChangeAvatar);
popupEditAvatar.setEventListeners();

profileEditBtn.addEventListener('click', handleOpenProfilePopup);

addBtn.addEventListener('click', function () {
    popupCard.open();
    popupCardValidator.resetValidation();
});

avatarEditBtn.addEventListener('click', () => {
    popupEditAvatar.open();
    popupAvatarValidator.resetValidation();
});