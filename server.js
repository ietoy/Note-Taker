// =================================================
// DEPENDENCIES
// =================================================
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const path = require("path");

var notes;

// =================================================
// SET UP DATA PARSING
// =================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// =================================================
// ROUTER
// =================================================
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// =================================================
// LISTENER
// =================================================
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT)
});