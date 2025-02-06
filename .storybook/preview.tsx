import type { Preview } from '@storybook/react'
import '../src/index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from '../src/contexts/app.context'
import { HelmetProvider } from 'react-helmet-async'
import { withRouter } from 'storybook-addon-remix-react-router'
import React from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

const preview: Preview = {
  parameters: {
    // options: {
    //   storySort: (a, b) => (a.id === b.id ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true }))
    // },
    controls: {
      matchers: {
        color: /(background|color|bc)$/i,
        date: /Date$/i
      }
    }
  },

  decorators: [
    withRouter,
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <HelmetProvider>
            <Story />
          </HelmetProvider>
        </AppProvider>
      </QueryClientProvider>
    )
  ]
}

export default preview
