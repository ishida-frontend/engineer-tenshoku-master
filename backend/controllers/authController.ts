import { Router, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { CognitoClient } from '../config/awsConfig'
import {
  InitiateAuthCommand,
  InitiateAuthResponse,
  SignUpCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider'
import { jwtHelper } from '../utils/jwt'
import { signupValidationRules } from '../validation/auth'
import { validate } from '../validation/index'
import { UserApplicationService } from '../application/user'
import { UserService } from '../services/userService'
import { UserRepository } from '../repositories/userRepository'
import { generateSecretHash } from '../utils/generateSecretHash'

const router = Router()
const clientId = process.env.COGNITO_CLIENT_ID || ''
const clientSecret = process.env.COGNITO_CLIENT_SECRET || ''

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

    const secretHash = generateSecretHash(clientId, clientSecret, email)

    const params = {
      ClientId: clientId,
      SecretHash: secretHash,
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

      UserApplicationService.create({
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

router.post('/google-signup', async (req: Request, res: Response) => {
  try {
    const { id, name } = req.body

    const user = UserApplicationService.create({
      id,
      name,
    })

    if (!user) {
      throw new Error('ユーザー登録に失敗しました。時間をおいてお試しください')
    }

    res.status(200).json({
      success: true,
    })
  } catch (err) {
    console.error(err)
    res.status(400).end()
  }
})

// signin
router.post('/signin', async (req, res) => {
  const { email, password } = req.body

  const secretHash = generateSecretHash(clientId, clientSecret, email)

  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: clientId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
      SECRET_HASH: secretHash,
    },
  }

  try {
    const command = new InitiateAuthCommand(params)
    const data = (await CognitoClient.send(command)) as InitiateAuthResponse

    // クッキーにアクセストークンとリフレッシュトークンを保存
    res.cookie('accessToken', data.AuthenticationResult?.AccessToken, {
      httpOnly: true,
    })
    console.log(
      'data.AuthenticationResult?.AccessToken:',
      data.AuthenticationResult?.AccessToken,
    )
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
router.get('/tokenVerification', async (req, res) => {
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
  } catch (e) {
    throw new Error(`tokenVerification error: ${e}`)
  }
})

// refresh
router.post('/refresh', async (req, res) => {
  const { email, refreshToken } = req.body

  const secretHash = generateSecretHash(clientId, clientSecret, email)

  const params = {
    AuthFlow: 'REFRESH_TOKEN_AUTH',
    ClientId: clientId,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
      SECRET_HASH: secretHash,
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

//メール再設定
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error('AWS credentials are not set in the environment variables.')
}
const cognitoClient = new CognitoIdentityProviderClient({
  region: 'ap-northeast-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

const userRepository = new UserRepository(cognitoClient)
const userService = new UserService(userRepository)

export const updateEmail = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const { newEmail, username } = req.body
  try {
    await userService.updateEmail(username, newEmail)
    res.status(200).send('Email updated successfully')
  } catch (error) {
    res.status(500).send('An error occurred')
  }
}

export const confirmEmail = async (req: Request, res: Response) => {
  console.log('req.body:', req.body)
  const accessToken = req.cookies['accessToken']

  try {
    const { code } = req.body
    console.log('code:', code)
    console.log('accessToken:', accessToken)
    await userService.confirmEmail(accessToken, code)
    res.status(200).send('Email updated successfully')
  } catch (error) {
    res.status(500).send('An error occurred')
  }
}

export default router
