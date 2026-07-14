import { Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createWorld, deleteWorld } from "./actions";

export default async function AdminWorldsPage() {
  const worlds = await prisma.world.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { courses: true } } },
  });

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Worlds</h1>
      <p className="mt-2 text-[var(--muted)]">Worlds are the top-level categories students fly into.</p>

      <div className="mt-10 flex flex-col gap-4">
        {worlds.map((world) => (
          <Card key={world.id} className="p-2">
            <CardContent className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="size-3 shrink-0 rounded-full"
                  style={{ background: world.colorTheme, boxShadow: `0 0 12px ${world.colorTheme}` }}
                />
                <div>
                  <p className="font-semibold">{world.name}</p>
                  <p className="text-xs text-[var(--muted)]">
                    /{world.slug} &middot; {world._count.courses} courses
                  </p>
                </div>
              </div>
              <form action={deleteWorld.bind(null, world.id)}>
                <button
                  type="submit"
                  className="rounded-lg p-2 text-[var(--muted)] hover:bg-[var(--danger-bg)] hover:text-[var(--danger)]"
                  title={world._count.courses > 0 ? "Move or delete this world's courses first" : "Delete world"}
                >
                  <Trash2 className="size-4" />
                </button>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-10 p-2">
        <CardContent>
          <h2 className="mb-4 text-lg font-semibold">Create a world</h2>
          <form action={createWorld} className="grid gap-3 sm:grid-cols-2">
            <Input name="name" placeholder="Name (e.g. Cloud Mountains)" required />
            <Input name="slug" placeholder="Slug (e.g. cloud-mountains)" required />
            <Input name="tagline" placeholder="Tagline" required className="sm:col-span-2" />
            <Textarea name="description" placeholder="Description" required className="sm:col-span-2" rows={3} />
            <Input name="colorTheme" placeholder="#22d3ee" defaultValue="#22d3ee" required />
            <Button type="submit" className="sm:col-span-2">
              Create world
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
