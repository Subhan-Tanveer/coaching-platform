import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ScrollReveal from "@/components/marketing/scroll-reveal";
import { CourseThumb } from "@/components/marketing/course-thumb";
import { VideoPlaylist } from "@/components/marketing/video-playlist";

const CATALOG_CLIPS = [
  "/videos/hero.mp4",
  "/videos/frontend-kingdom.mp4",
  "/videos/backend-factory.mp4",
  "/videos/cyber-security-hq.mp4",
  "/videos/data-science-lab.mp4",
  "/videos/cloud-mountains.mp4",
  "/videos/marketing-city.mp4",
];

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    where: { published: true },
    orderBy: [{ world: { order: "asc" } }, { order: "asc" }],
    include: { world: true, modules: { include: { lessons: true } } },
  });

  return (
    <main>
      <section className="relative overflow-hidden px-6 pb-16 pt-32 text-center sm:pt-40">
        <VideoPlaylist sources={CATALOG_CLIPS} />
        <ScrollReveal className="relative z-10 mx-auto max-w-6xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
            All courses
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Every world, every course</h1>
          <p className="mx-auto mt-4 max-w-lg text-[var(--muted)]">
            Browse the full catalog, or head back to the{" "}
            <Link href="/" className="text-[var(--primary)]">
              map
            </Link>{" "}
            to fly in world by world.
          </p>
        </ScrollReveal>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-32">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const lessonCount = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
            return (
              <ScrollReveal key={course.id}>
                <Link href={`/courses/${course.slug}`}>
                  <Card className="h-full p-2" hover tilt>
                    <CardContent className="flex h-full flex-col gap-3">
                        <CourseThumb src={course.heroImage} alt={course.title} />
                      <Badge
                        className="w-fit"
                        style={{ background: `${course.world.colorTheme}22`, color: course.world.colorTheme }}
                      >
                        {course.world.name}
                      </Badge>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription className="flex-1">{course.description}</CardDescription>
                      <p className="text-xs text-[var(--muted)]">
                        {course.modules.length} modules &middot; {lessonCount} lessons
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </main>
  );
}
