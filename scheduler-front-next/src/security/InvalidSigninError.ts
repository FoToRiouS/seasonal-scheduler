import { AuthError } from "next-auth";

export class InvalidSigninError extends AuthError {
    readonly errorType: string;
    constructor(errorType: string, message: string) {
        super(message);
        this.errorType = errorType;
        this.type = "CredentialsSignin";
    }
}
