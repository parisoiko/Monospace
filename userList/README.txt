There is not a lot of CSS in the user.css file as most of the styling has either been done via Bootstrap or sometimes on HTML in order to overwrite certain
bootstrap features. 

The user.js file contains two ViewModels. The generalViewModel which contains an array of all the users. Specifically, the array is filled with userViewModel objects, 
which is the second object. 

As of now, the app works perfectly fine except for a single feature. After having loaded all the users, once you edit a user's status, it does so client-side. 
It sends a package to the correct (presumably) url as a PUT function, with the correct id attached, but it doesn't seem to be changing anything as
once you reload the page and the app reloads the API's list, it hasn't altered anything.
