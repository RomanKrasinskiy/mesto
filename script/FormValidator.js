export class FormValidator {
    constructor(validationConfig, form) {
        this._selector = validationConfig;
        this._placeForm = form;
        this._buttonElement = this._placeForm.querySelector(this._selector.submitButtonSelector);
        this._inputList = Array.from(this._placeForm.querySelectorAll(this._selector.inputSelector));
    }
    // проверяем валидность поля
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }}

    // добавляем класс с ошибкой
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._placeForm.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._selector.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._selector.errorClass);
    }
    // удаляем класс с ошибкой
    _hideInputError(inputElement) {
        const errorElement = this._placeForm.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._selector.inputErrorClass);
        errorElement.classList.remove(this._selector.errorClass);
        errorElement.textContent = "";
    }
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    // слушатели каждому инпуту
    _setEventListenersInput() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    _disableSubmitButton() {
        this._buttonElement.classList.add(this._selector.inactiveButtonClass);
        this._buttonElement.disabled = true;
    }
    _enableSubmitButton() {
        this._buttonElement.classList.remove(this._selector.inactiveButtonClass);
        this._buttonElement.disabled = false;
    }
    _toggleButtonState() {
        // Если есть хотя бы один невалидный инпут
        if (this._hasInvalidInput()) {
            // сделай кнопку неактивной
            this._disableSubmitButton();
        } else {
            // иначе сделай кнопку активной
            this._enableSubmitButton();
        }
    }
    
    resetValid() {
        this._disableSubmitButton();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        })
    }

    enableValidation() {
        this._setEventListenersInput();
    }
};
