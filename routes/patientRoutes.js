const express = require('express');
const { createPatient, getPatients, getPatientById, updatePatient, deletePatient } = require("../controller/patientController");
const { authenticateUser } = require("../middleware/authMiddleware");
const { validatePatient } = require('../middleware/patientValidator');
const { generalLimiter } = require('../middleware/rateLimiter');

const router = express.Router();


router.route("/")
  .post(authenticateUser, generalLimiter, validatePatient, createPatient)
  .get(authenticateUser, generalLimiter, getPatients);
router.route("/:id")
  .get(authenticateUser, generalLimiter, getPatientById)
  .put(authenticateUser, generalLimiter, updatePatient)
  .delete(authenticateUser, generalLimiter, deletePatient)

module.exports = router;
