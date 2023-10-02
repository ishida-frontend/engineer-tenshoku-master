import jwt_decode from 'jwt-decode'

export const getJwtDecoded = (
  token: string,
): {
  [name: string]: string
} => {
  const decoded = jwt_decode<{ [name: string]: string }>(token)
  return decoded
}
