'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useModal } from '../providers/ModalProvider';

export default function Header() {
  const pathname = usePathname();
  const { openContact } = useModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/', id: 'home' },
    { label: 'About', href: '/about', id: 'about' },
    { label: 'Services & Work', href: '/services-work', id: 'services-work' },
    { label: 'POD Creators Africa', href: '/pod-creators-africa', id: 'pod-creators-africa' },
    { label: 'Blog', href: '/blog', id: 'blog' }
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <Link href="/" className="brand" aria-label="OIKIA home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/wordmark.svg" alt="OIKIA" width="110" height="31" />
      </Link>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navLinks.map(link => (
          <Link
            key={link.id}
            href={link.href}
            aria-current={isActive(link.href) ? 'page' : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <button
        className="button header-cta"
        onClick={() => openContact('', true)}
        type="button"
      >
        <span>Book a Discovery Call</span>
        <span className="arrow">↗</span>
      </button>

      <button
        className="menu-toggle"
        aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-nav"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        type="button"
      >
        <span />
        <span />
      </button>

      {mobileMenuOpen && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Open menu">
          {navLinks.map((link, index) => (
            <Link
              key={link.id}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label} <span>{String(index + 1).padStart(2, '0')}</span>
            </Link>
          ))}
          <button
            className="menu-booking"
            onClick={() => {
              setMobileMenuOpen(false);
              openContact('', true);
            }}
            type="button"
          >
            Book a Discovery Call <span>↗</span>
          </button>
        </nav>
      )}
    </header>
  );
}
