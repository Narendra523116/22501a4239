
const axios = require('axios');
require('dotenv').config();

const VALID_STACKS = ["frontend", "backend"];
const VALID_LEVELS = ["debug", "info", "warn", "error", "fatal"];
const VALID_PACKAGES = [
  "cache", "controller", "cron_job", "db", "domain", "handler",
  "repository", "route", "service", "auth", "config", "middleware", "utils"
];

const Log = async (stack, level, pkg, message) => {
  if (!VALID_STACKS.includes(stack)) throw new Error(`Invalid stack: ${stack}`);
  if (!VALID_LEVELS.includes(level)) throw new Error(`Invalid level: ${level}`);
  if (!VALID_PACKAGES.includes(pkg)) throw new Error(`Invalid package: ${pkg}`);

  const payload = { stack, level, package: pkg, message };
  try {
    const res = await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.LOGGER_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log("Log sent:", res.status);
  } catch (error) {
    console.error("Log failed:", error.response?.status, error.message);
  }
};

module.exports = Log;
