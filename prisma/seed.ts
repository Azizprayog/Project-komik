import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  /* ================= ADMIN ================= */

  const adminEmail = "admin@gmail.com";
  const rawPassword = process.env.ADMIN_PASSWORD || "admin123";
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail }, // ✅ UNIQUE
    update: {
      password: hashedPassword,
      role: "ADMIN",
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin created / updated");

  /* ================= COMIC ================= */

  const comic = await prisma.comic.create({
    data: {
      title: "Komik Contoh",
      synopsis: "Ini komik hasil seed",
      genres: "Action, Fantasy",
      isPopular: true,
      isBanner: true,
    },
  });

  /* ================= CHAPTER ================= */

  await prisma.chapter.createMany({
    data: Array.from({ length: 10 }, (_, i) => ({
      number: i + 1,
      title: `Chapter ${i + 1}`, // ✅ WAJIB
      comicId: comic.id,
    })),
    skipDuplicates: true,
  });

  console.log("✅ Comic & chapters created");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
