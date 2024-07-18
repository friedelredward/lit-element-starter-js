import {LitElement, html, css} from 'lit';
//import { BreweryDetail } from './BreweryDetail';
import './BreweryDetail';

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
    return html` 
    <h2>Breweries list</h2>
    <ul>
      ${this.breweries.map(brewery =>{
        return html`
          <li>
            <brewery-detail .brewery=${brewery}></brewery-detail>
          </li>
        `;
      })}
    </ul>
    `;
  }
}

window.customElements.define('api-fetch', ApiFetch);
