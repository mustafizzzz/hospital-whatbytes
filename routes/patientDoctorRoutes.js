const express = require('express');
const { authenticateUser } = require("../middleware/authMiddleware");
const { getAllMappings, assignDoctorToPatient, getAllDoctorsByPatientId, removeDoctorFromPatient } = require('../controller/patientDoctorController');
const { validateMapping } = require('../middleware/mappingValidator');
const { generalLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.route("/")
  .post(authenticateUser, generalLimiter, validateMapping, assignDoctorToPatient)
  .get(authenticateUser, generalLimiter, getAllMappings);

router.route("/:patientId")
  .get(authenticateUser, generalLimiter, getAllDoctorsByPatientId);

router.route("/:id")
  .delete(authenticateUser, generalLimiter, removeDoctorFromPatient);


module.exports = router;
