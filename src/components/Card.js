export class Card {
    constructor(cardElementsSelectors, 
                item, 
                handleCardClick, 
                handleConfirmDeleteClick,
                handleLikeClick, 
                user) {

        this._name = item.name;
        this._link = item.link;
        this._likes = item.likes;
        this._cardElementsSelectors = cardElementsSelectors;
        this._handleCardClick = handleCardClick;
        this._handleConfirmDeleteClick = handleConfirmDeleteClick;
        this._handleLikeClick = handleLikeClick;
        this._cardId = item._id;
        this._cardElement = item.cardElement;
        this._ownerId = user._id;
        this._userId = item.owner._id;
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
        this._getTemplate();
        this._elementName = this._element.querySelector(this._cardElementsSelectors.name);
        this._elementImg = this._element.querySelector(this._cardElementsSelectors.cardImg);
        this._likeCountElement = this._element.querySelector(this._cardElementsSelectors.numLike);
        this._likeCountElement.textContent = this._likes.length;
        this._elementName.textContent = this._name;
        this._elementImg.alt = this._name;
        this._elementImg.src = this._link;
        this._setEventListeners();
        this._renderActiveLikes();
        this._renderActiveDelIco();
        return this._element;
    }
    _renderActiveDelIco() {
        if(this._ownerId !== this._userId) {
            this._buttonDeleteCard.style.display = 'none'
        }
    };
    _initialActiveLikes() {
        return this._likes.find((like) => {
            return like._id === this._ownerId
        })
    };
// Активная иконка лайка
    _likeActive() {
        this._likeButton.classList.add(this._cardElementsSelectors.likeActive);
    };
    _renderActiveLikes() {
        if(this._likes.find(user => user._id === this._ownerId)) {
            this._likeActive();
        }
    };

    _handleLikeCard() {
        if(this._initialActiveLikes()) {
            this._handleLikeClick(
                true, 
                this._likes, 
                this._cardId, 
                this._likeButton, 
                this._cardElementsSelectors.likeActive, 
                this._likeCountElement)
        } else if (!this._initialActiveLikes()) {
            this._handleLikeClick(
                false, 
                this._likes, 
                this._cardId, 
                this._likeButton, 
                this._cardElementsSelectors.likeActive, 
                this._likeCountElement)
        }
    };
// слушатели отдельных функциональных элементов карточки
    _setEventListeners() {
        this._likeButton = this._element.querySelector(this._cardElementsSelectors.likeButton);
        this._likeButton.addEventListener('click', () => this._handleLikeCard());
        this._buttonDeleteCard = this._element.querySelector(this._cardElementsSelectors.buttonDeleteCard);
        this._buttonDeleteCard.addEventListener('click', () => {
            this._handleConfirmDeleteClick.open(this._cardId, this._element)});
        this._elementImg.addEventListener('click', () => this._openPopupImg());
        
    };
// увеличенная картинка и подпись
    _openPopupImg() {
        this._handleCardClick(this._name, this._link);
    };
}
