'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useModal } from '../providers/ModalProvider';

interface ReadingHeadlineProps {
  children?: React.ReactNode;
  id?: string;
}

export default function ReadingHeadline({ id = 'about-heading' }: ReadingHeadlineProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const { motionPaused } = useModal();
  const [readProgress, setReadProgress] = useState(0);

  // The text: "Great stories deserve more than a moment. They deserve a place to grow."
  const words = [
    { text: 'Great', em: false },
    { text: 'stories', em: false },
    { text: 'deserve', em: false },
    { text: 'more', em: false },
    { text: 'than', em: false },
    { text: 'a', em: false },
    { text: 'moment.', em: false },
    { text: 'They', em: false },
    { text: 'deserve', em: false },
    { text: 'a', em: false },
    { text: 'place', em: false },
    { text: 'to', em: false },
    { text: 'grow.', em: true }
  ];

  useEffect(() => {
    let frameId: number | null = null;

    const onScroll = () => {
      if (frameId !== null) return;
      frameId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        if (motionPaused) {
          setReadProgress(1);
          frameId = null;
          return;
        }
        const rect = containerRef.current.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (window.innerHeight * 0.85 - rect.top) / (rect.height + window.innerHeight * 0.24)));
        setReadProgress(p);
        frameId = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [motionPaused]);

  return (
    <h2 id={id} className="reading-text" ref={containerRef}>
      {words.map((w, index) => {
        const isRead = motionPaused || readProgress > index / words.length;
        if (w.em) {
          return (
            <React.Fragment key={index}>
              <em>
                <span className={`word ${isRead ? 'is-read' : ''}`}>{w.text}</span>
              </em>{' '}
            </React.Fragment>
          );
        }
        return (
          <React.Fragment key={index}>
            <span className={`word ${isRead ? 'is-read' : ''}`}>{w.text}</span>{' '}
          </React.Fragment>
        );
      })}
    </h2>
  );
}
