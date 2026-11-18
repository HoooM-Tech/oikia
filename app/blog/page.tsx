import type { Metadata } from 'next';
import BlogReader from '../../components/blog/BlogReader';

export const metadata: Metadata = {
  title: 'Blog — OIKIA',
  description: 'Perspectives on podcasting, media and the creative ecosystem.'
};

export default function BlogPage() {
  return <BlogReader />;
}
