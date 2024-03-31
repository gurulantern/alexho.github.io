---
title: Travlr Full Stack MEAN Application
date: 2024/3/26
description: Category One Artifact of the SNHU CS Portfolio
tag: web development
author: You
---

[Portfolio](/portfolio) | [Home](/) | [About](/about) | [Posts](/posts)

[Previous: Code Review](/portfolio/codereview) | [Next: Algorithms & Data Structures](/portfolio/artifact2)

---

## Development Narrative

[Link to Github Repository](https://github.com/gurulantern/cs465-fullstack/tree/cs499-enhancement)

For the first artifact, I have chosen the MEAN stack application that I worked on in CS 465 Full Stack Development I. The application uses Node.js as a server, Express as an application framework, MongoDB as the database, and Angular for the single-page admin application. 

I selected this item because, by the end of the course, we had not yet implemented an interface for a client user to manage their data relating to the web application, much of which was detailed as the intent of the app in the software design document. Most of the development was done by following a guide provided in the course. This enhancement was a challenge for me as I had to take more time to understand the architecture and design of the application whereas before I just needed to reference the guide. 

To improve the artifact, I added a login functionality for a Travlr client. I wanted this login function to be separate from the admin login so that a client user couldn’t access the admin backend. I also wanted to add a wishlist functionality for a logged in client user where they could add a trip package to their personal wishlist. 

Both of these functions required a database migration to update the schema for the user model. I also had to add extra API methods and routes on the Express site to support these new functions. Then, I added a new passport strategy for the admin users to support the separation of login functionality.

For example, one of the main API methods I added was for the client user to add a trip package to their wishlist. This method was added to the trips.js file in the app_api folder. 

The method is as follows:

```javascript
/**
 * Adds a trip to wishlist
 * @param {*} req auth, auth.email, params.tripCode
 * @param {*} res 
 * @returns 
 */
const addToWishList = (req, res) => {
  if (!req.auth || !req.auth.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const tripCode = req.params.tripCode; 

  getUser(req, res, (req, res, user) => {
      console.log("in addToWishList");
      Trip
        .findOne({ code: tripCode }, (err, trip) => {
          if (err) {
              return res.status(500).json({ message: "Error finding trip" });
          }
          if (!trip) {
              return res.status(404).json({ message: "Wishlisting Trip not found" });
          }
          // Check if the trip already exists in the wishlist
          if (user.wishlist.includes(trip._id)) {
              return res.status(400).json({ message: "Trip already exists in the wishlist" });
          }
          // Add the trip's ObjectId reference to the wishlist
          user.wishlist.push(trip);
          user.save((err, updatedUser) => {
              if (err) {
                  return res.status(500).json({ message: "Error adding item to wishlist" });
              }
              res.status(200).json({ message: "Item added to wishlist", wishlist: updatedUser.wishlist });
          });
      });
  });
};
```

In order to allow users to call this method from the front end application, I had to follow the following steps:

1. Edit the controller for the travel page where users can add trips to their wishlist:

```javascript
/**
 * Call API to add trip to wishlist
 * @param {*} req cookies.userToken, body.tripCode
 * @param {*} res 
 * @returns 
 */
const addToWishList = (req, res) => {
    // Get the token from the cookie
    const token = req.cookies.userToken;

    // Ensure that the token exists
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Missing token" });
    }

    // Get the trip code from the request body
    const tripCode = req.body.tripCode;

    // Construct the request options
    const requestOptions = {
        url: `${apiOptions.server}/api/wishlists/${tripCode}`,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            'Content-Type': 'application/json'
        },
        json: { item: tripCode } // Assuming trip code is used as the item to add to the wishlist
    };

    // Make the request to add
    request(requestOptions, (err, response, body) => {
        if (err) {
            // error handling for error in request
            console.error(err);
            res.status(500).send('Error adding item to wishlist');
        } else if (response.statusCode !== 200) {
            // error handling for error in response
            console.error(`Error: ${response.statusCode} - ${body}`);
            res.status(response.statusCode).send(body);
        } else {
            console.log('Item added to wishlist:', body);
            res.redirect('/profile');
        }
    });
};
```
2. Edit the router to call the method:

```javascript
/**
 * Name: travel.js
 * Version: 2.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-25
 * Description: Router for travel page. Used in app.js. Uses travel.js in ./controller to handle requests.
 */
const express = require('express');
const router = express.Router();
const controller = require('../controllers/travel');

/* GET travel page */
router.get('/', controller.travelList);
/* POST add to wishlist */
router.post('/addtowishlist', controller.addToWishList); // Add trip to wishlist route
/* DELETE remove from wishlist */
router.delete('/removefromwishlist', controller.removeFromWishList);

module.exports = router;
```
3. Edit the Handlebars template to conditionally render the "Add to Wishlist" button for logged in users:

```hbs
<h1>Travel</h1>
    {{#if session}}
    {{/if}}
    <ul id="sites">
    {{#if session}}
        {{#each trips}}
        <li>
            <!--Uses rendering arguments to add the trip to database. Only renders button if logged in -->
            <a href="/api/trips/{{this.code}}"><img src="images/{{this.image}}" alt="Img"></a>
            <h2><a href="/travel">{{this.name}}</a></h2>
            <div id="addwishlist">
                <form method="POST" action="/travel/addtowishlist">
                    <input type="hidden" name="tripCode" value="{{this.code}}">
                    <button type="submit">Add to Wishlist</button>
                </form>
            </div>
            {{{this.description}}}
        </li>
        {{/each}}
    {{else}}
        {{#each trips}}
        <li>
            <!--Uses rendering arguments to show trips. This renders if not logged in -->
            <a href="/api/trips/{{this.code}}"><img src="images/{{this.image}}" alt="Img"></a>
            <h2><a href="/travel">{{this.name}}</a></h2>
            {{{this.description}}}
        </li>
        {{/each}}
    {{/if}}
```
The resulting HTML looks like this when the user is logged in:

![Travel Page](/images/loggedintravel.jpg)

I used this process to create the logic needed for the remove from wishlist method, get wishlist method, client login method, and client registration method. 

When the user adds the trip to their wishlist, a reference to the trip in the trip collection is added to the user's wishlist array. Upon viewing their profile, the user will see the corresponding trips in their wishlist array.

![Wishlist](/images/wishlist.jpg)

During the full stack development course, we did not learn how to manage login status for the Express app. This was a specific challenge for me as I learned about the different cookie packages one could use to achieve this on an Express site. This highlighted my misunderstandings about how the Express site ran. I thought I could save cookies via different requests but soon learned that most of the packages I was using required a memory store and could not run on the browser. I eventually landed on the cookie-session package and the Express cookie functions to handle this issue. This made logging into the Express site possible as the session could continue from page to page.

I then had to add and manage new API methods which also started to highlight my misunderstandings about the backend. This design work is essential for working with all web applications. Again, most of the API calls from CS 465 were implemented in the Angular SPA and not as many of them were used in the Express site, let alone with the authorization of a user on the Express site. Much of my time was spent routing these calls and making sure that they were done with authorization to ensure security.

To round out this enhancement, I added a brief ReadMe with screenshots to explain the additions without much technical jargon. I also went through and commented on areas that were previously opaque to me to remind myself and any others of their purpose in the design. 

This was a challenging and fun project to work on. I learned a lot about the architecture of the application and how to implement new features. I also learned a lot about the backend and how to implement new API methods and routes as well as how to manage login status for express sites.

## Outcomes Achieved

**Demonstrate an ability to use well-founded and innovative techniques, skills, and tools in computing practices for the purpose of implementing computer solutions that deliver value and accomplish industry-specific goals.**

- Designing new API endpoints for the Express delivered upon the promise of a unique experience for a user. In order to design these features, I had to understand the architecture of the application and how to implement new API methods and routes as well as how to manage the front end HTML. 

**Develop a security mindset that anticipates adversarial exploits in software architecture and designs to expose potential vulnerabilities, mitigate design flaws, and ensure privacy and enhanced security of data and resources.**

- By separating the passport strategies and dividing the login functions into a regular client login and an admin login, I ensured that certain permissions were not allowed for non-admin users thus working to improve security. In CS 465, we learned how to store a web token to keep a user logged into the Angular SPA.

**Employ strategies for building collaborative environments that enable diverse audiences to support organizational decision making in the field of computer science.**

- By thoroughly documenting the code with inline comments, a ReadMe and headers for each code file, I prepared the codebase for future developers to pick up the code and improve spots where needed. Each header for the code file includes metadata for the code file including its general purpose. 


[Link to Github Repository](https://github.com/gurulantern/cs465-fullstack/tree/cs499-enhancement)

---

[Previous: Code Review](/portfolio/codereview) | [Next: Algorithms & Data Structures](/portfolio/artifact2)