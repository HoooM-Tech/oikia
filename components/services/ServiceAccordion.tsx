'use client';

import React, { useState } from 'react';
import { SERVICES } from '../../lib/constants';
import { useModal } from '../providers/ModalProvider';

export default function ServiceAccordion() {
  const [activeId, setActiveId] = useState<string>('podcast-marketing');
  const { openContact } = useModal();

  const activeService = SERVICES.find(s => s.id === activeId) || SERVICES[0];

  return (
    <div className="service-layout">
      {/* Visual Artwork Stage */}
      <div
        className="service-art reveal in-view"
        aria-hidden="true"
        style={{ background: activeService.color }}
        data-tone={activeService.tone || 'dark'}
      >
        <div className="art-lines" />
        <span className="art-top">OIKIA / IN GOOD COMPANY</span>
        <div className="service-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            id="service-image"
            src={`/assets/${activeService.art}`}
            alt=""
            width={1200}
            height={1600}
            loading="lazy"
          />
        </div>
        <span className="service-art-word" id="service-art-word">
          {activeService.wordFirst}
          <br />
          <i>{activeService.wordSecond}</i>
        </span>
        <span className="art-bottom">A LITTLE PERSPECTIVE GOES A LONG WAY.</span>
        <span className="art-star">✳</span>
      </div>

      {/* Accordion List */}
      <div className="service-list reveal in-view">
        {SERVICES.map(service => {
          const isOpen = service.id === activeId;
          return (
            <details
              key={service.id}
              className="service"
              name="services"
              open={isOpen}
              onClick={(e) => {
                e.preventDefault();
                setActiveId(service.id);
              }}
            >
              <summary>
                <span className="service-number">{service.number}</span>
                <div className="service-title-wrap">
                  <h3>{service.title}</h3>
                  {service.tag && <span className="small-tag">{service.tag}</span>}
                </div>
                <span className="plus" aria-hidden="true" />
              </summary>
              {isOpen && (
                <div className="service-description">
                  <p>{service.description}</p>
                  <button
                    className="text-link"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openContact(service.interest);
                    }}
                  >
                    <span>{service.ctaText}</span>
                    <span>↗</span>
                  </button>
                </div>
              )}
            </details>
          );
        })}
        <p className="service-footnote">An idea taking shape? That’s a good place to start.</p>
      </div>
    </div>
  );
}
