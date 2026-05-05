'use client'
import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import siteMetadata from '@/data/site-metadata'

const CommonSEO = ({ title, description, ogType, ogImage, twImage, canonicalUrl, publishedAt }) => {
  const router = useRouter()
  return (
    <Head>
      {/* Basic page info */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="follow, index" />
      <meta name="author" content="Loi Tran" />
      <meta property="article:author" content="Loi Tran" />

      {/* Canonical URL */}
      <link
        rel="canonical"
        href={canonicalUrl ? canonicalUrl : `${siteMetadata.siteUrl}${router.asPath}`}
      />

      {/* Open Graph */}
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:title" content={title} />
      <meta name="description" property="og:description" content={description} />
      <meta property="og:url" content={`${siteMetadata.siteUrl}${router.asPath}`} />
      <meta property="og:type" content={ogType || 'article'} />

      {/* Optional: add image dimensions for LinkedIn */}
      {ogImage.constructor.name === 'Array' ? (
        (ogImage ?? []).map(({ url, width = 1200, height = 630 }) => (
          <React.Fragment key={url}>
            <meta property="og:image" content={url} />
            <meta property="og:image:width" content={width} />
            <meta property="og:image:height" content={height} />
          </React.Fragment>
        ))
      ) : (
        <React.Fragment>
          <meta property="og:image" content={ogImage} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </React.Fragment>
      )}

      {/* Article metadata (if applicable) */}
      {publishedAt && <meta property="article:published_time" content={publishedAt} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      {siteMetadata.twitter && <meta name="twitter:site" content={siteMetadata.twitter} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twImage || ogImage} />
    </Head>
  )
}

export const PageSEO = ({ title, description }) => {
  const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
  const twImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
  return (
    <CommonSEO
      title={title}
      description={description}
      ogType="website"
      ogImage={ogImageUrl}
      twImage={twImageUrl}
    />
  )
}

export const TagSEO = ({ title, description }) => {
  const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
  const twImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
  const router = useRouter()
  return (
    <>
      <CommonSEO
        title={title}
        description={description}
        ogType="website"
        ogImage={ogImageUrl}
        twImage={twImageUrl}
      />
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${description} - RSS feed`}
          href={`${siteMetadata.siteUrl}${router.asPath}/feed.xml`}
        />
      </Head>
    </>
  )
}

export const BlogSEO = ({
  authorDetails,
  title,
  summary,
  date,
  lastmod,
  url,
  images = [],
  canonicalUrl,
}) => {
  const router = useRouter()
  const safeDate = date && !isNaN(new Date(date).getTime()) ? new Date(date) : null

  const publishedAt = safeDate ? safeDate.toISOString() : null
  const modifiedAt = new Date(lastmod || publishedAt).toISOString()
  let imagesArr =
    images.length === 0
      ? [siteMetadata.socialBanner]
      : typeof images === 'string'
        ? [images]
        : images

  const featuredImages = (imagesArr ?? []).map((img) => {
    return {
      '@type': 'ImageObject',
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  let authorList
  if (authorDetails) {
    authorList = (authorDetails ?? []).map((author) => {
      return {
        '@type': 'Person',
        name: author.name,
      }
    })
  } else {
    authorList = {
      '@type': 'Person',
      name: siteMetadata.author,
    }
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    image: featuredImages,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: authorList,
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.author,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
      },
    },
    description: summary,
  }

  const twImageUrl = featuredImages[0].url

  return (
    <>
      <CommonSEO
        title={title}
        description={summary}
        ogType="article"
        ogImage={featuredImages}
        twImage={twImageUrl}
        canonicalUrl={canonicalUrl}
        publishedAt={publishedAt}
      />
      <Head>
        {date && <meta property="article:published_time" content={publishedAt} />}
        {lastmod && <meta property="article:modified_time" content={modifiedAt} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData, null, 2),
          }}
        />
      </Head>
    </>
  )
}
