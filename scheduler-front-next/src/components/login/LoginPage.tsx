"use client";

import { useSetActivePage } from "@/hooks/useSetActivePage";
import { Button, Center, Image, PasswordInput, Stack, TextInput } from "@mantine/core";
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
            } else {
                showError(res.error);
            }
            return;
        }
        router.push("/calendario");
    };

    return (
        <Stack align={"center"}>
            <form onSubmit={form.onSubmit((values) => handleLogin(values.username, values.password))}>
                <Stack w={300} gap={5}>
                    <Center>
                        <Image src={"/login.png"} w={300} />
                    </Center>
                    <TextInput
                        label={"Usuário"}
                        size={"lg"}
                        key={form.key("username")}
                        {...form.getInputProps("username")}
                    />
                    <PasswordInput
                        label={"Senha"}
                        size={"lg"}
                        key={form.key("password")}
                        {...form.getInputProps("password")}
                    />
                    <Button size={"lg"} type={"submit"} mt={"lg"}>
                        Entrar
                    </Button>
                </Stack>
            </form>
        </Stack>
    );
};
