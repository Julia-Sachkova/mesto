import { popupImg, popupPhoto, popupPhotoName, openPopup } from './index.js';

export default class Card {
    constructor(cardItem, cardSelector) {
        this._name = cardItem.name;
        this._link = cardItem.link;
        this._cardSelector = cardSelector;
    }

    _getCardTemplate() {
        const cardElement = document
            .querySelector('.card-template')
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardElement;
    }

    _handleLikeBtn() {
        this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
    }

    _handleOpenCardPhoto() {
        popupImg.src = this._link;
        popupImg.alt = this._name;
        popupPhotoName.textContent = this._name;
        openPopup(popupPhoto);
    }

    _setEventListeners() {
        this._element.querySelector('.card__like-button').addEventListener('click', () => {
            this._handleLikeBtn();
        });

        this._element.querySelector('.card__delete-button').addEventListener('click', () => {
            this._element.remove();
        });

        this._element.querySelector('.card__photo').addEventListener('click', () => {
            this._handleOpenCardPhoto();
        });
    }

    generateCard() {
        this._element = this._getCardTemplate();
        this._setEventListeners();

        this._element.querySelector('.card__name').textContent = this._name;
        this._element.querySelector('.card__photo').src = this._link;

        return this._element;
    }
}