import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";
import type { CourseContentSeed } from "./seed-data/types";
import reactFundamentals from "./seed-data/react-fundamentals";
import nodejsApis from "./seed-data/nodejs-apis";
import securityFundamentals from "./seed-data/security-fundamentals";
import pythonForData from "./seed-data/python-for-data";
import introToCloudComputing from "./seed-data/intro-to-cloud-computing";
import gohighlevelMastery from "./seed-data/gohighlevel-mastery";

type WorldSeed = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  colorTheme: string;
  courseSlugs: string[];
};

const worlds: WorldSeed[] = [
  {
    slug: "frontend-kingdom",
    name: "Frontend Kingdom",
    tagline: "Where interfaces come alive",
    description:
      "Master the craft of building fast, beautiful, and accessible user interfaces with modern frontend tools.",
    colorTheme: "#22d3ee",
    courseSlugs: ["react-fundamentals"],
  },
  {
    slug: "backend-factory",
    name: "Backend Factory",
    tagline: "Engines that power the web",
    description:
      "Go behind the scenes and learn how servers, APIs, and databases work together to power real applications.",
    colorTheme: "#a855f7",
    courseSlugs: ["nodejs-apis"],
  },
  {
    slug: "cyber-security-hq",
    name: "Cyber Security HQ",
    tagline: "Defend the digital frontier",
    description:
      "Understand how applications get attacked, and the core practices every developer needs to keep them safe.",
    colorTheme: "#f43f5e",
    courseSlugs: ["security-fundamentals"],
  },
  {
    slug: "data-science-lab",
    name: "Data Science Lab",
    tagline: "Turn raw data into insight",
    description: "Learn to explore, clean, and analyze data using Python's most popular data tools.",
    colorTheme: "#f59e0b",
    courseSlugs: ["python-for-data"],
  },
  {
    slug: "cloud-mountains",
    name: "Cloud Mountains",
    tagline: "Where infrastructure floats above the clouds",
    description: "Learn cloud computing fundamentals, from servers to serverless.",
    colorTheme: "#34d399",
    courseSlugs: ["intro-to-cloud-computing"],
  },
  {
    slug: "marketing-city",
    name: "Marketing City",
    tagline: "Where systems sell while you sleep",
    description:
      "Learn to run a real business's marketing, sales pipeline, and client communication on one all-in-one platform.",
    colorTheme: "#fb923c",
    courseSlugs: ["gohighlevel-mastery"],
  },
];

const courseContent: CourseContentSeed[] = [
  reactFundamentals,
  nodejsApis,
  securityFundamentals,
  pythonForData,
  introToCloudComputing,
  gohighlevelMastery,
];

async function main() {
  const adminPasswordHash = await bcrypt.hash("admin123", 10);
  const studentPasswordHash = await bcrypt.hash("Student123!", 10);

  // Re-seeding restores the owner credentials, so update the hash rather than skipping.
  await prisma.user.upsert({
    where: { email: "admin123@gmail.com" },
    update: { passwordHash: adminPasswordHash, role: "ADMIN" },
    create: {
      name: "Site Admin",
      email: "admin123@gmail.com",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "student@courses.local" },
    update: {},
    create: {
      name: "Demo Student",
      email: "student@courses.local",
      passwordHash: studentPasswordHash,
      role: "STUDENT",
    },
  });

  const worldIdBySlug = new Map<string, string>();

  for (const [worldOrder, world] of worlds.entries()) {
    const createdWorld = await prisma.world.upsert({
      where: { slug: world.slug },
      update: {
        name: world.name,
        tagline: world.tagline,
        description: world.description,
        colorTheme: world.colorTheme,
        order: worldOrder,
      },
      create: {
        slug: world.slug,
        name: world.name,
        tagline: world.tagline,
        description: world.description,
        colorTheme: world.colorTheme,
        order: worldOrder,
      },
    });
    worldIdBySlug.set(world.slug, createdWorld.id);
  }

  for (const content of courseContent) {
    const world = worlds.find((w) => w.courseSlugs.includes(content.courseSlug));
    if (!world) {
      throw new Error(`No world maps to course slug "${content.courseSlug}"`);
    }
    const worldId = worldIdBySlug.get(world.slug)!;
    const courseOrder = world.courseSlugs.indexOf(content.courseSlug);

    const createdCourse = await prisma.course.upsert({
      where: { slug: content.courseSlug },
      update: {
        title: content.courseTitle,
        description: content.courseDescription,
        worldId,
        order: courseOrder,
      },
      create: {
        slug: content.courseSlug,
        title: content.courseTitle,
        description: content.courseDescription,
        worldId,
        order: courseOrder,
        published: true,
        price: 0,
      },
    });

    for (const [moduleOrder, mod] of content.modules.entries()) {
      let createdModule = await prisma.module.findFirst({
        where: { courseId: createdCourse.id, title: mod.title },
      });
      if (!createdModule) {
        createdModule = await prisma.module.create({
          data: { title: mod.title, order: moduleOrder, courseId: createdCourse.id },
        });
      } else {
        await prisma.module.update({ where: { id: createdModule.id }, data: { order: moduleOrder } });
      }

      for (const [lessonOrder, lesson] of mod.lessons.entries()) {
        await prisma.lesson.upsert({
          where: { moduleId_slug: { moduleId: createdModule.id, slug: lesson.slug } },
          update: {
            title: lesson.title,
            content: lesson.content,
            estimatedMinutes: lesson.estimatedMinutes,
            order: lessonOrder,
          },
          create: {
            slug: lesson.slug,
            title: lesson.title,
            content: lesson.content,
            estimatedMinutes: lesson.estimatedMinutes,
            order: lessonOrder,
            moduleId: createdModule.id,
          },
        });
      }

      if (mod.quiz) {
        const createdQuiz = await prisma.quiz.upsert({
          where: { moduleId: createdModule.id },
          update: { title: mod.quiz.title },
          create: { moduleId: createdModule.id, title: mod.quiz.title },
        });

        await prisma.question.deleteMany({ where: { quizId: createdQuiz.id } });
        await prisma.question.createMany({
          data: mod.quiz.questions.map((q, questionOrder) => ({
            quizId: createdQuiz.id,
            order: questionOrder,
            text: q.text,
            optionA: q.optionA,
            optionB: q.optionB,
            optionC: q.optionC,
            optionD: q.optionD,
            correctOption: q.correctOption,
          })),
        });
      }
    }
  }

  console.log("Seed complete:");
  console.log("  Admin login:   admin123@gmail.com / admin123");
  console.log("  Student login: student@courses.local / Student123!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
