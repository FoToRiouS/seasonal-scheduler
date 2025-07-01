/**
 * Interface que representa a entidade User, mas preparada para cadastro.
 * Baseado na entidade Java.
 */
export interface UserRegister {
    username: string;
    password: string;
    confirmPassword: string;
    name: string;
    email: string;
    phone: string;
}
