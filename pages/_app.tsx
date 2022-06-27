import { useEffect } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '@/components/layouts/MainLayout';
import smoothscroll from 'smoothscroll-polyfill';
import TagManager from 'react-gtm-module';
import { AppProvider } from 'contexts/AppContext';
import type { AppProps } from 'next/app';
import '../styles/Globals.scss';

interface CustomAppProps extends Omit<AppProps, "Component"> {
  Component: AppProps["Component"] & { nav?: React.ReactNode, footer?: React.ReactNode };
}

function MyApp({ Component, pageProps }: CustomAppProps) {

  const router = useRouter();

  useEffect(()=> {
    smoothscroll.polyfill();
    TagManager.initialize({gtmId: 'GTM-TMXKLTQ'})
  }, [])

  useEffect(()=>{
    TagManager.dataLayer({
      dataLayer: {
        event: 'pageview',
        pagePath: router.pathname,
      },
    });
  }, [router.pathname])

  return (
    <AppProvider>
      <MainLayout nav={Component.nav} footer={Component.footer}>
        <Component {...pageProps} />
      </MainLayout>
    </AppProvider>
  )
}

export default MyApp