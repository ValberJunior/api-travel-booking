const Joi = require('@hapi/joi');

const registerValidate = (data) => {
    const schema = Joi.object({
        name : Joi.string().required().min(3).max(50),
        email : Joi.string().required().min(3).max(50),
        phone: Joi.string().min(10).max(16),
        cpf : Joi.string().required().min(11).max(17),
        password : Joi.string().required().min(6).max(100),
    });
    return schema.validate(data);
};

const loginValidate = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().min(4).max(100),
        password: Joi.string().required().min(6).max(100)
    });
    return schema.validate(data);
}

const tripValidate = (data) => {
    const schema = Joi.object({
        city: Joi.string().required().min(2).max(50),
        category: Joi.string().required().min(2).max(50),
        image:Joi.string().min(2).max(100),
        reserve : Joi.boolean().default(false),
        details : Joi.string().min(2).max(100)
    });
    return schema.validate(data);
};

module.exports.loginValidate = loginValidate;
module.exports.registerValidate = registerValidate;
module.exports.tripValidate = tripValidate;