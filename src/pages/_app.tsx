import { AuthContextProvider } from '@/lib/firebase/auth/AuthProvider';
import '@/styles/globals.css'
import { MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <MantineProvider withCSSVariables withGlobalStyles withNormalizeCSS>
        <Component {...pageProps} />
      </MantineProvider>
    </AuthContextProvider>
  );
}
