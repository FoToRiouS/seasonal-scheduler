"use client";
import { useSetActivePage } from "@/hooks/useSetActivePage";
import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { UserRegister } from "@/interfaces/UserRegister";
import { z } from "zod/v4";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useMask } from "@react-input/mask";
import { useDisclosure } from "@mantine/hooks";
import { useRegisterUser } from "@/queries/UserQueries";
import { useNotifications } from "@/hooks/useNotifications";

export const CadastroPage = () => {
    useSetActivePage("register");
    const { showSuccess, showError } = useNotifications();
    const [visible, { toggle }] = useDisclosure(false);

    const { mutate: registerUser } = useRegisterUser();

    const schema = z
        .object({
            name: z.string().min(1, "O nome deve ser preenchido"),
            username: z.string().min(1, "O nome de usuário deve ser preenchido"),
            email: z.email("O email não é válido"),
            phone: z.string().min(1, "O telefone deve ser preenchido"),
            password: z.string().min(1, "A senha deve ser preenchida"),
            confirmPassword: z.string().min(1),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "As senhas devem ser iguais",
            path: ["confirmPassword"], // Indica em qual campo o erro deve ser exibido
        });

    const refPhone = useMask({
        mask: "(__) _____-____",
        replacement: { _: /\d/ },
    });

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            name: "",
            username: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        },
        validate: zod4Resolver(schema),
    });

    const handleSubmit = (user: UserRegister) => {
        registerUser(user, {
            onSuccess: (data) => {
                console.log("data", data);
                showSuccess("Cadastro realizado com sucesso!");
            },
            onError: (error) => {
                showError(error.message);
            },
        });
    };

    return (
        <Stack align={"center"}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack w={500}>
                    <TextInput
                        label={"Nome"}
                        size={"lg"}
                        withAsterisk
                        key={form.key("name")}
                        {...form.getInputProps("name")}
                    />
                    <TextInput
                        label={"Nome de Usuário"}
                        size={"lg"}
                        withAsterisk
                        key={form.key("username")}
                        {...form.getInputProps("username")}
                    />
                    <TextInput
                        label={"Email"}
                        size={"lg"}
                        withAsterisk
                        key={form.key("email")}
                        {...form.getInputProps("email")}
                    />
                    <TextInput
                        label={"Telefone"}
                        size={"lg"}
                        withAsterisk
                        ref={refPhone}
                        key={form.key("phone")}
                        {...form.getInputProps("phone")}
                    />
                    <PasswordInput
                        label={"Senha"}
                        size={"lg"}
                        withAsterisk
                        visible={visible}
                        onVisibilityChange={toggle}
                        key={form.key("password")}
                        {...form.getInputProps("password")}
                    />
                    <PasswordInput
                        label={"Confirmar Senha"}
                        size={"lg"}
                        visible={visible}
                        onVisibilityChange={toggle}
                        key={form.key("confirmPassword")}
                        {...form.getInputProps("confirmPassword")}
                    />
                    <Button size={"lg"} color={"dark-blue.9"} type={"submit"}>
                        Cadastrar
                    </Button>
                </Stack>
            </form>
        </Stack>
    );
};
