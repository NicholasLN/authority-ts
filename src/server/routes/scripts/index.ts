import express from "express";
import { isAdmin } from "../../stategies/authStrategies";
var router = express.Router();
import fs from "fs";
import path from "path";

import Country from "../../mongo/models/government/Country";
import LegislativeBody from "../../mongo/models/government/LegislativeBody";
import LegislativeBranch from "../../mongo/models/government/LegislativeBranch";
import Seat from "../../mongo/models/government/Seat";
import Region from "../../mongo/models/Region";

type CountryFile = {
  name: string;
  color: string;
  properties: {
    singleProvinceState?: boolean;
  };
  legislativeBranch: {
    legislativeBodies?: [
      {
        name: string;
      }
    ];
  };
  regions: [
    {
      name: string;
      type: string;
      coordinates: number[][][];
    }
  ];
};

interface RegionFile {
  countries: CountryFile[];
}

router.get("/createWorld", isAdmin, async (req, res) => {
  await Country.deleteMany({});
  await LegislativeBody.deleteMany({});
  await LegislativeBranch.deleteMany({});
  await Seat.deleteMany({});
  await Region.deleteMany({});

  const worldPath = path.join(__dirname, "./world.json");
  const world = JSON.parse(fs.readFileSync(worldPath, "utf8")) as RegionFile;
  world.countries.map(async (country: CountryFile) => {
    // Create Legislative Bodies first
    // Then create Legislative Branch
    // Then create Country. Assign Legislative Branch to Country
    // Assign Legislative Bodies to Legislative Branch
    // Create Regions, assign to Country

    // Create Legislative Bodies
    var legislativeBodies = [] as any;
    if (country.legislativeBranch.legislativeBodies) {
      country.legislativeBranch.legislativeBodies.map((legislativeBody) => {
        var newLegislativeBody = new LegislativeBody({
          name: legislativeBody.name,
        });
        newLegislativeBody.save();
        legislativeBodies.push(newLegislativeBody);
      });
    }
    // Create Legislative Branch
    var legislativeBranch = new LegislativeBranch({
      legislativeBodies: legislativeBodies,
    });
    // Create Country
    var newCountry = new Country({
      name: country.name,
      color: country.color,
      legislativeBranch: legislativeBranch,
    });
    // Create Regions
    var regions = [] as any;
    country.regions.map((region) => {
      let newRegion = new Region({
        name: region.name,
        borders: {
          type: region.type,
          coordinates: region.coordinates,
        },
      });
      regions.push(newRegion);
      newCountry.regions.push(newRegion._id);
    });
    // Save Country
    await newCountry.save();
    // Save Legislative Branch
    await legislativeBranch.save();
    // Save Legislative Bodies
    legislativeBodies.map(async (legislativeBody: any) => {
      await legislativeBody.save();
    });
    // Save Regions
    regions.map(async (region: any) => {
      region.country = newCountry;
      await region.save();
    });

    var countryFound = await Country.findOne({ name: country.name });
    // populate the country with its regions, legislative branch, and legislative bodies
    if (countryFound) {
      countryFound = await countryFound.populate("regions");
      countryFound = await countryFound.populate("legislativeBranch");
      countryFound = await countryFound.populate(
        "legislativeBranch.legislativeBodies"
      );
    }
  });
  res.status(200).json({ message: "World created" });
});

export default router;
