import {
  CognitoIdentityProviderClient,
  AdminUpdateUserAttributesCommand,
  AdminUpdateUserAttributesCommandInput,
  VerifyUserAttributeCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import cookieParser from 'cookie-parser'
import { cookie } from 'express-validator'

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

  async verifyEmail(newEmail: string, code: string): Promise<void> {
    const verifyParams = {
      AccessToken: ,
      AttributeName: newEmail,
      Code: code,
    }
    const command = new VerifyUserAttributeCommand(verifyParams)
    await this.cognitoClient.send(command)
  }
}
