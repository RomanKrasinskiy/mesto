let userName = document.querySelector('.profile__user-name');
let aboutUser = document.querySelector('.profile__about-user');
let editButton = document.querySelector('.edit-button');
let popupElement = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_type_username');
let jobInput = document.querySelector('.popup__input_type_about-user');

// Открываем окно 
function openPopup() {
    popupElement.classList.remove('popup_opened');
    nameInput.value = userName.textContent; // Добавляем введенное пользователем значение(input_user-name) в поле 
    jobInput.value = aboutUser.textContent; // Добавляем введенное пользователем значение(input_about-user) в поле
}
// Закрываем окно
function closePopup() {
	popupElement.classList.add('popup_opened');
}

editButton.addEventListener('click', openPopup) // Добавляем слушатель событий для edit-button
closeButton.addEventListener('click', closePopup) // Добавляем слушатель событий для close-button

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    userName.textContent = nameInput.value;
    aboutUser.textContent = jobInput.value;
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 