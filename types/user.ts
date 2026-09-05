export type User = {
 username: string,
 email: string,
 avatar: string,
} 

export interface registerRequest {
  email: string,
  password: string,
}
