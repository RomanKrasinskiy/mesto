let userName = document.querySelector('.profile__user-name'); // Называем поле -имя
let aboutUser = document.querySelector('.profile__about-user'); // Называем поле -информация о пользователе
let editButton = document.querySelector('.edit-button'); // Называем кнопку редактирования профиля
let popupElement = document.querySelector('.popup'); // Называем всплывающее окно
let closeButton = document.querySelector('.popup__close-button'); // Называем кнопку закрытия всплывающего окна
// Находим форму в DOM
let formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__user-name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__about-user'); // Воспользуйтесь инструментом .querySelector()

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

    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    userName.textContent = nameInput.value;
    aboutUser.textContent = jobInput.value;
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 