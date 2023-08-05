import { Router, Request, Response } from 'express';
import { validationResult, body } from 'express-validator';
import { CognitoClient } from '../config/awsConfig';
import { SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import { InitiateAuthCommand, InitiateAuthResponse } from "@aws-sdk/client-cognito-identity-provider";


const router = Router();

// signup
router.post('/signup', [
  body('username').notEmpty().normalizeEmail().isEmail(),
  body('password').isString().isLength({ min: 8 }),
], async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(422).json({ errors: result.array() });
  }
  const { username, password } = req.body;

  const params = {
    ClientId: process.env.COGNITO_CLIENT_ID || '',
    Password: password,
    Username: username,
  };

  const signUpCommand = new SignUpCommand(params);

  try {
    const data = await CognitoClient.send(signUpCommand);
    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(400).end();
  }
});

// signin
router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.COGNITO_CLIENT_ID || '',
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  try {
    const command = new InitiateAuthCommand(params);
    const data = await CognitoClient.send(command) as InitiateAuthResponse;
    res.status(200).json(data.AuthenticationResult);
  } catch (err) {
    console.error(err);
    const errorMessage = (err as Error).message;
    res.status(400).json({ error: errorMessage });
  }
});

// refresh
router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;

  const params = {
    AuthFlow: 'REFRESH_TOKEN_AUTH',
    ClientId: process.env.COGNITO_CLIENT_ID || '',
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
    },
  };

  try {
    const command = new InitiateAuthCommand(params);
    const data = await CognitoClient.send(command);
    res.status(200).json(data.AuthenticationResult);
  } catch (err) {
    console.error(err);
    const errorMessage = (err as Error).message;
    res.status(400).json({ error: errorMessage });
  }
});


export default router;
