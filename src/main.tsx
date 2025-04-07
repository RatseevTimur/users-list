import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log(
  '%c⚠️ WARNING: This code is protected by copyright. Unauthorized copying or distribution is prohibited.',
  'color: red; font-size: 16px; font-weight: bold;'
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
