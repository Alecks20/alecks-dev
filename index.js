const express = require("express")
const app = express()
const port = 80

app.set("view engine", "ejs");
app.use("/assets",express.static("assets"))

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/privacy", (req, res) => {
    res.render("privacy.ejs");
});


app.listen(port, () => {
    console.log(`App listening on ${port}`)
})