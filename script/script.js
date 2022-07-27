const templateCard = document.querySelector('.card').content;
const popupElements = document.querySelectorAll('.popup');
const userName = document.querySelector('.profile__user-name');
const aboutUser = document.querySelector('.profile__about-user');
const editButton = document.querySelector('.edit-button');
const addButton = document.querySelector('.add-button');
const popupEditName = document.querySelector('.popup_type_edit-name');
const nameInput = popupEditName.querySelector('.popup__input_value_username');
const jobInput = popupEditName.querySelector('.popup__input_value_about-user');
const popupAddCard = document.querySelector('.popup_type_add-card');
const placeName = popupAddCard.querySelector('.popup__input_value_place-name');
const placeLink = popupAddCard.querySelector('.popup__input_value_place-link');
const formElementAddCard = popupAddCard.querySelector('.popup__form_type_add-card');
const formElementEditName = popupEditName.querySelector('.popup__form_type_edit-name');
const popupZoomImg = document.querySelector('.popup_type_zoom-img');
const zoomMainImg = document.querySelector('.popup__zoom-main-img');
const zoomCaption = document.querySelector('.popup__zoom-caption');
const cardList = document.querySelector('.elements');

// Создаем карточку по шаблону и наполняем данными из массива
function createNewCard (name, link) {
  const card = templateCard.cloneNode(true);
  const elementName = card.querySelector('.element__name'); // название карточки
  const elementImage = card.querySelector('.element__photo'); // картинка 
  const elementNameAlt = card.querySelector('.element__photo'); // альт
  elementName.textContent = name;
  elementImage.src = link;
  elementNameAlt.alt = name;
  const likeButton = card.querySelector('.element__like');
  likeButton.addEventListener('click', handleLikeClick);
  const buttonDeleteCard = card.querySelector('.element__delete-ico');
  buttonDeleteCard.addEventListener('click', handleDeleteCard);
  const cardImg = card.querySelector('.element__photo');
  cardImg.addEventListener('click', openPopupImg);
  return card;
};

// Достаем карточки из массива
function renderCardsList(data) {
    data.forEach(function (item) {
      const newCard = createNewCard(item.name, item.link);
      cardElement(newCard);
    })
};

// вставляем карточку в грид разметку
function cardElement (card) {
  cardList.prepend(card);
};

// Добавляем дефолтные 6 карточек на страницу при загрузке сайта
renderCardsList(initialCards);

// Подгрузка маленькой img, и наименований в попапZoom
function openPopupImg(evt) {
  zoomMainImg.src = evt.target.src;
  zoomMainImg.alt = evt.target.alt;
  zoomCaption.textContent = evt.target.alt;
  openPopup(popupZoomImg);
};

// Окно открытия попапа
function openPopup(popupElement) {
  popupElement.classList.add('popup_active');
};

// Окно закрытия попапа
function closePopup(popupElement) {
	popupElement.classList.remove('popup_active');
};

// Открытие окна редактирования профиля
function openPopupEdit() {
  nameInput.value = userName.textContent; // Добавляем введенное пользователем значение(input_user-name) в поле 
  jobInput.value = aboutUser.textContent; // Добавляем введенное пользователем значение(input_about-user) в поле
  openPopup(popupEditName);
};

// Открываем окно ручного создания новой карточки
function openPopupAddCard() {
  formElementAddCard.reset();
  openPopup(popupAddCard);
};

// Удаление карточки
function handleDeleteCard(evt) {
  const cardСlosed = evt.target.closest('.element');
  cardСlosed.remove();
};

// Активная иконка лайка
function handleLikeClick(evt) {
  evt.target.classList.toggle('element__like_active');
};


// Обработчик «отправки» формы.
function handleEditFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  userName.textContent = nameInput.value;
  aboutUser.textContent = jobInput.value;
  closePopup(popupEditName);
};

// Ручное создание карточки.
function handleFormAddCard (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const newCard = createNewCard(placeName.value, placeLink.value);
  cardElement(newCard);
  closePopup(popupAddCard);
};

// Общая функция для кнопки закрытия попапа.Крестик.
popupElements.forEach((deleteCard) => {
  deleteCard.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup__close-ico')) {
      closePopup(deleteCard);
    }
  })
});

editButton.addEventListener('click', openPopupEdit); // Событие нажания на кнопку редактирования профиля
addButton.addEventListener('click', openPopupAddCard); // Событие нажания на кнопку добавлеиня новой карточки

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElementEditName.addEventListener('submit', handleEditFormSubmit);
formElementAddCard.addEventListener('submit', handleFormAddCard);