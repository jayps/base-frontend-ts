import {API_URL} from "../../constants";
import {UsersFilters} from "./usersSlice";
import {getAuthHeaders} from "../../utils/helpers";
import {User} from "../../models/User";

export async function getUsersList(page?: number, filters?: UsersFilters, search?: string, sorting?: string) {
    let url = `${API_URL}/users/`;

    const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders()
    });
    const json = await response.json();
    if (response.status !== 200) {
        throw json.data.detail
    }

    return json;
}

export async function saveUser(user: User) {
    let url = `${API_URL}/users/`;
    if (user.id) {
        url = `${url}${user.id}/`;
    }

    const response = await fetch(url, {
        method: user.id ? 'PUT' : 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(user)
    });
    const json = await response.json();
    if ([200, 201].indexOf(response.status) === -1) {
        throw json.data.detail;
    }

    return json;
}

export async function fetchUser(id: string) {
    let url = `${API_URL}/users/${id}/`;

    const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders()
    });
    const json = await response.json();
    if (response.status !== 200) {
        throw json.data.detail
    }

    return json;
}