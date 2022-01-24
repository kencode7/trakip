import jwt_decode from "jwt-decode";

export const cannotGoToWhenLoggedIn = ["/auth", "/recovery"];

export const invalidArr = [undefined, "undefined", null, "null"];

export const responseErrArr = [
  "An error occurred! Please try again",
  "read ECONNRESET",
  "Network Error",
];

export const changeTheme = (mode) => {
  const domElem = document.body;
  if (mode) {
    domElem.setAttribute("vs-theme", "dark");
  } else {
    domElem.removeAttribute("vs-theme");
  }
};

export const verifyToken = (token) => {
  try {
    const decodedToken = jwt_decode(token);
    return (decodedToken?.exp || 0) * 1000 > new Date().getTime();
  } catch (e) {
    return false;
  }
};
