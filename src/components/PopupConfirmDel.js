import { Popup } from './Popup.js';

export class PopupConfirmDel extends Popup {
    constructor(popupSelector, selectors, handleDeleteCard) {
        super(popupSelector, selectors)
        this._handleDeleteCard = handleDeleteCard;
    }
    open(cardId, cardElement) {
        super.open();
        this._cardId = cardId;
        this._cardElement = cardElement;
    }
    setEventListeners () {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleDeleteCard(this._cardId, this._cardElement);
        })
    }
}