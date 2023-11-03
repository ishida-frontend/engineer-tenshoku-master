import { Router, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { CognitoClient } from '../config/awsConfig'
import {
  InitiateAuthCommand,
  InitiateAuthResponse,
  SignUpCommand,
  AdminUpdateUserAttributesCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider'
import AWS from 'aws-sdk'
import { jwtHelper } from '../utils/jwt'
import {
  signupValidationRules,
  updateEmailValidationRules,
} from '../validation/auth'
import { validate } from '../validation/index'
import { UserApplicationService } from '../application/user'

AWS.config.update({
  region: 'ap-northeast-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider()
const router = Router()

// signup
router.post(
  '/signup',
  validate(signupValidationRules),
  async (req: Request, res: Response) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() })
    }
    const { email, password } = req.body

    const params = {
      ClientId: process.env.COGNITO_CLIENT_ID || '',
      Password: password,
      Username: email,
    }

    const signUpCommand = new SignUpCommand(params)

    try {
      const data = await CognitoClient.send(signUpCommand)

      if (!data.UserSub) {
        throw new Error(
          'ユーザー登録に失敗しました。時間をおいてお試しください',
        )
      }

      const user = UserApplicationService.create({
        id: data.UserSub,
        // 仮の名前を設定
        name: Math.random().toString().slice(2, 8),
      })

      res.status(200).json({
        success: true,
      })
    } catch (err) {
      console.error(err)
      res.status(400).end()
    }
  },
)

// signin
router.post('/signin', async (req, res) => {
  const { email, password } = req.body

  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.COGNITO_CLIENT_ID || '',
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  }

  try {
    const command = new InitiateAuthCommand(params)
    const data = (await CognitoClient.send(command)) as InitiateAuthResponse

    // クッキーにアクセストークンとリフレッシュトークンを保存
    res.cookie('accessToken', data.AuthenticationResult?.AccessToken, {
      httpOnly: true,
    })
    res.cookie('refreshToken', data.AuthenticationResult?.RefreshToken, {
      httpOnly: true,
    })
    res.header('Access-Control-Allow-Credentials', 'true')

    res.status(200).json(data.AuthenticationResult)
  } catch (err) {
    console.error(err)
    const errorMessage = (err as Error).message
    res.status(400).json({ error: errorMessage })
  }
})

//jwtトークンの検証
router.get('/tokenVerification', async (req, res, next) => {
  let token = ''
  try {
    if (req.cookies.accessToken) {
      token = req.cookies.accessToken
    } else {
      //cookieにjwtトークンがない場合は、認証不可
      return res.status(200).json({ isAuthenticated: false })
    }
    //  リクエストされたjwtトークンを検証
    const decode = await jwtHelper.verifyToken(token)
    return res.status(200).json(decode)
  } catch (e: any) {
    throw new Error(e)
  }
})

// refresh
router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body

  const params = {
    AuthFlow: 'REFRESH_TOKEN_AUTH',
    ClientId: process.env.COGNITO_CLIENT_ID || '',
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
    },
  }

  try {
    const command = new InitiateAuthCommand(params)
    const data = await CognitoClient.send(command)

    // クッキーに新しいアクセストークンを保存
    res.cookie('accessToken', data.AuthenticationResult?.AccessToken, {
      httpOnly: true,
    })

    res.status(200).json(data.AuthenticationResult)
  } catch (err) {
    console.error(err)
    const errorMessage = (err as Error).message
    res.status(400).json({ error: errorMessage })
  }
})

router.post('/logout', async (req, res) => {
  try {
    res.cookie('accessToken', {
      httpOnly: true,
    })

    res.status(200).json(true)
  } catch (err) {
    console.error(err)
    const errorMessage = (err as Error).message
    res.status(400).json({ error: errorMessage })
  }
})

//update_email
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  console.error('AWS credentials are not set in the environment variables.')
  process.exit(1) // 環境変数が設定されていない場合はプログラムを終了する
}
const cognitoClient = new CognitoIdentityProviderClient({
  region: 'ap-northeast-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

router.post(
  '/update/email',
  validate(updateEmailValidationRules),
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const { newEmail, username } = req.body
    const command = new AdminUpdateUserAttributesCommand({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: username,
      UserAttributes: [
        {
          Name: 'email',
          Value: newEmail,
        },
      ],
    })

    try {
      await cognitoClient.send(command)
      res.send('Email updated successfully')
    } catch (error) {
      console.error(error)
      res.status(500).send('An error occurred')
    }
  },
)

export default router
