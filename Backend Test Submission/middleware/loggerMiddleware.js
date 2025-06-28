const Log = require('../utils/logger');

const loggerMiddleware = async (req, res, next) => {
  try {
    await Log("backend", "info", "middleware", `Request: ${req.method} ${req.originalUrl}`);
  } catch (err) {
    console.error("Logger Middleware Error:", err.message);
  }
  next();
};

module.exports = loggerMiddleware;
