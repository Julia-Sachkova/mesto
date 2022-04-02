import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
    constructor(popupSelector, deleteCard) {
        super(popupSelector);
        this._deleteCard = deleteCard;
        this._formElement = this._popup.querySelector('.popup__form');
        this._submitBtn = this._formElement.querySelector('.popup__submit-button');

        this._submitBtnTextContent = this._submitBtn.textContent;
        this._dataCard = '';
    }

    setCard(dataCard) {
        this._dataCard = dataCard;
    }

    getCard() {
        return this._dataCard;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._deleteCard(this._dataCard._id);
        });
    }

    renderLoadingDelete(isLoading) {
        if (isLoading) {
            this._submitBtn.textContent = 'Удаление...';
        }
        else {
            this._submitBtn.textContent = this._submitBtnTextContent;
        }
    }
}