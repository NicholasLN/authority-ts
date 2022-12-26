import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getPage from "../../utils/getPage";
import MapComponent from "../map/MapComponent";
import Body from "../struct/Body";

export default function WorldMap() {
  const [mapGeoJSON, setMapGeoJSON] = React.useState(
    null as unknown as GeoJSON.FeatureCollection
  );
  const nav = useNavigate();

  useEffect(() => {
    async function getMapData() {
      getPage("/api/map").then((resp) => {
        setMapGeoJSON(resp.data);
      });
    }
    getMapData();
  }, []);

  return (
    <Body>
      <h1 className="text-3xl font-extrabold">World Map</h1>
      <MapComponent
        geoJSON={mapGeoJSON}
        onEachFeature={(feature: any, layer: any) => {
          layer.on({
            click: () => {
              nav(`/country/?id=${feature.properties.country}`);
            },
          });
        }}
      />
    </Body>
  );
}
