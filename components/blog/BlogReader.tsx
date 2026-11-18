'use client';

import React, { useState, useEffect } from 'react';
import { ARTICLES } from '../../lib/constants';
import { Article } from '../../lib/types';
import { useModal } from '../providers/ModalProvider';

export default function BlogReader() {
  const [filter, setFilter] = useState<'all' | 'podcasting' | 'media' | 'community'>('all');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [previousScroll, setPreviousScroll] = useState<number>(0);
  const { openInfo } = useModal();

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash && ARTICLES.some(a => a.id === hash)) {
        setActiveArticleId(hash);
      } else {
        setActiveArticleId(null);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const openArticle = (id: string) => {
    setPreviousScroll(window.scrollY);
    window.location.hash = id;
    setActiveArticleId(id);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const closeArticle = () => {
    window.history.pushState(null, '', window.location.pathname);
    setActiveArticleId(null);
    window.scrollTo({ top: previousScroll, behavior: 'instant' });
  };

  const filteredArticles = filter === 'all'
    ? ARTICLES
    : ARTICLES.filter(a => a.category === filter);

  const activeArticle: Article | undefined = ARTICLES.find(a => a.id === activeArticleId);

  return (
    <>
      {/* Blog Overview */}
      <div id="blog-overview" hidden={Boolean(activeArticle)}>
        <section className="page-hero section-shell">
          <div className="page-eyebrow">
            <span className="live-dot" /> THE OIKIA BLOG
          </div>
          <h1>
            Ideas worth<br /><em>spending time with.</em>
          </h1>
          <div className="page-hero-bottom">
            <p>Perspectives on podcasting, media and the creative ecosystem.</p>
            <button
              className="text-link"
              type="button"
              onClick={() => openInfo('substack', false)}
            >
              <span>Meet The OIKIA Letter</span>
              <span>↗</span>
            </button>
          </div>
        </section>

        <section className="journal section-shell">
          <div className="journal-toolbar">
            <div className="journal-filters" role="group" aria-label="Filter articles">
              <button
                type="button"
                data-filter="all"
                aria-pressed={filter === 'all'}
                onClick={() => setFilter('all')}
              >
                All perspectives
              </button>
              <button
                type="button"
                data-filter="podcasting"
                aria-pressed={filter === 'podcasting'}
                onClick={() => setFilter('podcasting')}
              >
                Podcasting
              </button>
              <button
                type="button"
                data-filter="media"
                aria-pressed={filter === 'media'}
                onClick={() => setFilter('media')}
              >
                Media
              </button>
              <button
                type="button"
                data-filter="community"
                aria-pressed={filter === 'community'}
                onClick={() => setFilter('community')}
              >
                Community
              </button>
            </div>
            <span>EDITORIAL PREVIEWS / SAMPLE COPY</span>
          </div>

          <div className="journal-grid">
            {filteredArticles.map(article => {
              const isFeature = article.featured && filter === 'all';
              return (
                <button
                  key={article.id}
                  className={`journal-card ${isFeature ? 'journal-feature' : ''} reveal in-view`}
                  onClick={() => openArticle(article.id)}
                  type="button"
                >
                  <div className="journal-image">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={article.image}
                      alt={article.alt}
                      width={1200}
                      height={1600}
                    />
                    <span className="round-arrow">↗</span>
                  </div>
                  <span className="journal-category">{article.categoryLabel}</span>
                  <h2>{article.title}</h2>
                  <p>{article.summary}</p>
                  <span className="text-link">
                    <span>Read the perspective</span>
                    <span>↗</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="journal-note">
            <p>
              These draft articles demonstrate the reading experience. Published Substack articles will replace them when client links are supplied.
            </p>
            <button
              className="text-link"
              type="button"
              onClick={() => openInfo('substack', false)}
            >
              <span>Follow the next chapter</span>
              <span>↗</span>
            </button>
          </div>
        </section>
      </div>

      {/* Blog In-Page Reader */}
      {activeArticle && (
        <section className="blog-reader section-shell" id="blog-reader">
          <button
            className="article-back text-link"
            onClick={closeArticle}
            type="button"
          >
            <span>← All perspectives</span>
          </button>

          <article>
            <span className="journal-category">{activeArticle.categoryLabel}</span>
            <h1 dangerouslySetInnerHTML={{ __html: activeArticle.titleHtml }} />
            <p className="article-standfirst">{activeArticle.standfirst}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="article-image"
              src={activeArticle.image}
              alt={activeArticle.alt}
              width={1200}
              height={1600}
            />

            <div className="article-prose">
              {activeArticle.paragraphs.map((p, idx) => {
                if (p.type === 'h2') {
                  return <h2 key={idx}>{p.text}</h2>;
                }
                return <p key={idx}>{p.text}</p>;
              })}
            </div>
          </article>

          <div className="article-end">
            <span>DRAFT EDITORIAL COPY / FOR DESIGN REVIEW</span>
            <button
              className="text-link"
              onClick={closeArticle}
              type="button"
            >
              <span>Back to all perspectives</span>
              <span>↗</span>
            </button>
          </div>
        </section>
      )}
    </>
  );
}
