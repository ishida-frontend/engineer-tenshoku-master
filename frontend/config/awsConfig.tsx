import Amplify from 'aws-amplify'

const awsconfig = {
  Auth: {
    region: process.env.NEXT_PUBLIC_COGNITO_REGION || '',
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || '',
    userPoolWebClientId: process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID || '',
    identityPoolId: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID || '',
  },
}

Amplify.Amplify.configure(awsconfig)

export default Amplify
