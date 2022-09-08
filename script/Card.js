export class Card {
    constructor(selector, name, link, openPopupImg) {
        this._name = name;
        this._link = link;
        this._selector = selector;
        this._openPopupImgZoom = openPopupImg;
    }
    // получаем разметку карточки и возвращаем(шаблон)
    _getTemplate() {
            this._element =  document
            .querySelector(this._selector.template)
            .content
            .querySelector(this._selector.card)
            .cloneNode(true);

        return this._element;
    }
    // наполняем карточку данными
    generateCard() {
        this._element = this._getTemplate();

        this._elementName = this._element.querySelector(this._selector.name);
        this._elementImg = this._element.querySelector(this._selector.cardImg);
        this._elementAlt = this._elementImg;
        
        this._elementName.textContent = this._name;
        this._elementAlt.alt = this._name;
        this._elementImg.src = this._link;
        this._evtListeners();
        return this._element;
    }
    
    _evtListeners() {
        this._likeButton = this._element.querySelector(this._selector.likeButton);
        this._likeButton.addEventListener('click', () => this._handleLikeClick());
        this._buttonDeleteCard = this._element.querySelector(this._selector.buttonDeleteCard);
        this._buttonDeleteCard.addEventListener('click', () => this._handleDeleteCard());
        this._elementImg.addEventListener('click', () => this._openPopupImg());
    }
    _openPopupImg() {
        this._openPopupImgZoom(this._name, this._link);
    }
    // Удаление карточки
    _handleDeleteCard() {
        this._element.remove();
    }
    // Активная иконка лайка
    _handleLikeClick() {
        this._likeButton.classList.toggle(this._selector.likeActive);
    }
}
