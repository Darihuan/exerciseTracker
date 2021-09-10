const {model, Schema} = require('mongoose');

const UserSchema = new Schema({
    username : String,

});
module.exports = model('User', UserSchema);