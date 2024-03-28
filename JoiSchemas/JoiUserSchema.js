const Joi = require("joi");
const passwordValidation = Joi.string()
  .pattern(
    new RegExp(
      '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}":;<>,.?~\\-]).{8,}$'
    )
  )
  .required()
  .messages({
    "string.pattern.base":
      "Password must contain at least 1 upper case, 1 number, 1 special character, and atmost 8 characters long.",
  });

// Define the schema for user signup
const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: passwordValidation, // password validation
});

// Define the schema for user login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports= {
    loginSchema,
    signupSchema,
    passwordValidation,
}