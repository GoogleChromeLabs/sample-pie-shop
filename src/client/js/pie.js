(function() {
  class PieGen extends HTMLElement {
    static get observedAttributes() {
      return ['dough', 'filling', 'topping'];
    }
    constructor() {
      super();
      this.img = document.createElement('img');
      this.img.src = `/piegen/pie-svg`;
      this.appendChild(this.img);
    }
    _getSvgUrl() {
      const topping = this.getAttribute('topping');
      const dough = this.getAttribute('dough');
      const filling = this.getAttribute('filling');
      return `/piegen/pie-svg?topping=${topping}&filling=${filling}&dough=${dough}`;
    }
    attributeChangedCallback(name, oldVal, newVal) {
      if (['topping', 'dough', 'filling'].includes(name)) {
        this.img.src = this._getSvgUrl();
      }
    }
  }
  window.customElements.define('pie-gen', PieGen);
})();
