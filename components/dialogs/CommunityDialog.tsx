'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useModal } from '../providers/ModalProvider';

export default function CommunityDialog() {
  const { communityOpen, closeCommunity } = useModal();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (communityOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [communityOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      closeCommunity();
    }
  };

  if (!communityOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="community-dialog light-dialog"
      aria-labelledby="community-dialog-title"
      onClick={handleBackdropClick}
      onClose={closeCommunity}
    >
      <button
        className="dialog-close"
        onClick={closeCommunity}
        aria-label="Close POD Creators Africa details"
        type="button"
      >
        ×
      </button>
      <span className="dialog-eyebrow">
        <span className="live-dot" /> PODCREATORS AFRICA
      </span>
      <h2 id="community-dialog-title">
        More voices.<br /><em>More possibility.</em>
      </h2>
      <p>
        Independent creators and brands are part of Africa’s podcasting story. POD Creators Africa brings that community into focus.
      </p>

      <div className="community-values">
        <div>
          <span>01</span>
          <h3>Connection</h3>
          <p>Space for creators and brands to find each other.</p>
        </div>
        <div>
          <span>02</span>
          <h3>Knowledge</h3>
          <p>Sharing perspectives and best practices in podcasting.</p>
        </div>
        <div>
          <span>03</span>
          <h3>Possibility</h3>
          <p>Exploring the next chapter of Africa’s podcasting ecosystem.</p>
        </div>
      </div>

      <p className="quiet-note">
        Programme details, dates and participation options are still being confirmed.
      </p>

      <Link
        className="button"
        href="/pod-creators-africa"
        onClick={closeCommunity}
      >
        <span>Explore POD Creators Africa</span>
        <span className="arrow">↗</span>
      </Link>
    </dialog>
  );
}
