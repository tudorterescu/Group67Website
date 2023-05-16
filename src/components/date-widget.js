import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class DateFactWidget extends LitElement {
  static properties = {
    fact: { type: String }
  }

  static styles = css`
  div{
    width:275px;
    height:275px;
    background-image: linear-gradient(purple, blue);
    border: solid 5px;
    margin: 1em;
  }
  h2{
    color: white;
  }
  p{
    color: white;
    font-family: "Comic Sans MS", cursive, sans-serif;
    font-size: 0.9em
  }`

  constructor() {
    super();
    this.fact = '';
    this._fetchFact();
  }

  _fetchFact() {
    // Define the API endpoint URL
    const url = `http://numbersapi.com/${new Date().getMonth()+1}/${new Date().getDate()}/date`;
    console.log(url);
    // Fetch the data from the API endpoint
    fetch(url)
      .then(response => {
        // If the request was successful, parse the response body as text
        if (response.ok) {
          return response.text();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        // Update the fact property with the fetched data
        this.fact = data;
        console.log('Fetched fact:', data);
      })
      .catch(error => {
        // Log any errors to the console
        console.error('There was a problem fetching the data:', error);
      });
  }
  render() {
    const date = new Date().toLocaleDateString();
    return html`
      <div>
        <h2>Today's Date</h2>
        <p>${date}</p>
        <p>Did you know that ${this.fact.replace(/\.$/, '')}?</p>
      </div>
    `;
  }

}

customElements.define('date-fact-widget', DateFactWidget);
