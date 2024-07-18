import { LitElement, html, css } from 'lit';
//import { BreweryDetail } from './BreweryDetail';
import './BreweryDetail';

const APIEndpoint = 'https://api.openbrewerydb.org/breweries';
/**
 * An fetch example element.
 */
export class ApiFetch extends LitElement {
  static get properties() {
    return {
      breweries: { type: Array },
      _visited: { type: Number },
      _notVisited: { type: Number },
    }
  }
  constructor() {
    super();

    this._visited = 0;
    this._notVisited = 0;

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
    this._notVisited = this.breweries.length;
  }

  get _listBreweries() {
    return html`
      <ul>
        ${this.breweries.map(brewery => {
          return html`
              <li>
                <brewery-detail 
                  .brewery=${brewery}
                  @toggle-visited=${this._toggleVisited}
                ></brewery-detail>
              </li>
          `;
        })}
      </ul>
    `;
  }

  render() {
    if (this._isLoading) {
      return html`<p>plaholder for loading json....</p>`;
    }
    return html` 
    <h2>Breweries list</h2>
    ${this._listBreweries}
    <p> Total Visited : ${this._visited}</p>
    <p> NOT Visited : ${this._notVisited}</p>
    `;
  }

  _toggleVisited(e){
    if(e && e.detail){
      if(e.detail.visited){
        this._visited += 1;
        this._notVisited -= 1;
      }else{
        this._visited -= 1;
        this._notVisited += 1;
      }
    }
  }
}

window.customElements.define('api-fetch', ApiFetch);
