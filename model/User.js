const {model, Schema} = require('mongoose');

const UserSchema = new Schema({
    username : String,
    _id : String
});
module.exports = model('User', UserSchema);