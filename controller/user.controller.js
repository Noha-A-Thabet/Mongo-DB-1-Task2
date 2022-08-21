const connection = require("../database/connect.js")
const { ObjectId } = require("mongodb")

const getIndex = (allUsers, val, key) => {
    const index = allUsers.findIndex(user => user[key] == val)
    return index
}


class Artical {
    // $$$$$$$$$$$$$$$ Add 
    static add = (req, res) => {
        if (req.query.title || req.query.content) {
            if (!req.query.title || !req.query.content) {
                const errors = {}
                if (!req.query.title) errors.name = "please add a title"
                if (!req.query.content) errors.age = "please add a content"

                res.render("add", { data: req.query, errors })
            }
            else {
                connection((err, db) => {
                    db.collection("info").insertOne(req.query)
                        .then(() => res.redirect("/"))
                        .catch(e => res.render("error404"))
                })

            }
        }
        else
            res.render("add", {
                pageTitle: "add Info"
            })
    }

    // $$$$$$$$$$$$$$$ All
    static all = (req, res) => {
        connection((err, db) => {
            db.collection("info").find()
                .toArray((e, dta) => {
                    if (e) return res.render("error404")

                    res.render("all", {
                        pageTitle: "All Articals", dta

                    })
                })

        })
    }


    // $$$$$$$$$$$$$$$ single
    static single = (req, res) => {
        const articalId = req.params.id
        connection((err, db) => {
            if (err) return err.send(err.message);
            db.collection("info").findOne({ _id: new ObjectId(articalId) })
                .then(data => {
                    res.render("single", {
                        pageTitle: "single Artical"
                        , data
                    })
                })
                .catch(e => res.send(e.message))
        })
    }


}
module.exports = Artical