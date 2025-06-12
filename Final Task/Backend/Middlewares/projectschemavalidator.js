const Joi = require("joi");

const ProjectValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(100).required(),
    description: Joi.string().required(),
    team_members: Joi.array().min(1).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400);
    next(new Error("Bad Request"));
  }
  next();
};
const ProjectUpdateValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(100).required(),
    description: Joi.string().required(),
    team_members: Joi.array().items(Joi.string()).min(1).required(),
    status: Joi.boolean().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400);
    next(new Error("Bad Request"));
  }
  next();
};

module.exports = {
  ProjectValidation,
  ProjectUpdateValidation,
};
