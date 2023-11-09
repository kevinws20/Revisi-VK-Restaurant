class Hero extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="hero" id="hero">
      <div class="hero__inner">
        <h1 tabindex="0" class="hero__title">We serve you best experience and taste</h1>
        <p tabindex="0" class="hero__tagline">
          Spread across several big cities in Indonesia
        </p>
      </div>
    </div>
      `;
  }
}

customElements.define('custom-hero', Hero);
