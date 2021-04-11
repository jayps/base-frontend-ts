export interface AuthRequest {
    email: string;
    password: string;
}

export interface AuthToken {
    access: string;
    refresh: string;
}