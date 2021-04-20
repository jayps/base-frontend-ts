export interface AuthRequest {
    email: string;
    password: string;
}

export interface AuthToken {
    access: string;
    refresh: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}