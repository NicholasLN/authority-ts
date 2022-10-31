import axios, { AxiosResponse } from "axios";

export default async function getPage(
  url: string,
  accessToken: any = false
): Promise<AxiosResponse> {
  var cfg = {};
  if (accessToken) {
    cfg = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
  }

  return await axios.get(url, cfg);
}
