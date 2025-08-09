import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from "./components/ui/sonner"
import { ApolloProvider } from '@apollo/client';
import { client } from './services/apolloClient.ts'
import { GoogleOAuthProvider } from '@react-oauth/google';

console.log('Google Client ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID);
console.log(import.meta.env.VITE_SOME_KEY) // "123"
console.log(import.meta.env.DB_PASSWORD) // undefined
createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
      <Toaster richColors />
    </StrictMode>,
  </GoogleOAuthProvider>
)
