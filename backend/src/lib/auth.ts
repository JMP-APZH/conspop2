// lib/auth.ts
import prisma from './prisma'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { v4 as uuidv4 } from 'uuid';

import { RegisterInput } from '../types/auth';


const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface AuthPayload {
  user: AuthUser;
  token: string;
}

// interface for the returned user data

interface AuthReturnUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  nickname?: string | null;
  cityOfOrigin: string;
  currentCity: string;
  role: UserRole;
}

export async function registerUser({
  email,
  password, 
  firstName,
  lastName,
  nickname,
  cityOfOrigin,
  currentCity
}: RegisterInput): Promise<AuthPayload> {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('Email already in use');

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log('Will generate UUID:', uuidv4());
  
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      nickname,
      cityOfOrigin,
      currentCity,
      role: 'USER'
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      nickname: true,
      cityOfOrigin: true,
      currentCity: true,
      role: true,
      createdAt: true
    }
  });

  console.log('Immediately after creation:', JSON.stringify(user, null, 2));

  console.log('Created user:', user);

  const token = jwt.sign(
    { 
      userId: user.id,
      email: user.email,
      role: user.role, // Include role in JWT
      // Add other minimal claims needed
    },
    JWT_SECRET,
    { expiresIn: '1d' }
  );
  
  return { 
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      nickname: user.nickname,
      cityOfOrigin: user.cityOfOrigin,
      currentCity: user.currentCity,
      role: user.role
    }, 
    token 
  };
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('Invalid password');

  const token = jwt.sign(
    { userId: user.id, 
      email: user.email,
      role: user.role // Include role in JWT
    },
    JWT_SECRET,
    { expiresIn: '1d' }
  );
  
  return { 
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      nickname: user.nickname,
      cityOfOrigin: user.cityOfOrigin,
      currentCity: user.currentCity,
      role: user.role
    },
    token 
  };
}

// export async function verifyToken(token: string) {
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
//     return prisma.user.findUnique({ 
//       where: { id: decoded.userId },
//       select: {
//         id: true,
//         email: true,
//         firstName: true,
//         lastName: true,
//         nickname: true,
//         cityOfOrigin: true,
//         currentCity: true,
//         createdAt: true
//       }
//     });
//   } catch (error) {
//     return null;
//   }
// }

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        nickname: true,
        cityOfOrigin: true,
        currentCity: true,
        role: true,
        createdAt: true
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Verify the role matches between JWT and DB
    if (user.role !== decoded.role) {
      throw new Error('Role mismatch');
    }

    return user;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}