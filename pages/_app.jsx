/* eslint-disable @next/next/inline-script-id */
import '@/css/prism.css'
import '@/css/tailwind.css'
import 'katex/dist/katex.css'
import '@/css/app.css'

// Core languages
import 'prismjs'
// import 'prismjs/components/prism-go'
// import 'prismjs/components/prism-ruby'
// import 'prismjs/components/prism-dart'
// import 'prismjs/components/prism-rust'
// import 'prismjs/components/prism-python'
// import 'prismjs/components/prism-javascript'
// import 'prismjs/components/prism-typescript'

// Plugins
// import 'prismjs/plugins/line-numbers/prism-line-numbers'
// import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

import Head from 'next/head'
import Script from 'next/script'
import { ThemeProvider } from 'next-themes'
import '@fontsource/inter/variable-full.css'

import siteMetadata from '@/data/site-metadata'
// import Analytics from '@/components/analytics'
// import { ClientReload } from '@/components/ClientReload'
// import PreviewTailwind from './PreviewTailwind'
// import PreviewDesignSystem from './PreviewDesignSystem'
import AppLayout from '@/layouts/AppLayout'

// const isDevelopment = process.env.NODE_ENV === 'development'
// const isSocket = process.env.SOCKET

export default function App({ Component, pageProps }) {
  console.log('_App')
  // 💡 IDEA: Debug styling/tailwind easier
  // return <div className="text-primary-400 font-bold">PRIMARY TEST</div>
  // return <PreviewTailwind />
  // return <PreviewDesignSystem />
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <title>KB & Blog of Loi Tran</title>

        {/* SVG favicon */}
        <link rel="icon" href="/static/images/logo.svg" type="image/svg+xml" />

        {/* fallback for older browsers */}
        <link rel="alternate icon" href="/static/images/logo.png" />
      </Head>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
      <Script strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
            });
        `}
      </Script>
    </ThemeProvider>
  )
}
