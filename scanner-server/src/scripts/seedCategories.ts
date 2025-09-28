// scanner-server/src/scripts/seedCategories.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting categories seeding...');

  // Create Martinique-specific categories
  const categories = [
    { name: 'Viande', description: 'Viandes et volailles' },
    { name: 'Poisson/Produits de la mer', description: 'Poissons et fruits de mer' },
    { name: 'Fruits et Légumes', description: 'Fruits et légumes frais' },
    { name: 'Produits Laitiers', description: 'Lait, fromage, yaourts' },
    { name: 'Céréales et Farines', description: 'Riz, pâtes, farines' },
    { name: 'Boissons', description: 'Eau, jus, sodas' },
    { name: 'Épicerie Salée', description: 'Conserves, condiments' },
    { name: 'Épicerie Sucrée', description: 'Sucre, chocolat, biscuits' },
    { name: 'Hygiène', description: 'Produits d\'hygiène personnelle' },
    { name: 'Entretien', description: 'Produits ménagers' },
  ];

  let createdCount = 0;
  let skippedCount = 0;

  for (const category of categories) {
    try {
      const result = await prisma.scannerCategory.upsert({
        where: { name: category.name },
        update: {}, // Don't update if exists
        create: category,
      });
      
      console.log(`✅ ${category.name}`);
      createdCount++;
    } catch (error) {
      console.log(`⚠️  ${category.name} (already exists)`);
      skippedCount++;
    }
  }

  console.log(`\n🎉 Seeding completed!`);
  console.log(`📊 Created: ${createdCount}, Skipped: ${skippedCount}, Total: ${categories.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });