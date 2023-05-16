# COMP2110 Portal - Starter
-----------------------------------------------------------------------------------------
*Beginning of documentation*
The project has been created in a way to display 4 different widgets, with the first two uploaded being a widget which will show a random fact about the current day
selected and the other widget being a currency-converter which converts 5 different currencies inbetween one another. The next two to be implemented are a calender widget which indicates the upcoming public holidays as well as which country it may be for and the final widget, a dad joke widget which will update and display a new dad joke from the example api.

## Blog post
Alongside these 4 widgets a blogpost javascript file was created in order to be able to post messages to the blog forum through a gui format. Here the blogpost widget will include a title input box and a content input box in order to allow for seperation of content when posting to the forum. There will also be a post button itself which will send the post request to the dev/blog server and refresh the page so that the user is able to visualise what they have sent.

## Currency Conversion Widget (Tudor)
-- 1st iteration: With my widgets first iteration of the simple conversion without lit implementation I set out to integrate the code into the widget-block.js skeleton code. While being able to implement it into lit, the issue came with the input fields as the user had to input whichever currency they would like to convert, in capital letters and accurate to the currency's acronym. Research begins into a drop down auto input method to make it easier on the user's end.

--2nd iteration: Using the map() function I have displayed the different types of currencies possible allowing the user to select their preferred currency without having to manually type which currency they would like.

## Next Public Holiday Widget (Allan)
-- First Iteration: The widget was aimed to display the next upcoming public holiday for a country that is selected in the selection form. The widget will take the API from the Nager.Date API page and returns the JSON data for the specified country API. Adjusted the wording of the output to show the date in DD-MM-YYYY format with the Days having a suffix and the Months being in words.

-- Second Iteration: Since the API contains the data of the next "regional" public holiday, it is best that I will take the next holiday that is celebrated by the entire country rather than it being just one part of the country. Altered the JS code to reflect that idea.

-- Third Iteration: Changed the widget so that it will able to show both regional and country-wide holidays. If it's a regional, it will display a paragraph that tells that it is regional and has a selection with regions celebrating it, while the country-wide holidays shows only the paragraph that tells that it's a country-wide holiday.

## Dad Joke Widget (Harrison)
-- First iteration: At first I attempted to create a weather widget. To create the weather widget I attempted to follow the principles laid out in the assigment details as well as the information provided from the API. I planned to use the OpenMeteo API to display the current weather details and the geolocation API to display the weather details of wherever the user is accessing the website from. However, the geolocation API seemed to not work as it was denied permission. Seeing as I could not get the geolocation API to work, the weather data was not being displayed with the widget. As a result of not being able to create a functioning weather widget, I decided to choose the Dad Jokes widget instead.

-- Second iteration: Seeing as I was having issues with the weather widget and was unable to make it work properly, I decided to look at the list of other APIs available and choose one from there. I decided upon the Dad Jokes API by icanhazdadjoke. The Dad Joke widget works by fetching random jokes from the API and displaying them in the widget block. By following the information provided from the website https://icanhazdadjoke.com/api, I was able to create the widget accordingly and correctly fetch the list of jokes provided by the API with no issues. A new joke is displayed everytime the users refresh the web portal as well as when the click the "New Joke" button that is coloured blue.

## Date Fact Widget (Jaden)
-- First iteration: The widget's first iteration is simply to display the date and a quick fact about the date in text underneath. It has no structure to it all all, simply one block of text followed by another. This did not have any issues as it only requires fetching a small piece of data from the numbers API website.

-- Second iteration: To fit the widget into the widget sections, this was done by adding some css to enable it to fit into the allocated widget block.

-----------------------------------------------------------------------------------------

## Backend Server

Your portal will make use of a server that we have implemented that is running on <https://comp2110-portal-server.fly.dev/>.   Documentation for the services it provides
is in [this Github repository](https://github.com/COMP2110-2023/comp2110-portal-server/).

## Starter Code

The code included here implements the basic framework for the application, including
an overall page structure and the blog, login and advertising components.  If you run
the application you will see the basic page with space for a number of _widgets_.  
You will fill these slots with your own widgets - one per team member. (A _widget_
is a name for an element of a graphical user interface, basically the same as a
component).

The module `config.js` exports a variable `BASE_URL` that contains the address
of the backend server. This is used for example in the blog-block component
to define the URL endpoint.  You may also want to use it if you make use of
other API endpoints from the server (eg. tasks).

The code contains implementations of the following components:

### `<comp2110-portal>`

This is a container for the whole portal application and currently contains 
some of the pre-defined widgets.  You can modify this as you see fit to achieve
your overall application layout and behaviour.

### `<widget-column>`

This component implements a container for widgets and can be used to define
the style information and layout for the group.  You can modify this if you
wish or replace it with something else.

### `<login-widget>`

This component implements a login form that will allow a user to authenticate to the
backend server.   If the user is logged in, the component displays their name and
a logout button rather than the form.  

Authentication is implemented in the `auth.js` module.  Once a user login succeeds,
the current user details are stored in the browser [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API) so that
they persist over browser sessions.  In your code, you can use the function
`getUser()` from the `auth.js` module to find out if a user is logged in and get
their details.  

### `<blog-block>`

This component implements a blog using the backend API from the COMP2110 portal server.
You can modify this component if you wish to change the layout of posts or the overall look and feel.  

This component only supports reading posts although the backend API allows posting new blog
posts if you are logged in.  One possible extension of this component would be to allow
posting in some way.

### `<ad-widget>`

This component displays an advertisement from the backend portal server. You should not
modify it and it should appear somewhere in your page design.


## Possible Widgets to Implement

Your first task is for each team member to choose one widget from the following list
to implement as a Lit component, following the basic outline provided in
`src/components/widget-block.js`.

* Weather forecast with data from <https://api.open-meteo.com/v1/forecast>, e.g.
[this example](https://api.open-meteo.com/v1/forecast?latitude=-33.87&longitude=151.21&current_weather=true).  Location can be fixed or derived from the Javascript 
[Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API).

* Currency conversion with data from <https://exchangerate.host/> e.g. 
[USD to EUR](https://api.exchangerate.host/convert?from=USD&to=EUR).  Your widget should
allow the user to input an amount to be converted and possibly select the to/from
currencies.

* A widget showing a random fact about the current date from <http://numbersapi.com/>,
e.g. <http://numbersapi.com/3/22/date>.

* A widget showing the upcoming public holidays from <https://date.nager.at>, e.g.
[the 2023 Australian holidays](https://date.nager.at/api/v2/publicholidays/2023/AU).
Your widget could allow selection of the country who's holidays are being displayed.

* (Advanced) A TODO task widget using the API provided by the COMP2110 portal backend.
Should show tasks for the current logged in user, allow creation of new tasks and
changing the state of existing tasks (marking them as done).

* Your own design making use of data from an open API (e.g. see [this list](https://mixedanalytics.com/blog/list-actually-free-open-no-auth-needed-apis/)).

--------------------------------------------------------------------------------------------------------------------------------------------------------------

