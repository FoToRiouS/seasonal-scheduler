import "./globals.css";
import {
    ColorSchemeScript,
    createTheme,
    MantineColorsTuple,
    mantineHtmlProps,
    MantineProvider,
} from "@mantine/core";
import { Layout } from "@/components/layout/Layout";
import { Notifications } from "@mantine/notifications";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { auth } from "@/security/authOptions";
import { ModalsProvider } from "@mantine/modals";
import { getUser } from "@/actions/UserActions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

interface Props {
    children: React.ReactNode;
}

const myColor: MantineColorsTuple = [
    "#f2f5f8",
    "#e4e7e9",
    "#c5ccd4",
    "#a3b1bf",
    "#8699ae",
    "#748ba3",
    "#69839f",
    "#58718b",
    "#4d647d",
    "#2c3e50",
];

const defaultTheme = createTheme({
    colors: {
        "dark-blue": myColor,
    },
});

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
                    <HydrationBoundary state={dehydrate(queryClient)}>
                        <AuthProvider session={session}>
                            <MantineProvider theme={defaultTheme}>
                                <Notifications />
                                <ModalsProvider>
                                    <Layout>{children}</Layout>
                                </ModalsProvider>
                            </MantineProvider>
                        </AuthProvider>
                    </HydrationBoundary>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
