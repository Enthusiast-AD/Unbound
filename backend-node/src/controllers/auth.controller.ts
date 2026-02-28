import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.ts';
import env from '../config/env.ts';

type Request = express.Request;
type Response = express.Response;

const generateToken = (id: string) => {
  return jwt.sign({ id }, env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({ message: 'Please provide all fields' });
      return;
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    if (user) {
      const token = generateToken(user._id.toString());
      
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        subscriptionTier: user.subscriptionTier,
        token,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (user && (await (user as any).comparePassword(password))) {
      const token = generateToken(user._id.toString());
      
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        subscriptionTier: user.subscriptionTier,
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutUser = (req: Request, res: Response): void => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById((req as any).user._id);
    if (user) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        subscriptionTier: user.subscriptionTier,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
