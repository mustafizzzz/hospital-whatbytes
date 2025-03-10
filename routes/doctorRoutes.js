const express = require('express');
const { authenticateUser } = require("../middleware/authMiddleware");
const { addDoctor, getAllDoctors, getDoctorById, updateDoctor, deleteDoctor } = require('../controller/doctorController');
const { validateDoctor } = require('../middleware/doctorValidator');
const { generalLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.route("/")
  .post(authenticateUser, generalLimiter, validateDoctor, addDoctor)
  .get(authenticateUser, generalLimiter, getAllDoctors);

router.route("/:id")
  .get(authenticateUser, generalLimiter, getDoctorById)
  .put(authenticateUser, generalLimiter, updateDoctor)
  .delete(authenticateUser, generalLimiter, deleteDoctor);

module.exports = router;
