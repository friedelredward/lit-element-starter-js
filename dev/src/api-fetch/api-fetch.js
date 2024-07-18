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

    this.breweries= [];
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
    this._isLoading = false;
    console.log(this._visited, this._notVisited);
  }

  get _listBreweries() {
    return html`
      <ul>
        ${this.breweries.map(brewery => {
          return html`
              <li>
                <brewery-detail 
                  .brewery=${brewery}
                  @toggle-visited=${(e)=>this._toggleVisited(e, brewery)}
                ></brewery-detail>
              </li>
          `;
        })}
      </ul>
    `;
  }

  get _visited(){
    return html`
      ${this.breweries.filter(b => !b.visited).length}
    `;
  }

  get _notVisited(){
    return html`
      ${this.breweries.length - this.breweries.filter(b => !b.visited).length}
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

  _toggleVisited(e, breweryToUpdate){
    //we using map because we need to mutate array
    //toogle only in the given brewery(we go through all)
    if(e && e.detail){
      this.breweries = this.breweries.map(brewery =>{
        return brewery === breweryToUpdate ? 
          {...brewery, visited: !brewery.visited }
          : brewery;
      });
    }
  }
}

window.customElements.define('api-fetch', ApiFetch);
