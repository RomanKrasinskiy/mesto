import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector, selectors) {
        super(popupSelector, selectors)
        this._zoomMainImg = this._popup.querySelector(this._selectors.zoomMainImg);
        this._zoomCaption = this._popup.querySelector(this._selectors.zoomCaption);
    }
    open(name, link) {
        this._zoomMainImg.src = link;
        this._zoomMainImg.alt = name;
        this._zoomCaption.textContent = name;
        super.open();
    }
}