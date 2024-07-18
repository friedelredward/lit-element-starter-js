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

    this.breweries = [];
    this._totalBreweries = [];
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.breweries.length === 0) {
      this.fetchBreweries();
    }
  }

  async fetchBreweries() {
    this._isLoading = true;
    const response = await fetch(APIEndpoint);
    const jsonResponse = await response.json();
    this.breweries = jsonResponse;
    this._totalBreweries = this.breweries;
    this._isLoading = false;
  }

  get _listBreweries() {
    return html`
      <ul>
        ${this.breweries.map((brewery, index) => {
      return html`
              <li>
                <brewery-detail 
                  .brewery=${brewery}
                  @toggle-visited=${(e) => this._toggleVisited(e, brewery, index)}
                ></brewery-detail>
              </li>
          `;
    })}
      </ul>
    `;
  }

  get _visited() {
    return html`
      ${this.breweries.filter(b => b.visited).length}
    `;
  }

  get _notVisited() {
    return html`
      ${this.breweries.length - this.breweries.filter(b => b.visited).length}
    `;
  }

  render() {
    if (this._isLoading) {
      return html`<p>plaholder for loading json....</p>`;
    }
    return html` 
    <h2>Breweries list</h2>
    <button @click=${this._showAll}>Show all</button>
    <button @click=${this._showVisited}>Show visited</button>
    <button @click=${this._showNotVisited}>Show NOT visited</button>
    <p> Total Visited : ${this._visited}</p>
    <p> NOT Visited : ${this._notVisited}</p>
    ${this._listBreweries}
    `;
  }

  _toggleVisited(e, breweryToUpdate, index) {
    //we using map because we need to mutate array
    //toogle only in the given brewery(we go through all)
    if (e && e.detail) {
      this.breweries = this.breweries.map(brewery => {
        return brewery === breweryToUpdate ?
          { ...brewery, visited: !brewery.visited }
          : brewery;
      });

      this._totalBreweries[index].visited = !breweryToUpdate.visited;
    }
  }

  _showAll() {
    this.breweries =  [...this._totalBreweries];
  }

  _showVisited(){
    this.breweries= [...this._totalBreweries.filter(b=> b.visited)];
  }

  _showNotVisited(){
    this.breweries= [...this._totalBreweries.filter(b=> !b.visited)];
  }
}

window.customElements.define('api-fetch', ApiFetch);
