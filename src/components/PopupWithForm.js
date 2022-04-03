import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._formElement = this._popup.querySelector('.popup__form');
        this._inputList = this._formElement.querySelectorAll('.popup__text');
        this._submitBtn = this._formElement.querySelector('.popup__submit-button');

        this._submitBtnTextContent = this._submitBtn.textContent;
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
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

    renderLoading(isLoading) {
        if (isLoading) {
            this._submitBtn.textContent = 'Сохранение...';
        }
        else {
            this._submitBtn.textContent = this._submitBtnTextContent;
        }
    }
}