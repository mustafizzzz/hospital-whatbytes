const doctors = require("../db/models/doctor");
const users = require("../db/models/user");

const addDoctor = async (req, res) => {
  try {
    const { name, specialization } = req.body;
    const userId = req.user.id;

    const doctor = await doctors.create({ name, specialization, userId });

    res.status(201).json({
      message: "Doctor added successfully",
      doctor,
    });
  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllDoctors = async (req, res) => {
  try {

    const userDoctor = await doctors.findAll({
      where: { userId: req.user.id },
      include: {
        model: users,
        attributes: ["id", "name", "email"],
      },
    });

    res.status(200).json({ userDoctor });
  } catch (error) {
    console.error("Error retrieving doctors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the doctor by ID and include the associated user
    const doctor = await doctors.findOne({
      where: { id, userId: req.user.id },
      include: {
        model: users,
        attributes: ["id", "name", "email"],
      },
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found or not belongs to you" });
    }

    res.status(200).json({ doctor });
  } catch (error) {
    console.error("Error retrieving doctor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, specialization } = req.body;


    const doctor = await doctors.findOne({
      where: { id, userId: req.user.id },
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found or not belongs to you" });
    }


    doctor.name = name || doctor.name;
    doctor.specialization = specialization || doctor.specialization;

    await doctor.update({
      name: name || doctor.name,
      specialization: specialization || doctor.specialization
    });

    res.status(200).json({ message: "Doctor updated successfully", doctor });
  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;


    const doctor = await doctors.findOne({
      where: { id, userId: req.user.id },
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found or not belongs to you" });
    }

    await doctor.destroy();

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { addDoctor, getAllDoctors, getDoctorById, updateDoctor, deleteDoctor }