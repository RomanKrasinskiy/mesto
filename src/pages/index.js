import "./index.css";
import { initialCards } from "../utils/initialCards.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PicturePopup.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { 
  formConfigSelector,
  cardSelector,
  popupSelector,
  userDataSelector,
  formElementAddCard,
  formElementEditName,
  cardList,
  addButton,
  buttonEditProfile,
  } from "../utils/constants.js";

const addCardFormValidation = new FormValidator (formConfigSelector, formElementAddCard);
addCardFormValidation.enableValidation();

const editNameFormValidation = new FormValidator (formConfigSelector, formElementEditName);
editNameFormValidation.enableValidation();

const popupImg = new PopupWithImage(popupSelector.popupZoomImgContainer, popupSelector);
popupImg.setEventListeners();

const popupAddCard = new PopupWithForm(popupSelector.popupAddCard, popupSelector, handleCardSubmit);
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm(popupSelector.popupEditName, popupSelector, handleEditProfileSubmit);
popupEditProfile.setEventListeners();

const newUserInfo = new UserInfo(userDataSelector);

const renderingCards = new Section( 
{ 
  dataBase: initialCards,
  renderer: (item) => {
    renderingCards.addItem(createNewCard(item));
  }
}, cardList);
renderingCards.rendererAll();


// Создаем карточку по шаблону и наполняем данными 
function createNewCard(item) {
  const newCard = new Card (cardSelector, item.name, item.link, handleCardClick);
  return newCard.generateCard();
}

// Подгрузка маленькой img, и наименований в попапZoom
function handleCardClick(name, link) {
  popupImg.open(name, link);
};

function handleCardSubmit(inputValues) {
  renderingCards.addItem(createNewCard(inputValues))

};

function handleEditProfileSubmit(inputValues) {
  newUserInfo.setUserInfo(inputValues);
};


// Событие нажания на кнопку добавлеиня новой карточки
addButton.addEventListener('click', () => {
  addCardFormValidation.resetValid();
  popupAddCard.open();
}); 

// Событие нажания на кнопку редактирования профиля
buttonEditProfile.addEventListener('click', () => {
  popupEditProfile.open();
  editNameFormValidation.resetValid();
  popupEditProfile.setInputValues(newUserInfo.getUserInfo());
}); 
