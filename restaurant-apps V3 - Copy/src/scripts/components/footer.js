class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <footer>
      <div class="title-footer">
        <p tabindex="0">Copyright &copy; 2023 - VK's Restaurant</p>
      </div>
    </footer>
      `;
  }
}

customElements.define('custom-footer', CustomFooter);
