//Imports dependecies
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const linkController = require('./controllers/linkController');
const connectDB = require('./config/connectDB');

//Initializes express
const app = express();
app.use(cors());
app.use(express.json());

//Connects to database
connectDB();

//Routes

app.post("/links", linkController.createLink);
app.get("/links", linkController.getLinks);
app.get("/links/:id", linkController.getLink);
app.put("/links/:id", linkController.updateLink);
app.delete("/links/:id", linkController.deleteLink);
app.get("/:key", linkController.redirectLink);

//Starts server 
app.listen(process.env.PORT);