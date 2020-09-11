class bookItem extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._shadowRoot.appendChild(document.getElementById("bookItem").content.cloneNode(true));
        this.$name = this._shadowRoot.querySelector("#name");
        this.$noOfMems = this._shadowRoot.querySelector("#no-of-mems");
        this.$archive = this._shadowRoot.querySelector("#archive");
        this.$container = this._shadowRoot.querySelector("#container");
        this.$name.addEventListener("click", (event) => {
            db.collection("book").doc(`${event.target.innerHTML}`).update({
                archive: "Đã đọc",
            });
        })

    }
    static get observedAttributes() {
        return ['name', 'no-of-mems', "archive"];
    }

    set name(newVal) {
        this.setAttribute('name', newVal);
    }

    get name() {
        return this.getAttribute('name')
    }

    set noOfMems(newVal) {
        this.setAttribute('no-of-mems', newVal)
    }

    get noOfMems() {
        return this.getAttribute('no-of-mems')
    }

    set archive(newVal) {
        this.setAttribute('archive', newVal);
    }

    get archive() {
        return this.getAttribute('archive')
    }

    attributeChangedCallback() {
        this.$name.innerHTML = this.name;
        this.$noOfMems.innerHTML = this.noOfMems;
        this.$archive.innerHTML = this.archive;
    }
}

customElements.define('book-item', bookItem);