//used by an validate middleware file for identifying or checking the request body

const joi = require('joi');

const registerSchema =joi.object({

        name: joi.string().min(2).max(50).required().messages({
             'string.empty': 'Please enter a valid name',
             'string.min': 'Name must be at least 2 characters'
            }),

        email: joi.string().email().required().messages({
            'string.email': 'Please enter a valid email',
            'string.empty': 'Email is required'
        }),

        password: joi.string().min(8).required().messages({
            'string.min': 'Password must be at least 8 characters',
            'string.empty': 'Password is required '
        })
});

const loginSchema =joi.object({

    email:joi.string().email().required().messages({
        'string.email': 'Please enter a valid email',
        'string.empty': 'Email is required'
    }),

    password:joi.string().min(8).required().messages({
        'string.min': 'Password must be at least 8 characters',
        'string.empty': 'Password is required '

    })

});

const forgotPasswordSchema = joi.object({
    email: joi.string().email().required()
});

const resetPasswordSchema = joi.object({
    password: joi.string().min(6).required()
});

module.exports = {registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema};