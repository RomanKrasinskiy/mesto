export class Popup {
    constructor(popupSelector, selectors) {
        this._popup = document.querySelector(popupSelector);
        this._form = this._popup.querySelector(selectors.form);
        this._selectors = selectors;
        this._handleEscClose = this._handleEscClose.bind(this);
        this._popupSaveButton = this._popup.querySelector(this._selectors.popupSaveButton)
    }
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }
    open() {
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.classList.add(this._selectors.active);
    }
    close() {
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.classList.remove(this._selectors.active);
    }
    activateLoader(load, text) {
        if(load) {
            this._popupSaveButton.disabled = true;
            this._popupSaveButton.textContent = text;
            this._popupSaveButton.classList.add(this._selectors.popupSaveButtonInactive)
        } else {
            this._popupSaveButton.disabled = false;
            this._popupSaveButton.textContent = this._popupSaveButton.value;
            this._popupSaveButton.classList.remove(this._selectors.popupSaveButtonInactive)
        }
    }
    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            const containerClose = this._popup.querySelector(this._selectors.containerClose);
            if (evt.target.classList.contains(this._selectors.closeButton) || !containerClose.contains(evt.target)) {
                this.close();
            }
        });
    }
}