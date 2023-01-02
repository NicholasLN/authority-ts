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
import { ObjectId } from "mongoose";
import { logGame } from "../../utils/logging";
import Character from "../../mongo/models/Character";

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
        seats: [any];
      }
    ];
  };
  regions: [
    {
      name: string;
      type: string;
      seatsElected: [string];
      coordinates: number[][][];
    }
  ];
};

interface RegionFile {
  countries: CountryFile[];
}

async function reset() {
  await Character.deleteMany({});
  await Country.deleteMany({});
  await LegislativeBody.deleteMany({});
  await LegislativeBranch.deleteMany({});
  await Seat.deleteMany({});
  await Region.deleteMany({});
}
async function getWorldFromFile(): Promise<RegionFile> {
  const worldPath = path.join(__dirname, "./world.json");
  const world = JSON.parse(fs.readFileSync(worldPath, "utf8")) as RegionFile;
  return world;
}
async function createCountry(
  legislativeBranch: any,
  country: any
): Promise<any> {
  var newCountry = new Country({
    name: country.name,
    color: country.color,
    properties: country.properties,
    legislativeBranch: legislativeBranch,
  });
  await newCountry.save();
  return newCountry;
}
async function createLegislativeBranch(legislativeBranch: any): Promise<any> {
  var seats = [] as any;
  var legislativeBodies = [] as any;
  if (legislativeBranch.legislativeBodies) {
    await Promise.all(
      legislativeBranch.legislativeBodies.map(async (legislativeBody: any) => {
        var newLegislativeBody = new LegislativeBody({
          name: legislativeBody.name,
        });
        legislativeBodies.push(newLegislativeBody);
        // seats
        await Promise.all(
          legislativeBody.seats.map(async (seat: any) => {
            var newSeat = new Seat({
              name: seat.name,
              seatId: seat.id,
              seatProperties: {
                votingPower: seat.votingPower || 1,
                minSeatsCanBeHeld: seat.minSeatsCanBeHeld || 1,
                maxSeatsCanBeHeld: seat.maxSeatsCanBeHeld || 1,
              },
              legislativeBody: newLegislativeBody,
            });
            await newSeat.save();
            newLegislativeBody.seats.push(newSeat._id);
            seats.push(newSeat);
          })
        );
        await newLegislativeBody.save();
      })
    );
  }
  var legislativeBranch = new LegislativeBranch({
    legislativeBodies: legislativeBodies,
  }) as any;
  await legislativeBranch.save();
  return { seats, legislativeBranch };
}
async function createRegions(regions: any, seats: any) {
  var regionsReturn = [] as any;
  regions.map(async (region: any) => {
    console.log(region);
    var seatsInRegion = seats.filter((seat: any) => {
      return region.seatsElected.includes(seat.seatId);
    });
    var seatsInRegionIds = seatsInRegion.map((seat: any) => {
      return seat._id;
    });
    var newRegion = new Region({
      name: region.name,
      type: region.type,
      seatsElected: seatsInRegionIds,
      borders: {
        type: "Polygon",
        coordinates: region.coordinates,
      },
    });
    regionsReturn.push(newRegion);
  });
  return regionsReturn;
}

router.get("/createWorld", isAdmin, async (req, res) => {
  try {
    logGame("Resetting/creating new world...");
    await reset();
    logGame("World deleted.");
    var world = await getWorldFromFile();
    const countryPromises = world.countries.map(
      async (country: CountryFile) => {
        logGame(`Creating country: ${country.name}...`);
        var { seats, legislativeBranch } = await createLegislativeBranch(
          country.legislativeBranch
        );
        var newCountry = await createCountry(legislativeBranch, country);
        var regions = await createRegions(country.regions, seats);
        for (const region of regions) {
          newCountry.regions.push(region._id);
          region.save();
        }
        logGame(`Country created: ${country.name}`);
        return newCountry.save();
      }
    );
    await Promise.all(countryPromises);
    res.status(200).json({ message: "World created" });
    logGame("World created.");
    var countries = await Country.find({});
    logGame(`Countries: ${countries.length}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating world" });
  }
});

export default router;
