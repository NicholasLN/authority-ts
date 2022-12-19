import { ObjectId } from "mongoose";
import Country from "../../mongo/models/government/Country";
import User from "../../mongo/models/User";

type grabCharactersOptions = {
  grabCharacters: boolean;
  grabRegions: {
    grabRegion: boolean;
    grabBorders: boolean;
  };
  grabCountries: boolean;
};

/**
 * Select a user by id
 * @param userId ID of the user (ObjectID)
 * @param password Whether or not to include the password (default: false)
 * @param grabCharacters Whether or not to include the characters, their regions, and their countries (default: true)
 * @returns A user object
 */
async function grabUserById(
  userId: string,
  password: boolean,
  grabCharacters: grabCharactersOptions = {
    grabCharacters: true,
    grabRegions: {
      grabRegion: true,
      grabBorders: false,
    },
    grabCountries: true,
  }
): Promise<typeof User> {
  var userDatabase = await User.findById(userId).populate({
    path: grabCharacters.grabCharacters ? "characters" : "",
    populate: {
      path: grabCharacters.grabRegions.grabRegion ? "region" : "",
      select: grabCharacters.grabRegions.grabBorders ? "" : "-borders",
      strictPopulate: false,
    },
    select: password ? "" : "-password",
  });
  if (userDatabase) {
    var user = userDatabase.toObject();
    if (grabCharacters.grabCharacters && grabCharacters.grabCountries) {
      await Promise.all(
        user.characters.map(async (character: any) => {
          // Find a country that holds the characters region. Country model has an array of region object ids.
          const country = await Country.findOne({ regions: character.region });
          if (country) {
            character.country = country.toObject();
          }
        })
      );
    }
    return user as any as typeof User;
  }
  return null as any as typeof User;
}

async function grabUser(
  query: any,
  password: boolean,
  grabCharacters: grabCharactersOptions = {
    grabCharacters: true,
    grabRegions: {
      grabRegion: true,
      grabBorders: false,
    },
    grabCountries: true,
  }
): Promise<typeof User> {
  var userDatabase = await User.find(query).populate({
    path: grabCharacters.grabCharacters ? "characters" : "",
    populate: {
      path: grabCharacters.grabRegions.grabRegion ? "region" : "",
      select: grabCharacters.grabRegions.grabBorders ? "" : "-borders",
      strictPopulate: false,
    },
    select: password ? "" : "-password",
  });
  if (userDatabase) {
    var user = userDatabase[0].toObject();
    if (grabCharacters.grabCharacters && grabCharacters.grabCountries) {
      await Promise.all(
        user.characters.map(async (character: any) => {
          const country = await Country.findOne({ regions: character.region });
          if (country) {
            character.country = country.toObject();
          }
        })
      );
    }
    return user as any as typeof User;
  }
  return null as any as typeof User;
}

export { grabUser, grabUserById };
