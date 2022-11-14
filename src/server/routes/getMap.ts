import express from "express";
import Region from "../mongo/models/Region";
var router = express.Router();

router.get("/", async (req, res) => {
  var geoJSON = [] as any;
  var allRegions = await Region.find({});
  allRegions.map((region) => {
    geoJSON.push(region.returnAsGeoJSON());
  });
  res.send(geoJSON);
});

export default router;
