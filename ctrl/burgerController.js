var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");


router.get("/", function (req, res) {
    burger.all(function (data) {
        var onloadobj = {
            burgers: data
        };
        // console.log(onloadobj);
        res.render("index", onloadobj);
    })
})

router.post("/api/burgers", function (req, res) {
    burger.insert("burger_name", req.body.burger_name, function (data) {
        res.json({ id: data.insertId });
    })
})

router.put("/api/burgers/:id", function (req, res) {
    console.log(req.body.devoured)
    burger.update("devoured", req.body.devoured, req.params.id, function (data) {
            console.log(data)
            if (data.changedRows === 0) {
                console.log("did if statement")
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            }
            res.status(200).end();

        })
})

module.exports = router;