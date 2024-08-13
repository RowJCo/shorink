//Initialise dependencies
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const checkAuth = require('./middleware/checkAuth');
const limiter = require('./middleware/limiter');
const connectDB = require('./config/connectDB');
const linkController = require('./controllers/linkController');
const userController = require('./controllers/userController');

//Initialise express
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(limiter);
app.use(express.static('build'));

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
app.get("/api/check-auth", checkAuth,userController.checkAuth);
app.get("/s/:key", linkController.redirectLink);

const staticPath = "./build/index.html"
const resolvedPath = path.resolve(staticPath)

app.get('/*', function(req, res) {
  res.sendFile((resolvedPath), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

//Starts server and reports on what port it is running
app.listen(process.env.PORT, () => {
    console.log("Server is running on port "+process.env.PORT);
});


