import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, selectors, handleSumbitForm) {
        super(popupSelector, selectors);
        this._handleSumbitForm = handleSumbitForm;
        this._form = this._popup.querySelector(selectors.form);
        this._inputList = Array.from(this._form.querySelectorAll(selectors.input));
    }
    // получаем значение инпута, вкладываем в новый объект и его возвращаем
    _getInputValues() {
        this._newInputObj = {};
        this._inputList.forEach(input => {
            this._newInputObj[input.name] = input.value;
        }); 
        return this._newInputObj;
       
    }
    // слушатель помимо стандартного закрытия попапа передает объект с новыми данными
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSumbitForm(this._getInputValues());
            this.close();
        })
    }
    close() {
        this._form.reset(); // сбросили значения формы
        super.close();
    }
    // возврат исходного значения(получаем из объекта с данными и вкладываем в инпут)
    setInputValues(obj) {
        this._inputList.forEach(input => {
          input.value = obj[input.name];
        })
    }
}