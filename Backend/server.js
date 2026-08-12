const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/students', studentRoutes);
app.get('/', (req, res) => {

  res.send('SMS Backend is running');

});

const PORT = 5000;
mongoose
  .connect('mongodb://127.0.0.1:27017/sms_database')
  .then(() => {

    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`SMS Backend running on http://localhost:${PORT}`);

});
})
  .catch((error) => {
    console.error(
      'MongoDB connection failed:',
      error,
    );
  });
