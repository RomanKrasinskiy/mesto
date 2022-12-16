import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, selectors, handleSumbitForm) {
        super(popupSelector, selectors);
        this._handleSumbitForm = handleSumbitForm;
        this._inputList = Array.from(this._form.querySelectorAll(selectors.input));
    }
    // получаем значение инпута, вкладываем в новый объект и его возвращаем
    getInputValues() {
        this._inputValues = {};
        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        }); 
        return this._inputValues;
    }
    // слушатель помимо стандартного закрытия попапа передает объект с новыми данными
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSumbitForm(this.getInputValues());
        })
    }
    close() {
        this._form.reset(); // сбросили значения формы
        super.close();
    }
    // возврат исходного значения(получаем из объекта с данными и вкладываем в инпут)
    setInputValues(dataToSetup) {
        this._inputList.forEach(input => {
          input.value = dataToSetup[input.name];
        })
    }
}