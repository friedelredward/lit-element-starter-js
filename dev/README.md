# Lit Elements
This directory contains HTML files containing your element for development. By running `npm run build:watch` and `npm run serve` you can edit and see changes without bundling.


- Scaffold ay lit project with **openWC** `npm init @open-wc` [docs here](https://open-wc.org/docs/development/generator/)
 - or use a lit starter-js fork
- MAIN LIFECyCLES : `constructor()` + `render()`
- basic syntax

```js

<!-- Boolean attribute -->
<p ?hidden=${this.isHidden}>I may be in hiding.</p>
<!-- Property -->
<input .value=${this.value}>
<!-- Event listener -->
<button @click=${() => {console.log("You clicked a button.")}}>...</button>
```
- list items are private to the component, the `_listItems property is defined as internal reactive state. It works just like a reactive property, but it isn't exposed as an attribute, and shouldn't be accessed from outside the component.
- NO 2way data binding; event must be used to set:
```js
get input() {
  return this.renderRoot?.querySelector('#newitem') ?? null;
}

addToDo() {
  this._listItems = [...this._listItems,
      {text: this.input.value, completed: false}];
  this.input.value = '';
}
///html
<button @click=${this.addToDo}>Add</button>
```
- changes+caculations Can be made between `render()` and it's return html``....;OJO que no llevan `this.`--->     `${todosOrMessage}`
 - estas propiedades **computadas** también se pueden usar con sintaxis de getter(en la clase no en render)!!

## lifecycles
- [official docs](https://open-wc.org/guides/knowledge/lit-element/lifecycle/#litelement-lifecycle)
- Lifecycle sequence:
	- First update: 
	> constructor -> connectedCallback -> update -> render -> updated -> firstUpdated
	- Subsequent renders:
	> update -> render -> updated
-  `this.requestUpdate();` to manually request re-render
- for array or objects new object will re-render.
	- Can use spread `...` for shallow-copy.
	- **PAY attention to methods** that mutate original or return a new array/object.

--------------------

## Attributes vs properties 

 - attributes for html element, properties for DOM element(live)
1. Attributes are how we can assign (string) data in the HTML representation of an element:
`<input value="foo" />`

2. Properties are how we can assign data in javascript, on the actual DOM element in Javascript:
```js
const input = /* get a reference to the input element */;
input.value = 'foo';

```
3. Notice that we prefixed the `checked` attribute on the checkbox with a **.** . This is special Lit syntax to specifiy we want to set the **property named checked** instead of the _attribute_ named `checked`.
```js
<input
      type="checkbox"
      .checked=${todo.finished}
      @change=${e => this._changeTodoFinished(e, todo)}
    />
```
+++++++++++++++++++++

> It's best to keep the data in your application flowing in one direction from top to bottom. Parent components are responsible for data of child components, including changing this data.

++++++++++++++++++++++

