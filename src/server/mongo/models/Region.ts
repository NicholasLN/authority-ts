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
  seatsElected: ObjectId[];
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
  seatsElected: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seat",
    },
  ],
});

regionSchema.methods.returnAsGeoJSON = function () {
  return {
    type: "Feature",
    properties: {
      name: this.name,
      id: this._id,
    },
    geometry: {
      type: this.borders.type || "Polygon",
      coordinates: this.borders.coordinates,
    },
  };
};

export default mongoose.model<Region>("Region", regionSchema);
