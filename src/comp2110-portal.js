import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './components/widget-block.js';
import './components/blog-block.js';
import './components/widget-column.js';
import './components/ad-widget.js';
import './components/login-widget.js';
import './components/date-widget.js';
import './components/currency-converter.js';
import './components/dad-joke.js';
import './components/holiday-widget.js';
import './components/blog-post.js'

class Comp2110Portal extends LitElement {
  static properties = {
    header: { type: String },
  }

  static styles = css`
    :host {
      min-height: 100vh;   
      font-size: 14pt;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
    }


    .header-block{
      width: 90%;
      margin-top: 1em;
      margin-left: auto;
      margin-right: auto;
      padding: 2em;

      color:white;
    }

    main {
      display: flex;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;

  constructor() {
    super();
    this.header = 'COMP2110 Portal';
  }

  render() {
    return html`
      <header>
        <div class = "header-block">
        <h1>${this.header}</h1>
        <login-widget></login-widget> 
        </div>
      </header>

      <main>
        <widget-column header="">
          <currency-converter></currency-converter>
          <holiday-widget></holiday-widget>
          <ad-widget></ad-widget>
        </widget-column>
        <blog-block></blog-block>       
        <widget-column header="">
        <dad-joke-widget></dad-joke-widget>
        <date-fact-widget></date-fact-widget>
        <blog-post></blog-post> 
          
        </widget-column>
      </main>

      <p class="app-footer">
        A product of the COMP2110 Web Development Collective &copy; 2023
      </p>
    `;
  }
}

customElements.define('comp2110-portal', Comp2110Portal);
