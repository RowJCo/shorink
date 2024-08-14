# shorink

### What is it?

Shorink (short link) is a url shortenening site made using the MERN stack. You can check it out at: https://shorink.onrender.com/ ,it is hosted on a free plan so can sometimes be a bit slow to load.

### How to run it for yourself?

To run the web app yourself you need to:
* Clone or download and unzip the repository
* Setup a .env file in the root folder, including:
  * `PORT`: the port to host the web app on
  * `MONGO_URI`: the connection code for your mongo atlas database
  * `NODE_ENV`: whether the web app is being run for production or development
  * `JWT_SECRET`: a random string of numbers , letters and characters.
* Open up a terminal in the root folder and run `npm run build` which will instal all dependencies
* Then in the terminal run `npm run start` and the web app will be available on whatever port you have hosted it
