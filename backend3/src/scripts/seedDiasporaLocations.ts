// backend3/src/scripts/seedDiasporaLocations.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const diasporaLocations = [
  { country: 'France Hexagonale', countryCode: 'FR', region: 'Europe' },
  { country: 'Canada', countryCode: 'CA', region: 'North America' },
  { country: 'USA', countryCode: 'US', region: 'North America' },
  { country: 'DROM - Guadeloupe', countryCode: 'GP', region: 'Caribbean' },
  { country: 'DROM - Guyane Fr.', countryCode: 'GF', region: 'South America' },
  { country: 'DROM - La Réunion', countryCode: 'RE', region: 'Africa' },
  { country: 'DROM - Mayotte', countryCode: 'YT', region: 'Africa' },
  { country: 'COM - Saint-Martin', countryCode: 'MF', region: 'Caribbean' },
  { country: 'COM - Saint-Barthélémy', countryCode: 'BL', region: 'Caribbean' },
  { country: 'COM - La Polynésie française', countryCode: 'PF', region: 'Oceania' },
  { country: 'COM - Saint-Pierre-et-Miquelon', countryCode: 'PM', region: 'North America' },
  { country: 'COM - Wallis-et-Futuna', countryCode: 'WF', region: 'Oceania' },
  { country: 'La Nouvelle-Calédonie', countryCode: 'NC', region: 'Oceania' },
  { country: 'Les Terres australes et antarctiques françaises', countryCode: 'TF', region: 'Antarctica' },
  { country: 'Europe - hors France Hex.', countryCode: 'EU', region: 'Europe' },
  { country: 'Afrique', countryCode: 'AF', region: 'Africa' },
  { country: 'Amérique du Sud', countryCode: 'SA', region: 'South America' },
  { country: 'Asie', countryCode: 'AS', region: 'Asia' },
];

async function seedDiasporaLocations() {
  try {
    console.log('Seeding diaspora locations...');
    
    for (const locationData of diasporaLocations) {
      await prisma.diasporaLocation.upsert({
        where: { country: locationData.country },
        update: locationData,
        create: locationData
      });
    }
    
    console.log('Diaspora locations seeded successfully!');
  } catch (error) {
    console.error('Error seeding diaspora locations:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDiasporaLocations();