import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.ts';
import env from '../config/env.ts';

type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token;

  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
    return;
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET || 'fallback_secret') as any;
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      res.status(401).json({ message: 'Not authorized, user not found' });
      return;
    }

    (req as any).user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
