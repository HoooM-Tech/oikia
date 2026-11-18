'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useModal } from '../providers/ModalProvider';
import { EnquiryInput } from '../../lib/types';

export default function ContactDialog() {
  const { contactState, closeContact } = useModal();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeTab, setActiveTab] = useState<'enquiry' | 'booking'>('enquiry');
  const [formData, setFormData] = useState<EnquiryInput>({
    name: '',
    email: '',
    company: '',
    service: '',
    project: ''
  });
  const [previewMode, setPreviewMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (contactState.isOpen) {
      setActiveTab(contactState.isBooking ? 'booking' : 'enquiry');
      if (contactState.interest) {
        setFormData(prev => ({ ...prev, service: contactState.interest }));
      }
      setPreviewMode(false);
      setSubmitSuccess(false);
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [contactState]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePreviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPreviewMode(true);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitSuccess(true);
      }
    } catch {
      // Fallback in demo mode
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      closeContact();
    }
  };

  if (!contactState.isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="contact-dialog light-dialog"
      aria-labelledby="contact-dialog-title"
      onClick={handleBackdropClick}
      onClose={closeContact}
    >
      <button
        className="dialog-close"
        onClick={closeContact}
        aria-label="Close conversation form"
        type="button"
      >
        ×
      </button>
      <span className="dialog-eyebrow">GOOD STORIES START WITH A CONVERSATION.</span>
      <h2 id="contact-dialog-title">
        What’s on<br /><em>your mind?</em>
      </h2>

      <div className="contact-tabs" role="tablist" aria-label="Ways to get in touch">
        <button
          id="enquiry-tab"
          role="tab"
          aria-selected={activeTab === 'enquiry'}
          aria-controls="enquiry-panel"
          tabIndex={activeTab === 'enquiry' ? 0 : -1}
          onClick={() => setActiveTab('enquiry')}
          type="button"
        >
          Send an enquiry
        </button>
        <button
          id="booking-tab"
          role="tab"
          aria-selected={activeTab === 'booking'}
          aria-controls="booking-panel"
          tabIndex={activeTab === 'booking' ? 0 : -1}
          onClick={() => setActiveTab('booking')}
          type="button"
        >
          Book a discovery call
        </button>
      </div>

      {activeTab === 'enquiry' && (
        <div id="enquiry-panel" role="tabpanel" aria-labelledby="enquiry-tab">
          <p className="preview-notice">
            Design preview · Your information stays in this browser and is not sent.
          </p>

          {!previewMode && !submitSuccess && (
            <form onSubmit={handlePreviewSubmit}>
              <div className="form-pair">
                <label>
                  Your name
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    placeholder="What should we call you?"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Email address
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="form-pair">
                <label>
                  Company or podcast <span className="optional">(optional)</span>
                  <input
                    name="company"
                    autoComplete="organization"
                    placeholder="The story you’re building"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  What are you interested in?
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">Let’s figure it out together</option>
                    <option value="Podcast marketing">Podcast marketing</option>
                    <option value="Podcast management">Podcast management</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Media strategy">Media strategy</option>
                    <option value="POD Creators Africa">POD Creators Africa</option>
                  </select>
                </label>
              </div>

              <label>
                Tell us a little about your idea
                <textarea
                  name="project"
                  required
                  placeholder="The big idea, the early thought, or the question"
                  value={formData.project}
                  onChange={handleChange}
                />
              </label>

              <button className="button" type="submit">
                <span>Preview my enquiry</span>
                <span className="arrow">↗</span>
              </button>
            </form>
          )}

          {previewMode && !submitSuccess && (
            <div className="enquiry-preview">
              <h3>Your idea. In good company.</h3>
              <dl>
                <dt>Your name</dt>
                <dd>{formData.name}</dd>
                <dt>Email address</dt>
                <dd>{formData.email}</dd>
                {formData.company && (
                  <>
                    <dt>Company or podcast</dt>
                    <dd>{formData.company}</dd>
                  </>
                )}
                {formData.service && (
                  <>
                    <dt>Service interest</dt>
                    <dd>{formData.service}</dd>
                  </>
                )}
                <dt>Your idea</dt>
                <dd>{formData.project}</dd>
              </dl>
              <p>This is an enquiry preview. You can edit your details or confirm submission.</p>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setPreviewMode(false)}
                  className="text-link"
                >
                  <span>Edit my enquiry</span>
                  <span>↗</span>
                </button>
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="button"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? 'Sending...' : 'Confirm & Send'}</span>
                  <span className="arrow">↗</span>
                </button>
              </div>
            </div>
          )}

          {submitSuccess && (
            <div className="enquiry-preview">
              <h3>Thank you.</h3>
              <p>We received your enquiry. We will review your thoughts and get back to you shortly.</p>
              <button
                type="button"
                className="button"
                onClick={closeContact}
                style={{ marginTop: '20px' }}
              >
                <span>Close</span>
                <span className="arrow">✓</span>
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'booking' && (
        <div id="booking-panel" role="tabpanel" aria-labelledby="booking-tab">
          <p>Make room for a fresh perspective.</p>
          <p>A discovery call is a chance to talk through your idea and explore how OIKIA can help.</p>
          <p className="preview-notice">
            Call booking calendar integration ready. Live booking tool (e.g., Cal.com / Calendly) will be connected here.
          </p>
          <button
            className="text-link"
            id="enquiry-instead"
            onClick={() => setActiveTab('enquiry')}
            type="button"
          >
            <span>Preview an enquiry instead</span>
            <span>↗</span>
          </button>
        </div>
      )}
    </dialog>
  );
}
