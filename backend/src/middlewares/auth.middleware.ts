import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { JwtPayload } from '../types';

export const authenticate = (prisma: PrismaClient) => 
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace('Bearer ', '') || '';
    
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        const user = await prisma.user.findUnique({
          where: { id: decoded.userId }
        });
        
        if (user) {
          req.user = user;
        }
      } catch (error) {
        console.warn('Invalid token:', error);
      }
    }
    
    next();
  };