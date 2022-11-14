import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax;
import * as turf from "@turf/turf";
import Body from "../struct/Body";
import axios from "axios";

mapboxgl.accessToken =
  "pk.eyJ1IjoicGhpbHNjb3R0NHZ0IiwiYSI6ImNrd3g3eGVwbDBhZm0ydnA4NTB2cTNxbGMifQ.qCKS8XHV2YJ8mD9-562L8g";

export default function Map() {
  const [useGlobe, setUseGlobe] = React.useState(false);
  const [latLong, setLatLong] = React.useState([0, 0]);
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  // useEffect rerender map when useGlobe changes
  useEffect(() => {
    async function createMap() {
      // get geoJSON data
      if (mapRef.current) {
        mapRef.current.remove();
      }
      var borders = { type: "FeatureCollection", features: [] };
      var resp = await axios.get("/api/map/").catch((err) => {});
      if (resp) {
        borders.features = resp.data;
      }
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        projection: useGlobe ? "globe" : "mercator",
        style: "mapbox://styles/philscott4vt/claa02c0j000v14mims8dditb",
        center: [latLong[1], latLong[0]],
        zoom: 1,
      });

      mapRef.current.on("load", () => {
        // set mapbox bounds to geojson bounds
        mapRef.current.jumpTo({
          center: turf.center(borders).geometry.coordinates,
          zoom: 1,
        });
        mapRef.current.fitBounds(turf.bbox(borders), {
          padding: 20,
        });
        mapRef.current.addLayer({
          id: "geojson",
          type: "fill",
          source: {
            type: "geojson",
            data: borders,
          },
          layout: {},
          paint: {
            "fill-color": "#82A775",
            "fill-opacity": 1,
          },
        });
        mapRef.current.addControl(new mapboxgl.NavigationControl());
        mapRef.current.addControl(new mapboxgl.FullscreenControl());
        mapRef.current.addControl(new mapboxgl.ScaleControl());
      });

      // Add zoom and rotation controls to the map.
      mapRef.current.on("move", () => {
        setLatLong(mapRef.current.getCenter().toArray().reverse());
      });
    }
    async function main() {
      await createMap();
    }
    main();
  }, [useGlobe]);

  return (
    <Body>
      {/* Buttons on top for mapmodes */}
      <div className="mapmode">
        {/* tailwind */}
        <button
          className={`${
            useGlobe ? "bg-gray-800" : "bg-gray-400"
          } px-4 py-2 rounded-md`}
          onClick={() => setUseGlobe(true)}
        >
          Globe
        </button>
        <button
          className={`${
            !useGlobe ? "bg-gray-800" : "bg-gray-400"
          } px-4 py-2 rounded-md`}
          onClick={() => setUseGlobe(false)}
        >
          Mercator
        </button>
      </div>

      <div className="w-full h-full flex justify-center items-center">
        <div
          ref={mapContainer}
          style={{ width: "80%", height: "80%" }}
          className={`${
            useGlobe && "bg-black"
          } p-3 border-4 border-solid border-black`}
        />
      </div>
    </Body>
  );
}
