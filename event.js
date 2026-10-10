const express = require("express");

const router = express.Router();

const c = require("../controllers/eventController.js");

router.get("/", c.events);

router.get("/:id", c.getEvent);

router.post("/", c.postEvent);

router.put("/:id", c.putEvent);

router.delete("/:id", c.delEvent);

module.exports = router;