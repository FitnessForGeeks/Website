const express = require("express");
const path = require("path");
const app = express();
const handlebarsExpress = require("express-handlebars");
app.engine(
  "handlebars",
  handlebarsExpress({
    partialsDir: ["views/partials/"]
  })
);
app.use(express.static("static"));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));
app.get("/login", function(req, res) {
  res.render("loginPage.handlebars");
});
app.listen(3000, () => console.log("Listening on port 3000"));
