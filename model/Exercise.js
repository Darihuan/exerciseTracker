const {model, Schema} = require('mongoose');

const ExerciseSchema = new Schema({

    description: String,
    duration: Number,
    date:Date,
    userId:String

})
module.exports =model('Exercise',ExerciseSchema);
