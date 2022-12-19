import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import getPage from "../../utils/getPage";
import Body from "../struct/Body";
import Geoman from "./Geoman";

export default function Map() {
  const [geoJSON, setGeoJSON] = React.useState(null);
  const position = [0, 0];
  const zoomLv = 2;

  const navigate = useNavigate();

  useEffect(() => {
    getPage("/api/map").then((resp) => {
      setGeoJSON(resp.data);
    });
  }, []);

  return (
    <Body>
      <MapContainer
        center={position}
        zoom={zoomLv}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          className="w-full h-full"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={20}
        />
        {/* Render geoJSON features. We want a tooltip with the name of the feature */}
        {geoJSON && (
          <GeoJSON
            data={geoJSON}
            style={() => ({
              color: "black",
              weight: 1,
              fillColor: "gray",
              fillOpacity: 0.8,
            })}
            onEachFeature={(feature, layer) => {
              // onclick
              layer.on("click", (e) => {
                // Clicking it on the future will zoom in on the feature and show it's subdivisions (if any)
                // navigate(`/map/${feature.properties.id}`);
                navigate(`/country?id=${feature.properties.country}`);
              });
              layer.setStyle({
                fillColor: feature.properties.color,
              });
            }}
          />
        )}
        <Geoman />
      </MapContainer>
    </Body>
  );
}
