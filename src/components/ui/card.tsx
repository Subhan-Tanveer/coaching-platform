"use client";

import { forwardRef, useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

type CardProps = Omit<HTMLMotionProps<"div">, "children"> & {
  hover?: boolean;
  tilt?: boolean;
  children?: React.ReactNode;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover, tilt, style, onMouseMove, onMouseLeave, children, ...props }, ref) => {
    const localRef = useRef<HTMLDivElement | null>(null);
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);
    const rotateX = useSpring(useTransform(mouseY, [0, 1], [7, -7]), { stiffness: 300, damping: 25 });
    const rotateY = useSpring(useTransform(mouseX, [0, 1], [-7, 7]), { stiffness: 300, damping: 25 });
    const glowX = useTransform(mouseX, (v) => `${v * 100}%`);
    const glowY = useTransform(mouseY, (v) => `${v * 100}%`);
    const glowBackground = useMotionTemplate`radial-gradient(280px circle at ${glowX} ${glowY}, rgba(255,255,255,0.08), transparent 70%)`;

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
      if (tilt && localRef.current) {
        const rect = localRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
      }
      onMouseMove?.(e);
    }

    function handleMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
      if (tilt) {
        mouseX.set(0.5);
        mouseY.set(0.5);
      }
      onMouseLeave?.(e);
    }

    const mergedStyle = tilt ? { ...style, rotateX, rotateY, transformPerspective: 800 } : style;

    return (
      <motion.div
        ref={(node) => {
          localRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        whileHover={hover ? { y: -4, boxShadow: "var(--shadow-lift)" } : undefined}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={mergedStyle}
        className={cn(
          "glass relative rounded-[var(--radius)] text-[var(--card-foreground)] shadow-[var(--shadow-soft)]",
          tilt && "group overflow-hidden",
          className
        )}
        {...props}
      >
        {tilt && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: glowBackground }}
          />
        )}
        {children}
      </motion.div>
    );
  }
);
Card.displayName = "Card";

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1 p-5 pb-0", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 className={cn("text-base font-semibold tracking-tight", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-sm text-[var(--muted)]", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("p-5", className)} {...props} />;
}
