//Initialise dependencies
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const checkAuth = require('./middleware/checkAuth');
const connectDB = require('./config/connectDB');
const linkController = require('./controllers/linkController');
const userController = require('./controllers/userController');

//Initialise express
const app = express();
app.use(cors(
  {
    origin: ["http://localhost:5173"],
    credentials: true,
  }
));
app.use(express.json());
app.use(cookieParser());


//Connect to MongoDB
connectDB();

//Routes
app.post("/links", checkAuth, linkController.createLink);
app.get("/links", checkAuth, linkController.getLinks);
app.put("/links/:id", checkAuth, linkController.updateLink);
app.delete("/links/:id", checkAuth, linkController.deleteLink);
app.post("/sign-up", userController.signUp);
app.post("/sign-in", userController.signIn);
app.get("/sign-out", userController.signOut);
app.get("/check-auth" , checkAuth,userController.checkAuth);
//Has to be the last route or it catches all other routes
app.get("/:key", linkController.redirectLink);

//Starts server and reports on what port it is running
app.listen(process.env.PORT, () => {
    console.log("Server is running on port "+process.env.PORT);
});


