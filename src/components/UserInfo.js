export default class UserInfo {
    constructor({ userSelector }) {
        this._userName = document.querySelector(userSelector.name);
        this._userAbout = document.querySelector(userSelector.about);
        this._userAvatar = document.querySelector(userSelector.avatar);

        this._id = '';
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            about: this._userAbout.textContent,
            avatar: this._userAvatar.src
        }
    }

    setAllInfo(userData) {
        this._userName.textContent = userData.name;
        this._userAbout.textContent = userData.about;
        this._id = userData._id;
        this._userAvatar.src = userData.avatar;
    }

    getId() {
        return this._id;
    }
}