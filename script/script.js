const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

const templateCard = document.querySelector('.card').content;
const popupElement = document.querySelectorAll('.popup');
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
const closeButton = document.querySelector('.popup__close-ico');
const popupTitle = document.querySelector('.popup__title');
const formElement = document.querySelector('.popup__form');
const formElementAddCard = popupAddCard.querySelector('.popup__form_type_add-card');
const formElementEditName = popupEditName.querySelector('.popup__form_type_edit-name');
const popupZoomImg = document.querySelector('.popup_type_zoom-img');
const zoomMainImg = document.querySelector('.popup__zoom-main-img');
const zoomCaption = document.querySelector('.popup__zoom-caption');

// Создаем карточку по шаблону и наполняем данными из массива
function createNewCard (name, link) {
  let listElements = templateCard.cloneNode(true);
  const elementName = listElements.querySelector('.element__name'); // название карточки
  const elementImage = listElements.querySelector('.element__photo'); // картинка 
  const elementNameAlt = listElements.querySelector('.element__photo'); // альт
  elementName.textContent = name;
  elementImage.src = link;
  elementNameAlt.alt = name;
  interactiveCardElements(listElements);
  return listElements;
};

// Достаем карточки из массива
function renderList(data) {
    data.forEach(function (item) {
      const newCard = createNewCard(item.name, item.link);
      renderCard(newCard);
    })
};

// вставляем карточку в грид разметку
function renderCard (listElements) {
  const cardList = document.querySelector('.elements');
  cardList.prepend(listElements);
};

// Добавляем дефолтные 6 карточек на страницу при загрузке сайта
renderList(initialCards);

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
  openPopup(popupAddCard);
};

// Удаление карточки
function deleteCard(evt) {
  const takeCard = evt.target.closest('.element');
  takeCard.remove();
};

// Активная иконка лайка
function presslike(evt) {
  evt.target.classList.toggle('element__like_active');
};

// Функция включает в себя все слушатели событий интерактивных элементов карточки
function interactiveCardElements(listElements) {
  const likeButton = listElements.querySelector('.element__like');
  likeButton.addEventListener('click', presslike);
  const buttonDeleteCard = listElements.querySelector('.element__delete-ico');
  buttonDeleteCard.addEventListener('click', deleteCard);
  const cardImg = listElements.querySelector('.element__photo');
  cardImg.addEventListener('click', openPopupImg);
};

editButton.addEventListener('click', openPopupEdit); // Событие нажания на кнопку редактирования профиля
addButton.addEventListener('click', openPopupAddCard); // Событие нажания на кнопку добавлеиня новой карточки

// Обработчик «отправки» формы.
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  userName.textContent = nameInput.value;
  aboutUser.textContent = jobInput.value;
  closePopup(popupEditName);
};

// Ручное создание карточки.
function formAddCardHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const newCard = createNewCard(placeName.value, placeLink.value);
  renderCard(newCard);
  closePopup(popupAddCard);
};

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElementEditName.addEventListener('submit', formSubmitHandler);
formElementAddCard.addEventListener('submit', formAddCardHandler);


if (userName.textContent === '') {
  userName.textContent = "Жак-Ив Кусто";
  aboutUser.textContent = "Исследователь океана";
};

// Общая функция для кнопки закрытия попапа.Крестик.
popupElement.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup__close-ico')) {
      closePopup(popup);
    }
  })
});