const doctors = require("./doctor");
const patients = require("./patient");
const patientdoctors = require("./patientdoctors");

// Setup many-to-many relationship
patients.belongsToMany(doctors, { through: patientdoctors, foreignKey: "patientId" });
doctors.belongsToMany(patients, { through: patientdoctors, foreignKey: "doctorId" });

// Setup direct associations for patientdoctors with patients and doctors
patientdoctors.belongsTo(patients, { foreignKey: 'patientId' });
patientdoctors.belongsTo(doctors, { foreignKey: 'doctorId' });

module.exports = {
  patients,
  doctors,
  patientdoctors
};