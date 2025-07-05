import { Button, Stack, Text, TextInput } from "@mantine/core";
import { useGetUser, useUpdateProfile } from "@/queries/UserQueries";
import { useForm } from "@mantine/form";
import { z } from "zod/v4";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { UserUpdateProfile } from "@/interfaces/UserUpdateProfile";
import { useNotifications } from "@/hooks/useNotifications";
import { useUserSession } from "@/hooks/useUserSession";
import { useEffect } from "react";
import { modals } from "@mantine/modals";

const schema = z.object({
    name: z.string().min(1, "O nome deve ser preenchido"),
    email: z.email("O email não é válido"),
    phone: z.string().min(1, "O telefone deve ser preenchido"),
});

type schemaType = z.infer<typeof schema>;

export const PerfilDataTab = () => {
    const { showSuccess, showError } = useNotifications();
    const { user: sessionUser } = useUserSession();
    const { data: user } = useGetUser(sessionUser?.id);
    const { mutate: updateProfile, isPending } = useUpdateProfile(sessionUser?.id);

    const form = useForm<schemaType>({
        mode: "uncontrolled",
        initialValues: {
            name: "",
            email: "",
            phone: "",
        },
        validate: zod4Resolver(schema),
    });

    useEffect(() => {
        form.setValues({
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
        });
    }, [user]);

    const openConfirmation = (values: schemaType) => {
        modals.openConfirmModal({
            title: "Tem certeza?",
            children: <Text size={"sm"}>Tem certeza que deseja atualizar as informações do perfil?</Text>,
            labels: { confirm: "Sim", cancel: "Nao" },
            confirmProps: { color: "green.9" },
            onConfirm: () => handleSubmit(values),
        });
    };

    const handleSubmit = (values: schemaType) => {
        const payload: UserUpdateProfile = {
            name: values.name,
            email: values.email,
            phone: values.phone,
        };
        console.log(payload);
        updateProfile(payload, {
            onSuccess: () => showSuccess("Informações do perfil atualizados com sucesso!"),
            onError: showError,
        });
    };

    return (
        <Stack align={"center"}>
            <form onSubmit={form.onSubmit(openConfirmation)}>
                <Stack w={500}>
                    {JSON.stringify(sessionUser)}
                    <TextInput
                        size={"lg"}
                        label="Nome"
                        key={form.key("name")}
                        {...form.getInputProps("name")}
                    />
                    <TextInput
                        size={"lg"}
                        label="Email"
                        key={form.key("email")}
                        {...form.getInputProps("email")}
                    />
                    <TextInput
                        size={"lg"}
                        label="Telefone"
                        key={form.key("phone")}
                        {...form.getInputProps("phone")}
                    />
                    <Button size={"lg"} color={"dark-blue.9"} type={"submit"} mt={"lg"} loading={isPending}>
                        Atualizar Informações
                    </Button>
                </Stack>
            </form>
        </Stack>
    );
};
