const express = require("express")
const app = express()
const port = 80
const path = require('path');

app.set("view engine", "ejs");
app.use("/assets",express.static("assets"))

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/privacy", (req, res) => {
    res.render("privacy.ejs");
});

app.get("/experience", (req, res) => {
    res.render("experience.ejs");
});


app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views/404.html'));
});

app.listen(port, () => {
    console.log(`App listening on ${port}`)
})