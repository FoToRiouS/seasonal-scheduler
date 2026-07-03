import "./globals.css";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { Layout } from "@/components/layout/Layout";
import { Notifications } from "@mantine/notifications";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { auth } from "@/security/authOptions";
import { ModalsProvider } from "@mantine/modals";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { MantineThemeProvider } from "@/providers/MantineThemeProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Metadata } from "next";
import { userGetById } from "@/schemas/generated/api";

interface Props {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "Anime Scheduler",
};

export default async function RootLayout({ children }: Props) {
    const queryClient = new QueryClient();

    const getUserFn = async (id: string) => {
        return (await userGetById(id)).data;
    };

    const session = await auth();
    if (session?.userId) {
        await queryClient.prefetchQuery({
            queryKey: ["user", session?.userId],
            queryFn: () => getUserFn(session?.userId),
        });
    }

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
