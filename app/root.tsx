import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix';

import { MantineProvider } from '@mantine/core';

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <MantineTheme>
          <Outlet />
        </MantineTheme>

        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

function MantineTheme({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider
      theme={{ colorScheme: 'dark' }}
      withNormalizeCSS
      withGlobalStyles
    >
      {children}
    </MantineProvider>
  );
}
