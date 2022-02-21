export const validationObj = {
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_type_error',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__text-error_active'
}

export default class FormValidator {
    constructor(data, formSelector) {
        this._formSelector = formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;

        this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
        this._btnElement = this._formSelector.querySelector(this._submitButtonSelector);
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvaildInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleBtnState() {
        if (this._hasInvaildInput(this._inputList)) {
            this._btnElement.classList.add(this._inactiveButtonClass);
            this._btnElement.setAttribute('disabled', true);
        } else {
            this._btnElement.classList.remove(this._inactiveButtonClass);
            this._btnElement.removeAttribute('disabled');
        }
    }

    _setEventListeners() {

        this._toggleBtnState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleBtnState();
            });
        });
    }

    enableValidation() {
        this._setEventListeners();
    }
}