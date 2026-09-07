export type User = {
 username: string,
 email: string,
 avatar: string,
} 

export interface RegisterRequest {
  email: string,
  password: string,
}
