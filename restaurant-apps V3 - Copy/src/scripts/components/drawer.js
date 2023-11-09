class CustomDrawer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav id="drawer" class="nav">
    <ul class="nav__list">
      <li class="nav__item"><a href="#/home">Home</a></li>
      <li class="nav__item"><a href="#/favorite">Favorite</a></li>
      <li class="nav__item"><a href="https://github.com/kevinws20" target="_blank" rel="noopener noreferrer">About Us</a></li>
    </ul>
  </nav>
      `;
  }
}

customElements.define('custom-drawer', CustomDrawer);
