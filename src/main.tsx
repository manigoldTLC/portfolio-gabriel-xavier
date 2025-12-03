import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

if (import.meta.env.PROD && import.meta.env.VITE_ANALYTICS_WEBSITE_ID) {
  const script = document.createElement('script');
  script.src = 'https://cloud.umami.is/script.js';
  script.defer = true;
  script.setAttribute(
    'data-website-id',
    import.meta.env.VITE_ANALYTICS_WEBSITE_ID
  );
  document.head.appendChild(script);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
