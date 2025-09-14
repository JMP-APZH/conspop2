// backend/src/scripts/promoteToAdmin.ts

import prisma from '../lib/prisma';
import { Role } from '@prisma/client';

async function promoteToAdmin(email: string) {
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: Role.ADMIN }
    });
    console.log(`✅ Successfully promoted ${email} to ADMIN`);
    console.log('Updated user:', user);
  } catch (error) {
    console.error(`❌ Error promoting ${email} to ADMIN:`);
    if (error instanceof Error) {
      console.error(error.message);
    }
    process.exit(1); // Exit with error code
  } finally {
    await prisma.$disconnect();
  }
}

// Get email from command line arguments
const email = process.argv[2];

if (!email) {
  console.error('❌ Please provide an email address as an argument');
  console.log('Usage: npx ts-node src/scripts/promoteToAdmin.ts <email>');
  process.exit(1);
}

// Validate email format (basic check)
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error('❌ Invalid email format');
  process.exit(1);
}

promoteToAdmin(email);