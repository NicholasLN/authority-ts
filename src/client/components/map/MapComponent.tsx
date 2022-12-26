import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import getPage from "../../utils/getPage";
import Body from "../struct/Body";
import Geoman from "./Geoman";
import * as L from "leaflet";
import GeoJsonLayer from "./geoJsonLayer";

type MapComponentProps = {
  geoJSON: GeoJSON.FeatureCollection;
  onEachFeature?: (feature: GeoJSON.Feature, layer: L.Layer) => void;
};

export default function MapComponent(props: MapComponentProps) {
  const [geoJSON, setGeoJSON] = React.useState(props.geoJSON);
  const [mapSettings, setMapSettings] = React.useState({
    position: [0, 0],
    zoom: 1,
  });

  const navigate = useNavigate();

  useEffect(() => {
    setGeoJSON(props.geoJSON);
    // Determine if geoJSON is valid and if so, get zoom, center and bounds
    if (props.geoJSON) {
      const bounds = L.geoJSON(props.geoJSON).getBounds();
      const center = bounds.getCenter();
      setMapSettings({
        position: [center.lat, center.lng],
        zoom: 1,
      });
    }
  }, [props.geoJSON]);

  return (
    <MapContainer
      id="map"
      center={mapSettings.position as [number, number]}
      zoom={mapSettings.zoom}
      scrollWheelZoom={true}
      className="w-full h-full"
    >
      <TileLayer
        className="w-full h-full"
        // use a tile server with no borders
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={20}
      />
      {/* Render geoJSON features. We want a tooltip with the name of the feature */}
      {
        // validate geoJSON
        geoJSON && (
          <GeoJsonLayer geoJSON={geoJSON} onEachFeature={props.onEachFeature} />
        )
      }
      <Geoman />
    </MapContainer>
  );
}
