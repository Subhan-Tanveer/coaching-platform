import Link from "next/link";
import { Globe2, BookOpen, UserPlus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

export default async function AdminHomePage() {
  const [worldCount, courseCount, studentCount, enrollmentCount] = await Promise.all([
    prisma.world.count(),
    prisma.course.count(),
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.enrollment.count(),
  ]);

  const links = [
    {
      href: "/admin/worlds",
      icon: Globe2,
      title: "Worlds",
      description: `${worldCount} worlds`,
    },
    {
      href: "/admin/courses",
      icon: BookOpen,
      title: "Courses",
      description: `${courseCount} courses`,
    },
    {
      href: "/admin/enroll",
      icon: UserPlus,
      title: "Enrollments",
      description: `${enrollmentCount} enrollments · ${studentCount} students`,
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Admin</h1>
      <p className="mt-2 text-[var(--muted)]">Manage worlds, courses, and student enrollments.</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="h-full p-2" hover>
              <CardContent className="flex flex-col gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl gradient-bg text-[var(--primary-foreground)]">
                  <link.icon className="size-5" />
                </div>
                <CardTitle>{link.title}</CardTitle>
                <CardDescription>{link.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
