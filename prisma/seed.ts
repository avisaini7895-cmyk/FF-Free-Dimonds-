import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.task.createMany({
    data: [
      { title: "Task 1", requiredAds: 500, rewardName: "Gun Skin", order: 1 },
      { title: "Task 2", requiredAds: 1000, rewardName: "Car Skin", order: 2 },
      { title: "Task 3", requiredAds: 1500, rewardName: "Rare Bundle", order: 3 },
      { title: "Task 4", requiredAds: 2000, rewardName: "2 Rare Bundles", order: 4 },
      { title: "Task 5", requiredAds: 3000, rewardName: "Elite Pass", order: 5 }
    ],
    skipDuplicates: true
  });

  await prisma.admin.upsert({
    where: { email: process.env.ADMIN_EMAIL ?? "admin@dimondtox.com" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL ?? "admin@dimondtox.com",
      username: "admin",
      passwordHash: await bcrypt.hash(process.env.ADMIN_PASSWORD ?? "ChangeMe123!", 12)
    }
  });
}

main().finally(() => prisma.$disconnect());
