class CustomHeader extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <header class="header">
    <div class="header__inner">
      <h1 tabindex="0" class="header__title">VK's Restaurant</h1>
    </div>
    <a href="#" tabindex="0" id="menu" class="header__menu">☰</a>
  </header>
      `;
  }
}

customElements.define('custom-header', CustomHeader);
