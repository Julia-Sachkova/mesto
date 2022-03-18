export default class Card {
    constructor({ cardItem, handleCardClick }, cardSelector) {
        this._name = cardItem.name;
        this._link = cardItem.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getCardTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardElement;
    }

    _handleLikeBtn() {
        this._likeBtn.classList.toggle('card__like-button_active');
    }

    _setEventListeners() {
        this._likeBtn = this._element.querySelector('.card__like-button');
        this._cardImg = this._element.querySelector('.card__photo');

        this._likeBtn.addEventListener('click', () => {
            this._handleLikeBtn();
        });

        this._element.querySelector('.card__delete-button').addEventListener('click', () => {
            this._element.remove();
        });

        this._cardImg.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    generateCard() {
        this._element = this._getCardTemplate();
        this._setEventListeners();

        this._element.querySelector('.card__name').textContent = this._name;
        this._cardImg.src = this._link;
        this._cardImg.alt = this._name;

        return this._element;
    }
}