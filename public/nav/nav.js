const template = document.createElement("template");
template.innerHTML = `
    <style>
      nav {}
      ul {
        padding: 0;
        list-style: none;
        display: flex;
      }
      li {
        padding: 5px;
      }
      a {
        text-decoration: none;
        color: black;
      }
      a:hover {
        color: green;
      }
    </style>
    <nav> 
      <ul>
          <li><a href="index">Home</a></li>
          <li><a href="chat">Chat</a></li>
          <li><a href="about">About</a></li>
      </ul>
    </nav>
`;

class EthanNav extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define("ethan-nav", EthanNav);