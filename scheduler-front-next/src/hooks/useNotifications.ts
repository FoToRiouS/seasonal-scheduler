import { notifications } from "@mantine/notifications";
import { ValidationException } from "@/interfaces/ValidationException";
import { GeneralException } from "@/interfaces/GeneralException";

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

    const showError = (error: string | Error) => {
        let message;
        try {
            if (error instanceof Error) {
                const parsedError = JSON.parse(error.message);
                if ("exceptionName" in parsedError) {
                    if (parsedError["exceptionName"] === "ValidationException") {
                        const validateException = parsedError as ValidationException;
                        message = validateException.messages.join("\n");
                    } else {
                        const generalException = parsedError as GeneralException;
                        message = generalException.message;
                    }
                } else {
                    message = error.message;
                }
            } else {
                message = error;
            }
        } catch (e) {
            message = JSON.stringify(error);
        }

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
