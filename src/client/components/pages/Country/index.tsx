import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  addAlert,
  quickErrorAlert,
  quickSuccessAlert,
} from "../../../redux/reducers/alertSlice";
import getPage from "../../../utils/getPage";
import MapComponent from "../../map/MapComponent";
import Body from "../../struct/Body";
import NotFound from "../../struct/NotFound";

export default function Country() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const nav = useNavigate();

  const [countryInformation, setCountryInformation] = React.useState(
    null as unknown as Country
  );
  const [mapGeoJSON, setMapGeoJSON] = React.useState(
    null as unknown as GeoJSON.FeatureCollection
  );

  const [loading, setLoading] = React.useState(true);
  const [notFound, setNotFound] = React.useState(false);

  const [mode, setMode] = React.useState("map" as "main" | "map");

  useEffect(() => {
    console.log("Country page loaded");
    var searchId: string | null | undefined;
    if (searchParams.get("id")) {
      searchId = searchParams.get("id");
    } else {
      nav("/");
    }

    async function getCountry() {
      var resp = await getPage(`/api/country/read/${searchId}`);
      if (resp.status === 200) {
        var country = await resp.data;
        if (country) {
          if (mode === "map") {
            var mapInfo = await getPage(`/api/country/getGeoJSON/${searchId}`);
            if (mapInfo.status === 200) {
              var mapData = await mapInfo.data;
              if (mapData) {
                setMapGeoJSON(mapData);
              } else {
                dispatch(quickErrorAlert("Failed to load map data."));
              }
            } else {
              dispatch(quickErrorAlert("Failed to load map data."));
            }
          }
          setCountryInformation(country);
          setLoading(false);
        }
      } else {
        setNotFound(true);
        setLoading(false);
      }
    }
    getCountry();
    return () => {
      setCountryInformation(null as unknown as Country);
      setMapGeoJSON(null as unknown as GeoJSON.FeatureCollection);
      setNotFound(false);
      setLoading(true);
    };
  }, [searchParams, nav]);

  if (loading) {
    return (
      <Body>
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      </Body>
    );
  }
  if (!notFound) {
    return (
      <Body>
        <div className="flex flex-col items-center justify-center h-full w-full">
          <h1 className="text-2xl font-bold">{countryInformation.name}</h1>
          {mode === "map" ? (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <MapComponent
                geoJSON={mapGeoJSON}
                onEachFeature={(feature: any, layer: any) => {
                  layer.on({
                    click: (e: any) => {
                      nav(`/region?id=${feature.properties.id}`);
                    },
                  });
                }}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold">Main</h1>
            </div>
          )}
        </div>
      </Body>
    );
  } else {
    return (
      <NotFound
        errorType="Country not found."
        errorMessage="The country you are looking for does not exist."
        extraMessage="If you believe this is an error, please contact the site administrator."
      />
    );
  }
}
