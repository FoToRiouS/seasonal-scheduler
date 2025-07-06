"use client";
import { Button, createTheme, MantineColorsTuple, MantineProvider } from "@mantine/core";

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
    components: {
        Button: Button.extend({
            defaultProps: {
                color: "violet.8",
            },
        }),
    },
});

export const MantineThemeProvider = ({ children }: { children: React.ReactNode }) => {
    return <MantineProvider theme={defaultTheme}>{children}</MantineProvider>;
};
