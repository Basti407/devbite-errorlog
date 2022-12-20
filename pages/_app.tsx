import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { FilterProvider } from '../store/FilterContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FilterProvider>
      <Component {...pageProps} />
    </FilterProvider>
  );
}
