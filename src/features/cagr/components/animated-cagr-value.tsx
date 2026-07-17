"use client";

import Decimal from "decimal.js";
import { useEffect, useState } from "react";

import {
  COMPOUND_ANIMATION_DELAY,
  COMPOUND_ANIMATION_DURATION,
  easeInOut,
  usePrefersReducedMotion,
} from "@/features/compound-interest/components/compound-animation";

export function AnimatedCagrValue({
  value,
  format,
  animationKey,
}: {
  value: Decimal.Value | null;
  format: (value: Decimal.Value) => string;
  animationKey: number;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const target = value === null ? "0" : new Decimal(value).toString();
  const [displayed, setDisplayed] = useState(() =>
    reducedMotion ? target : "0",
  );

  useEffect(() => {
    if (value === null || reducedMotion) return;
    let frameId = 0;
    let startedAt: number | null = null;
    const targetValue = new Decimal(target);

    function animate(timestamp: number) {
      startedAt ??= timestamp;
      const elapsed = timestamp - startedAt;
      if (elapsed < COMPOUND_ANIMATION_DELAY) {
        frameId = requestAnimationFrame(animate);
        return;
      }
      const progress = Math.min(
        (elapsed - COMPOUND_ANIMATION_DELAY) / COMPOUND_ANIMATION_DURATION,
        1,
      );
      setDisplayed(
        progress === 1
          ? target
          : targetValue.mul(easeInOut(progress)).toString(),
      );
      if (progress < 1) frameId = requestAnimationFrame(animate);
    }

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [animationKey, reducedMotion, target, value]);

  const accessibleValue = format(target);
  return (
    <span
      aria-label={accessibleValue}
      data-animation-duration={COMPOUND_ANIMATION_DURATION}
      data-animation-run={animationKey}
      data-testid="animated-cagr-value"
    >
      {format(displayed)}
    </span>
  );
}
