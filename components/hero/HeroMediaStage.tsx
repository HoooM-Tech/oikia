'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useModal } from '../providers/ModalProvider';

export default function HeroMediaStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { openStory, motionPaused } = useModal();
  const [spread, setSpread] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let scrollFrame: number | null = null;

    const handleScroll = () => {
      if (scrollFrame !== null) return;
      scrollFrame = requestAnimationFrame(() => {
        if (!motionPaused) {
          const val = Math.min(1, Math.max(0, window.scrollY / 650));
          setSpread(val);
        }
        scrollFrame = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
    };
  }, [motionPaused]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let pointerFrame: number | null = null;

    const handlePointerMove = (e: PointerEvent) => {
      if (motionPaused || window.matchMedia('(pointer: coarse)').matches) return;
      const rect = stage.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      if (pointerFrame === null) {
        pointerFrame = requestAnimationFrame(() => {
          setPointer({ x: Number(nx.toFixed(3)), y: Number(ny.toFixed(3)) });
          pointerFrame = null;
        });
      }
    };

    const handlePointerLeave = () => {
      setPointer({ x: 0, y: 0 });
    };

    window.addEventListener('pointermove', handlePointerMove);
    stage.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      stage.removeEventListener('pointerleave', handlePointerLeave);
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
    };
  }, [motionPaused]);

  // Ambient video handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (motionPaused) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !document.hidden) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [motionPaused]);

  const stageStyle = {
    '--mx': motionPaused ? 0 : pointer.x,
    '--my': motionPaused ? 0 : pointer.y,
    '--spread': motionPaused ? 0 : spread
  } as React.CSSProperties;

  return (
    <div
      ref={stageRef}
      className="media-stage"
      aria-label="Explore the OIKIA brand world"
      style={stageStyle}
    >
      <span className="stage-note" aria-hidden="true">
        DIFFERENT PERSPECTIVES.<br />ENDLESS POSSIBILITIES.
      </span>

      {/* Card 01: People */}
      <button
        className="media-card card-people"
        onClick={() => openStory(0)}
        aria-label="Explore People: The creative exchange"
        type="button"
      >
        <div className="card-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/portrait.jpg"
            alt="A woman with a bright smile in front of an orange circle"
            width={1200}
            height={1600}
          />
        </div>
        <span className="card-index">01 / PEOPLE</span>
        <span className="card-title">
          The creative<br /><i>exchange.</i>
        </span>
        <span className="card-open" aria-hidden="true">↗</span>
      </button>

      {/* Card 02: Perspectives with Ambient Video */}
      <button
        className="media-card card-motion"
        onClick={() => openStory(1)}
        aria-label="Play Perspectives: Ideas out loud"
        type="button"
      >
        <div className="card-image">
          <video
            ref={videoRef}
            className="ambient-video"
            muted
            playsInline
            loop
            poster="/assets/conversation.jpg"
            width={720}
            height={1280}
            aria-hidden="true"
          >
            <source src="/assets/conversation.mp4" type="video/mp4" />
          </video>
        </div>
        <span className="card-index">
          <span className="live-dot" /> 02 / PERSPECTIVES
        </span>
        <span className="card-title">
          Ideas,<br /><i>out loud.</i>
        </span>
        <span className="card-open play-icon" aria-hidden="true">▶</span>
      </button>

      {/* Card 03: Possibility */}
      <button
        className="media-card card-film"
        onClick={() => openStory(2)}
        aria-label="Explore Possibility: Beyond the frame"
        type="button"
      >
        <div className="card-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/filmmaker.webp"
            alt="A filmmaker exploring a frame with a cinema camera"
            width={1201}
            height={1600}
          />
        </div>
        <span className="card-index">03 / POSSIBILITY</span>
        <span className="card-title">
          Beyond<br /><i>the frame.</i>
        </span>
        <span className="card-open" aria-hidden="true">↗</span>
      </button>

      <span className="orbit-tag" aria-hidden="true">
        Ideas worth<br />sharing. <span>↗</span>
      </span>
    </div>
  );
}
