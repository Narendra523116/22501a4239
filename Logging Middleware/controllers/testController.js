const Log = require('../utils/logger');

const testFunction = async (req, res) => {
  try {
    await Log("backend", "debug", "handler", "Inside test controller");
    res.status(200).json({ message: "Test success" });
  } catch (error) {
    await Log("backend", "error", "handler", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { testFunction };
