import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { AppStoreProvider } from '@/stores/AppStoreProvider';

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
          <body className={notoSansJP.className}>
            <AppStoreProvider>{children}</AppStoreProvider>
            <script src="/libs/ammo.wasm.js" async />
          </body>
        </AppRouterCacheProvider>
      </CssBaseline>
    </html>
  );
}
