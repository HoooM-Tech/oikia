import type { Metadata } from 'next';
import HomeClient from '../components/home/HomeClient';

export const metadata: Metadata = {
  title: 'OIKIA — A home for bold stories.',
  description: 'A home for storytelling, creativity and new possibilities in media.'
};

export default function HomePage() {
  return <HomeClient />;
}
