export class Card {
    constructor(cardElementsSelectors, name, link, openPopupImg) {
        this._name = name;
        this._link = link;
        this._selector = cardElementsSelectors;
        this._openPopupImgZoom = openPopupImg;
    }
    // получаем разметку карточки и возвращаем(шаблон)
    _getTemplate() {
            this._template =  document
            .querySelector(this._selector.template)
            .content
            .querySelector(this._selector.card)
            .cloneNode(true);

        return this._template;
    }
    // наполняем карточку данными
    generateCard() {
        this._template = this._getTemplate();

        this._templateName = this._template.querySelector(this._selector.name);
        this._templateImg = this._template.querySelector(this._selector.cardImg);
        
        this._templateName.textContent = this._name;
        this._templateImg.alt = this._name;
        this._templateImg.src = this._link;
        this._setEventListeners();
        return this._template;
    }
    
    _setEventListeners() {
        this._likeButton = this._template.querySelector(this._selector.likeButton);
        this._likeButton.addEventListener('click', () => this._handleLikeClick());
        this._buttonDeleteCard = this._template.querySelector(this._selector.buttonDeleteCard);
        this._buttonDeleteCard.addEventListener('click', () => this._handleDeleteCard());
        this._templateImg.addEventListener('click', () => this._openPopupImg());
    }
    _openPopupImg() {
        this._openPopupImgZoom(this._name, this._link);
    }
    // Удаление карточки
    _handleDeleteCard() {
        this._template.remove();
        this._template = null;

    }
    // Активная иконка лайка
    _handleLikeClick() {
        this._likeButton.classList.toggle(this._selector.likeActive);
    }
}
