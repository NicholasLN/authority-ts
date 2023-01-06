import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import getPage from "../../../utils/getPage";
import Body from "../../struct/Body";
import NotFound from "../../struct/NotFound";

export default function Region() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = React.useState(true);
  const [notFound, setNotFound] = React.useState(false);
  const [regionInformation, setRegionInformation] = React.useState(
    null as unknown as Region
  );

  useEffect(() => {
    async function getRegion() {
      try {
        const resp = await getPage(
          `/api/region/read/${searchParams.get("id")}`
        );
        if (resp.status === 200) {
          setRegionInformation(resp.data);
          setLoading(false);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        setNotFound(true);
      }
    }

    getRegion();
  }, [searchParams]);

  if (loading) {
    return (
      <Body>
        <h1 className="text-3xl font-extrabold">Loading...</h1>
      </Body>
    );
  }
  if (!notFound) {
    return (
      <Body>
        <h1 className="text-3xl font-extrabold">{regionInformation.name}</h1>
      </Body>
    );
  } else {
    return (
      <NotFound
        errorType="Region/State not found."
        errorMessage="The region/state you are looking for does not exist."
        extraMessage="If you believe this is an error, please contact the site administrator."
      />
    );
  }
}
