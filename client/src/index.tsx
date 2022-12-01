import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthProvider } from './hooks/AuthHook'
import { ToastProvider } from './hooks/ToastHook'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ToastProvider>
        <App/>
      </ToastProvider>
    </AuthProvider>
  </React.StrictMode>
)
