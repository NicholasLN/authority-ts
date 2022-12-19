import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

type PostPageResponse = {
  status: number;
  type: "success" | "error";
  data: any;
};

export default async function postPage(
  url: string,
  data: any,
  accessToken: boolean = false,
  attachCharacter: boolean = false
): Promise<PostPageResponse> {
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
  try {
    var response = await axios.post(url, data, cfg);
    return { status: response.status, type: "success", data: response.data };
  } catch (e: any) {
    return { status: e.response.status, type: "error", data: e.response.data };
  }
}
