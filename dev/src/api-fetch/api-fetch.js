import {LitElement, html, css} from 'lit';

const APIEndpoint = 'https://api.openbrewerydb.org/breweries';
/**
 * An fetch example element.
 *
 *
 */
export class ApiFetch extends LitElement {
  static get properties() {
    return {
      breweries: { type: Array }
    }
  }
  constructor(){
    super();
    
    this._isLoading= false;
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.breweries) {
      this.fetchBreweries();
    }
  }

  async fetchBreweries() {
    this._isLoading = true;
    const response = await fetch(APIEndpoint);
    const jsonResponse = await response.json();
    this.breweries = jsonResponse;
    this._isLoading = false;
  }

  render() {
    if(this._isLoading){
      return html`<p>plaholder for loading json....</p>`;
    }
    return html` <pre>${JSON.stringify(this.breweries, null, 2)}</pre> `;
  }
}

window.customElements.define('api-fetch', ApiFetch);
