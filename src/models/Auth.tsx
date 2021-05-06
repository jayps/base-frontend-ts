export interface AuthRequest {
    email: string;
    password: string;
}

export interface AccessTokenData {
    email: string;
    exp: number;
    first_name: string;
    is_staff: boolean;
    is_superuser: boolean;
    jti: string;
    last_name: string;
    token_type: string;
    user_id: string;
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