import { PrismaClient, Role as PrismaRole, User as PrismaUser } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RegisterInput } from './auth.types';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export const AuthService = {
  async register(input: RegisterInput): Promise<PrismaUser & { cityOfOrigin: any; currentCity: any, diasporaLocation?: any; }> {
    
    // Validate cities exist
    const [originCity, currentCity] = await Promise.all([
      prisma.martiniqueCity.findUnique({ where: { id: input.cityOfOrigin.id } }),
      prisma.martiniqueCity.findUnique({ where: { id: input.currentCity.id } })
    ]);

    if (!originCity) throw new Error(`City of origin with ID ${input.cityOfOrigin.id} not found`);
    if (!currentCity) throw new Error(`Current city with ID ${input.currentCity.id} not found`);

    // === ADD THE VALIDATION HERE ===
  // Validate diaspora location logic
  if (input.isDiaspora && !input.diasporaLocation?.id) {
    throw new Error('Diaspora location is required when living abroad');
  }

  if (!input.isDiaspora && input.diasporaLocation?.id) {
    throw new Error('Diaspora location should not be provided when not living abroad');
  }
  // === END OF VALIDATION ===

    // Validate diaspora location if provided
    let diasporaLocationId: string | null = null;
    if (input.isDiaspora && input.diasporaLocation?.id) {
      const diasporaLocation = await prisma.diasporaLocation.findUnique({
        where: { id: input.diasporaLocation.id }
      });
      if (!diasporaLocation) {
        throw new Error(`Diaspora location with ID ${input.diasporaLocation.id} not found`);
      }
      diasporaLocationId = input.diasporaLocation.id;
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    return prisma.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
        firstName: input.firstName,
        lastName: input.lastName,
        nickname: input.nickname,
        isDiaspora: input.isDiaspora,
        cityOfOriginId: input.cityOfOrigin.id,
        currentCityId: input.currentCity.id,
        diasporaLocationId: diasporaLocationId,
        role: input.role || PrismaRole.USER // Instead of just Role.USER
      },
      include: {
        cityOfOrigin: true,
        currentCity: true,
        diasporaLocation: true
      }
    });
  },

  async login(email: string, password: string): Promise<PrismaUser & { cityOfOrigin: any; currentCity: any, diasporaLocation?: any; }> {
    const user = await prisma.user.findUnique({ 
      where: { email },
      include: {
        cityOfOrigin: true,
        currentCity: true,
        diasporaLocation: true
      }
     });
    if (!user) throw new Error('User not found');
    
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid password');
    
    // initial end of login service w/o last login time
    // return user;

    // Update last login time
    return prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
      include: {
        cityOfOrigin: true,
        currentCity: true,
        diasporaLocation: true
      }
  });
  },

  // City-related methods
  async getAllCities(): Promise<any[]> {
    return prisma.martiniqueCity.findMany({
      orderBy: { name: 'asc' }
    });
  },

  async getCityById(id: string): Promise<any | null> {
    return prisma.martiniqueCity.findUnique({ where: { id } });
  },

  async getCitiesByAgglomeration(agglomeration: string): Promise<any[]> {
    return prisma.martiniqueCity.findMany({
      where: { agglomeration: agglomeration as any },
      orderBy: { name: 'asc' }
    });
  },

  async getAllDiasporaLocations(): Promise<any[]> {
    return prisma.diasporaLocation.findMany({
      orderBy: { country: 'asc' }
    });
  },

  generateToken(user: { id: string; role: PrismaRole }): string {
    return jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
  },

  async getUserById(id: string): Promise<(PrismaUser & { cityOfOrigin: any; currentCity: any, diasporaLocation?: any; }) | null> {
    return prisma.user.findUnique({ 
      where: { id },
      include: {
        cityOfOrigin: true,
        currentCity: true,
        diasporaLocation: true
      }
     });
  },

  async updateProfile(userId: string, input: { nickname?: string; profileImage?: string }): Promise<PrismaUser & { 
    cityOfOrigin: any; 
    currentCity: any;
    diasporaLocation?: any;
  }> {
    return prisma.user.update({
      where: { id: userId },
      data: {
        nickname: input.nickname,
        profileImage: input.profileImage,
        updatedAt: new Date()
      },
      include: {
        cityOfOrigin: true,
        currentCity: true,
        diasporaLocation: true
      }
    });
  },

  async getTotalUsersCount(): Promise<number> {
    return prisma.user.count();
  },
  
  async getDailyActiveUsers(): Promise<number> {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    
    return prisma.user.count({
      where: {
        lastLoginAt: {
          gte: oneDayAgo
        }
      }
    });
  },
  
  async getWeeklyActiveUsers(): Promise<number> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    return prisma.user.count({
      where: {
        lastLoginAt: {
          gte: oneWeekAgo
        }
      }
    });
  }



};