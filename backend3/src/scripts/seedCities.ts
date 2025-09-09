import { PrismaClient, CityAgglomeration } from '@prisma/client';

const prisma = new PrismaClient();

const citiesData = [
  {
    name: "Fort-de-France",
    postalCode: "97200",
    agglomeration: CityAgglomeration.CENTRE,
    population: 75165
  },
  {
    name: "L'Ajoupa-Bouillon",
    postalCode: "97216",
    agglomeration: CityAgglomeration.NORD,
    population: 1693
  },
  {
    name: "Les Anses-d'Arlet",
    postalCode: "97217",
    agglomeration: CityAgglomeration.SUD,
    population: 3874
  },
  {
    name: "Basse-Pointe",
    postalCode: "97218",
    agglomeration: CityAgglomeration.NORD,
    population: 2810
  },
  {
    name: "Bellefontaine",
    postalCode: "97222",
    agglomeration: CityAgglomeration.NORD,
    population: 1824
  },
  {
    name: "Le Carbet",
    postalCode: "97221",
    agglomeration: CityAgglomeration.NORD,
    population: 3619
  },
  {
    name: "Case-Pilote",
    postalCode: "97222",
    agglomeration: CityAgglomeration.NORD,
    population: 4524
  },
  {
    name: "Le Diamant",
    postalCode: "97223",
    agglomeration: CityAgglomeration.SUD,
    population: 5924
  },
  {
    name: "Ducos",
    postalCode: "97224",
    agglomeration: CityAgglomeration.SUD,
    population: 17837
  },
  {
    name: "Fonds-Saint-Denis",
    postalCode: "97250",
    agglomeration: CityAgglomeration.NORD,
    population: 641
  },
  {
    name: "Le François",
    postalCode: "97240",
    agglomeration: CityAgglomeration.SUD,
    population: 15858
  },
  {
    name: "Grand'Rivière",
    postalCode: "97218",
    agglomeration: CityAgglomeration.NORD,
    population: 508
  },
  {
    name: "Gros-Morne",
    postalCode: "97213",
    agglomeration: CityAgglomeration.NORD,
    population: 9752
  },
  {
    name: "Le Lamentin",
    postalCode: "97232",
    agglomeration: CityAgglomeration.CENTRE,
    population: 39346
  },
  {
    name: "Le Lorrain",
    postalCode: "97214",
    agglomeration: CityAgglomeration.NORD,
    population: 6607
  },
  {
    name: "Macouba",
    postalCode: "97218",
    agglomeration: CityAgglomeration.NORD,
    population: 1001
  },
  {
    name: "Le Marigot",
    postalCode: "97225",
    agglomeration: CityAgglomeration.NORD,
    population: 2991
  },
  {
    name: "Le Marin",
    postalCode: "97290",
    agglomeration: CityAgglomeration.SUD,
    population: 8526
  },
  {
    name: "Le Morne-Rouge",
    postalCode: "97260",
    agglomeration: CityAgglomeration.NORD,
    population: 4469
  },
  {
    name: "Le Morne-Vert",
    postalCode: "97226",
    agglomeration: CityAgglomeration.NORD,
    population: 1748
  },
  {
    name: "Le Prêcheur",
    postalCode: "97250",
    agglomeration: CityAgglomeration.NORD,
    population: 1463
  },
  {
    name: "Rivière-Pilote",
    postalCode: "97211",
    agglomeration: CityAgglomeration.SUD,
    population: 11797
  },
  {
    name: "Rivière-Salée",
    postalCode: "97215",
    agglomeration: CityAgglomeration.SUD,
    population: 11818
  },
  {
    name: "Le Robert",
    postalCode: "97231",
    agglomeration: CityAgglomeration.NORD,
    population: 21490
  },
  {
    name: "Saint-Esprit",
    postalCode: "97270",
    agglomeration: CityAgglomeration.SUD,
    population: 10422
  },
  {
    name: "Saint-Joseph",
    postalCode: "97212",
    agglomeration: CityAgglomeration.CENTRE,
    population: 16470
  },
  {
    name: "Saint-Pierre",
    postalCode: "97250",
    agglomeration: CityAgglomeration.NORD,
    population: 4069
  },
  {
    name: "Sainte-Anne",
    postalCode: "97227",
    agglomeration: CityAgglomeration.SUD,
    population: 4491
  },
  {
    name: "Sainte-Luce",
    postalCode: "97228",
    agglomeration: CityAgglomeration.SUD,
    population: 9275
  },
  {
    name: "Sainte-Marie",
    postalCode: "97230",
    agglomeration: CityAgglomeration.NORD,
    population: 14827
  },
  {
    name: "Schœlcher",
    postalCode: "97233",
    agglomeration: CityAgglomeration.CENTRE,
    population: 19342
  },
  {
    name: "La Trinité",
    postalCode: "97220",
    agglomeration: CityAgglomeration.NORD,
    population: 11622
  },
  {
    name: "Les Trois-Îlets",
    postalCode: "97229",
    agglomeration: CityAgglomeration.SUD,
    population: 6735
  },
  {
    name: "Le Vauclin",
    postalCode: "97280",
    agglomeration: CityAgglomeration.SUD,
    population: 8481
  }
];

async function seedCities() {
  try {
    console.log('Seeding Martinique cities...');
    
    for (const cityData of citiesData) {
      await prisma.martiniqueCity.upsert({
        where: { name: cityData.name },
        update: cityData,
        create: cityData
      });
    }
    
    console.log('Cities seeded successfully!');
  } catch (error) {
    console.error('Error seeding cities:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCities();