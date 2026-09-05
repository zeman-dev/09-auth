export type User = {
 email: string,
 password: string,
 avatar: string,
} 

export interface registerRequest {
  email: string,
  password: string,
}