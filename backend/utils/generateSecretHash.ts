import crypto from 'crypto'

export function generateSecretHash(
  clientId: string,
  clientSecret: string,
  email: string,
) {
  return crypto
    .createHmac('SHA256', clientSecret)
    .update(email + clientId)
    .digest('base64')
}
