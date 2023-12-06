import React from 'react'

import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Route from './Route/Route.jsx'
import GlobalContact from './GlobalContact/GlobalConteact';

import {
 QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalContact>
        <RouterProvider router={Route}></RouterProvider>
      </GlobalContact>
    </QueryClientProvider>


  </React.StrictMode>,
)
