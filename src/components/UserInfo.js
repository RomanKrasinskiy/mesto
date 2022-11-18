export class UserInfo {
    constructor({ userName, aboutUser }) {
        this._userName = document.querySelector(userName);
        this._aboutUser = document.querySelector(aboutUser);
    }
    // возвращаем объект с текущими данными DOM
    getUserInfo() {
        const userInfo = {};
        userInfo.userName = this._userName.textContent;
        userInfo.aboutUser = this._aboutUser.textContent;
        return userInfo;
    }
    
    // вставляем в DOM полученные данные из инпутов
    setUserInfo(inputValues) {
        this._userName.textContent = inputValues.userName;
        this._aboutUser.textContent = inputValues.aboutUser;
        
    }
}