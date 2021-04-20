import {API_URL} from "../../constants";
import {UsersFilters} from "./usersSlice";
import {getAuthHeaders, makeQueryParams} from "../../utils/helpers";
import {User, UserListRequest} from "../../models/User";

export async function getUsersList(requestParams: UserListRequest) {
    let url = `${API_URL}/users/?${makeQueryParams(requestParams)}`;

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

export async function deleteUser(id: string) {
    let url = `${API_URL}/users/${id}/`;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    if (response.status !== 204) {
        const json = await response.json();
        throw json.data.detail
    }
}