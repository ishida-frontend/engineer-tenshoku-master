import { jwtDecode } from 'jwt-decode'

export const getJwtDecoded = (
  token: string,
): {
  [name: string]: string
} => {
  const decoded = jwtDecode<{ [name: string]: string }>(token)
  return decoded
}
