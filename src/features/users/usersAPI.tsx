import {API_URL} from "../../constants";
import {AuthToken} from "../../models/Auth";
import {UsersFilters} from "./usersSlice";

export async function getUsersList(page?: number, filters?: UsersFilters, search?: string, sorting?: string) {
    const token: AuthToken = JSON.parse(localStorage.getItem('token') || '');

    let url = `${API_URL}/users/`;
    // TODO: Add params to URL.

    const response = await fetch(url, {
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