import create from "./http-service.ts";

export interface Account {
  firstName: string;
  lastName: string;
  email: string;
}

export default create("/users/me");

// const personalDetailsService = create("/users/me/personal");
// const emailDetailService = create("/users/me/email");
// const passwordDetailService = create("/users/me/password");
//
// export { personalDetailsService, emailDetailService, passwordDetailService };
