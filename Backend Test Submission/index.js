require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const loggerMiddleware = require('./middleware/loggerMiddleware');
const shorturlRoutes = require('./routes/shorturlRoutes');

app.use(express.json());
app.use(loggerMiddleware);
app.use('/', shorturlRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error(" MongoDB connection error:", err.message));
