export const formConfigSelector = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  popupContainer: 'popup__container'
  };
export const cardSelector = {
  template: '.card',
  card: '.element',
  name: '.element__name',
  likeButton: '.element__like',
  buttonDeleteCard: '.element__delete-ico',
  cardImg: '.element__photo',
  likeActive: 'element__like_active',
};
export const popupSelector = {
  active: 'popup_active',
  containerClose: '.popup__container-close',
  closeButton: 'popup__close-ico',
  zoomMainImg: '.popup__zoom-main-img',
  zoomCaption: '.popup__zoom-caption',
  popupAddCard: '.popup_type_add-card',
  form: '.popup__form',
  input: '.popup__input',
  popupZoomImgContainer: '.popup_type_zoom-img',
  popupEditName: '.popup_type_edit-name',
  nameInput: '.popup__input_value_username',
  jobInput: '.popup__input_value_about-user',
};
export const userDataSelector = {
  userName: '.profile__user-name',
  aboutUser: '.profile__about-user'
};

export const cardList = '.elements';
export const buttonEditProfile = document.querySelector('.edit-button');
export const addButton = document.querySelector('.add-button');

const popupEditName = document.querySelector('.popup_type_edit-name');
export const formElementEditName = popupEditName.querySelector('.popup__form_type_edit-name');

export const formElementAddCard = document.querySelector('.popup__form_type_add-card');
export const placeName = formElementAddCard.querySelector('.popup__input_value_place-name');
export const placeLink = formElementAddCard.querySelector('.popup__input_value_place-link');

