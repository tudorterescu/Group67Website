import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class PublicHoliday extends LitElement {
    static properties = {
        country: { type: String },
        _data: { state: true },
        countiesList: {type:Array}
    }

    //Changing the style for the elements
    static styles = css`
        :host{
            font-family: Verdana;
        }

        div{
            border:solid 5px;
            margin: 1em;
            padding: auto;
            display: block;
            width: 275px;
            height: auto;
            background-color: lightblue;
        }

        .inner{
            margin: 0;
            border: solid 5px white;
            border-radius: 10px;
            margin: 5px auto 5px auto;
            padding: 0px;
            width: 250px;
            background-color: white;
        }

        .country{
            margin-top: 5px;
            font-size: 15px;
            width: auto;
            height: auto;
            padding: 3px;

        }
        .counties{
            margin-bottom: 10px;
            text-align: center;
            font-size: 20px;
            width: auto;
            height: auto;
        }

        h2{
            text-align: center;
            color: darkgreen;
        }

        p{
            text-align: center;
            margin: 5px;
        }

        .second{
            margin-top: 10px;
        }
    `;

    //Creating the static variable for the API URL.
    static url = 'https://date.nager.at/api/v3/NextPublicHolidays/'

    constructor() {
        super();
        // Default Selection for widget selection box
        this.country = "AU";
        // Countries within the selection box
        this._countries = ['AT','AU','BE','BR','CA','CN','DE','FI','FR','GB','GR','ID','IS','IT','JP','KR','MX','NZ','PL','RU','SG','VN'];
        // All the months in the year that will be used to convert the month in the date from a number to the respective month word.
        this._months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        this.countiesList = [];
    }

    connectedCallback() {
        super.connectedCallback();
        this._fetch();
    }

    // Fetching and retrieving the data of the API via the JSON.
    _fetch() {
        fetch(PublicHoliday.url + this.country)
            .then(response => response.json())
            .then(data => {
                this._data = data;
            })
            // Catch in case an error occurred when retrieving data from the fetch() function.
            .catch(error => console.error("ERROR: " + error));
    }

    //Static functon used to changed the country from the selection
    _changeCountry(selection) {
        this.country = selection.target.value;
        this._data = undefined;
        this._fetch();
    }

    render() {
         if (this._data) {
            
            // Get the first item in the JSOn
            let nextHoliday = this._data[0]
      
            // Getting all regions celebrating the regional holiday and remove the country from the string
            let countiesList = nextHoliday.counties;
            
            // If the holiday contains regions (counties), we will need to get the names of all counties without the countries prefix (e.g. AU-NSW to NSW)
            if(countiesList != null){
                for(let i = 0; i < countiesList.length; i++){
                    countiesList[i] = countiesList[i].replace(this.country + '-','')
                } 
            }

            // Splitting the date of the next regional public holiday and put it in the variable
            var dateSetup = nextHoliday.date.split('-')

            // Converted the string into integers for better conversion
            for (let i = 0; i < dateSetup.length; i++) {
                dateSetup[i] = parseInt(dateSetup[i])
            }

            // Converting the month number to the correct month name
            dateSetup[1] = this._months[dateSetup[1] - 1]

            // Adding the month day suffix
            if (dateSetup[2] % 10 == 1 && dateSetup[2] != 11) {
                dateSetup[2] = dateSetup[2] + 'st'
            } else if (dateSetup[2] % 10 == 2 && dateSetup[2] != 12) {
                dateSetup[2] = dateSetup[2] + 'nd'
            } else if (dateSetup[2] % 10 == 3){
                dateSetup[2] = dateSetup[2] + 'rd'
            } else {
                dateSetup[2] = dateSetup[2] + 'th'
            }

            // Rendering the widget
            // Added a condition based element where if the holiday is regional, it will display a paragraph rather than a selection list
            return html`
            <div>
            <form>
                <select:before> Select a country: </select:before>
                <select class ="country" @change=${this._changeCountry}>
                    ${this._countries.map(country => {
                let selected = country == this.country;
                return html`<option name=${country} ?selected=${selected}> ${country}</option>`
            })}
                </select>
            </form>
            <div class = 'inner'>
            <p>The next Public Holiday is: </p>
            <h2><em>${nextHoliday.name}</em></h2>
            <p>Celebrated at the: </p>
            <h2>${dateSetup[2]} of ${dateSetup[1]}, ${dateSetup[0]}</h2>
            
            
            ${countiesList != null
            ? html` 
                <p class = 'first'> This is a Regional Public Holiday. </p>
                <p class = 'second'> Regions celebrating the holiday: </p>
            <select class = 'counties'>
                ${countiesList.map(county => html`<option value="${county}">${county}</option>`)}
            </select>`
            
            :html`
                <p> This is a Country-Wide Public Holiday</p>`}
            
            </div>
            
            </div>`
        } else {
            return html`
            <div>
                <p> Loading Country </p>
            </div>`
        }
    }
}

customElements.define('holiday-widget', PublicHoliday)