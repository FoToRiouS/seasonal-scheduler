import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {MantineProvider} from "@mantine/core";
import {ModalsProvider} from "@mantine/modals";
import {Notifications} from "@mantine/notifications";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={client}>
            <MantineProvider withGlobalStyles withNormalizeCSS>
                <ModalsProvider>
                    <Notifications />
                    <App />
                </ModalsProvider>
            </MantineProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)
