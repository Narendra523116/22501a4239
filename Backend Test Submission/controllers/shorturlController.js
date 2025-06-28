
const ShortUrl = require('../models/shortURL');
const Log = require('../utils/logger');

exports.createShortUrl = async (req, res) => {
  const { url, validity, shortcode } = req.body;
  const expiresAt = new Date(Date.now() + parseInt(validity) * 1000);

  try {
    const existing = await ShortUrl.findOne({ shortcode });
    if (existing) {
      return res.status(400).json({ message: "Shortcode already exists" });
    }

    const newUrl = await ShortUrl.create({ originalUrl: url, shortcode, expiresAt });
    await Log("backend", "info", "controller", `Created short URL: ${shortcode}`);

    res.json({
      shortlink: `${req.protocol}://${req.get('host')}/${shortcode}`,
      expiry: newUrl.expiresAt
    });
  } catch (err) {
    await Log("backend", "error", "controller", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getStats = async (req, res) => {
  const { shortcode } = req.params;
  try {
    const urlData = await ShortUrl.findOne({ shortcode });
    if (!urlData) {
      return res.status(404).json({ message: "Shortcode not found" });
    }

    const stats = {
      totalClicks: urlData.clicks.length,
      originalUrl: urlData.originalUrl,
      createdAt: urlData.createdAt,
      expiresAt: urlData.expiresAt,
      clickDetails: urlData.clicks
    };

    await Log("backend", "info", "controller", `Fetched stats for shortcode: ${shortcode}`);
    res.json(stats);
  } catch (err) {
    await Log("backend", "error", "controller", err.message);
    res.status(500).json({ error: "Server error" });
  }
};