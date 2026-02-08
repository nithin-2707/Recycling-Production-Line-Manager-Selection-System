import { MantineProvider, AppShell, Container } from '@mantine/core';
import { useState } from 'react';
import '@mantine/core/styles.css';
import Dashboard from './components/Dashboard';

const theme = {
  colors: {
    brand: [
      '#e0e1dd', // Alabaster Grey (lightest)
      '#778da9', // Lavender Grey
      '#415a77', // Dusk Blue
      '#1b263b', // Prussian Blue
      '#0d1b2a', // Ink Black (darkest)
      '#0d1b2a',
      '#0d1b2a',
      '#0d1b2a',
      '#0d1b2a',
      '#0d1b2a',
    ],
  },
  primaryColor: 'brand',
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  headings: {
    fontFamily: '"Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontWeight: '700',
  },
};

function App() {
  return (
    <MantineProvider theme={theme}>
      <AppShell
        padding="md"
        styles={{
          main: {
            background: '#e0e1dd',
            minHeight: '100vh',
          },
        }}
      >
        <Container size="xl" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          <Dashboard />
        </Container>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
