import { initialCards } from "./initialCards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const formConfigSelector = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  popupContainer: 'popup__container'
};

const cardSelector = {
  template: '.card',
  card: '.element',
  name: '.element__name',
  likeButton: '.element__like',
  buttonDeleteCard: '.element__delete-ico',
  cardImg: '.element__photo',
  likeActive: 'element__like_active',
};

const popupElements = document.querySelectorAll('.popup');
const userName = document.querySelector('.profile__user-name');
const aboutUser = document.querySelector('.profile__about-user');
const buttonEditProfile = document.querySelector('.edit-button');
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

const addCardFormValidation = new FormValidator (formConfigSelector, formElementAddCard);
addCardFormValidation.enableValidation();
const editNameFormValidation = new FormValidator (formConfigSelector, formElementEditName);
editNameFormValidation.enableValidation();

// Создаем карточку по шаблону и наполняем данными из массива
function createNewCard(item) {
  const newCard = new Card (cardSelector, item.name, item.link, openPopupImg);
  return newCard.generateCard();
}

// Достаем карточки из массива
function renderCardsList(data) {
    data.forEach(function (item) {
      cardList.prepend(createNewCard(item)); // Вставляем карточку в грид разметку 
    });
};

// Добавляем дефолтные карточки на страницу при загрузке сайта
renderCardsList(initialCards);

// Подгрузка маленькой img, и наименований в попапZoom
function openPopupImg(name, link) {
  zoomMainImg.src = link;
  zoomMainImg.alt = name;
  zoomCaption.textContent = name;
  openPopup(popupZoomImg);
};

// Окно открытия попапа
function openPopup(popupElement) {
  document.addEventListener('keydown', handleEscapeClosePopup);
  popupElement.classList.add('popup_active');
  
};

// Окно закрытия попапа
function closePopup(popupElement) {
	document.removeEventListener('keydown', handleEscapeClosePopup);
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
  const data = {
    name: placeName.value,
    link: placeLink.value
  };
  const handleNewCard = createNewCard(data);
  cardList.prepend(handleNewCard);
  closePopup(popupAddCard);
  addCardFormValidation.resetValid();
};

// Закрываем попап по нажанию клавиши ESC.
function handleEscapeClosePopup (evt) {
  if (evt.key === "Escape") {
    const popupActive = document.querySelector('.popup_active');
    closePopup(popupActive);
  };
};

// Общая функция для кнопки закрытия попапа.Крестик || Пространство вокруг попапа.
popupElements.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    const popupContainerClose = popup.querySelector('.popup__container-close');
    if (evt.target.classList.contains('popup__close-ico') || !popupContainerClose.contains(evt.target)) {
      closePopup(popup);
    }
  });
});

buttonEditProfile.addEventListener('click', openPopupEdit); // Событие нажания на кнопку редактирования профиля
addButton.addEventListener('click', openPopupAddCard); // Событие нажания на кнопку добавлеиня новой карточки

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElementEditName.addEventListener('submit', handleEditFormSubmit);
formElementAddCard.addEventListener('submit', handleFormAddCard);