var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ingredientSchema = new Schema({

    name: {
        type: String
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    quantity: {
        type: String
    }
});

module.exports = mongoose.model('ingredients', ingredientSchema);