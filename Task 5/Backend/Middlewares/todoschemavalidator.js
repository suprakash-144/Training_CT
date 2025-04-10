const Joi = require("joi");

const todoValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().max(100).required(),
    body: Joi.string().required(),
    completion: Joi.boolean().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400);
    next(new Error("Bad Request"));
  }
  next();
};
const todoqueryValidation = (req, res, next) => {
  const schema = Joi.object({
    status: Joi.boolean().valid(true, false),
  });

  const { error } = schema.validate(req.query);
  if (error) {
    res.status(400);
    next(new Error("Bad Request"));
  }

  next();
};

module.exports = {
  todoValidation,
  todoqueryValidation,
};
