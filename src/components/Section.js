export class Section {
    constructor({ renderer }, containerSelector ) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    // Содержит публичный метод, который отвечает за отрисовку всех элементов
    rendererAll(dataBase) {
        dataBase.forEach(item => {
            this._renderer(item)
        });
    }
    // Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер
    addItem(domElement) {
        this._container.prepend(domElement);
    }
}