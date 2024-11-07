const T_PREFIX = "responses";

export const successfulResponsesTrns = {
  default: `${T_PREFIX}.successful.default`,
  login: `${T_PREFIX}.successful.login`,
  registration: `${T_PREFIX}.successful.registration`,
  googleAuth: `${T_PREFIX}.successful.google-auth`,
};

export const pendingResponsesTrns = {
  default: `${T_PREFIX}.pending.default`,
};

export const errorResponsesTrns = {
  default: `${T_PREFIX}.error.default`,
  login: `${T_PREFIX}.error.login`,
  registration: `${T_PREFIX}.error.registration`,
  googleAuth: `${T_PREFIX}.error.google-auth`,
};
