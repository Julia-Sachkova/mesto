let cardNameInput = document.querySelector('.popup__text_type_card-name');
let cardLinkInput = document.querySelector('.popup__text_type_card-link');
const profileEditBtn = document.querySelector('.profile__edit-button');
const closeProfilePopup = document.querySelector('.popup__close-button_profile');
const popup = document.querySelector('.popup');
const popupOpened = 'popup_opened';
const submitBtnCard = document.querySelector('.popup__submit-button_card');
const formElement = popup.querySelector('.popup__form');
const nameInput = popup.querySelector('.popup__text_type_name');
const jobInput = popup.querySelector('.popup__text_type_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const card = document.querySelector('#card').content;
const cards = document.querySelector('.cards');
const addBtn = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const cardForm = document.querySelector('.popup__form-card');
const closeCardPopup = document.querySelector('.popup__close-button_card');
const popupPhoto = document.querySelector('.popup_photo-zoom');
const closePhotoPopup = document.querySelector('.popup__close-button_photo-zoom');

let initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]

function initializeCards(cardInfo) {
    const cardElement = card.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__name').textContent = cardInfo.name;
    cardElement.querySelector('.card__photo').src = cardInfo.link;
    cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-button_active');
    });

    cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) {
        cardElement.remove();
    });

    cardElement.querySelector('.card__photo').addEventListener('click', function () {
        document.querySelector('.popup__image').src = cardInfo.link;
        document.querySelector('.popup__photo-name').textContent = cardInfo.name;
        popupToggle(popupPhoto);
    });
    return cardElement;
}

initialCards.forEach(function (item) {
    cards.append(initializeCards(item));
});

function popupToggle(togPopup) {
    togPopup.classList.toggle(popupOpened);
}

function formValue() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;

    popupToggle(popupEditProfile);
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;

    popupToggle(popupEditProfile);
}

function submitCard(evt) {
    evt.preventDefault();

    let cardItem = {
        name: '',
        link: ''
    }

    cardItem.name = cardNameInput.value;
    cardItem.link = cardLinkInput.value;

    initialCards.unshift(cardItem);
    initialCards.pop();

    cards.prepend(initializeCards(cardItem));
    cards.removeChild(cards.lastChild);

    popupToggle(popupAddCard);
}

profileEditBtn.addEventListener('click', formValue);

formElement.addEventListener('submit', formSubmitHandler);

cardForm.addEventListener('submit', submitCard);

closeCardPopup.addEventListener('click', function () {
    popupToggle(popupAddCard);
});

closeProfilePopup.addEventListener('click', function () {
    popupToggle(popupEditProfile);
});

closePhotoPopup.addEventListener('click', function () {
    popupToggle(popupPhoto);
});

addBtn.addEventListener('click', function () {
    popupToggle(popupAddCard);
    cardNameInput.value = '';
    cardLinkInput.value = '';
});

document.addEventListener('keydown', function (event) {
    if (event.code === "Enter") {
        popup.classList.remove(popupOpened);
    }
});