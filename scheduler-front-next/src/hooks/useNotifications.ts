import { notifications } from "@mantine/notifications";

export const useNotifications = () => {
    const showSuccess = (message: string) => {
        notifications.show({
            message: message,
            color: "green",
        });
    };

    const showWarning = (message: string) => {
        notifications.show({
            message: message,
            color: "yellow",
        });
    };

    const showError = (message: string) => {
        notifications.show({
            message: message,
            color: "red",
        });
    };

    return {
        showSuccess,
        showWarning,
        showError,
    };
};
