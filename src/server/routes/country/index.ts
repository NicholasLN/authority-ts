import express from "express";
import Country from "../../mongo/models/government/Country";
import Region from "../../mongo/models/Region";
var router = express.Router();

router.get("/getAll/:borders?", async (req, res) => {
  var borders = req.params.borders === "true" ? true : false;
  const countries = await Country.find()
    .populate({
      path: "regions",
      select: borders ? "" : "-borders",
    })
    .exec();
  res.status(200).json(countries);
});

router.get("/get/:id", async (req, res) => {
  if (req.params.id && req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const country = await Country.findById(req.params.id).populate({
      path: "regions",
      select: "-borders",
    });
    return res.status(200).json(country);
  } else {
    const country = await Country.findOne({ name: req.params.id }).populate({
      path: "regions",
      select: "-borders",
    });
    if (country) {
      return res.status(200).json(country);
    }
  }
  return res.status(400).json({ error: "Invalid ID/Name" });
});

export default router;
