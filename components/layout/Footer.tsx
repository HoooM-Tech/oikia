'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useModal } from '../providers/ModalProvider';

export default function Footer() {
  const pathname = usePathname();
  const { openInfo } = useModal();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services & Work', href: '/services-work' },
    { label: 'POD Creators Africa', href: '/pod-creators-africa' },
    { label: 'Blog', href: '/blog' }
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <footer className="footer section-shell">
      <div className="footer-top">
        <p>
          A home for ideas, creativity<br />and new possibilities.
        </p>

        <nav className="footer-pages" aria-label="Footer pages">
          <span className="footer-label">EXPLORE</span>
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <nav className="footer-contact" aria-label="Contact and social channels">
          <span className="footer-label">STAY IN THE LOOP</span>
          <button type="button" onClick={() => openInfo('email', false)}>
            hello@oikia.example ↗
          </button>
          <button type="button" onClick={() => openInfo('instagram', false)}>
            Instagram · @oikia.sample ↗
          </button>
          <button type="button" onClick={() => openInfo('linkedin', false)}>
            LinkedIn · OIKIA ↗
          </button>
          <button type="button" onClick={() => openInfo('substack', false)}>
            Substack · The OIKIA Letter ↗
          </button>
          <span className="footer-sample-note">Sample details · final links to follow</span>
        </nav>

        <nav className="footer-legal" aria-label="Legal">
          <span className="footer-label">THE SMALL PRINT</span>
          <button type="button" onClick={() => openInfo('privacy', true)}>
            Privacy policy
          </button>
          <button type="button" onClick={() => openInfo('terms', true)}>
            Terms
          </button>
          <button type="button" onClick={() => openInfo('cookies', true)}>
            Cookie notice
          </button>
          <span className="footer-sample-note">Sample legal copy</span>
        </nav>

        <a href="#main" className="back-top">
          Back to top <span>↑</span>
        </a>
      </div>

      <div className="footer-wordmark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/wordmark.svg"
          alt="OIKIA"
          width="1000"
          height="274"
        />
      </div>

      <div className="footer-bottom">
        <span>© 2026 OIKIA</span>
        <span>AFRICAN PERSPECTIVES. OPEN POSSIBILITIES.</span>
        <span>Design concept · Illustrative media</span>
      </div>
    </footer>
  );
}
