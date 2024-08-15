import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import styles from './src/style.css?url';
import darkStyles from './src/configuration/colours/components/css/dark.css?url';
import { LinksFunction } from '@remix-run/node';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'stylesheet', href: darkStyles },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />

        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#01202e" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />

        <meta name="apple-mobile-web-app-title" content="TubeArchivist" />
        <meta name="application-name" content="TubeArchivist" />
        <meta name="msapplication-TileColor" content="#01202e" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#01202e" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TubeArchivist</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
