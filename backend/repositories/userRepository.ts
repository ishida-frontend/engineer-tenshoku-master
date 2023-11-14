import {
  CognitoIdentityProviderClient,
  AdminUpdateUserAttributesCommand,
  AdminUpdateUserAttributesCommandInput,
  VerifyUserAttributeCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cookieParser())

export class UserRepository {
  private cognitoClient: CognitoIdentityProviderClient

  constructor(cognitoClient: CognitoIdentityProviderClient) {
    this.cognitoClient = cognitoClient
  }

  async updateEmail(username: string, email: string): Promise<void> {
    const updateParams: AdminUpdateUserAttributesCommandInput = {
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: username,
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
      ],
    }

    const command = new AdminUpdateUserAttributesCommand(updateParams)
    await this.cognitoClient.send(command)
  }

  async confirmEmail(accessToken: string, code: string): Promise<void> {
    const command = new VerifyUserAttributeCommand({
      AccessToken: accessToken,
      AttributeName: 'email',
      Code: code,
    })

    await this.cognitoClient.send(command)
  }
}
