export default class Card {
    constructor(cardItem, cardSelector, userId) {
        this._name = cardItem.name;
        this._link = cardItem.link;
        this._likes = cardItem.likes;
        this._cardSelector = cardSelector;
        this._id = cardItem._id;
        this._ownerId = cardItem.owner._id;
        this._userId = userId;
        this._like = cardItem.like;
        this._dislike = cardItem.dislike;
        this._handleCardClick = cardItem.handleCardClick;
        this._handleLikeClick = this._handleLikeClick.bind(this);
        this._deleteCardClick = cardItem.deleteCardClick;
    }

    _checkId(userId) {
        return this._likes.find((item) => {
            return userId === item._id;
        });
    }

    _getCardTemplate() {
        return document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
    }

    _handleCardLike() {
        if (this._checkId(this._userId)) {
            this._likeBtn.classList.add('card__like-button_active');
            this._likeCounter.textContent = this._likes.length;
        } else {
            this._likeBtn.classList.remove('card__like-button_active');
            this._likeCounter.textContent = this._likes.length;
        }
    }

    _handleLikeClick(like) {
        this._likes = like;
        this._handleCardLike();
    }

    _deleteBtn() {
        if (this._userId !== this._ownerId) {
            this._element.querySelector('.card__delete-button').style.display = 'none';
        }
    }

    generateCard() {
        this._element = this._getCardTemplate();
        this._likeBtn = this._element.querySelector('.card__like-button');
        this._cardImg = this._element.querySelector('.card__photo');
        this._likeCounter = this._element.querySelector('.card__like-counter');

        this._setEventListeners();

        this._element.querySelector('.card__name').textContent = this._name;
        this._cardImg.src = this._link;
        this._cardImg.alt = this._name;

        return this._element;
    }

    _toggleLikeBtn() {
        if (this._checkId(this._userId)) {
            this._dislike(this._id, this._handleLikeClick);
        } else {
            this._like(this._id, this._handleLikeClick);

        }
    }

    _setEventListeners() {
        this._likeBtn.addEventListener('click', () => {
            this._toggleLikeBtn();
        });

        this._element.querySelector('.card__delete-button').addEventListener('click', () => {
            this._deleteCardClick(this);
        });

        this._cardImg.addEventListener('click', () => {
            return this._handleCardClick(this._name, this._link);
        });

        this._handleCardLike();
        this._deleteBtn();
    }

    deleteCard() {
        this._element.remove();
    }
}