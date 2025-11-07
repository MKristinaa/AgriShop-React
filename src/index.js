import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as Sentry from '@sentry/react';


Sentry.init({
  dsn: "https://aea3cb650a11acdc0ca723bb39d58f67@o4509203131334656.ingest.de.sentry.io/4510268598517840",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
