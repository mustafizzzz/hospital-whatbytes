const Joi = require("joi");

const patientSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must not exceed 50 characters",
  }),
  age: Joi.number().integer().min(0).max(150).required().messages({
    "number.base": "Age must be a number",
    "number.min": "Age cannot be negative",
    "number.max": "Age must be a realistic value (0-150)",
    "any.required": "Age is required",
  }),
  gender: Joi.string().valid("male", "female", "other").required().messages({
    "any.only": "Gender must be 'male', 'female', or 'other'",
    "string.empty": "Gender is required",
  }),
});

const validatePatient = (req, res, next) => {
  const { error } = patientSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { validatePatient };