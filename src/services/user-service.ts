import create from "./http-service.ts";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateRegistered: string;
  dateLoggedIn: string;
}

export default create("/users");

// {
//     "_id": "647db1840ee1704fa272c62f",
//     "firstName": "Ela",
//     "lastName": "Francisco",
//     "email": "elafrancisco@gmail.com",
//     "dateRegistered": "2023-06-05T09:57:24.050Z",
//     "dateLoggedIn": "2023-06-05T09:57:24.050Z",
//     "__v": 0
// }
