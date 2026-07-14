import { AppNav } from "@/components/app/app-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppNav />
      <div className="flex-1">{children}</div>
    </div>
  );
}
