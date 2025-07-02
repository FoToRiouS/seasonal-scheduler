"use client";

import { useSetActivePage } from "@/hooks/useSetActivePage";
import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { signIn } from "@/actions/SecurityActions";
import { useNotifications } from "@/hooks/useNotifications";
import { useRouter } from "next/navigation";

export const LoginPage = () => {
    useSetActivePage("login");
    const { showError } = useNotifications();
    const router = useRouter();

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            username: "",
            password: "",
        },
    });

    const handleLogin = async (username: string, password: string) => {
        const res = await signIn({ username, password });

        if (!res.ok) {
            if (res.error === "BadCredentialsException") {
                showError("Usuário/Senha incorretos!");
                // showErrorMessage(res.error, { message: "Usuário/Senha incorretos!" });
            } else {
                showError(res.error);
            }
            return;
        }
        router.push("/lista");
    };

    return (
        <Stack align={"center"}>
            <form onSubmit={form.onSubmit((values) => handleLogin(values.username, values.password))}>
                <Stack w={500}>
                    <TextInput
                        label={"Usuário"}
                        key={form.key("username")}
                        {...form.getInputProps("username")}
                    />
                    <PasswordInput
                        label={"Senha"}
                        key={form.key("password")}
                        {...form.getInputProps("password")}
                    />
                    <Button type={"submit"}>Login</Button>
                </Stack>
            </form>
        </Stack>
    );
};
