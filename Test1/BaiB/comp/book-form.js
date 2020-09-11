import { stopClick } from "../stopClick.js";
import {checkError} from "../controller/auth.js";

class ConForm extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._shadowRoot.appendChild(
            document.getElementById("bookForm")
                .content.cloneNode(true));

        this.$form = this._shadowRoot.querySelector("#form");
        this.$bookInput = this._shadowRoot.querySelector('form-input[name="Tên sách"]');
        this.$authorInput = this._shadowRoot.querySelector('form-input[name="Tên tác giả"]');

        this.$form.addEventListener('submit', (event) => {
            event.preventDefault();
            const book = this.$bookInput.value;
            const author = this.$authorInput.value;
            const result=checkError(book,author);
            if(result.hasError){
                this.$bookInput.error=result.error.book;
                this.$authorInput.error=result.error.author;
            }else{
                this.$bookInput.error="";
                this.$authorInput.error=""
                this.createBook(book, author)
            }
        });
    }
    createBook(name, author) {
        const bookDoc = {
            book: name,
            author: author,
            archive: "Chưa đọc",
            createAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        db.collection("book").doc(`${name}`).set(bookDoc);
    }
    connectedCallback() {
        stopClick(this._shadowRoot);
    }
}

customElements.define('book-form', ConForm);