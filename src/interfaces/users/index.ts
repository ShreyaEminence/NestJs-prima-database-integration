export interface User {
  id: string;
  username: string;
  password: string;
}
// export interface JwtPayload {
//   id: number;
//   username: string;
// }

export interface JwtResponse {
  access_token: string;
}

export interface userPayload {
  id: string,
  name: string,
  email: string,
}
export interface updateData{
  name:string
}

