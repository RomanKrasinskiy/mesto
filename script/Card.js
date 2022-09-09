export class Card {
    constructor(cardElementsSelectors, name, link, openPopupImg) {
        this._name = name;
        this._link = link;
        this._cardElementsSelectors = cardElementsSelectors;
        this._openPopupImgZoom = openPopupImg;
    }
    // получаем разметку карточки и возвращаем(шаблон)
    _getTemplate() {
        this._element =  document
        .querySelector(this._cardElementsSelectors.template)
        .content
        .querySelector(this._cardElementsSelectors.card)
        .cloneNode(true);

        return this._element;
    }
    // наполняем карточку данными
    generateCard() {
        this._element = this._getTemplate();

        this._elementName = this._element.querySelector(this._cardElementsSelectors.name);
        this._elementImg = this._element.querySelector(this._cardElementsSelectors.cardImg);
        
        this._elementName.textContent = this._name;
        this._elementImg.alt = this._name;
        this._elementImg.src = this._link;
        this._setEventListeners();
        return this._element;
    }
    
    _setEventListeners() {
        this._likeButton = this._element.querySelector(this._cardElementsSelectors.likeButton);
        this._likeButton.addEventListener('click', () => this._handleLikeClick());
        this._buttonDeleteCard = this._element.querySelector(this._cardElementsSelectors.buttonDeleteCard);
        this._buttonDeleteCard.addEventListener('click', () => this._handleDeleteCard());
        this._elementImg.addEventListener('click', () => this._openPopupImg());
    }
    _openPopupImg() {
        this._openPopupImgZoom(this._name, this._link);
    }
    // Удаление карточки
    _handleDeleteCard() {
        this._element.remove();
        this._element = null;

    }
    // Активная иконка лайка
    _handleLikeClick() {
        this._likeButton.classList.toggle(this._cardElementsSelectors.likeActive);
    }
}
