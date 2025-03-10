const patients = require("../db/models/patient");
const users = require("../db/models/user");

const createPatient = async (req, res) => {
  try {
    const { name, age, gender } = req.body;

    const newPatient = await patients.create({
      name: name.toLowerCase(),
      age,
      gender: gender.toLowerCase(),
      userId: req.user.id,
    });

    return res.status(201).json({ message: "Patient added successfully!", patient: newPatient });
  } catch (error) {
    console.error("Error adding patient:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getPatients = async (req, res) => {
  try {

    const userPatients = await patients.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: users,
          attributes: ["id", "name", "email"],
        },
      ],

    });

    return res.status(200).json({ patients: userPatients });
  } catch (error) {
    console.error("Error retrieving patients:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await patients.findOne({
      where: { id, userId: req.user.id },
      include: [
        {
          model: users,

          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    return res.status(200).json({ patient });
  } catch (error) {
    console.error("Error retrieving patient details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { name, age, gender } = req.body;

    // Find the patient ensuring it belongs to the authenticated user
    const patient = await patients.findOne({ where: { id, userId } });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found or access denied" });
    }

    await patient.update(
      {
        name: name || patient.name,
        age: age || patient.age,
        gender: gender || patient.gender
      }
    );

    return res.status(200).json({ message: "Patient updated successfully", patient });
  } catch (error) {
    console.error("Error updating patient:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;


    const patient = await patients.findOne({ where: { id, userId } });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found or not belongs to you" });
    }

    // Delete the patient
    await patient.destroy();

    return res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createPatient, getPatients, getPatientById, updatePatient, deletePatient };