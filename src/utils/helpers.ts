import {AuthToken} from "../models/Auth";

export const getAuthHeaders = () => {
    const token: AuthToken = JSON.parse(localStorage.getItem('token') || '');

    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.access}`
    }
}