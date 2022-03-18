export default class UserInfo {
    constructor({ userName, userAbout }) {
        this._userName = userName;
        this._userAbout = userAbout;
    }

    getUserInfo() {
        this._userData = {
            username: this._userName.textContent,
            userabout: this._userAbout.textContent
        }

        return this._userData;
    }

    setUserInfo(userForm) {
        this._userName.textContent = userForm.username;
        this._userAbout.textContent = userForm.userabout;
    }
}