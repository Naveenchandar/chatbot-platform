import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from "./components/ui/sonner"
import { ApolloProvider } from '@apollo/client';
import { client } from './services/apolloClient.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    <Toaster />
  </StrictMode>,
)
