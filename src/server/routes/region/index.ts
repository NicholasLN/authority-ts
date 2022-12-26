import express from "express";
import Region from "../../mongo/models/Region";
var router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

router.get("/read/:id?", async (req, res) => {
  if (req.params.id && req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const region = await Region.findById(req.params.id).exec();
    return res.status(200).json(region);
  } else {
    const region = await Region.findOne({ name: req.params.id }).exec();
    if (region) {
      return res.status(200).json(region);
    }
  }
  return res.status(400).json({ error: "Invalid ID/Name" });
});

export default router;
