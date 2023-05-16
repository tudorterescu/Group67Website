import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class CurrencyConverter extends LitElement {
  static properties = {

    firstinput: { type: String },
    secinput: { type: String },
    amount: { type: Number },
    convertedAmount: { type: Number },
    currencyList: { type: Object },
    BASE_URL: { type: String },

  }

  static get styles() {
    return css`
     div{
      width:275px;
      weight:auto;
      border:solid 5px;
      margin: 1em;
      font-family: "Comic Sans MS", cursive, sans-serif;
      background-color:lightblue;
    } 
    
    h3{
      font-size: 28px;
      color: black;
      font-family: "Comic Sans MS", cursive, sans-serif;
    }

    b {
      color:red;
    }

    p {
      margin-top: 10px;
      font-weight: bold;
      color: red;
    }

    
    label {
        display: block;
        margin-bottom: 5px;
        font-size: 20px;
        font-weight: bold;
        color: black;
      }

      select {
        width: 250px;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 3px;
        box-sizing: border-box;
        font-size: 14px;
        margin-bottom: 10px;
      }

      input[type="number"] {
        width: 100px;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 3px;
        box-sizing: border-box;
        font-size: 14px;
        margin-bottom: 10px;
      }      

    .btn {
      align-items: center;
      background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);
      border: solid 2px black;
      border-radius: 8px;
      box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
      box-sizing: border-box;
      color: black;
      display: center;
      font-family: Phantomsans, sans-serif;
      font-size: 20px;
      justify-content: center;
      line-height: 1em;
      max-width: 100%;
      min-width: 140px;
      transition: color 0.5s, border 0.5s;
    }

    .btn:hover{
      color: white;
      border: solid 2px white;
    }

    .btn:active{
      background-image: linear-gradient(144deg,#5B45F3, #AF44FF 50%,#00DDEB);
    }

    `;
  }

  constructor() {
    super();
    this.firstinput = ''; //First input text box
    this.secinput = ''; //Second input text box
    this.amount = 1; //Input amount
    this.convertedAmount = 0;
    this.currencyList = {}; //an array of possible currencies
    this.BASE_URL = 'https://api.exchangerate.host/latest';
  }

  async firstUpdated() { //an async function to wait for the newcurlist function to finish executing and then this updates the current list of currencies after this occurence.
    await this.newcurlist();
  }

  /*An async function which fetches the api data from the exchangerate host symbol url and the function then waits for the json method is called to parse the json data
  and this data is then asigned to the apidata variable which is then asigned to the currencylist allowing the list to display the currency symbols instead of full names 
  when the user is reading and inputting which currency they would like to use.
  */
  async newcurlist() {
    const fetchrep = await fetch(`https://api.exchangerate.host/symbols`);
    const apidata = await fetchrep.json();
    this.currencyList = apidata.symbols;
  }
  //Async function to convert the amount inputted by the user by the apidata.rates variable from the second input currency
  async conrate() {
    const fetchrep = await fetch(`https://api.exchangerate.host/latest?base=${this.firstinput}&symbols=${this.secinput}`);
    const apidata = await fetchrep.json();
    this.convertedAmount = this.amount * apidata.rates[this.secinput];
  }

  //render function to display the widget html with the labels using the map() function to present a dropdown menu for the user to select from
  //Button click function also included so that the user has a GUI input in the conversion
  render() {
    return html`
    <div>  
    <h3>Currency Converter</h3>

      <label for="base-currency">Starting Currency</label>
      <select id="base-currency" @change="${(e) => this.firstinput = e.target.value}">
        ${Object.keys(this.currencyList).map((currency) => html`
          <option value="${currency}" ?selected=${currency === this.firstinput}>${currency}</option>
        `)}
      </select>


      <label for="target-currency">Desired Currency:</label>
      <select id="target-currency" @change="${(e) => this.secinput = e.target.value}">
        ${Object.keys(this.currencyList).map((currency) => html`
          <option value="${currency}" ?selected=${currency === this.secinput}>${currency}</option>
        `)}
      </select>


      <label for="amount">Amount to be converted:</label>
      <input id="amount" type="number" .value="${this.amount}" @input="${(e) => this.amount = e.target.value}">
        <button class="btn" @click="${this.conrate}">Convert</button>
        <p><b>Converted Amount:</b> ${this.convertedAmount.toFixed(2)} ${this.secinput}</p>

      </div>
    `;
  }
}

customElements.define('currency-converter', CurrencyConverter);
