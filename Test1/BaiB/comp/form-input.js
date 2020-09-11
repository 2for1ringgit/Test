class FormInput extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._shadowRoot.appendChild(document.getElementById("formInput").content.cloneNode(true));
        this.$input = this._shadowRoot.querySelector("#input");
        this.$label = this._shadowRoot.querySelector("#label");
        this.$errorMsg = this._shadowRoot.querySelector("#errorMsg");
        this.$container = this._shadowRoot.querySelector("#container");
    }
    static get observedAttributes() {
        return ["type", "label", "name", "error"];
    }

    attributeChangedCallback() {
        this.render();
    }

    get value() {
        return this.$input.value;
    }

    set error(newError) {
        this.setAttribute("error", newError);
    }

    get error() {
        return this.getAttribute("error");
    }

    render() {
        this.$input.type = this.getAttribute("type");
        this.$label.innerHTML = this.getAttribute("label");
        if (this.error) {
            this.$errorMsg.innerHTML = this.error;
            this.$container.classList.add("error")
        } else {
            this.$errorMsg.innerHTML = "";
            this.$container.classList.remove("error");
        }
    }
}



customElements.define('form-input', FormInput);