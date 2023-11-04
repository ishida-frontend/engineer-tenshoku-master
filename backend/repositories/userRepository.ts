import {
  CognitoIdentityProviderClient,
  AdminUpdateUserAttributesCommand,
  AdminUpdateUserAttributesCommandInput,
} from '@aws-sdk/client-cognito-identity-provider'

export class UserRepository {
  private cognitoClient: CognitoIdentityProviderClient

  constructor(cognitoClient: CognitoIdentityProviderClient) {
    this.cognitoClient = cognitoClient
  }

  async updateEmail(username: string, email: string): Promise<void> {
    const params: AdminUpdateUserAttributesCommandInput = {
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: username,
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
      ],
    }

    const command = new AdminUpdateUserAttributesCommand(params)
    await this.cognitoClient.send(command)
  }
}
