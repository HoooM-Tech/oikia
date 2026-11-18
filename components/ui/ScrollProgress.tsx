'use client';

import React, { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    let frameId: number | null = null;

    const handleScroll = () => {
      if (frameId !== null) return;
      frameId = requestAnimationFrame(() => {
        const full = document.documentElement.scrollHeight - window.innerHeight;
        setScale(full > 0 ? window.scrollY / full : 0);
        frameId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      className="scroll-progress"
      aria-hidden="true"
      style={{ transform: `scaleX(${scale})` }}
    />
  );
}
