export default class UserInfo {
    constructor({ userSelector }) {
        this._userName = document.querySelector(userSelector.name);
        this._userAbout = document.querySelector(userSelector.about);
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            about: this._userAbout.textContent
        }
    }

    setUserInfo(userData) {
        this._userName.textContent = userData.name;
        this._userAbout.textContent = userData.about;
    }
}