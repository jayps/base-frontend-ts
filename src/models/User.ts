import {DataTableFilterSetting} from "../components/data-table/DataTable";
import {DataModel} from "./DataModel";

export interface User extends DataModel {
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