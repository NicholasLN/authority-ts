import Cookies from "js-cookie";

// Method which sends a picture to the server
// Takes 4 parameters:
// 1. URL
// 2. Picture
// 3. include accessToken in header
// 4. include current_character in header
export default async function postPicture(
  url: string,
  picture: File,
  includeAccessToken: boolean,
  includeCurrentCharacter: boolean
) {
  // dont use axios because it doesnt work with multer
  const formData = new FormData();
  formData.append("file", picture);

  const headers: any = {
    Authorization: `Bearer ${Cookies.get("access_token")}`,
    current_character: Cookies.get("current_character"),
  };

  if (!includeAccessToken) {
    delete headers.Authorization;
  }
  if (!includeCurrentCharacter) {
    delete headers.current_character;
  }

  const response = await fetch(url, {
    method: "POST",
    body: formData,
    headers,
  });

  return response.json();
}
