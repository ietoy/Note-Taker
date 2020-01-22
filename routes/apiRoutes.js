// ===========================================================
// LOAD DATA
// ===========================================================
var fs = require("fs");

// ===========================================================
// ROUTING
// ===========================================================

// inst empty note var for pushing to db globally

module.exports = function(app) {
    var notes;
    // GETS or READS
    app.get("/api/notes", function(req, res) {
        fs.readFile("./db/db.json", function(err, data) {
            if (err) throw err;
            res.json(JSON.parse(data))
        })
    });

    // POSTS or CREATES
    app.post("/api/notes", function(req, res) {
        // First we instantiate a new variable, "newNote", and set it equal to the request body
        var newNote = req.body;
        // Next, using filesystem, we issue a readFile command, which looks at our db.json file, and runs a function with an error case and a response case
        fs.readFile("./db/db.json", function(err, data) {
            // In the case of an error, we throw that error
            if (err) throw err;
            // Otherwise, we do the following
            // We set our variable, notes, equal to the JSON.parse'd data response
            var notes = JSON.parse(data);
            // We push our new note, an object, into the newly parsed notes object obtained from our db.json file
            notes.push(newNote);
            // Then, for each element in our notes object, we do the following to assign unique id's to each element
            notes.forEach( function(item, i) {
                item.id = 1 + i;
            })
            // Now that we have our updated notes object with unique id's for each element, we issue a writeFile command to our db.json file, writing the stringified version of our notes object to the file unless we encounter an error
            fs.writeFile("./db/db.json", JSON.stringify(notes), function(err) {
                if(err) throw err;
            })
        })
        // Finally, we issue the json response of our new note
        res.json(newNote)

        // ??? come back to revisit what's exactly going on here, I'm not entierly clear on exactly whats happening, other than this is what we need this post request to do in order for the preset index.js to do its work ???

    });

    // DELETES
    app.delete("/api/notes/:id" , function(req, res) {
        var delNoteId = req.params.id;
        // console.log(delNote);
        fs.readFile("./db/db.json", function(err, data) {
            if (err) throw err;
            var notes = JSON.parse(data);
            
            notes.forEach(function(thisNote, i) {
                if (thisNote.id.toString() === delNoteId) {
                    console.log(delNoteId);
                    console.log(notes[i]);
                    notes.splice(i, 1)
                }
            })
            fs.writeFile("./db/db.json", JSON.stringify(notes), function(err) {
                if (err) throw err;
            })
        })
        res.send("file")

    })
}
