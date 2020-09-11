class bookList extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._shadowRoot.appendChild(
            document.getElementById("List").content
                .cloneNode(true));

        this.$btnAddBook = this._shadowRoot.querySelector("#btnAddBook");
        this.$bookList = this._shadowRoot.querySelector("#bookList");
        this.$CreateBook = this._shadowRoot.querySelector('#CreateBook')
        this.$btnAddBook.addEventListener('click', () => {
            this.$CreateBook.classList.add("visible")
            this.CreateBook();
        });
        this.$CreateBook.addEventListener('click', () => {
            this.$CreateBook.classList.remove("visible");
        });
        this.render();

    }

    CreateBook() {
        const bookItem = document.createElement('book-form');
        this.$CreateBook.appendChild(bookItem);
    }
    render() {
        db.collection("book")
            .onSnapshot((querySnapshot) => {
                this.$bookList.innerHTML = "";
                querySnapshot.forEach((doc) => {
                    this.item = doc.data();
                    this.addBook(this.item.book, this.item.author, this.item.archive);
                });
            });
    };
    addBook(name, noOfMems, archive) {
        const bookItem = document.createElement('book-item');
        bookItem.name = name;
        bookItem.noOfMems = noOfMems;
        bookItem.archive = archive;
        this.$bookList.appendChild(bookItem);
    }

}

customElements.define('con-list', bookList);