import { Button, PasswordInput, Stack } from "@mantine/core";
import { z } from "zod/v4";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useUpdatePassword } from "@/queries/UserQueries";
import { useNotifications } from "@/hooks/useNotifications";
import { UserUpdatePassword } from "@/interfaces/UserUpdatePassword";
import { useDisclosure } from "@mantine/hooks";
import { useUserSession } from "@/hooks/useUserSession";

const schema = z
    .object({
        oldPassword: z.string().min(1, "A senha antiga deve ser preenchida"),
        newPassword: z.string().min(1, "A nova senha deve ser preenchida"),
        confirmPassword: z.string().min(1, "A nova senha deve ser preenchida"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "As senhas devem ser iguais",
        path: ["confirmPassword"], // Indica em qual campo o erro deve ser exibido
    });

type schemaType = z.infer<typeof schema>;

export const PerfilPasswordTab = () => {
    const { showSuccess, showError } = useNotifications();
    const { session } = useUserSession();
    const { mutate: updatePassword, isPending } = useUpdatePassword(session?.userId);

    const [passwordVisible, { toggle: toggleVisible }] = useDisclosure(false);

    const form = useForm<schemaType>({
        mode: "uncontrolled",
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        validate: zod4Resolver(schema),
    });

    const handleSubmit = (values: schemaType) => {
        const payload: UserUpdatePassword = {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
        };
        updatePassword(payload, {
            onSuccess: () => {
                form.reset();
                showSuccess("Informações do perfil atualizados com sucesso!");
            },
            onError: (error) => {
                showError(error);
            },
        });
    };

    return (
        <Stack align={"center"}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack w={500}>
                    <PasswordInput
                        size={"lg"}
                        label="Senha Antiga"
                        visible={passwordVisible}
                        onVisibilityChange={toggleVisible}
                        key={form.key("oldPassword")}
                        {...form.getInputProps("oldPassword")}
                    />
                    <PasswordInput
                        size={"lg"}
                        label="Nova Senha"
                        visible={passwordVisible}
                        onVisibilityChange={toggleVisible}
                        key={form.key("newPassword")}
                        {...form.getInputProps("newPassword")}
                    />
                    <PasswordInput
                        size={"lg"}
                        label="Confirmação da Nova Senha"
                        visible={passwordVisible}
                        onVisibilityChange={toggleVisible}
                        key={form.key("confirmPassword")}
                        {...form.getInputProps("confirmPassword")}
                    />
                    <Button size={"lg"} type={"submit"} mt={"lg"} loading={isPending}>
                        Atualizar Senha
                    </Button>
                </Stack>
            </form>
        </Stack>
    );
};
