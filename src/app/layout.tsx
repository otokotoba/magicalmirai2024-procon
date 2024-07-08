import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { DESCRIPTION, TITLE, URL } from '../const';
import { AppStoreProvider } from '../stores/AppStoreProvider';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: process.env.URL ?? URL,
    siteName: TITLE,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    site: '@otokotoba_music',
    creator: '@otokotoba_music',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="ja">
      <CssBaseline>
        <AppRouterCacheProvider>
          <body>
            <AppStoreProvider>{children}</AppStoreProvider>
            <script src="/libs/ammo.wasm.js" async />
          </body>
        </AppRouterCacheProvider>
      </CssBaseline>
    </html>
  );
}
