var express = require('express');
var router = express.Router();

var Ingredient = require('../models/ingredient');
var Recipe = require('../models/recipe');

router.post('/api/ingredients', function (req, res, next) {
    var ingredient = new Ingredient(req.body);
    ingredient.save(function (err, ingredient) {
        if (err) {
            return console.error(err);
        }
        res.status(201).json(ingredient);
    });
});

//POST /cars/:car_id/drivers (relationship)

router.post('/api/recipes/:id/ingredients', function (req, res, next) {

    var ingredient = new Ingredient({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        quantity: req.body.quantity,
        recipes: req.body.recipes
    });
    ingredient.save(function (err, ingredient) {
        if (err) {
            return next(err);
        }
        if (recipe === null) {
            return res.status(404).json({
                'message': 'Recipe does not exist'
            });
        }else{
            var ingredient = new Ingredient(req.body);
        
            ingredient.save(function (err, ingredient) {
                if (err) {
                    return console.error(err);
                }
                res.status(201).json(ingredient);
                console.log(req.body);
            });
        }
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

//GET /cars/:car_id/drivers (relationship)

router.get('/api/recipes/:id/ingredients', function (req, res, next) {

    var recipes = Ingredient.recipes;
    var id = req.params.id;
    Ingredient.find({
            'recipes': id
        })
        .exec(function (err, ingredient) {
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

/*
router.delete('/api/ingredients', function (req, res, next) {
    var recipe = new Ingredient(req.body);
    Recipe.deleteMany({}, function (err, ingredient) {
        if (err) {
            return next(err);
        }
        if (ingredient == null) {
            return res.status(404).json({
                'message': 'Ingerient not found'
            });
        }
        res.json(recipe);
        //res.status(204).json(recipe);
    });
});
*/

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


router.delete("/api/ingredients", function (req, res, next) {
    Ingredient.deleteMany({}, function (err, ingredient) {
        if (err) {
            return next(err);
        }
        if (ingredient == null) {
            return res.status(404).json({
                message: "Ingerient not found",
            });
        }
        res.json(ingredient);
        //res.status(204).json(recipe);
    });
});


module.exports = router;
