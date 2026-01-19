import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // ===== ADMIN =====
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

  // ===== CHAPTER =====
  const comics = await prisma.comic.findMany();

  for (const comic of comics) {
    const chapters = Array.from({ length: 10 }, (_, i) => ({
      number: i + 1,
      comicId: comic.id,
    }));

    await prisma.chapter.createMany({
      data: chapters,
      skipDuplicates: true,
    });
  }

  console.log("✅ Chapters seeded");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
