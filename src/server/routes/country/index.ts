import express from "express";
import Country from "../../mongo/models/government/Country";
import Region from "../../mongo/models/Region";
var router = express.Router();

router.get("/getAll", async (req, res) => {
  // get countries and populate regions, deselect "borders"
  const countries = await Country.find()
    .populate({
      path: "regions",
      select: "-borders",
    })
    .select("-borders")
    .exec();
  res.status(200).json(countries);
});

export default router;
