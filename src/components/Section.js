export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element) {
        const card = this._renderer(element)
        this._container.prepend(card);;
    }

    renderItems(items) {
        items.reverse().forEach(item => {
            this.addItem(item);
        });
    }
}