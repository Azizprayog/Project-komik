import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ======================
  // ADMIN
  // ======================
  const password = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin created");

  // ======================
  // COMIC
  // ======================
  const comic = await prisma.comic.create({
    data: {
      title: "Komik Contoh",
      synopsis: "Ini komik hasil seed",
      genres: "Action, Fantasy",
      isPopular: true,
    },
  });

  console.log("✅ Comic created");

  // ======================
  // CHAPTER (TANPA title)
  // ======================
  const chapters = Array.from({ length: 10 }, (_, i) => ({
    number: i + 1,
    comicId: comic.id,
  }));

  await prisma.chapter.createMany({
    data: chapters,
  });

  console.log("✅ Chapters created");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
