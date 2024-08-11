//Initialise dependencies
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const cookieParser = require('cookie-parser');
const checkAuth = require('./middleware/checkAuth');
const connectDB = require('./config/connectDB');
const linkController = require('./controllers/linkController');
const userController = require('./controllers/userController');

//Initialise express
const app = express();
app.use(express.json());
app.use(cookieParser());


//Connect to MongoDB
connectDB();

//Routes
app.post("/api/links", checkAuth, linkController.createLink);
app.get("/api/links", checkAuth, linkController.getLinks);
app.put("/api/links/:id", checkAuth, linkController.updateLink);
app.delete("/api/links/:id", checkAuth, linkController.deleteLink);
app.post("/api/sign-up", userController.signUp);
app.post("/api/sign-in", userController.signIn);
app.get("/api/sign-out", userController.signOut);
app.get("/api/check-auth" , checkAuth,userController.checkAuth);
//Has to be the last route or it catches all other routes
app.get("/:key", linkController.redirectLink);

//Starts server and reports on what port it is running
app.listen(process.env.PORT, () => {
    console.log("Server is running on port "+process.env.PORT);
});


