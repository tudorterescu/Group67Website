import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { getUser, storeUser, deleteUser} from '../auth.js';
import { BASE_URL } from '../config.js';

class LoginWidget extends LitElement {
  static properties = {
    loginUrl: { type: String },
    user: {type: String, state: true }
  }

  static styles = css`
    :host {
        display: block;
        width: auto;
        margin-left: auto;
        margin-right: auto;
        padding: 1em;
        border: solid 0px;
        border-radius: 10px;
        background-color: rgba(255,255,255,0.5);
    }
    input[type=submit]{
      background-color: rgb(200,200,200);
      padding: 5px 20px 5px 20px;
    }
    
    input[type=submit]:hover{
      background-color: rgb(255,255,255);
    }
    
    button{
      background-color: rgb(200,200,200);
      padding: 5px 20px 5px 20px;
    }
    button:hover{
      background-color: rgb(255,255,255);
    }`;

  constructor() {
    super();
    this.loginUrl = `${BASE_URL}users/login`;
    this.user = getUser();
  }

  submitForm(event) { 
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    fetch(this.loginUrl, {
        method: 'post',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type': 'application/json'}
    }).then(result => result.json()).then(response => {
        this.user = response;
        storeUser(response);
    })
  }

  logout() {
    deleteUser();
    this.user = null;
  }

  render() {
    if (this.user) {
        return html`<p><b>Logged in as:</b> ${this.user.name}</p><button @click=${this.logout}>Logout</button>`
    } 
    return html`
      <form @submit=${this.submitForm}>
          Username: <input name="username">
          Password: <input type="password" name="password">
          <input type='submit' value='Login'>
      </form>`;
    
  }
}

customElements.define('login-widget',  LoginWidget);