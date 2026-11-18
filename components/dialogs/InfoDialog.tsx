'use client';

import React, { useRef, useEffect } from 'react';
import { useModal } from '../providers/ModalProvider';
import { LEGAL_COPY, SAMPLE_DETAILS } from '../../lib/constants';

export default function InfoDialog() {
  const { infoState, closeInfo } = useModal();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (infoState.isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [infoState.isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      closeInfo();
    }
  };

  if (!infoState.isOpen) return null;

  const legal = infoState.isLegal
    ? LEGAL_COPY[infoState.key as keyof typeof LEGAL_COPY]
    : null;

  const sample = !infoState.isLegal
    ? SAMPLE_DETAILS[infoState.key as keyof typeof SAMPLE_DETAILS]
    : null;

  return (
    <dialog
      ref={dialogRef}
      className="info-dialog light-dialog"
      aria-labelledby="info-title"
      onClick={handleBackdropClick}
      onClose={closeInfo}
    >
      <button
        className="dialog-close"
        onClick={closeInfo}
        aria-label="Close details"
        type="button"
      >
        ×
      </button>

      {legal && (
        <>
          <span className="dialog-eyebrow" id="info-eyebrow">
            {legal.eyebrow}
          </span>
          <h2 id="info-title">{legal.title}</h2>
          <div
            className="info-copy"
            dangerouslySetInnerHTML={{ __html: legal.copy }}
          />
        </>
      )}

      {sample && (
        <>
          <span className="dialog-eyebrow" id="info-eyebrow">
            STAY IN THE LOOP / SAMPLE DETAILS
          </span>
          <h2 id="info-title">{sample.title}</h2>
          <div className="info-copy">
            <p className="sample-value">{sample.value}</p>
            <p>{sample.text}</p>
            <p className="preview-notice">
              This is a design sample. Confirmed client links will be activated before public launch.
            </p>
          </div>
        </>
      )}
    </dialog>
  );
}
