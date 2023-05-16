import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class DadJokeWidget extends LitElement {
  static properties = {
    joke: { type: String }
  }

  static styles = css`
    :host {
      display: block;
      padding: 16px;
      box-sizing: border-box;
      text-align: center;
    }

    div{
      width: 275px;
      min-height: 275px;
      border: solid 5px;
      background-color: lightblue;
    }

    h3 {
      margin-top: 1em;
      font-size: 25px;
      text-decoration: underline;
      font-family: "Lucida Console", Times, monospace;
    }

    p {
      margin-top: 16px;
      margin-bottom: 24px;
      margin-left: auto;
      margin-right: auto;
      font-size: 16px;
      line-height: 1.5;
      font-family: "Comic Sans MS", cursive, sans-serif;
    }

    button {
      padding: 8px 16px;
      font-size: 18px;
      border-radius: 4px;
      border: solid 3px black;
      background-image: linear-gradient(blue, aqua);
      color: black;
      cursor: pointer;
      transition: color 0.5s, border 0.5s;
    }

    button:hover {
      color: white;
      border: solid 3px white;
    }

    button:active {
      background-image: linear-gradient(aqua, blue);
    }
  `;

  constructor() {
    super();
    this.joke = 'Loading...';
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchJoke();
  }

  fetchJoke() {
    this.joke = 'Loading...';

    fetch('https://icanhazdadjoke.com/', {
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.joke = data.joke;
      })
      .catch(error => {
        this.joke = 'An error occurred while fetching the joke. Please try again later.';
        console.error(error);
      });
  }

  render() {
    return html`
      <div>
      <h3>Dad Joke of the Day</h3>
      <p>${this.joke}</p>
      <button @click="${this.fetchJoke}">New Joke</button>
      </div>
    `;
  }
}

customElements.define('dad-joke-widget', DadJokeWidget);
