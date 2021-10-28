import react from 'react'
import reactDom from 'react-dom'
import App from './App';
import ContextProvider from './components/Contexts/ContextProvider'
import { QueryClient, QueryClientProvider } from 'react-query'
import React from 'react';


const queryClient = new QueryClient();


reactDom.render(
    <QueryClientProvider client={queryClient}>
        <React.StrictMode>
            <ContextProvider>
                <App />
            </ContextProvider>
        </React.StrictMode>
    </QueryClientProvider>
, document.getElementById('root'));
