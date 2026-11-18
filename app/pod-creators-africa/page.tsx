import type { Metadata } from 'next';
import PodCreatorsAfricaClient from '../../components/community/PodCreatorsAfricaClient';

export const metadata: Metadata = {
  title: 'POD Creators Africa — OIKIA',
  description: 'Independent creators, brands and the possibilities of Africa’s podcasting ecosystem.'
};

export default function PodCreatorsAfricaPage() {
  return <PodCreatorsAfricaClient />;
}
