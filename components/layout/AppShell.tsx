'use client';

import { AppNavbar, MobileNavbarOnOverlay } from './AppNavbar';

import Head from 'next/head';
import { LayoutProvider } from '@/providers/LayoutProvider';
import { MobileNavProvider } from '@/providers/MobileNavProvider';
import { OverlayHost } from '@/layouts/global/Overlay';
import { ScrollProvider } from '@/providers/ScrollProvider';
import { ThemeProvider } from '@teispace/next-themes';
import { ThemeWatcher } from '@/lib/theme/ThemeWatcher';
import { usePathname } from 'next/navigation';

// import AppShellDemo from '@/exhibit/01-web-foundations/navbar/1';
// import AppShellDemo from '@/exhibit/01-web-foundations/navbar/2';
// import AppShellDemo from '@/exhibit/01-web-foundations/navbar/3';

const screens = {
  kb: {
    prompt: 'KB Screen',
  },
  dsa: {
    prompt: 'DSA Screen',
  },
};

export function AppShell({ children }) {
  const basePath = process.env.BASE_PATH || '';
  const pathname = usePathname() || '';
  const pathBaseSegment = pathname.split('/')[1];
  const screen = screens[pathBaseSegment];

  // return <AppShellDemo>{children}</AppShellDemo>;
  return (
    <div className="flex h-full flex-col">
      <Head>
        <link sizes="76x76" rel="apple-touch-icon" href={`${basePath}/static/favicons/favicon.svg`} />
        <link rel="icon" sizes="32x32" type="image/png" href={`${basePath}/static/favicons/favicon.svg`} />
        <link rel="icon" sizes="16x16" type="image/png" href={`${basePath}/static/favicons/favicon.svg`} />
        <link rel="mask-icon" href={`${basePath}/static/favicons/favicon.svg`} />
        <meta name="msapplication-TileColor" />
        <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      </Head>
      <ScrollProvider>
        <ThemeProvider enableSystem attribute="class">
          <ThemeWatcher />
          <MobileNavProvider>
            <LayoutProvider>
              <AppNavbar />
              {children}
              <OverlayHost />
              <MobileNavbarOnOverlay />
            </LayoutProvider>
          </MobileNavProvider>
        </ThemeProvider>
      </ScrollProvider>
    </div>
  );
}
