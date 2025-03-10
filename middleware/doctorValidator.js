const Joi = require("joi");

const doctorSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must not exceed 50 characters",
  }),
  specialization: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Specialization is required",
    "string.min": "Specialization must be at least 3 characters",
    "string.max": "Specialization must not exceed 100 characters",
  }),
});

const validateDoctor = (req, res, next) => {
  const { error } = doctorSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { validateDoctor };