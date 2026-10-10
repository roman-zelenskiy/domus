"use client";

import { MotionConfig } from "motion/react";
import { SmoothScroll } from "./SmoothScroll";
import { LeadModalProvider } from "./LeadModal";
import { Cursor } from "./Cursor";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <LeadModalProvider>
          {children}
          <Cursor />
        </LeadModalProvider>
      </SmoothScroll>
    </MotionConfig>
  );
}
