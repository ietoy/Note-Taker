// ===========================================================
// LOAD DATA
// ===========================================================
var db = require("../db/db");

// ===========================================================
// ROUTING
// ===========================================================

module.exports = function(app) {
    // GETS
    app.get("/api/notes", function(req, res) {
        console.log(res.json(db));

    })

    // POSTS
    app.post("/api/notes", function(req, res) {
        db.push(req.body);
        console.log(res.json(db))

    });

}
