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

router.post('/favorited', (req, res) => {
    // already like this movie
    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
    .exec((err, info) => {
        if (err) return res.status(400).send(err)

        let result = false;
        if (info.length != 0 ) {
            result = true;
        }

        res.status(200).json({ success:true, favorited:result})
    })

    // send favorite number to front
})

router.post('/removeFromFavorite', (req, res) => {
    // removeFromFavorite
    Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
    .exec((err, doc) => {
        if (err) return res.status(400).send(err)
        res.status(200).json({success: true, doc})
    })
})

router.post('/addToFavorite', (req, res) => {
    // addToFavorite
    const favorite = new Favorite(req.body)

    favorite.save((err, doc) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({success: true})
    })
})

router.post('/getFavoredMovie', (req, res) => {
    // get favorite movie info
    Favorite.find({'userFrom': req.body.userFrom})
    .exec((err, favorites) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({success:true, favorites})
    })
})

module.exports = router;
