import { LitElement, html } from 'lit';

export const STATUS = ["(VISITED)", "(NOT_VISITED)"];

/**
 * @fires toggle-visited - Indicates when the visited status changes
 */
export class BreweryDetail extends LitElement {
  static get properties() {
    return {
      brewery: { type: Object },
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

  get _status(){
    return html`
      ${this.brewery.visited ? STATUS[0] : STATUS[1]}
    `;
  }

  get _city(){
    return this.brewery?.city ?? '';
  }

  /**conditional templating!! MUST HAVE _html``_!!! */
  get _statusAndName(){
    return html`${this._status} ${this._name}`;
  }

  get _changeVisibleBtn(){
    return html`
      <button
        @click=${this._toggleVisited}
      >Togle Visited</button>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
  }


  render() {
    console.log("is visited", this._city, this._visited);
    return html` ${this._statusAndName} | ${this._type} |  ${this._city}
      ${this._changeVisibleBtn} 
    `;
  }

  _toggleVisited(){
    this._emitVisitedToogle();
  }

  _emitVisitedToogle(){
    this.dispatchEvent(new CustomEvent('toggle-visited', {detail:{visited: this._visited}}));
  }
}

window.customElements.define('brewery-detail', BreweryDetail);
