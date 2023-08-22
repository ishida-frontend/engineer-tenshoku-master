import { CognitoJwtVerifier } from 'aws-jwt-verify'

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID || '',
  tokenUse: 'access',
  clientId: process.env.COGNITO_CLIENT_ID || '',
})
export class jwtHelper {
  static async verifyToken(token: string) {
    try {
      const payload = await verifier.verify(token, verifier)
      return payload ? true : false
    } catch (err) {
      console.log('err', err)
      return false
    }
  }
}
