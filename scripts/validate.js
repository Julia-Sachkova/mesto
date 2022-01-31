const validationObj = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_type_error',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__text-error_active'
}

const showInputError = (formElement, inputElement, errorMessage, validationObject) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationObject.errorClass);
}

const hideInputError = (formElement, inputElement, validationObject) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationObject.inputErrorClass);
    errorElement.classList.remove(validationObject.errorClass);
    errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement, validationObject) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationObject);
    } else {
        hideInputError(formElement, inputElement, validationObject);
    }
}

const hasInvaildInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

const toggleBtnState = (inputList, btnElement, validationObject) => {
    if (hasInvaildInput(inputList)) {
        btnElement.classList.add(validationObject.inactiveButtonClass);
        btnElement.setAttribute('disabled', true);
    } else {
        btnElement.classList.remove(validationObject.inactiveButtonClass);
        btnElement.removeAttribute('disabled');
    }
}

const setEventListeners = (formElement, validationObject) => {
    const inputList = Array.from(formElement.querySelectorAll(validationObject.inputSelector));
    const btnElement = formElement.querySelector(validationObject.submitButtonSelector);

    toggleBtnState(inputList, btnElement, validationObject);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, validationObject);
            toggleBtnState(inputList, btnElement, validationObject);
        });
    });
}

const enableValidation = (validationObject) => {
    const formList = Array.from(document.querySelectorAll(validationObject.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, validationObject);
    });
}
enableValidation(validationObj);