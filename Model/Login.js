const mongooe = require('mongoose');
const Schema = mongooe.Schema;
const LoginSchema = new Schema({
    email: String,
    password: String
});
const Login = mongooe.model('Login', LoginSchema);
module.exports = Login;