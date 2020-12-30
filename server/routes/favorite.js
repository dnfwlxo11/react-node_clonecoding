const express = require('express');
const { route } = require('./users');
const router = express.Router();

const { Favorite } = require('../models/Favorite');

//=================================
//             Favorite
//=================================

router.post('/favoriteNumber', (req, res) => {
    //mongoDB, favorite number load
    Favorite.find({ "movieId": req.body.movieId })
    .exec((err, info) => {
        if (err) return res.status(400).send(err)

        res.status(200).json({ success:true, favoriteNumber:info.length})
    })

    // send favorite number to front
})

module.exports = router;
