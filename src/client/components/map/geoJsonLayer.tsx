// This will be the geoJsonLayer component
// It will take in props.geoJSON and render it on the map

import React, { useEffect, useRef } from "react";
import { GeoJSON } from "react-leaflet";
import * as L from "leaflet";
import { useLeafletContext } from "@react-leaflet/core";

type GeoJsonLayerProps = {
  geoJSON: GeoJSON.FeatureCollection;
  onEachFeature?: (feature: GeoJSON.Feature, layer: L.Layer) => void;
  style?: (feature: GeoJSON.Feature) => L.PathOptions;
};

const GeoJsonLayer = (props: GeoJsonLayerProps) => {
  const context = useLeafletContext();
  const leafletContainer =
    (context.layerContainer as L.Map) || (context.map as L.Map);
  useEffect(() => {
    // Set zoom to fit geoJSON
    leafletContainer.fitBounds(L.geoJSON(props.geoJSON).getBounds());
  }, [props.geoJSON]);

  return (
    <GeoJSON
      data={props.geoJSON}
      onEachFeature={props.onEachFeature}
      style={() => ({
        color: "black",
        weight: 1,
        fillColor: "gray",
        fillOpacity: 0.8,
      })}
    />
  );
};

export default GeoJsonLayer;
