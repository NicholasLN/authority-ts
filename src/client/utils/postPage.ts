import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
export default async function postPage(
  url: string,
  data: any,
  accessToken: boolean = false,
  attachCharacter: boolean = false
): Promise<AxiosResponse> {
  var cfg: any = {};
  if (accessToken) {
    cfg = {
      headers: {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    };
  }
  if (attachCharacter) {
    cfg.headers["current_character"] = Cookies.get("current_character");
  }

  return await axios.post(url, data, cfg);
}
