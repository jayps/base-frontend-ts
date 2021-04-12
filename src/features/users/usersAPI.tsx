import {API_URL} from "../../constants";
import {UsersFilters} from "./usersSlice";
import {getAuthHeaders} from "../../utils/helpers";

export async function getUsersList(page?: number, filters?: UsersFilters, search?: string, sorting?: string) {
    let url = `${API_URL}/users/`;

    const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders()
    });
    const json = await response.json();
    if (response.status >= 400) {
        throw json.data.detail
    }

    return json;
}