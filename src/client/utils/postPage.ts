import axios, { AxiosResponse } from "axios";
export default async function postPage(
  url: string,
  data: any,
  accessToken: boolean = false
): Promise<AxiosResponse> {
  var cfg = {};
  if (accessToken) {
    cfg = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
  }
  return await axios.post(url, data, cfg);
}
