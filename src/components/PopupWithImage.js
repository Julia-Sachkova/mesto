import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImg = this._popup.querySelector('.popup__image');
        this._popupPhotoName = this._popup.querySelector('.popup__photo-name');
    }

    open(name, link) {
        this._popupImg.src = link;
        this._popupImg.alt = name;
        this._popupPhotoName.textContent = name;
        super.open();
    }
}