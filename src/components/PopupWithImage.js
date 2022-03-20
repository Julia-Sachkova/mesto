import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImg = document.querySelector('.popup__image');
        this._popupPhotoName = document.querySelector('.popup__photo-name');
    }

    open(card) {
        this._popupImg.src = card.link;
        this._popupImg.alt = card.name;
        this._popupPhotoName.textContent = card.name;
        super.open();
    }
}