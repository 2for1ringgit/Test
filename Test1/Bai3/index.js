

  document.getElementById("addToList").addEventListener("submit", function () {
    event.stopPropagation();
    var list = document.createElement("li");
    var authorName = document.getElementById("authorName").value;
    var bookName = document.getElementById("bookName").value + " -";
    var b = document.createTextNode(authorName);
    var a = document.createTextNode(bookName);
    list.appendChild(a);
    list.appendChild(b);
    const bookList = {
      bookName: bookName,
      authorName: authorName,
    };
    if (authorName === "") {
      alert("Tên tác giả không được bỏ trống");
    }
    if (bookName === "") {
      alert("Tên sách không được bỏ trống");
    } else {
      document.getElementById("bookList").appendChild(list);
      db.collection("book").add(bookList);
    }
    const author = this.$authorName;
    const name = this.$bookName;
    bookDoc(name, author);
    db.collection("book").add(bookDoc);

    document.getElementById("authorName").value = "";
    document.getElementById("bookName").value = "";
  });

  var all = document.getElementById("bookList");
  all.addEventListener(
    "click",
    function (event) {
      if (event.target.tagName === "li") {
        event.target.classList.toggle("read");
      }
    },
    false
  );


class AllBook extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(
      document.getElementById("allBook").content.cloneNode(true)
    );
    this.$book = this._shadowRoot.querySelector("#book");
    this.$author = this._shadowRoot.querySelector("#author");
    this.$bookName1 = this._shadowRoot.querySelector("#bookNameTest");
    this.$authorName1 = this._shadowRoot.querySelector("#authorNameTest");
    this.$addToList1 = this._shadowRoot.querySelector("#addToListTest");
    
    this.$addToList1.addEventListener("click", (event) => {
      event.stopPropagation();
      
      this.$bookName1.value = "";
      this.$authorName1.value = "";
      this.$book.innerHTML = this.$bookName1.value;
      this.$author.innerHTML = this.$authorName1.value;
    });
    
    // const author = this.$authorName1;
    // const name = this.$bookName1;
    // bookDoc(name, author);
    // db.collection("book").add(bookDoc);
  }
  
}
customElements.define("all-book", AllBook);
