import { LitElement, html } from 'lit';

export class BreweryDetail extends LitElement {
  static get properties() {
    return {
      brewery: { type: Object }
    }
  }
  constructor() {
    super();

    this.brewery = {};
  }

  get _name(){
    return this.brewery?.name ?? '';
  }

  get _type(){
    return this.brewery?.brewery_type ?? '';
  }

  get _city(){
    return this.brewery?.city ?? '';
  }

  connectedCallback() {
    super.connectedCallback();
  }



  render() {
    return html` ${this._name}, ${this._type},  ${this._city},  
    `;
  }
}

window.customElements.define('brewery-detail', BreweryDetail);
