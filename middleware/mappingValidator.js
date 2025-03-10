const Joi = require("joi");

const mappingSchema = Joi.object({
  patientId: Joi.number().integer().positive().required().messages({
    "number.base": "Patient ID must be a number",
    "number.integer": "Patient ID must be an integer",
    "number.positive": "Patient ID must be a positive number",
    "any.required": "Patient ID is required",
  }),
  doctorId: Joi.number().integer().positive().required().messages({
    "number.base": "Doctor ID must be a number",
    "number.integer": "Doctor ID must be an integer",
    "number.positive": "Doctor ID must be a positive number",
    "any.required": "Doctor ID is required",
  }),
});

const validateMapping = (req, res, next) => {
  const { error } = mappingSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { validateMapping };