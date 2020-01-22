// ===========================================================
// LOAD DATA
// ===========================================================
var fs = require("fs");

// ===========================================================
// ROUTING
// ===========================================================

module.exports = function(app) {
    var notes;

    // ===========================================================
    // GET REQUESTS
    // ===========================================================
    app.get("/api/notes", function(req, res) {
        // THIS READS OUR db.json FILE...
        fs.readFile("./db/db.json", function(err, data) {
            if (err) throw err;
            // ... AND OFFERS THE PARSED DATA AS THE RESPONSE
            res.json(JSON.parse(data))
        })
    });


    // ===========================================================
    // POST REQUESTS
    // ===========================================================
    app.post("/api/notes", function(req, res) {
        var newNote = req.body;
        // FIRST WE READ OUR db.json AND PARSE IT INTO AN OBJECT
        fs.readFile("./db/db.json", function(err, data) {
            if (err) throw err;
            var notes = JSON.parse(data);
            // THIS ALLOWS US TO PUSH THE REQUEST BODY OBJECT INTO OUR db.json AS A NEW NOTE
            notes.push(newNote);
            // THIS CREATES UNIQUE IDS FOR EACH OF OUR NOTES, THIS WILL COME IN HANDY LATER
            notes.forEach( function(item, i) {
                item.id = 1 + i;
            })
            // ONCE OUR NEW NOTE HAS BEEN ADDED, WE REVERT OUR notes OBJECT BACK TO A STRING AND REWRITE IT TO THE RESPECTIVE FILE FOR LATER USE
            fs.writeFile("./db/db.json", JSON.stringify(notes), function(err) {
                if(err) throw err;
            })
        })
        // THE OFFERED RESPONSE IS THE NEW NOTE
        res.json(newNote)
    });

        
    // ===========================================================
    // DELETE REQUESTS
    // ===========================================================
    app.delete("/api/notes/:id" , function(req, res) {
        // WITHIN OUR /api/notes/ ROUTE, THIS FUNCTION LOOKS FOR EACH NOTE'S SPECIFIC ID
        var delNoteId = req.params.id;
        // LIKE BEFORE, WE READ OUR db.json FILE AND PARSE IT INTO AN OBJECT FOR MANIPULATION
        fs.readFile("./db/db.json", function(err, data) {
            if (err) throw err;
            var notes = JSON.parse(data);
            // THEN, WE CHECK EACH ELEMENT IN THAT OBJECT FOR THE MATCHING ID OF THE NOTE TO BE DELETED
            notes.forEach(function(thisNote, i) {
                if (thisNote.id.toString() === delNoteId) {
                    // ONCE WE FIND A NOTE THAT MATCHES, WE USE THE .splice(index, #ofElements) TO REMOVE THIS NOTE FROM OUR OBJECT
                    notes.splice(i, 1)
                }
            })
            // FINALLY, WE STRINGIFY OUR notes OBJECT SO IT CAN BE REWRITEN TO IT'S ORIGINAL FILE
            fs.writeFile("./db/db.json", JSON.stringify(notes), function(err) {
                if (err) throw err;
            })
        })
        res.send("file")
    })
}
