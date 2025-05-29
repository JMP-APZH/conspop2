import { PrismaClient, Role as PrismaRole, User as PrismaUser } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RegisterInput } from './auth.types';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export const AuthService = {
  async register(input: RegisterInput): Promise<PrismaUser> {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    return prisma.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
        firstName: input.firstName,
        lastName: input.lastName,
        nickname: input.nickname,
        cityOfOrigin: input.cityOfOrigin,
        currentCity: input.currentCity,
        role: input.role || PrismaRole.USER // Instead of just Role.USER
      }
    });
  },

  async login(email: string, password: string): Promise<PrismaUser> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');
    
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid password');
    
    return user;
  },

  generateToken(user: { id: string; role: PrismaRole }): string {
    return jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
  },

  async getUserById(id: string): Promise<PrismaUser | null> {
    return prisma.user.findUnique({ where: { id } });
  }
};