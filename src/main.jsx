import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './router/router.jsx'
import store from './redux/store.jsx'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>,
)
