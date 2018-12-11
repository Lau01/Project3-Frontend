# How To Trip
A trip planner project. [Live Link](https://how-to-trip.herokuapp.com/#/search "Live link"). This is the Repo for the React front end. The back end repo which is used to make API requests and storing user data is [here](https://github.com/Lau01/Project3-backend).

### Inspirations and background
I remember the first utility app I had used was TripView. I decided to make a web app that was similar and looked into the TfNSW Trip Planner API. I had to dissect the JSON data given and choose how to display that data in React. I also wanted to display the data on a Google Maps Component.

If you would try the site with as a logged-in user without signing up use these details:
username: test
email: test@test.com
password: chicken

Here is a preview of the site:
![How-To-Trip Image Preview](https://github.com/Lau01/Project3-Frontend/raw/master/public/site_preview.png "How-To-Trip Image Preview")

### Built With:
#### Front End
* React.js
* HTML/CSS
* Grommet
* Google Maps API
* TfNSW Trip Planner API
* Moment.js

#### Back End
* Node.js
* Express
* MongoDB
* Mongoose

### Dependencies
```
axios
grommet
moment
moment-duration-format
moment-timezone
polished
react
react-dom
react-dropdown
react-google-maps
react-moment
react-router-dom
react-scripts
styled-components
react-spinners
```

### To-Do and Wishlist
* Display trip on Google Maps that has been clicked with accompanying UI
* UI/page for login and signup
* Prevent Google Maps component from re-rendering and only re-render Polylines for routes
* Boundaries on Google Maps component is dynamic
* Add multiple search parameters i.e. Leave now, Arrive by, etc
* Use real time data in the Trip Planner API and display it
* Responsiveness
* Refactor components and add more utility/helper functions
* Error handling for searches, login/signup and unauthorized access
