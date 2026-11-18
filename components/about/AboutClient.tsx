'use client';

import React from 'react';
import Link from 'next/link';
import ReadingHeadline from '../ui/ReadingHeadline';
import { ABOUT_VALUES } from '../../lib/constants';
import { useModal } from '../providers/ModalProvider';

export default function AboutClient() {
  const { openContact } = useModal();

  return (
    <>
      {/* Hero */}
      <section className="page-hero section-shell">
        <div className="page-eyebrow">
          <span className="live-dot" /> ABOUT OIKIA
        </div>
        <h1>
          A home for ideas.<br /><em>And what comes next.</em>
        </h1>
        <div className="page-hero-bottom">
          <p>Podcasting is our foundation. A wider world of media is our horizon.</p>
        </div>
      </section>

      {/* Panorama */}
      <div className="about-panorama section-shell">
        <div className="panorama-photo reveal in-view">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/culture.webp"
            alt="The National Theatre in Lagos"
            width={1200}
            height={1600}
          />
          <span>CULTURE IN FOCUS.</span>
        </div>
        <div className="panorama-photo reveal in-view">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/filmmaker.webp"
            alt="A filmmaker exploring the frame"
            width={1201}
            height={1600}
          />
          <span>NEW POSSIBILITIES.</span>
        </div>
        <span className="panorama-o" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/mark.svg" alt="" />
        </span>
      </div>

      {/* About Foundation */}
      <section className="about section-shell section-space" id="about" aria-labelledby="about-heading">
        <div className="section-label reveal in-view">
          <span className="label-mark">↳</span> THIS IS OIKIA <span className="section-number">01</span>
        </div>
        <div className="about-content">
          <ReadingHeadline id="about-heading" />
          <div className="about-detail reveal in-view">
            <div className="about-stamp" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/mark.svg" alt="" />
              <span>A DIFFERENT<br />WAY OF SEEING.</span>
            </div>
            <div>
              <p>We’re OIKIA. A home for storytelling, creativity and new possibilities in media.</p>
              <p>
                Podcasting is where our story begins. We work with brands and creators across Africa, bringing together podcast marketing, management and consultation — while looking ahead to a wider world of media.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="values-section section-shell section-space">
        <div className="section-label reveal in-view">
          <span className="label-mark">↳</span> THE THINGS WE COME BACK TO
        </div>
        <div className="values-grid">
          {ABOUT_VALUES.map(val => (
            <article key={val.number} className="reveal in-view">
              <span>{val.number} / {val.category}</span>
              <h2>
                {val.titleFirst}<br /><em>{val.titleEm}</em>
              </h2>
              <p>{val.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Our Next Chapter (Blue Box) */}
      <section className="next-chapter section-shell">
        <span className="section-label">↳ OUR NEXT CHAPTER</span>
        <h2>
          Podcasting first.<br /><em>Possibility, always.</em>
        </h2>
        <p>
          As OIKIA grows, our ambition is to explore broader media strategy, consultation and other forms of storytelling. Our roots remain in the podcasting ecosystem and the people shaping it.
        </p>
        <Link className="text-link" href="/services-work" style={{ color: 'var(--paper)', marginTop: '25px' }}>
          <span>Explore our services</span>
          <span>↗</span>
        </Link>
      </section>

      {/* Contact Trigger */}
      <section className="contact section-shell" id="contact" aria-labelledby="contact-heading">
        <div className="contact-top reveal in-view">
          <span className="section-label">
            <span className="label-mark">↳</span> YOUR NEXT CHAPTER
          </span>
          <span>BIG IDEA? EARLY THOUGHT?<br />WE’RE LISTENING.</span>
        </div>
        <button
          className="contact-title reveal in-view"
          onClick={() => openContact()}
          type="button"
        >
          <h2 id="contact-heading">
            Let’s make<br /><em>something move.</em>
          </h2>
          <span className="contact-arrow" aria-hidden="true">↗</span>
        </button>
        <div className="contact-bottom reveal in-view">
          <p>A conversation is a good place to begin.</p>
          <button
            className="text-link"
            onClick={() => openContact('', true)}
            type="button"
          >
            <span>Book a Discovery Call</span>
            <span>↗</span>
          </button>
        </div>
      </section>
    </>
  );
}
