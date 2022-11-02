import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
export default async function postPage(
  url: string,
  data: any,
  accessToken: boolean = false
): Promise<AxiosResponse> {
  var cfg = {};
  if (accessToken) {
    cfg = {
      headers: { Authorization: `Bearer ${Cookies.get('access_token')}` },
    };
  }
  return await axios.post(url, data, cfg);
}
