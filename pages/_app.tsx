import MainLayout from '@/components/layouts/MainLayout'
import type { AppProps } from 'next/app'
import '../styles/Globals.scss';

interface CustomAppProps extends Omit<AppProps, "Component"> {
  Component: AppProps["Component"] & { nav?: React.ReactNode, footer?: React.ReactNode };
}

function MyApp({ Component, pageProps }: CustomAppProps) {
  return (
    <MainLayout nav={Component.nav} footer={Component.footer}>
      <Component {...pageProps} />
    </MainLayout>
  )
}

export default MyApp
