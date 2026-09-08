import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import ScrollReveal from "@/components/marketing/scroll-reveal";
import { CourseThumb } from "@/components/marketing/course-thumb";
import { BackgroundVideo } from "@/components/marketing/background-video";

export default async function WorldPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const world = await prisma.world.findUnique({
    where: { slug },
    include: {
      courses: {
        where: { published: true },
        orderBy: { order: "asc" },
        include: { modules: { include: { lessons: true } } },
      },
    },
  });

  if (!world) notFound();

  return (
    <main>
      <section
        className="relative flex min-h-[45vh] flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center"
        style={{
          background: `radial-gradient(ellipse 120% 80% at 50% -10%, ${world.colorTheme}22 0%, var(--background) 60%)`,
        }}
      >
        <BackgroundVideo src={`/videos/${world.slug}.mp4`} />
        <div className="relative z-10">
          <span
            className="mb-4 inline-block size-3 rounded-full"
            style={{ background: world.colorTheme, boxShadow: `0 0 24px ${world.colorTheme}` }}
          />
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">{world.name}</h1>
          <p className="mt-4 max-w-xl text-lg text-[var(--muted)]">{world.tagline}</p>
          <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">{world.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <ScrollReveal className="mb-10">
          <h2 className="text-2xl font-semibold tracking-tight">Courses in this world</h2>
        </ScrollReveal>
        {world.courses.length === 0 ? (
          <p className="text-[var(--muted)]">No courses published in this world yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {world.courses.map((course) => {
              const lessonCount = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
              return (
                <ScrollReveal key={course.id}>
                  <Link href={`/courses/${course.slug}`}>
                    <Card className="h-full p-2" hover tilt>
                      <CardContent className="flex h-full flex-col gap-3">
                        <CourseThumb src={course.heroImage} alt={course.title} />
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
        )}
      </section>
    </main>
  );
}
