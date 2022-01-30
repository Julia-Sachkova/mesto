const cardNameInput = document.querySelector('.popup__text_type_card-name');
const cardLinkInput = document.querySelector('.popup__text_type_card-link');
const profileEditBtn = document.querySelector('.profile__edit-button');
const popupList = Array.from(document.querySelectorAll('.popup'));
const popupOpened = 'popup_opened';
const formElement = document.querySelector('.popup__form');
const submitBtnCard = document.querySelector('.popup__submit-button_card');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const card = document.querySelector('#card').content;
const cards = document.querySelector('.cards');
const addBtn = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const cardForm = document.querySelector('.popup__form-card');
const popupPhoto = document.querySelector('.popup_photo-zoom');
const popupImg = document.querySelector('.popup__image');
const popupPhotoName = document.querySelector('.popup__photo-name');

function initializeCard(cardInfo) {
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
        popupImg.src = cardInfo.link;
        popupPhotoName.textContent = cardInfo.name;
        openPopup(popupPhoto);
    });
    return cardElement;
}

initialCards.forEach(function (item) {
    cards.append(initializeCard(item));
});

function openPopup(popup) {
    popup.classList.add(popupOpened);
    document.addEventListener('keydown', closeOnEnter);
    document.addEventListener('keydown', closeOnEscape);
}

function closePopup(popup) {
    popup.classList.remove(popupOpened);
    document.removeEventListener('keydown', closeOnEnter);
    document.removeEventListener('keydown', closeOnEscape);
}

function closeOnBoard() {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
}

function closeOnEnter(evt) {
    if (evt.key === 'Enter') {
        closeOnBoard();
    }
}

function closeOnEscape(evt) {
    if (evt.key === 'Escape') {
        closeOnBoard();
    }
}

function handleOpenProfilePopup() {
    evt.preventDefault();

    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;

    openPopup(popupEditProfile);
}

function handleSubmitForm(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;

    closePopup(popupEditProfile);
}

function submitCard() {

    const cardItem = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    }

    cards.prepend(initializeCard(cardItem));

    closePopup(popupAddCard);
}

popupList.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains(popupOpened)) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        }
    });
});

profileEditBtn.addEventListener('click', handleOpenProfilePopup);

formElement.addEventListener('submit', handleSubmitForm);

cardForm.addEventListener('submit', submitCard);

addBtn.addEventListener('click', function () {
    openPopup(popupAddCard);
    cardNameInput.value = '';
    cardLinkInput.value = '';
});