import express from "express";
import Region from "../mongo/models/Region";
import Country from "../mongo/models/government/Country";
var router = express.Router();

router.get("/", async (req, res) => {
  var geoJSON = [] as any;
  var allRegions = await Region.find({});
  await Promise.all(
    allRegions.map(async (region) => {
      var country = await Country.findOne({ regions: region._id });
      var regionGeoJSON = region.returnAsGeoJSON();
      if (country) {
        const { name, color } = country;
        regionGeoJSON.properties.country = name;
        regionGeoJSON.properties.color = color;
      }
      geoJSON.push(regionGeoJSON);
    })
  );
  res.send(geoJSON);
});

export default router;
