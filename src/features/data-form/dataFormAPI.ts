import {getAuthHeaders} from "../../utils/helpers";
import {DataModel} from "../../models/DataModel";

export async function fetchModel(endpoint: string, id: string) {
    let url = `${endpoint}${id}`;

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

export async function saveModel(endpoint: string, model: DataModel) {
    let url = endpoint;

    if (model?.id) {
        url = `${url}${model.id}/`;
    }

    const response = await fetch(url, {
        method: model?.id ? 'PUT' : 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(model)
    });

    const json = await response.json();
    if ([200, 201].indexOf(response.status) === -1) {
        throw json.data.detail;
    }

    return json;
}