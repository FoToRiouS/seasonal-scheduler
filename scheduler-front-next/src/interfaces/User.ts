/**
 * Interface que representa a entidade User.
 * Baseado na entidade Java.
 */
export interface User {
    id: string;
    username: string;
    name: string;
    email: string;
    phone: string;
    profileImageSrc: string;
    createdAt: string;
}
