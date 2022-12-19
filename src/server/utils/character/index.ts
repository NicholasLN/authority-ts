import { ObjectId } from "mongoose";
import Character from "../../mongo/models/Character";
import Country from "../../mongo/models/government/Country";
import User from "../../mongo/models/User";

type includeRegionOptions = {
  includeRegion: boolean;
  includeBorders: boolean;
};

/**
 * Select a users characters by user id
 * @param userId The user's ID
 * @param includeRegions Whether or not to include the region (and borders) as an object
 * @returns An array of characters that belong to the user
 */
async function grabCharactersById(
  userId: string,
  includeRegions: includeRegionOptions = {
    includeRegion: false,
    includeBorders: false,
  },
  includeCountry: boolean = true
): Promise<Character[]> {
  var charactersDatabase = await User.findById(userId).populate({
    path: "characters",
    populate: {
      path: includeRegions.includeRegion ? "region" : "",
      select: includeRegions.includeBorders ? "" : "-borders",
      strictPopulate: false,
    },
  });
  if (charactersDatabase) {
    var characters = charactersDatabase.toObject();
    if (includeCountry) {
      characters.forEach(async (character: any) => {
        // Find a country that holds the characters region. Country model has an array of region object ids.
        const country = await Country.findOne({ regions: character.region });
        if (country) {
          character.country = country.toObject();
        }
      });
    }
    return characters as any as Character[];
  }
  return [];
}

/**
 * Select a users characters by query.
 * @param query The query to search for
 * @param includeRegions Whether or not to include the region (and borders) as an object
 * @returns An array of characters that match the query
 */
async function grabCharacters(
  query: any,
  includeRegions: includeRegionOptions = {
    includeRegion: false,
    includeBorders: false,
  },
  includeCountry: boolean = true
): Promise<Character[]> {
  var charactersDatabase = await User.find(query).populate({
    path: "characters",
    populate: {
      path: includeRegions.includeRegion ? "region" : "",
      select: includeRegions.includeBorders ? "" : "-borders",
      strictPopulate: false,
    },
  });
  if (charactersDatabase) {
    var characters = charactersDatabase.map((character) =>
      character.toObject()
    );
    if (includeCountry) {
      characters.forEach(async (character: any) => {
        // Find a country that holds the characters region. Country model has an array of region object ids.
        const country = await Country.findOne({ regions: character.region });
        if (country) {
          character.country = country.toObject();
        }
      });
    }
    return characters as any as Character[];
  }
  return [];
}

/**
 * Select a users characters by user id
 * @param characterId The character's ID
 * @param includeRegion Whether or not to include the region (and borders) as an object
 * @returns The character that matches the ID
 */
async function grabCharacterById(
  characterId: string,
  includeRegion: includeRegionOptions = {
    includeRegion: false,
    includeBorders: false,
  },
  includeCountry: boolean = true
): Promise<Character> {
  var characterDatabase = await Character.findById(characterId).populate({
    path: includeRegion.includeRegion ? "region" : "",
    select: includeRegion.includeBorders ? "" : "-borders",
    strictPopulate: false,
  });
  if (characterDatabase) {
    var character = characterDatabase.toObject();
    if (includeCountry) {
      // Find a country that holds the characters region. Country model has an array of region object ids.
      const country = await Country.findOne({
        regions: character.region,
      });
      if (country) {
        character.country = country.toObject();
      }
    }
    return character as any as Character;
  }
  return null as any;
}

/**
 * Select a users characters by query.
 * @param query The query to search for
 * @param includeRegions Whether or not to include the region (and borders) as an object
 * @returns An array of characters that match the query
 */
async function grabCharacter(
  query: any,
  includeRegions: includeRegionOptions = {
    includeRegion: false,
    includeBorders: false,
  },
  includeCountry: boolean = true
): Promise<Character[]> {
  var charactersDatabase = await Character.find(query).populate({
    path: includeRegions.includeRegion ? "region" : "",
    select: includeRegions.includeBorders ? "" : "-borders",
    strictPopulate: false,
  });
  if (charactersDatabase) {
    var characters = charactersDatabase.map((character) =>
      character.toObject()
    );
    if (includeCountry) {
      characters.forEach(async (character: any) => {
        const country = await Country.findOne({ regions: character.region });
        if (country) {
          character.country = country.toObject();
        }
      });
    }
    return characters as any as Character[];
  }
  return [];
}

export { grabCharactersById, grabCharacters, grabCharacterById, grabCharacter };
