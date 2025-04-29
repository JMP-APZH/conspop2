// backend/src/types/prisma.d.ts
declare module '@prisma/client' {
    export interface User {
      id: string
      email: string
      password: string
      firstName: string
      lastName: string
      nickname?: string | null
      cityOfOrigin: string
      currentCity: string
      createdAt: Date
      updatedAt: Date
    }
  
    // Include other models if needed
    export interface PrismaClient {
      user: {
        findUnique(arg0: { where: { id: string } }): unknown
        findMany: (args?: any) => Promise<User[]>
        // Add other methods you use
      }
    }
  }