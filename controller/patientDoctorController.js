const { patientdoctors, patients, doctors } = require('./../db/models/association');

const assignDoctorToPatient = async (req, res) => {
  try {
    const { patientId, doctorId } = req.body;
    const userId = req.user.id;

    const patient = await patients.findOne({ where: { id: patientId, userId } });
    if (!patient) {
      return res.status(404).json({ error: "Patient not found or does not belong to you." });
    }


    const doctor = await doctors.findOne({ where: { id: doctorId, userId } });
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found or does not belong to you." });
    }


    const existingMapping = await patientdoctors.findOne({ where: { patientId, doctorId } });
    if (existingMapping) {
      return res.status(400).json({ error: "This doctor is already assigned to the patient." });
    }

    // Create the mapping
    await patientdoctors.create({ patientId, doctorId });

    return res.status(201).json({ message: "Doctor assigned to patient successfully." });
  } catch (error) {
    console.error("Error assigning doctor to patient:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};


const getAllMappings = async (req, res) => {
  try {
    const mappings = await patientdoctors.findAll({
      include: [
        {
          model: patients,
          attributes: ["id", "name", "age", "gender"],
        },
        {
          model: doctors,
          attributes: ["id", "name", "specialization"],
        },
      ],
    });

    return res.status(200).json(mappings);
  } catch (error) {
    console.error("Error fetching mappings:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAllDoctorsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await patients.findByPk(patientId);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Fetch doctors assigned to the patient
    const doctorMappings = await patientdoctors.findAll({
      where: { patientId },
      include: [
        {
          model: doctors,
          attributes: ["id", "name", "specialization"],
        },
      ],
    });


    if (doctorMappings.length === 0) {
      return res.status(200).json({ message: "No doctors assigned to this patient" });
    }


    const assignedDoctors = doctorMappings.map((mapping) => mapping.doctor);

    return res.status(200).json({ patientId, doctors: assignedDoctors });
  } catch (error) {

    console.error("Error fetching doctors for patient:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


const removeDoctorFromPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const mapping = await patientdoctors.findByPk(id);

    if (!mapping) {
      return res.status(404).json({ error: "Mapping not found" });
    }

    const patient = await patients.findOne({ where: { id: mapping.patientId, userId } });
    if (!patient) {
      return res.status(404).json({ error: "Patient not found or does not belong to you." });
    }


    const doctor = await doctors.findOne({ where: { id: mapping.doctorId, userId } });
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found or does not belong to you." });
    }


    await mapping.destroy();

    return res.status(200).json({ message: "Doctor successfully removed from the patient" });
  } catch (error) {
    console.error("Error deleting doctor from patient:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};





module.exports = { assignDoctorToPatient, getAllMappings, getAllDoctorsByPatientId, removeDoctorFromPatient };