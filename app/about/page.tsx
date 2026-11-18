import type { Metadata } from 'next';
import AboutClient from '../../components/about/AboutClient';

export const metadata: Metadata = {
  title: 'About OIKIA — A home for ideas.',
  description: 'Meet OIKIA, a podcasting-first media company exploring new possibilities across Africa.'
};

export default function AboutPage() {
  return <AboutClient />;
}
