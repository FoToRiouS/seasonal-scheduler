import "./globals.css";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { Layout } from "@/components/layout/Layout";
import { Notifications } from "@mantine/notifications";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { auth } from "@/security/authOptions";
import { ModalsProvider } from "@mantine/modals";
import { getUser } from "@/actions/UserActions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { MantineThemeProvider } from "@/providers/MantineThemeProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

interface Props {
    children: React.ReactNode;
}

export default async function RootLayout({ children }: Props) {
    const queryClient = new QueryClient();

    const session = await auth();
    await queryClient.prefetchQuery({
        queryKey: ["user", session?.userId],
        queryFn: () => getUser(session?.userId),
    });

    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript />
            </head>
            <body>
                <ReactQueryProvider>
                    <NuqsAdapter>
                        <HydrationBoundary state={dehydrate(queryClient)}>
                            <AuthProvider session={session}>
                                <MantineThemeProvider>
                                    <Notifications />
                                    <ModalsProvider>
                                        <Layout>{children}</Layout>
                                    </ModalsProvider>
                                </MantineThemeProvider>
                            </AuthProvider>
                        </HydrationBoundary>
                    </NuqsAdapter>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
