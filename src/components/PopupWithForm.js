import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._formElement = this._popup.querySelector('.popup__form');
        this._inputList = this._formElement.querySelectorAll('.popup__text');
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._formElement.reset();
    }
}