//Imports dependecies
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const linkController = require('./controllers/linkController');
const userController = require('./controllers/userController');
const requireAuth = require('./middleware/requireAuth');
const connectDB = require('./config/connectDB');

//Initializes express
const app = express();
app.use(cors({
        origin: true,
        credentials: true, 
}));
app.use(cookieParser());
app.use(express.json());

//Connects to database
connectDB();

//Routes

app.post("/links", linkController.createLink);
app.get("/links", linkController.getLinks);
app.get("/links/:id", linkController.getLink);
app.put("/links/:id", linkController.updateLink);
app.delete("/links/:id", linkController.deleteLink);
app.post("/sign-up", userController.signUp);
app.post("/sign-in", userController.signIn);
app.get("/sign-out", userController.signOut);
app.get("/auth-check", requireAuth ,userController.checkAuth);
//Has to be the last route or it catches all other routes
app.get("/:key", linkController.redirectLink);

//Starts server 
app.listen(process.env.PORT);