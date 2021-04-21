import {DataTableFilterSetting} from "../components/data-table/DataTable";

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
    filters?: DataTableFilterSetting[];
    search?: string;
    sorting?: string;
}