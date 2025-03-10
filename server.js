const express = require('express');
const app = express();
const morgan = require('morgan');
const colors = require('colors')
const dotenv = require('dotenv')


//ENV variables Configuration
dotenv.config();


app.use(express.json());
app.use(morgan('dev'));



//import routes
const userRoutes = require('./routes/userRoutes.js')
const patientRoutes = require('./routes/patientRoutes.js')
const doctorRoutes = require('./routes/doctorRoutes.js')
const patientDoctorRoutes = require('./routes/patientDoctorRoutes.js')
//routes
app.use(`/api/v1/users`, userRoutes);
app.use(`/api/v1/patients`, patientRoutes);
app.use(`/api/v1/doctors`, doctorRoutes);
app.use(`/api/v1/mappings`, patientDoctorRoutes);





const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgYellow.black);
})