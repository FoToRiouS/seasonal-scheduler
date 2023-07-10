import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import {ChakraProvider} from "@chakra-ui/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={client}>
            <ChakraProvider>
                <App />
            </ChakraProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)
