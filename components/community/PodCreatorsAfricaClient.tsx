'use client';

import React from 'react';
import { PCA_VALUES } from '../../lib/constants';
import { useModal } from '../providers/ModalProvider';

export default function PodCreatorsAfricaClient() {
  const { openContact } = useModal();

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero section-shell">
        <div className="page-eyebrow">
          <span className="live-dot" /> POD CREATORS AFRICA
        </div>
        <h1>
          Many voices.<br /><em>Shared possibility.</em>
        </h1>
        <div className="page-hero-bottom">
          <p>For the independent creators and brands shaping Africa’s podcasting story.</p>
          <a className="text-link" href="#the-community">
            <span>Find your place in the picture</span>
            <span>↓</span>
          </a>
        </div>
      </section>

      {/* Community Section */}
      <section className="community" id="the-community" aria-labelledby="community-heading">
        <div className="community-inner section-shell">
          <div className="section-label reveal in-view">
            <span className="label-mark">↳</span> PODCREATORS AFRICA <span className="section-number">03</span>
          </div>
          <div className="community-layout">
            <div className="community-copy reveal in-view">
              <span className="community-kicker">
                <span className="live-dot" /> MANY VOICES. SHARED POSSIBILITY.
              </span>
              <h2 id="community-heading">
                A bigger<br />picture.<br /><em>With you in it.</em>
              </h2>
              <p>
                For Africa’s independent creators and brands. A place to connect, exchange knowledge and explore what podcasting can become, together.
              </p>
              <button
                className="button button-lime"
                onClick={() => openContact('POD Creators Africa')}
                type="button"
              >
                <span>Ask about the community</span>
                <span className="arrow">↗</span>
              </button>
            </div>
            <div className="community-collage reveal in-view">
              <span className="community-outline" aria-hidden="true">PCA</span>
              <div className="community-photo photo-culture">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/culture.webp"
                  alt="The National Theatre in Lagos, an African cultural landmark"
                  loading="lazy"
                  width={1200}
                  height={1600}
                />
                <span>CULTURE IN FOCUS.</span>
              </div>
              <div className="community-photo photo-person">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/portrait.jpg"
                  alt="A smiling creative with an expressive sense of style"
                  loading="lazy"
                  width={1200}
                  height={1600}
                />
              </div>
              <div className="community-sticker" aria-hidden="true">
                <span>MAKE ROOM<br />FOR MORE.</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/mark.svg" alt="" />
              </div>
              <span className="collage-note">CREATIVITY IS A<br />COLLECTIVE THING. ↗</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Values Grid */}
      <section className="values-section section-shell section-space">
        <div className="section-label reveal in-view">
          <span className="label-mark">↳</span> THE POWER OF AN ECOSYSTEM
        </div>
        <div className="values-grid">
          {PCA_VALUES.map(val => (
            <article key={val.number} className="reveal in-view">
              <span>{val.number} / {val.category}</span>
              <h2>
                {val.titleFirst}<br /><em>{val.titleEm}</em>
              </h2>
              <p>{val.description}</p>
            </article>
          ))}
        </div>

        <div className="programme-note reveal in-view">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/mark.svg" alt="" aria-hidden="true" />
          <div>
            <h3>A community, taking shape.</h3>
            <p>
              Programme details, dates, eligibility and participation options are still being confirmed. Ask OIKIA about POD Creators Africa to learn more.
            </p>
          </div>
          <button
            className="text-link"
            onClick={() => openContact('POD Creators Africa')}
            type="button"
          >
            <span>Start a conversation</span>
            <span>↗</span>
          </button>
        </div>
      </section>

      {/* Contact CTA Section */}
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
