'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useModal } from '../providers/ModalProvider';
import { STORIES } from '../../lib/constants';

export default function StoryDialog() {
  const { activeStoryIndex, closeStory, openContact, motionPaused } = useModal();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const isOpen = activeStoryIndex >= 0;
  const currentStory = STORIES[Math.max(0, activeStoryIndex)] || STORIES[0];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
      setIsPlaying(true);
      if (videoRef.current && currentStory.video && !motionPaused) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    } else {
      if (dialog.open) dialog.close();
      if (videoRef.current) videoRef.current.pause();
    }
  }, [isOpen, activeStoryIndex, currentStory, motionPaused]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeStory();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (activeStoryIndex + 1) % STORIES.length;
        dialogRef.current?.focus();
        (window as unknown as { __setStoryIndex?: (i: number) => void }).__setStoryIndex?.(nextIndex);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = (activeStoryIndex - 1 + STORIES.length) % STORIES.length;
        dialogRef.current?.focus();
        (window as unknown as { __setStoryIndex?: (i: number) => void }).__setStoryIndex?.(prevIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeStoryIndex, closeStory]);

  const { openStory } = useModal();
  useEffect(() => {
    (window as unknown as { __setStoryIndex?: (i: number) => void }).__setStoryIndex = openStory;
  }, [openStory]);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      closeStory();
    }
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="story-dialog"
      aria-labelledby="story-title"
      onClick={handleBackdropClick}
      onClose={closeStory}
    >
      <div className="story-shell">
        <div className="story-top">
          <span>OIKIA / A DIFFERENT WAY OF SEEING</span>
          <button
            className="dialog-close"
            onClick={closeStory}
            aria-label="Close story"
            type="button"
          >
            ×
          </button>
        </div>
        <div className="story-body">
          <div className="story-visual">
            {!currentStory.video && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                id="story-image"
                src={currentStory.image}
                alt={currentStory.alt}
              />
            )}
            {currentStory.video && (
              <>
                <video
                  ref={videoRef}
                  id="story-video"
                  muted
                  playsInline
                  loop
                  poster="/assets/conversation.jpg"
                >
                  <source src="/assets/conversation.mp4" type="video/mp4" />
                </video>
                <button
                  className="story-play"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  onClick={toggleVideo}
                  type="button"
                >
                  {isPlaying ? 'Ⅱ' : '▶'}
                </button>
              </>
            )}
            <span className="story-media-note">VISUAL MOOD / ILLUSTRATIVE MEDIA</span>
          </div>
          <div className="story-copy">
            <span className="story-category">{currentStory.category}</span>
            <h2
              id="story-title"
              dangerouslySetInnerHTML={{ __html: currentStory.title }}
            />
            <p className="story-text">{currentStory.text}</p>
            <button
              className="text-link"
              onClick={() => {
                closeStory();
                openContact();
              }}
              type="button"
            >
              <span>Let’s tell your story</span>
              <span>↗</span>
            </button>
            <div className="story-pagination">
              <button
                className="story-prev"
                aria-label="Previous story"
                onClick={() => openStory((activeStoryIndex - 1 + STORIES.length) % STORIES.length)}
                type="button"
              >
                ←
              </button>
              <span className="story-count" aria-live="polite">
                {String(activeStoryIndex + 1).padStart(2, '0')} / {String(STORIES.length).padStart(2, '0')}
              </span>
              <button
                className="story-next"
                aria-label="Next story"
                onClick={() => openStory((activeStoryIndex + 1) % STORIES.length)}
                type="button"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
