export class UserInfo {
    constructor({ name, about, avatar }) {
        this._name = document.querySelector(name);
        this._about = document.querySelector(about);
        this._avatar = document.querySelector(avatar);
    }
    // возвращаем объект с текущими данными DOM
    getUserInfo() {
        const userInfo = {};
        userInfo.name = this._name.textContent;
        userInfo.about = this._about.textContent;
        userInfo.avatar = this._avatar.src;
        userInfo._id = this._id;
        return userInfo;
    }
    // вставляем в DOM полученные данные из инпутов
    setUserInfo(inputValues) {
        this._name.textContent = inputValues.name;
        this._about.textContent = inputValues.about;
        this._avatar.src = inputValues.avatar;
        this._id = inputValues._id;
    }
}