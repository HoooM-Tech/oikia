export interface Story {
  id: number;
  category: string;
  title: string;
  text: string;
  image: string;
  alt: string;
  video?: boolean;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  ctaText: string;
  interest: string;
  art: string;
  wordFirst: string;
  wordSecond: string;
  color: string;
  tone?: 'dark' | 'light';
  tag?: string;
}

export interface Article {
  id: string;
  category: 'podcasting' | 'media' | 'community';
  categoryLabel: string;
  title: string;
  titleHtml: string;
  standfirst: string;
  summary: string;
  image: string;
  alt: string;
  paragraphs: Array<{ type: 'p' | 'h2'; text: string }>;
  featured?: boolean;
}

export interface EnquiryInput {
  name: string;
  email: string;
  company?: string;
  service?: string;
  project: string;
}

export interface ValueItem {
  number: string;
  category: string;
  titleFirst: string;
  titleEm: string;
  description: string;
}
