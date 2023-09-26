import express from "express";
import { isAdmin } from "../../strategies/authStrategies";
import createWorld from "../../utils/world";
var router = express.Router();

router.get("/createWorld", isAdmin, async (req, res) => {
  try {
    await createWorld();
    res.status(200).json({ message: "World created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating world" });
  }
});

export default router;
