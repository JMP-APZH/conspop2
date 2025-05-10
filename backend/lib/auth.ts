// lib/auth.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  cityOfOrigin: string;
  currentCity: string;
}

export async function registerUser({
  email,
  password,
  firstName,
  lastName,
  nickname,
  cityOfOrigin,
  currentCity
}: RegisterInput) {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('Email already in use');

  const hashedPassword = await bcrypt.hash(password, 10);
  
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      nickname,
      cityOfOrigin,
      currentCity
    }
  });
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('Invalid password');

  const token = jwt.sign(
    { userId: user.id, email: user.email },
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
      currentCity: user.currentCity
    },
    token 
  };
}

export async function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return prisma.user.findUnique({ 
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        nickname: true,
        cityOfOrigin: true,
        currentCity: true,
        createdAt: true
      }
    });
  } catch (error) {
    return null;
  }
}