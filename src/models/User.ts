import {UsersFilters} from "../features/users/usersSlice";

export interface User {
    id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    isStaff?: boolean;
    isSuperuser?: boolean;
    dateJoined?: string;
    isActive?: boolean;
}

export interface UserListRequest {
    page?: number;
    filters?: UsersFilters;
    search?: string;
    sorting?: string;
}