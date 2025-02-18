import { useEffect } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress'; // Import NProgress
import 'nprogress/nprogress.css'; // Import NProgress's default styles

// Custom App Component
function Company({ Component, pageProps }) {
  useEffect(() => {
    // Listen for route change events to show/hide the progress bar
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleStop);
    Router.events.on('routeChangeError', handleStop);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleStop);
      Router.events.off('routeChangeError', handleStop);
    };
  }, []);

  return <Component {...pageProps} />;
}

export default Company;
