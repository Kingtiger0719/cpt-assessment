// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "delivered",
  "completed",
] as const;
const ORDER_TYPES = ["delivery", "pickup"] as const;

async function main() {
  console.log("🌱 Seeding database...");

  // Clear old data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  for (let i = 0; i < 50; i++) {
    const orderType = faker.helpers.arrayElement(ORDER_TYPES);
    const status = faker.helpers.arrayElement(ORDER_STATUSES);
    const createdAt = faker.date.past({ years: 1 });
    const scheduledFor = faker.datatype.boolean()
      ? faker.date.soon({ days: 7, refDate: createdAt })
      : null;

    // Generate order items
    const itemCount = faker.number.int({ min: 1, max: 5 });
    const items = Array.from({ length: itemCount }).map(() => ({
      name: faker.commerce.productName(),
      quantity: faker.number.int({ min: 1, max: 4 }),
      price: parseFloat(faker.commerce.price({ min: 5, max: 30 })),
      specialInstructions: faker.datatype.boolean()
        ? faker.lorem.sentence()
        : undefined,
    }));

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await prisma.order.create({
      data: {
        customerName: faker.person.fullName(),
        customerEmail: faker.internet.email(),
        orderType,
        status,
        total,
        createdAt,
        scheduledFor,
        preparationNotes: faker.datatype.boolean()
          ? faker.lorem.sentences(2)
          : "",
        items: {
          create: items,
        },
      },
    });

    console.log(`✅ Created order ${order.id} with ${items.length} items`);
  }

  console.log("✅ Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
