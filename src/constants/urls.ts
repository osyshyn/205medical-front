import { PATHNAMES } from "./routes";

export const getImageUrl = (path: string) =>
  `${process.env.REACT_APP_SERVER_URL}${path}`;

const GOOGLE_OAUTH_V2_API_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_OAUTH_V2_REDIRECT_URI = `?redirect_uri=${window.location.origin}${PATHNAMES.GOOGLE_AUTH}${process.env.REACT_APP_GOOGLE_OAUTH_V2_REDIRECT_URI_QUERY_PARAMS}`;

export const GOOGLE_OAUTH_V2_AUTHORIZATION_URL = `${GOOGLE_OAUTH_V2_API_URL}${GOOGLE_OAUTH_V2_REDIRECT_URI}`;
