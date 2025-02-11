const joi = require("joi");

const registerValidation = async (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(2).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(30).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Invalid request", error: error.details[0].message });
  }
  next();
};

const loginValidation = async (req, res, next) => {
  const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(30).required(),
  });

  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Invalid request", error: error.details[0].message });
    }
    console.log(error)
  next();
};

module.exports = { registerValidation, loginValidation };