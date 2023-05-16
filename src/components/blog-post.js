import { LitElement, html,css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { getUser } from '/src/auth.js'

class BlogPost extends LitElement {

  static properties = {
    token: { type: Number },
    title: { type: String },
    content: { type: String }
}

static styles = css`
    form{
      display: grid;
      margin: 1em;
      border: solid 5px;
      background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);

    }
    
    label{
      margin-top: 1em;
      font-weight: bold;
    }

    .title {
      margin: 0 1em 1em 1em;
      border:solid;
    }

    .content{
      margin: 0 1em 1em 1em;
      border: solid;
      height: 200px;
      resize: none;
    }
    
    .post-button{
      margin: 5px auto 5px auto;
      width: 150px;
      background-color: #dddddd;
      font-size: 18px;
      transition: background-color 0.25s;
    }
    
    .post-button:hover{
      background-color: #eeeeee;
    }
    
    .post-button:active{
      background-color: #ffffff;
    };
  `

  constructor() {
    super();
    this.title = '';
    this.content = '';
    this.token = '';
  }

  render() {
    return html`
      <form @submit="${this._handleSubmit}">
        <label for="title">Title</label>
        <input type="text" class="title" name="title" .value="${this.title}" required>
        <label for="content">Content</label>
        <textarea class="content" name="content" .value="${this.content}" required></textarea>
        <button type="submit" class="post-button">Post</button>
      </form>
    `;
  }

  _handleSubmit(event) {
    event.preventDefault();
    // get the user information, including the token
    const token = getUser()?.token;


    // get the form data
    const formData = new FormData(event.target);
    const postData = {
      title: formData.get('title'),
      content: formData.get('content')
    };

    // set the URL for the blog endpoint
    const url = 'https://comp2110-portal-server.fly.dev/blog';

    // set the request headers, including the authorization code
    const headers = {
      'Authorization': `Basic ${token}`,
      'Content-Type': 'application/json'
    };

    // set up the request options
    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(postData)
    };

    // send the request to the server
    fetch(url, options)
      .then(response => {
        if (response.ok) {
          console.log('Blog post created successfully');
          window.location.reload();
        } else {
          console.log(`Error creating blog post: ${response.status} ${response.statusText}`);
        }
      })
      .catch(error => console.error(`Error creating blog post: ${error}`));
  }

}

customElements.define('blog-post', BlogPost);