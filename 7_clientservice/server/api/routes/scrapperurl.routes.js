const express = require("express");
const router = express.Router();
import ScraperURL from "../db/models/scraperurl.model";

/* -------------------------------------------------------------
 * @route   POST /scraper
 * @desc    Create a new ScraperURL (linked to logged-in user)
 * @access  Private (requires session)
 * ------------------------------------------------------------- */
router.post("/", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const scraperURL = new ScraperURL({
      ...req.body,
      userId: req.session.userId,  
    });

    await scraperURL.save();
    res.status(201).json(scraperURL);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* -------------------------------------------------------------
 * @route   GET /scraper
 * @desc    Get paginated ScraperURLs for the logged-in user
 * @access  Private
 * @query   page (default = 1), limit (default = 10)
 * ------------------------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;

    const [scraperURLs, total] = await Promise.all([
      ScraperURL.find({ userId: req.session.userId })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate("userId", "name email"), // populate basic user info
      ScraperURL.countDocuments({ userId: req.session.userId }),
    ]);

    res.status(200).json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: scraperURLs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* -------------------------------------------------------------
 * @route   GET /scraper/:id
 * @desc    Get a single ScraperURL by ID (only if owned by user)
 * @access  Private
 * ------------------------------------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const scraperURL = await ScraperURL.findOne({
      _id: req.params.id,
      userId: req.session.userId,
    }).populate("userId", "name email");

    if (!scraperURL) {
      return res.status(404).json({ error: "ScraperURL not found" });
    }

    res.status(200).json(scraperURL);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* -------------------------------------------------------------
 * @route   PUT /scraper/:id
 * @desc    Update a ScraperURL by ID (only if owned by user)
 * @access  Private
 * ------------------------------------------------------------- */
router.put("/:id", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const scraperURL = await ScraperURL.findOneAndUpdate(
      { _id: req.params.id, userId: req.session.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!scraperURL) {
      return res.status(404).json({ error: "ScraperURL not found" });
    }

    res.status(200).json(scraperURL);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* -------------------------------------------------------------
 * @route   DELETE /scraper/:id
 * @desc    Delete a ScraperURL by ID (only if owned by user)
 * @access  Private
 * ------------------------------------------------------------- */
router.delete("/:id", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const scraperURL = await ScraperURL.findOneAndDelete({
      _id: req.params.id,
      userId: req.session.userId,
    });

    if (!scraperURL) {
      return res.status(404).json({ error: "ScraperURL not found" });
    }

    res.status(200).json({ message: "ScraperURL deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
