import { Router, Request, Response } from 'express';
import { validationResult, body } from 'express-validator';
import { CognitoClient } from '../config/awsConfig';
import { SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

const router = Router();

router.post('/signup', [
  body('username').notEmpty().isLength({ min: 5 }),
  body('email').notEmpty().normalizeEmail().isEmail(),
  body('password').isString().isLength({ min: 8 }),
], async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(422).json({ errors: result.array() });
  }
  const { username, password, email } = req.body;

  const params = {
    ClientId: process.env.COGNITO_CLIENT_ID || '',
    Password: password,
    Username: username,
    UserAttributes: [
      {
        Name: 'email',
        Value: email
      }]
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

export default router;
