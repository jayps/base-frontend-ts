import {API_URL} from "../../constants";
import {AuthToken} from "../../models/Auth";

export async function getUsersList() {
    const token: AuthToken = JSON.parse(localStorage.getItem('token') || '');

    const response = await fetch(`${API_URL}/users/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.access}`
        }
    });
    const json = await response.json();
    if (response.status >= 400) {
        throw json.data.detail
    }

    return json;
}