import mongoose, { ObjectId } from "mongoose";

/**
 * A region is an administrative district within a country. It stores its boundaries as a geoJSON feature.
 */
interface Region extends mongoose.Document {
  name: string;
  borders: {
    type: string;
    coordinates: number[][][];
  };
  returnAsGeoJSON: () => {
    type: string;
    geometry: {
      type: string;
      coordinates: number[][][];
    };
  };
}

const regionModel = new mongoose.Schema<Region>({
  name: { type: String, required: true },
  borders: {
    type: { type: String, default: "Polygon" },
    coordinates: { type: [[[Number]]], required: true },
  },
});

regionModel.methods.returnAsGeoJSON = function () {
  return {
    type: "Feature",
    properties: {
      name: this.name,
    },
    geometry: {
      type: "Polygon",
      coordinates: this.borders.coordinates,
    },
  };
};

export default mongoose.model("Region", regionModel);
