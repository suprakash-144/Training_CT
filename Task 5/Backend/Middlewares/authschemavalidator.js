const Joi = require("joi");

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400);
    next(new Error("Bad Request"));
  }
  next();
};
const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400);
    next(new Error("Bad Request"));
  }
  next();
};
module.exports = {
  signupValidation,
  loginValidation,
};
