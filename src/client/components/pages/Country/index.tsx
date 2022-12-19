import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addAlert, quickErrorAlert } from "../../../redux/reducers/alertSlice";
import getPage from "../../../utils/getPage";
import Body from "../../struct/Body";
import NotFound from "../../struct/NotFound";

export default function Country() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const nav = useNavigate();

  const [countryInformation, setCountryInformation] = React.useState(
    null as unknown as Country
  );
  const [loading, setLoading] = React.useState(true);
  const [notFound, setNotFound] = React.useState(false);

  useEffect(() => {
    console.log("Country page loaded");
    var searchId: string | null | undefined;
    if (searchParams.get("id")) {
      searchId = searchParams.get("id");
    } else {
      nav("/");
    }

    async function getCountry() {
      var resp = await getPage(`/api/country/get/${searchId}`);
      if (resp.status === 200) {
        var country = await resp.data;
        if (country) {
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
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold">{countryInformation.name}</h1>
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
