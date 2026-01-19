import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ===== ADMIN =====
  const rawPassword = process.env.ADMIN_PASSWORD || "admin123";
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  await prisma.user.upsert({
    where: { username: "admin" },
    update: {
      password: hashedPassword, // update juga biar sinkron
    },
    create: {
      username: "admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin created / updated");

  // ===== COMIC =====
  const comic = await prisma.comic.create({
    data: {
      title: "Komik Contoh",
      synopsis: "Ini komik hasil seed",
      genres: "Action, Fantasy",
      isPopular: true,
    },
  });

  // ===== CHAPTER =====
  await prisma.chapter.createMany({
    data: Array.from({ length: 10 }, (_, i) => ({
      number: i + 1,
      comicId: comic.id,
    })),
    skipDuplicates: true,
  });

  console.log("✅ Comic & chapters created");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
