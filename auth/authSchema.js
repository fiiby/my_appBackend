const Joi = require('joi');

const authSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().min(6).required(),
});

module.exports= {authSchema};