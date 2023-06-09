const express = require('express');
const cors = require('cors');
// const mongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const employeesRoutes = require('./routes/employees.routes');
const departmentsRoutes = require('./routes/departments.routes');
const productsRoutes = require('./routes/products.routes');

const app = express();

// mongoClient.connect(
//   'mongodb://localhost:27017',
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (err, client) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('Successfully connected to the database');
//       const db = client.db('companyDB');
//       const app = express();

////////////////////////////////////

// db.collection('employees').find({ department: 'IT' }, (err, data) => {
//   if (!err) console.log(data);
// });
// db.collection('employees')
//   .find({ department: 'IT' })
//   .toArray((err, data) => {
//     if (!err) {
//       console.log(data);
//     }
//   });
// db.collection('departments').insertOne({ name: 'Management' }, (err) => {
//   if (err) console.log('err');
// });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   req.db = db;
//   next();
// });

app.use('/api', employeesRoutes);
app.use('/api', departmentsRoutes);
app.use('/api', productsRoutes);

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

// connects our backend code with the database
mongoose.connect('mongodb://localhost:27017/companyDB', {
  useNewUrlParser: true,
});
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err));

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});
//     }
//   }
// );
