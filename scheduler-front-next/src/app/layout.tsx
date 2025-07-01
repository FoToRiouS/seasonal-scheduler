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

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript />
            </head>
            <body>
                <ReactQueryProvider>
                    <MantineProvider theme={defaultTheme}>
                        <Notifications />
                        <Layout>{children}</Layout>
                    </MantineProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
