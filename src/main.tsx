import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {store} from '../src/app/store.ts'
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './app/context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter> 
  <AuthContextProvider>
  <Provider store={store}>
  <StrictMode>
    
    <App />
  
  </StrictMode>
  </Provider>
  </AuthContextProvider>
  </BrowserRouter>,
)
