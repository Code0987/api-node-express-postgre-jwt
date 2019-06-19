import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import config = require('../config');

export const createToken = async () => {
  return await jwt.sign({ data: 'payload' }, config.jwt.secret, { expiresIn: '5d' });
};

export const decodeToken = async (token: string) => {
  return await jwt.decode(token, { complete: true });
};

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  // Get token data
  let token = (req.headers['authorization'] || '') as string;

  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  // Verify
  if (token) {

    // Decode token
    try {
      const decoded = await jwt.verify(token, config.jwt.secret);

      // Check for errors
      if (decoded) {
        // Store decoded into request
        (<any>req).decoded = decoded;
        return next();

      } else {
        return res.status(403).json({
          status: 'error',
          message: 'Invalid token provided.'
        });
      }

    } catch (error) {
      return res.status(403).json({
        status: 'error',
        message: 'Invalid token provided.'
      });
    }

  } else {
    return res.status(403).json({
      status: 'error',
      message: 'Must provide a header that looks like "Authorization: Bearer <Value>'
    });
  }
};