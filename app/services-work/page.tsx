import type { Metadata } from 'next';
import ServicesWorkClient from '../../components/services/ServicesWorkClient';

export const metadata: Metadata = {
  title: 'Services & Work — OIKIA',
  description: 'Podcast marketing, podcast management and consultation. Explore OIKIA services and start a conversation.'
};

export default function ServicesWorkPage() {
  return <ServicesWorkClient />;
}
