const express = require('express');
const app = express();
const loggerMiddleware = require("./middleware/loggerMiddleware");
const testRoutes = require("./routes/testRoutes");
require('dotenv').config();

app.use(express.json());
app.use(loggerMiddleware); 

app.use('/api', testRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
