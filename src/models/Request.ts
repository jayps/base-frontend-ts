import {DataTableFilterSetting} from "../components/data-table/DataTable";

export interface DataModelRequest {
    endpoint: string;
    page?: number;
    filters?: DataTableFilterSetting[];
    search?: string | null;
    ordering?: string;
}
