import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax;
import * as turf from "@turf/turf";
import Body from "../struct/Body";
import geojson from "./countries.geo.json";

mapboxgl.accessToken =
  "pk.eyJ1IjoicGhpbHNjb3R0NHZ0IiwiYSI6ImNrd3g3eGVwbDBhZm0ydnA4NTB2cTNxbGMifQ.qCKS8XHV2YJ8mD9-562L8g";

export default function Map() {
  const [useGlobe, setUseGlobe] = React.useState(false);
  const [latLong, setLatLong] = React.useState([0, 0]);
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  // useEffect rerender map when useGlobe changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove();
    }
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      projection: useGlobe ? "globe" : "mercator",
      style: {
        version: 8,
        sources: {},
        layers: [
          {
            id: "background",
            type: "background",
            paint: { "background-color": "#3B727C" },
          },
        ],
      },
      center: [latLong[1], latLong[0]],
      zoom: 1,
    });

    // geojson filter out cells with properties.type === "ocean"
    var matching = turf.featureCollection(
      geojson.features.filter((feature) => feature.properties.type !== "ocean")
    );

    mapRef.current.on("load", () => {
      // set mapbox bounds to geojson bounds
      mapRef.current.jumpTo({
        center: turf.center(geojson).geometry.coordinates,
        zoom: 1,
      });
      mapRef.current.fitBounds(turf.bbox(matching), {
        padding: 20,
      });
      mapRef.current.addLayer({
        id: "geojson",
        type: "fill",
        source: {
          type: "geojson",
          data: matching,
        },
        layout: {},
        paint: {
          "fill-color": "#82A775",
          "fill-opacity": 0.8,
        },
      });
    });

    // Add zoom and rotation controls to the map.
    mapRef.current.on("move", () => {
      setLatLong(mapRef.current.getCenter().toArray().reverse());
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl());
    mapRef.current.addControl(new mapboxgl.FullscreenControl());
    mapRef.current.addControl(new mapboxgl.ScaleControl());
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
