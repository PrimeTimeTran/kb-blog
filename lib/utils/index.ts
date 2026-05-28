import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

import siteMetadata from '@/data/site-metadata';

export const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`;
export const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/blog/${slug}`)}`;
