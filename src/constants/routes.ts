export const PATHNAMES = {
  AUTH: "/auth",
  REGISTRATION: "/auth/registration",
  GOOGLE_AUTH: "/auth/google",

  HOME: "/",

  CLONES: "/clones",
  CLONE_ITEM: "/clones/:slug",

  INQUIRIES: "/inquiries",
  INQUIRY_ITEM: "/inquiries/:slug",

  CABINET: "/cabinet",
  MY_CLONES: "/cabinet/my-clones",
  CREATE_CLONE: "/cabinet/my-clones/create",
  EDIT_CLONE: "/cabinet/my-clones/:slug/edit",

  MY_INQUIRIES: "/cabinet/my-inquiries", // only for agent
  CREATE_INQUIRY: "/cabinet/my-inquiries/create", // only for agent
  EDIT_INQUIRY: "/cabinet/my-inquiries/:slug/edit", // only for agent

  USERS: "/users",
  USER_PROFILE: "/users/:id",
  USER_PROFILE_CLONES: "/users/:id/clones",
  USER_PROFILE_INQUIRIES: "/users/:id/inquiries", // only for agent

  NOT_FOUND: "/*",
};
