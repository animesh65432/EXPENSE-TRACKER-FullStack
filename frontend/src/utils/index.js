export function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export const backendurl = "http://localhost:3000";

export const expenstrackerwebsiteimages =
  "https://repository-images.githubusercontent.com/419507496/cfcc1354-86ac-432e-823a-da56c21302ba";
