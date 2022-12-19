import mongoose, { ObjectId } from "mongoose";

/**
 * A region is an administrative district within a country. It stores its boundaries as a geoJSON feature.
 */
interface Region extends mongoose.Document {
  name: string;
  borders: {
    type: string;
    coordinates: number[][][] | number[][][][];
  };
  returnAsGeoJSON: () => {
    type: string;
    properties?: any;
    geometry: {
      type: string;
      // support for multi-polygons
      coordinates: number[][][] | number[][][][];
    };
  };
}

const regionSchema = new mongoose.Schema<Region>({
  name: { type: String, required: true },
  borders: {
    type: { type: String, default: "Polygon" },
    // support for multi-polygons as well
    coordinates: { type: Array, required: true },
  },
});

regionSchema.methods.returnAsGeoJSON = function () {
  return {
    type: "Feature",
    properties: {
      name: this.name,
    },
    geometry: {
      type: this.borders.type || "Polygon",
      coordinates: this.borders.coordinates,
    },
  };
};

export default mongoose.model<Region>("Region", regionSchema);
