import react from 'react'
import reactDom from 'react-dom'
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import ContextProvider from './components/Contexts/ContextProvider'
import { QueryClient, QueryClientProvider } from 'react-query'
import React from 'react';

const queryClient = new QueryClient();

reactDom.render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <React.StrictMode>
                <ContextProvider>
                    <App />
                </ContextProvider>
            </React.StrictMode>
        </QueryClientProvider>
    </BrowserRouter>
    , document.getElementById('root'));
