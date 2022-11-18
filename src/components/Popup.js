export class Popup {
    constructor(popupSelector, selectors) {
        this._popup = document.querySelector(popupSelector);
        this._selectors = selectors;
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open() {
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.classList.add(this._selectors.active);
    }
    close() {
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.classList.remove(this._selectors.active);
    }
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
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