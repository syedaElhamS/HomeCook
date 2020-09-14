var express = require('express');
var router = express.Router();

var Ingredient = require('../models/ingredient');

router.post('/api/ingredients', function (req, res, next) {
    var ingredient = new Ingredient(req.body);
    ingredient.save(function (err, user) {
        if (err) {
            return console.error(err);
        }
        res.status(201).json(ingredient);
    });
});

router.get('/api/ingredients', function (req, res, next) {
    Ingredient.find(function (err, ingredient) {
        if (err) {
            return next(err);
        }
        res.json({
            'ingredients': ingredient
        });
    })

});

router.get('/api/ingredients/:id', function (req, res, next) {
    var id = req.params.id;
    Ingredient.findById(id, function (err, ingredient) {
        if (err) {
            return next(err);
        }
        if (ingredient === null) {
            return res.status(404).json({
                'message': 'Ingredient not found'
            });
        }
        res.json(ingredient);
    });
});

router.put("/api/ingredients/:id", function (req, res, next) {
    var id = req.params.id;
    Ingredient.findById(id, function (err, ingredient) {
        if (err) {
            return next(err);
        }
        if (ingredient == null) {
            return res.status(404).json({
                message: "Ingredient not found",
            });
        }
        ingredient.name = req.body.name;
        ingredient.description = req.body.description;
        ingredient.category = req.body.category;
        ingredient.quantity = req.body.quantity;
        ingredient.save();
        res.json(ingredient);
    });
});


router.delete('/api/ingredients/:id', function (req, res, next) {
    var id = req.params.id;
    Ingredient.findOneAndDelete({
        _id: id
    }, function (err, ingredient) {
        if (err) {
            return next(err);
        }
        if (ingredient == null) {
            return res.status(404).json({
                message: "Ingredient not found",
            });
        }
        res.json(ingredient);
    });
});

module.exports = router;