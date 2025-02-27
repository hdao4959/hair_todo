import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CssBaseline } from '@mui/material'
// import { ThemeProvider } from '@emotion/react'
// import theme from './theme.js'
import {   Experimental_CssVarsProvider as CssVarsProvider, ThemeProvider } from '@mui/material/styles';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CssVarsProvider >
    <CssBaseline/>
    <App />
    </CssVarsProvider>
  </StrictMode>,
)
