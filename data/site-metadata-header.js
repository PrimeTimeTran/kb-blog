import siteMetadata from '@/data/site-metadata'

export const siteMetaDataHeader = {
  authors: [{ name: 'Loi Tran' }],
  language: 'en-us',
  creator: 'Loi Tran',
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  icons: {
    icon: [
      { url: '/public/static/favicons/favicon.ico' },
      { url: '/public/static/images/favicon.png', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png' }],
    shortcut: ['/public/static/favicons/favicon.ico'],
  },
}
