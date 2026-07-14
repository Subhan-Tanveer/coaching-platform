import SmoothScrollProvider from "@/components/marketing/smooth-scroll-provider";
import { MarketingNav } from "@/components/marketing/marketing-nav";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScrollProvider />
      <MarketingNav />
      <div id="smooth-wrapper">
        <div id="smooth-content" className="flex min-h-full flex-col">
          {children}
        </div>
      </div>
    </>
  );
}
