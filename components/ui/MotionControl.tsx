'use client';

import React from 'react';
import { useModal } from '../providers/ModalProvider';

export default function MotionControl() {
  const { motionPaused, toggleMotion } = useModal();
  const label = motionPaused ? 'Resume motion' : 'Pause motion';

  return (
    <button
      className="motion-control"
      aria-pressed={motionPaused}
      aria-label={label}
      onClick={toggleMotion}
      type="button"
    >
      <span className="motion-icon" aria-hidden="true">
        {motionPaused ? '▷' : 'Ⅱ'}
      </span>
      <span className="motion-label">{label}</span>
    </button>
  );
}
