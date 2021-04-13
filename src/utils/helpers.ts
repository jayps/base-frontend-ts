import {AuthToken} from "../models/Auth";
import {User} from "../models/User";

export const getAuthHeaders = () => {
    const token: AuthToken = JSON.parse(localStorage.getItem('token') || '');

    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.access}`
    }
}

export const getUserFromToken = (token: string): User => {
    const decoded = JSON.parse(atob(token.split('.')[1]))
    return {
        id: decoded.user_id,
        firstName: decoded.first_name,
        lastName: decoded.last_name,
    }
}