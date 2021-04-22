import {getAuthHeaders, makeQueryParams} from "../../utils/helpers";
import {DataModelRequest} from "../../models/Request";

export async function getTableDataList(requestParams: DataModelRequest) {
    let url = `${requestParams.endpoint}?${makeQueryParams(requestParams)}`;

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

export async function deleteTableDataItem(endpoint: string, id: string) {
    let url = `${endpoint}${id}/`;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    if (response.status !== 204) {
        const json = await response.json();
        throw json.data.detail
    }
}