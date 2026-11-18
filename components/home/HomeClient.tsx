'use client';

import React from 'react';
import Link from 'next/link';
import HeroMediaStage from '../hero/HeroMediaStage';
import Marquee from '../hero/Marquee';
import ServiceAccordion from '../services/ServiceAccordion';
import ReadingHeadline from '../ui/ReadingHeadline';
import { useModal } from '../providers/ModalProvider';

export default function HomeClient() {
  const { openContact, openStory } = useModal();

  return (
    <>
      {/* Hero Section */}
      <section className="hero section-shell" id="home" aria-labelledby="hero-heading">
        <div className="hero-watermark" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/wordmark.svg" alt="" />
        </div>
        <div className="hero-eyebrow">
          <span className="live-dot" /> ROOTED IN PODCASTING. OPEN TO POSSIBILITY.
        </div>
        <h1 id="hero-heading">
          <span className="line">
            <span>A home for</span>
          </span>
          <span className="line">
            <span>
              bold <em>stories.</em>
              <span className="title-spark" aria-hidden="true">✳</span>
            </span>
          </span>
        </h1>

        <HeroMediaStage />

        <div className="hero-bottom">
          <p>
            We help brands and creators find<br />their voice — and their people.
          </p>
          <button
            className="button hero-booking"
            onClick={() => openContact('', true)}
            type="button"
          >
            <span>Book a Discovery Call</span>
            <span className="arrow">↗</span>
          </button>
          <a href="#about" className="scroll-link">
            <span>THERE’S MORE TO THE STORY</span>
            <span className="scroll-arrow">↓</span>
          </a>
        </div>
      </section>

      {/* Marquee Ribbon */}
      <Marquee />

      {/* About Section */}
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

      {/* Services Section */}
      <section className="services section-shell section-space" id="services" aria-labelledby="services-heading">
        <div className="section-label reveal in-view">
          <span className="label-mark">↳</span> WHAT WE DO <span className="section-number">02</span>
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

      {/* POD Creators Africa Section */}
      <section className="community" id="community" aria-labelledby="community-heading">
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
              <Link className="button button-lime" href="/pod-creators-africa">
                <span>Meet POD Creators Africa</span>
                <span className="arrow">↗</span>
              </Link>
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

      {/* Perspectives Section */}
      <section className="perspectives section-shell section-space" aria-labelledby="perspectives-heading">
        <div className="section-label reveal in-view">
          <span className="label-mark">↳</span> INSIDE OUR WORLD <span className="section-number">04</span>
        </div>
        <div className="perspectives-heading reveal in-view">
          <h2 id="perspectives-heading">
            A different<br /><em>way of seeing.</em>
          </h2>
          <p>
            People, culture and the possibilities<br />that sit between them.
          </p>
        </div>
        <div className="perspective-grid">
          <button
            className="perspective-card perspective-large reveal in-view"
            onClick={() => openStory(3)}
            type="button"
          >
            <div className="perspective-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/culture.webp"
                alt="A low-angle view of the National Theatre in Lagos"
                loading="lazy"
                width={1200}
                height={1600}
              />
              <span className="round-arrow">↗</span>
              <span className="image-label">CULTURE</span>
            </div>
            <div className="perspective-caption">
              <h3>There’s a story<br />in every perspective.</h3>
              <span>01 — EXPLORE</span>
            </div>
          </button>

          <button
            className="perspective-card reveal in-view"
            onClick={() => openStory(2)}
            type="button"
          >
            <div className="perspective-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/behind-the-scenes.webp"
                alt="A camera operator developing a visual story"
                loading="lazy"
                width={1067}
                height={1600}
              />
              <span className="round-arrow">↗</span>
              <span className="image-label">POSSIBILITY</span>
            </div>
            <div className="perspective-caption">
              <h3>New frames.<br />New possibilities.</h3>
              <span>02 — EXPLORE</span>
            </div>
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
