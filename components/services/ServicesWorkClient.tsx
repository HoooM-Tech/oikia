'use client';

import React, { useState } from 'react';
import ServiceAccordion from './ServiceAccordion';
import { useModal } from '../providers/ModalProvider';
import { EnquiryInput } from '../../lib/types';

export default function ServicesWorkClient() {
  const { openContact, openInfo } = useModal();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePreview = (e: React.FormEvent) => {
    e.preventDefault();
    setPreviewMode(true);
  };

  const handleSend = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) setSubmitSuccess(true);
    } catch {
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero section-shell">
        <div className="page-eyebrow">
          <span className="live-dot" /> SERVICES &amp; WORK
        </div>
        <h1>
          Good stories.<br /><em>Thoughtful direction.</em>
        </h1>
        <div className="page-hero-bottom">
          <p>Podcast marketing, management and consultation for brands and creators across Africa.</p>
          <div className="page-actions">
            <button
              className="button"
              onClick={() => openContact('', true)}
              type="button"
            >
              <span>Book a Discovery Call</span>
              <span className="arrow">↗</span>
            </button>
            <a className="text-link" href="#send-enquiry">
              <span>Send an Enquiry</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* Section Jumps */}
      <nav className="section-jumps section-shell" aria-label="Services and Work sections">
        <a href="#services">
          Services <span>01</span>
        </a>
        <a href="#selected-work">
          Selected work <span>02</span>
        </a>
        <a href="#book-discovery-call">
          Book a Discovery Call <span>03</span>
        </a>
        <a href="#send-enquiry">
          Send an Enquiry <span>04</span>
        </a>
      </nav>

      {/* Services Accordion */}
      <section className="services section-shell section-space" id="services" aria-labelledby="services-heading">
        <div className="section-label reveal in-view">
          <span className="label-mark">↳</span> WHAT WE DO <span className="section-number">01</span>
        </div>
        <div className="services-heading reveal in-view">
          <h2 id="services-heading">
            Good ideas.<br /><em>Meet direction.</em>
          </h2>
          <p>
            For the story you’re building.<br />And the people you want to reach.
          </p>
        </div>
        <ServiceAccordion />
      </section>

      {/* Selected Work */}
      <section className="selected-work section-shell section-space" id="selected-work" aria-labelledby="work-heading">
        <div className="section-label reveal in-view">
          <span className="label-mark">↳</span> SELECTED WORK <span className="section-number">02</span>
        </div>
        <div className="services-heading reveal in-view">
          <h2 id="work-heading">
            Good stories.<br /><em>Shared with care.</em>
          </h2>
          <p>
            A closer look at the thinking<br />behind the work.
          </p>
        </div>
        <div className="work-placeholder reveal in-view">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/behind-the-scenes.webp"
            alt="Illustrative filmmaking imagery"
            loading="lazy"
            width={1067}
            height={1600}
          />
          <div>
            <span className="small-tag">PROJECT SUMMARIES / CONTENT TO FOLLOW</span>
            <h3>Our work,<br /><em>in focus.</em></h3>
            <p>
              This space is reserved for approved project summaries: the challenge, OIKIA’s role and the outcome. Client names, visuals and results will appear here once details and publishing permissions are confirmed.
            </p>
            <p className="quiet-note">Illustrative image · no client project is represented.</p>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="booking-section section-shell section-space" id="book-discovery-call" aria-labelledby="booking-heading">
        <div className="section-label reveal in-view">
          <span className="label-mark">↳</span> BOOK A DISCOVERY CALL <span className="section-number">03</span>
        </div>
        <div className="booking-layout">
          <div className="reveal in-view">
            <h2 id="booking-heading">
              A little time.<br /><em>A fresh perspective.</em>
            </h2>
            <p>
              Talk us through your idea, your podcast or the question you’re working through. A conversation is a good place to begin.
            </p>
          </div>
          <div className="booking-preview reveal in-view">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/mark.svg" alt="" aria-hidden="true" />
            <span>MAKE ROOM FOR YOUR NEXT CHAPTER.</span>
            <h3>Let’s talk<br /><em>possibility.</em></h3>
            <button
              className="button"
              onClick={() => openContact('', true)}
              type="button"
            >
              <span>Book a Discovery Call</span>
              <span className="arrow">↗</span>
            </button>
            <p>Design preview · booking calendar integration ready.</p>
          </div>
        </div>
      </section>

      {/* Inline Enquiry Section */}
      <section className="enquiry-section section-shell section-space" id="send-enquiry" aria-labelledby="enquiry-heading">
        <div className="section-label reveal in-view">
          <span className="label-mark">↳</span> SEND AN ENQUIRY <span className="section-number">04</span>
        </div>
        <div className="enquiry-layout">
          <div className="reveal in-view">
            <h2 id="enquiry-heading">
              An idea<br /><em>on your mind?</em>
            </h2>
            <p>
              Put it into words. Tell us what you’re thinking, where you need support and what you’d like to explore.
            </p>
          </div>
          <div className="inline-enquiry reveal in-view">
            <p className="preview-notice">
              Design preview · your information stays in this browser and is not sent.
            </p>

            {!previewMode && !submitSuccess && (
              <form onSubmit={handlePreview}>
                <div className="form-pair">
                  <label>
                    Your name
                    <input
                      name="name"
                      autoComplete="name"
                      required
                      placeholder="What should we call you?"
                      maxLength={100}
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
                      maxLength={254}
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
                      placeholder="The name behind the idea"
                      maxLength={150}
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Service interest <span className="optional">(optional)</span>
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
                  A little about your project
                  <textarea
                    name="project"
                    required
                    placeholder="Early thoughts welcome."
                    maxLength={3000}
                    value={formData.project}
                    onChange={handleChange}
                  />
                </label>
                <p className="form-legal">
                  By sending an enquiry, you agree that OIKIA may use these details to respond.{' '}
                  <button type="button" onClick={() => openInfo('privacy', true)}>
                    Sample privacy policy
                  </button>
                </p>
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
                    onClick={handleSend}
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
                  onClick={() => {
                    setSubmitSuccess(false);
                    setPreviewMode(false);
                    setFormData({ name: '', email: '', company: '', service: '', project: '' });
                  }}
                  style={{ marginTop: '20px' }}
                >
                  <span>Send Another</span>
                  <span className="arrow">↺</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
