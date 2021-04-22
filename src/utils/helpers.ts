import {AuthToken} from "../models/Auth";
import {User} from "../models/User";
import {DataTableFilterSetting} from "../components/data-table/DataTable";

export const getAuthHeaders = () => {
    const headers: any = {'Content-Type': 'application/json'}

    const storageToken = localStorage.getItem('token') || null;
    if (storageToken) {
        const token: AuthToken = JSON.parse(storageToken);
        headers['Authorization'] = `Bearer ${token.access}`
    }

    return headers;
}

export const getUserFromToken = (token: string): User => {
    const decoded = JSON.parse(atob(token.split('.')[1]))
    return {
        id: decoded.user_id,
        firstName: decoded.first_name,
        lastName: decoded.last_name,
        email: decoded.email,
        isSuperuser: decoded.is_superuser,
        isStaff: decoded.is_staff
    }
}

export const makeQueryParams = (obj: any) => {
    let params: any = {};
    Object.keys(obj).forEach((key) => {
        if (key === 'endpoint') {
            return;
        }
        if (Array.isArray(obj[key])) {
            obj[key].forEach((filter: DataTableFilterSetting) => {
                params[filter.name] = filter.value;
            });
        } else {
            params[key] = obj[key];
        }
    });

    return Object.keys(params).map(key => key + '=' + params[key]).join('&');
}